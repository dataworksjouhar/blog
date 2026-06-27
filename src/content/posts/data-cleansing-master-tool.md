---
title: "Data Cleansing Master Tool: a 99% time saving, built in-house"
description: "How I built a VBA-based data cleansing tool that replaced a six-figure platform — cutting processing from 2.5 days to under 3 minutes and saving 109,406 KWD."
date: 2024-12-09
category: "projects"
tags: ["power-bi", "vba", "excel", "data-quality", "automation"]
featured: true
---

As a data quality specialist, I led the development of the **Data Cleansing
Master Tool** — an in-house solution that reshaped how our team managed data
quality. This is the story of the problem it solved, how it works, and the
results it delivered.

## The challenge

During a major data migration, we ran into a wall of constraints:

- **No cleansing tool on hand.** Our migration partner didn't have the data
  cleansing capability we needed.
- **A tight budget.** A premium platform like Informatica CDQ was out of reach
  on cost, so we needed something affordable but genuinely effective.
- **A tight timeline.** Leadership wanted a fast read on the quality of our
  existing data, which put real deadline pressure on us.
- **Heavy manual effort.** Finding and fixing quality issues by hand was slow
  and error-prone.
- **An Excel-first culture.** Our business teams lived in Excel — so whatever we
  built had to meet them there.

## The tool

The **Data Cleansing Master Tool** is a VBA-based solution that automates data
quality checks inside Excel. Two ideas shaped its design: it had to be powerful
enough to replace manual work, and simple enough that a business user could run
it without training.

![The Data Cleansing Master Tool interface](/images/data-cleansing-tool-interface.png)

Its key features:

- **Automated cleansing.** Based on what the user sets in a Config sheet, the
  tool automatically finds and highlights data issues.
- **A configurable rule set.** Workbook names, column names, and rule details
  are all driven from the configuration sheet — no code editing required.
- **A user-friendly interface.** Simple navigation and clear controls keep it
  approachable for non-technical teams.

## Data quality dimensions

The tool classifies every issue against the dimensions that matter for quality:
**completeness, validity, uniqueness, consistency,** and **format**.

## The validation rules

Under the hood, it runs a comprehensive set of checks:

- **Data validation** — null values, junk characters, valid-value lists, and
  length checks.
- **Advanced checks** — valid email, valid phone number, valid date, duplicate
  detection, wildcard matching, and more.

### See it in action

<div style="position:relative;padding-bottom:62.5%;height:0;margin:26px 0;border-radius:12px;overflow:hidden;box-shadow:0 18px 40px -28px rgba(33,27,22,.4);">
  <iframe src="https://www.loom.com/embed/27457e1588874684b93de24c26164369" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe>
</div>

## The results

The numbers are what made this project land:

- **109,406 KWD saved.** Building in-house avoided the implementation cost of
  Informatica entirely.
- **From 2.5 days to 2–3 minutes per dataset** — a 99% cut in processing time.
- **400+ rules, fully in-house.** Complete control over data quality, with no
  vendor dependency.
- **A visual priority system.** Colour-coding flags issues at a glance — red for
  high priority, orange for medium, yellow for low — and every flagged item
  carries a validation message to guide the fix.

### Reporting and analytics

All cleansing output feeds straight into **Power BI dashboards**, giving
management a clear, continuous view of data quality across every dimension.

![Power BI data quality dashboard](/images/data-cleansing-dashboard-1.png)

![Power BI data quality dashboard detail](/images/data-cleansing-dashboard-2.png)

The dashboards turn raw checks into interactive visuals, so teams can spot
issues quickly and track improvements over time.

## Looking back

The Data Cleansing Master Tool meaningfully improved how we manage data — and
every constraint we worked around taught me something I've carried into later
projects. For this work, I received an award from the CTO of Alshaya.

![Receiving the award from the CTO of Alshaya](/images/data-cleansing-cto-award.jpg)
