---
title: "Learning Microsoft SSIS: A Practical Guide"
description: "I spent twelve years reading reports at the end of the pipe. So I built the pipe: a nightly SSIS pipeline on SQL Server 2025, deployed, scheduled, and broken on purpose. These are my notes, explained through water and plumbing."
date: 2026-11-18
category: "notes"
level: "intermediate"
tags: ["ssis", "sql-server", "etl", "data-engineering"]
tools: ["SSIS", "SQL Server 2025", "T-SQL", "SQL Server Agent"]
repo: "https://github.com/dataworksjouhar/ssis-daily-sales-pipeline"
thumbnail: "/images/thumbs/learning-microsoft-ssis.jpg"
featured: false
---

For most of my career I have worked at the end of the pipe. Power BI
reports, dashboards, the numbers people open on a Monday morning. When
those numbers looked wrong, I could usually tell. What I could not always
explain was what had happened to the data on its way to me.

That gap had been bothering me for a while. So I gave myself one week to
learn Microsoft SQL Server Integration Services (SSIS) properly. Not by
watching tutorials, but by building a small pipeline that runs every night,
fails cleanly, and can be fixed by reading its own logs.

These are my notes from that week. They are written for anyone who knows
data but has never opened SSIS, which was me eight days ago.

[**Code and SQL scripts on GitHub**](https://github.com/dataworksjouhar/ssis-daily-sales-pipeline)

## Is SSIS still worth learning?

I asked myself this first. SSIS is old, and it is easy to assume it is on
its way out.

It is not. SSIS 2025 shipped with SQL Server 2025 in November 2025, and
Microsoft Fabric now has an activity that runs existing SSIS packages
inside Fabric pipelines without rewriting them. A lot of companies will run
SSIS for years and then move it to Fabric slowly. Someone has to understand
both ends of that move.

The bigger reason for me was what sits underneath the tool. Loading only
what changed, logging every run, recovering from a failed night, reading
an error at 8 am and knowing where to look. Those skills carry over to
Fabric, Databricks, or whatever comes next.

## One story for the whole week

New terms stick better for me when they belong to one picture. So I kept
a single story going all week: water and plumbing.

![Data sources as raw water on the left, SSIS as the plumbing in the middle with SQL stored procedures inside, and BI reports as the taps on the right](/images/ssis-bi-background.png)

The sources are the water supply. SSIS is the plumbing. Reports are the
taps. Twelve years at the taps means I already know what bad water looks
like when it arrives. This week was about the pipes behind the wall.

Every new term got a place in the same picture:

| SSIS term | In the story | What it really is |
| --- | --- | --- |
| Package | One plumbing job | The unit SSIS runs, saved as a .dtsx file |
| Control flow | The order the valves open | The tasks and the rules for what runs next |
| Data flow | Water moving through the pipe | The task that reads, changes and writes rows |
| Staging table | The holding tank | A raw copy of source data before cleaning |
| Stored procedure | The treatment room | SQL inside the database that cleans and loads |
| Error output | The overflow drain | Where failing rows go instead of stopping the load |
| SSISDB catalog | The plumbing office | Stores deployed projects and every run's history |
| SQL Server Agent | The timer on the wall | Runs the job at 2 am without anyone pressing start |

For the lab I used SQL Server 2025 Developer edition, which is free and,
unlike Express, can schedule jobs. The source system was Microsoft's
AdventureWorks sample database, a fictional bicycle company.

## The two halves of every package

Once I saw this, the rest of SSIS made sense.

The **control flow** is the job sheet on the wall. Empty the tank, fill
it, send it for treatment, write down the meter reading. Each job is a
box, and the arrows between them decide what happens next. A green arrow
means "next, if this worked".

The **data flow** is what happens inside one of those jobs. Water moves
from a source, through transformations, into a destination. It moves in
blocks of rows held in memory, which is why SSIS is fast with large
volumes.

When a job fails, you ask two questions in that order. Which box on the
job sheet failed? And if it was the pipe, which part of the pipe?

## The tank that filled twice

My first package copied 504 products from AdventureWorks into a staging
table. It worked. Then I ran it again, and the table had 1,008 rows.

Nothing in the package said "start fresh", so every run added the same
products on top of the last ones. One extra box at the start, emptying the
staging table, fixed it. A good job gives the same result whether it runs
once or five times. You need that the first time someone reruns a failed
job at 3 am.

## The treatment room

Nobody should report straight from a holding tank. The water is raw, and
the tank is emptied every night. Reports need a permanent, clean table.
For me that was `dw.DimProduct`, the same kind of dimension table I had
read from in Power BI for years.

Between the two sits a stored procedure, and in most SSIS setups a lot of
the real logic lives here. It uses `MERGE`, which asks one question for
each product: is it already there? If not, add it. If yes but something
changed, update it. If nothing changed, leave it alone.

Then I wrapped it in a transaction, a TRY/CATCH block, and a small log
table that records every run. The part I underestimated was the last line,
`THROW`. Without it, the procedure catches the error, writes it to the log,
and finishes quietly. SSIS then shows a green box while the warehouse is
wrong. A leak nobody sees is worse than a burst pipe.

## The result that was right by accident

Real data does not always come from a database. A lot of it lands as files
in a folder every night. So the next package picked up daily sales CSV files
one by one with a Foreach Loop, loaded them into a fact table, and then
moved each file to an Archive folder so it could never be loaded twice.

Arrows caused my two most useful bugs here. The first time, the file move
and the data flow had no arrow between them, so SSIS ran them at the same
time and moved a file while it was still being read.

The second one was quieter. While reorganising the package, I left the
fact-load task with no arrow in or out.

![The fact load task floating on its own, with no arrow connecting it to the two loops](/images/ssis-unconnected-task.png)

The package ran green and the fact table showed the expected 63 rows. But
the timestamps showed the fact load had started in the same second as the
file loop, before staging was filled. The 63 rows were left over from an
earlier run.

I emptied the fact table, connected the task properly, and ran it again.
63 rows, this time for the right reason. A correct-looking number does not
prove the package ran in the right order. The timestamps do.

![The file loop after the fix, with a green arrow from the data flow to the next step](/images/ssis-loop-fixed.png)

## Topping up instead of refilling

Reloading 504 products every night is fine. Reloading years of sales
every night is not. It takes hours and puts load on the live system people
are using. So the third package loads only what changed.

I will be honest: this took me three attempts to understand. What finally
worked was a tiny example with real rows.

The source table has a `ModifiedDate` column. Whenever an order is created
or edited, that date is set to now. I keep one date in a small table,
called the watermark: the newest `ModifiedDate` I have already loaded.
Each run takes only orders with a later date, then moves the watermark up.

| Night | Saved date before the run | Orders in the source | Taken |
| --- | --- | --- | --- |
| 1 | 1900-01-01 | 101 (1 Nov), 102 (1 Nov), 103 (2 Nov) | All three |
| 2 | 2 Nov | 102 edited on 3 Nov, 104 created on 3 Nov | Only 102 and 104 |
| 3 | 3 Nov | Nothing changed | None |

Three runs of my real package gave 31,465 orders, then 0, then 2 after I
edited two orders in the source. Seeing those three numbers did more for my
understanding than any explanation.

The watermark moves only after a successful load. If a night fails, the
saved date stays where it was, and the next run picks up the missed rows.

## Moving the pipes into the building

Packages that run inside Visual Studio are still on a workbench. In a
company they live on the server, in the SSIS catalog, and run on a
schedule.

I added a master package that runs the other three in order, deployed the
project to the catalog, and created a SQL Server Agent job that runs it
every night at 2 am.

![The SSIS catalog in SSMS with the deployed project and its four packages](/images/ssis-catalog-deployed.png)

## Breaking it on purpose

The last thing I wanted to practise was the morning after a failure. So I
dropped a sales file into the folder with the word "two" in the Quantity
column instead of the number 2, and ran the job.

It failed, as it should. The Agent job history only said that the package
had failed. The real answer was in the catalog's All Executions report.

![The All Executions report showing one failed run and two successful runs of the master package](/images/ssis-all-executions.png)

The messages for the failed run looked like a wall of errors. That is
because one bad value is reported by every layer above it: the data flow,
the loop, the child package, the master package. Only the earliest error
is the cause. The report lists the newest first, so the cause sits at the
bottom.

![The error messages for the failed run, including the data conversion error on column Quantity](/images/ssis-error-messages.png)

It said exactly what was wrong: a data conversion failure on column
Quantity, data row 4 of that file. The same answer comes from one query
against the catalog, which I have now saved for good:

```sql
SELECT TOP 5 message_time, package_name, message_source_name, message
FROM SSISDB.catalog.event_messages
WHERE operation_id = 6          -- the failed run's ID
  AND event_name = 'OnError'
ORDER BY event_message_id;      -- oldest first, so row 1 is the cause
```

Then I checked the damage. The file was still in the Inbox, because
archiving happens only after success. The fact table was still at 63 rows,
because nothing had been half loaded. I corrected the value, ran the job
again, and it finished green with 67 rows.

## What the build taught me

**Rerunnable comes first.** Almost every problem I hit was about what
happens on the second run, not the first.

**Arrows are logic.** Tasks without an arrow between them run at the same
time, and the result can still look right.

**Failures should be loud and clean.** Log the error, undo the half-done
work, and let the job turn red.

**Read the earliest error.** Everything after it is the same failure
reported again.

There is still a list of things I would add next: sending bad rows to an
error table instead of stopping the whole load, moving server names and
folder paths into project parameters, and keeping price history with SCD
Type 2. But for the first time, I can follow a row of data from the source
to the report and explain every step it takes on the way.
