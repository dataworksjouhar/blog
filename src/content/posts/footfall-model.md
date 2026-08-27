---
title: "One footfall number for 70+ brands, when every source counted something different"
description: "Door sensors, AI cameras, restaurant POS guest counts and web sessions, across the Middle East, Turkey and Central Europe. I owned the business logic that made them one trusted number."
impact: "One trusted footfall number across 70+ brands and 3 regions"
tools: ["SQL", "Power BI", "KPI definition", "Data modelling"]
date: 2026-08-03
category: "projects"
level: "advanced"
tags: ["data-analytics", "data-quality", "sql", "business-learning"]
featured: false
---

Alshaya measured how many people came through its doors in at least five different ways, and none of them agreed. I owned the business side of a single footfall model that brought those sources into one trusted view of traffic, measured the same way across **70+ brands** and across the Middle East, Turkey and Central Europe, so the business could finally put traffic next to sales and read conversion consistently.

I did not design the database or write the pipelines. I owned the problem, the definitions, the validation and the delivery, working across the data architect, the engineering team and the BI team. That distinction matters, and I come back to it at the end.

## The problem

Leaders wanted a simple answer: are we turning foot traffic into sales? That answer was surprisingly hard to give, because footfall did not mean one thing.

The sources looked like this.

**ARES count sensors**, the legacy system, installed at store entrances across most locations, counting entries hour by hour.

**EveryAngle AI cameras**, the newer system, rolling out from December with far richer analytics. I worked directly with the EveryAngle team, including their CEO, to identify what their platform actually produced and how it would feed ours.

**Simphony and MyMicros POS**, used by restaurants and cafes that have no sensor or camera at the door. Here footfall is a guest count entered at the venue, based on what staff observe, and it exists only at daily level.

**Google Analytics**, where the closest thing to footfall online is a web session.

**Regional feeds** from Turkey and Central Europe, arriving in their own shapes on their own timelines.

Five kinds of counting, three levels of detail, and a rollout that meant any given store might be on the old system, the new one, or briefly both. With no shared definition, you could not put traffic and sales side by side with confidence. Conversion was not comparable between a store, a restaurant and the website, let alone across countries. Operations and brand teams were making staffing and performance calls on numbers that quietly meant different things.

<svg viewBox="0 0 820 330" role="img" aria-label="Five footfall sources at different grains, conformed on shared keys into one model" style="width:100%;height:auto;margin:28px 0;color:inherit;font-family:inherit">
  <g fill="currentColor" font-size="10.5" letter-spacing="1.2" opacity=".55">
    <text x="4" y="16">FIVE WAYS OF COUNTING</text>
    <text x="250" y="16">CONFORMED ON WHAT THEY SHARE</text>
    <text x="470" y="16">ONE MODEL</text>
    <text x="662" y="16">READ TOGETHER</text>
  </g>
  <g stroke="currentColor" fill="currentColor">
    <g opacity=".07">
      <rect x="4" y="40" width="200" height="42" rx="3" stroke="none"/>
      <rect x="4" y="94" width="200" height="42" rx="3" stroke="none"/>
      <rect x="4" y="148" width="200" height="42" rx="3" stroke="none"/>
      <rect x="4" y="202" width="200" height="42" rx="3" stroke="none"/>
      <rect x="4" y="256" width="200" height="42" rx="3" stroke="none"/>
      <rect x="250" y="40" width="180" height="258" rx="3" stroke="none"/>
      <rect x="470" y="128" width="150" height="82" rx="3" stroke="none"/>
      <rect x="662" y="128" width="154" height="82" rx="3" stroke="none"/>
    </g>
    <g fill="none" opacity=".3" stroke-width="1">
      <rect x="4" y="40" width="200" height="42" rx="3"/>
      <rect x="4" y="94" width="200" height="42" rx="3"/>
      <rect x="4" y="148" width="200" height="42" rx="3" stroke-dasharray="4 3"/>
      <rect x="4" y="202" width="200" height="42" rx="3"/>
      <rect x="4" y="256" width="200" height="42" rx="3"/>
      <rect x="250" y="40" width="180" height="258" rx="3"/>
      <rect x="470" y="128" width="150" height="82" rx="3"/>
      <rect x="662" y="128" width="154" height="82" rx="3"/>
    </g>
  </g>
  <g fill="currentColor" font-size="12.5">
    <text x="16" y="60">ARES sensors</text>
    <text x="16" y="114">EveryAngle AI cameras</text>
    <text x="16" y="168">Simphony / MyMicros</text>
    <text x="16" y="222">Google Analytics</text>
    <text x="16" y="276">Turkey and CEE feeds</text>
  </g>
  <g fill="currentColor" font-size="10.5" opacity=".6">
    <text x="16" y="74">door entries, hourly</text>
    <text x="16" y="128">door entries, hourly</text>
    <text x="16" y="182">guest counts, daily only</text>
    <text x="16" y="236">web sessions</text>
    <text x="16" y="290">mixed, staggered rollout</text>
  </g>
  <g fill="currentColor" font-size="12.5">
    <text x="264" y="88">brand</text>
    <text x="264" y="110">store</text>
    <text x="264" y="132">date</text>
    <text x="264" y="154">hour</text>
    <text x="264" y="176">valid trading hours</text>
    <text x="264" y="230" font-size="10.5" opacity=".6">each channel stays</text>
    <text x="264" y="246" font-size="10.5" opacity=".6">faithful to what it</text>
    <text x="264" y="262" font-size="10.5" opacity=".6">actually measures</text>
    <text x="484" y="164">Footfall model</text>
    <text x="484" y="182" font-size="10.5" opacity=".6">one shared standard</text>
    <text x="676" y="156">Traffic vs sales</text>
    <text x="676" y="176">Conversion by store</text>
    <text x="676" y="192" font-size="10.5" opacity=".6">and by hour</text>
  </g>
  <g stroke="currentColor" opacity=".35" stroke-width="1.2" fill="none">
    <path d="M208 61 L244 61"/><path d="M208 115 L244 115"/><path d="M208 169 L244 169"/>
    <path d="M208 223 L244 223"/><path d="M208 277 L244 277"/>
    <path d="M434 169 L464 169"/><path d="M624 169 L656 169"/>
  </g>
  <g fill="currentColor" opacity=".35">
    <path d="M244 61 l-6 -3.5 v7 z"/><path d="M244 115 l-6 -3.5 v7 z"/><path d="M244 169 l-6 -3.5 v7 z"/>
    <path d="M244 223 l-6 -3.5 v7 z"/><path d="M244 277 l-6 -3.5 v7 z"/>
    <path d="M464 169 l-6 -3.5 v7 z"/><path d="M656 169 l-6 -3.5 v7 z"/>
  </g>
  <text x="212" y="196" fill="currentColor" font-size="10" opacity=".5">dashed: different grain</text>
</svg>

## What I owned

The data architect designed the model, with dimensions for brand, store, date and hour. My job was not the schema. It was the business meaning behind every number flowing into it.

I went source by source to find where each figure actually came from and what it truly counted. I wrote the SQL to interrogate it, defined the business logic (what qualifies as footfall in each channel, which hours count as valid trading hours, how to handle the cases that do not fit), and translated those rules for the engineers so ingestion landed correctly. I ran the validation and UAT, and worked with the BI team on the reporting layer above it.

From then on I was the single point of contact for the model. When a number looked wrong, or a new source or region came online, the question came to me.

## The design principle: do not add unlike things

The key decision was that these sources cannot simply be summed. A person walking through a shop door, a guest paying in a restaurant, and a session on a website are not the same event. Adding them produces one clean number that is quietly meaningless.

So the principle was honesty over false precision. Keep each channel faithful to what it actually measures. Align them on what they genuinely share, which is brand, store, date, hour and valid trading hours. Be explicit where they do not align, such as the restaurant data that only exists daily and therefore cannot appear in an hourly view.

That is what made one model trustworthy. Not that every source looked identical, but that everyone knew exactly what each number counted and when it was fair to compare.

## Three investigations

Most of the real work was not design. It was answering "why does this number look wrong?" Three cases stand out, and they went three different ways.

**A store in Saudi Arabia was reporting from two systems at once.** During the camera rollout, IT was meant to remove the legacy sensor when installing the AI camera. Here we were receiving both. It looked like a rollout error, and the obvious fix was to suppress one feed.

We called the store first. It turned out the site was partly renovated and had two floors. The renovated section had the new camera. The older section still had the sensor. Both feeds were correct, and together they were the only complete picture of that store. We updated the logic to reflect it.

*The lesson: an outlier is a question, not a verdict. The data was right and our assumption was wrong, and the only way to know was to ask someone who could see the building.*

**A cafe was reporting roughly double what it should.** This one was a genuine fault. The venue appeared in both MyMicros, the legacy POS, and Simphony, the newer Oracle system. Normally a restaurant runs one. During migration both are live, one in production and one in test, and our pipeline was ingesting from both and counting the same guests twice.

The fix came from reading the source system properly rather than patching the output. The POS carried an active and inactive status flag. We filtered to the production system and the duplication disappeared.

*The lesson: during any migration, expect two systems to be live at once, and look for the flag that tells you which one is real before you start writing exceptions.*

**Some stores had no footfall at all.** Tracing back through the layers, the records were present in the bronze layer and missing in silver. The data had arrived. Something in the transformation was dropping it.

The silver logic was filtering records on a partial-data condition that was stricter than intended, and valid rows were failing it. Once we identified the cause, the transformation was corrected and the data flowed.

<svg viewBox="0 0 720 132" role="img" aria-label="Records present in bronze, dropped by the silver transformation, missing in gold" style="width:100%;height:auto;margin:24px 0;color:inherit;font-family:inherit">
  <g stroke="currentColor" fill="currentColor">
    <g opacity=".07" stroke="none">
      <rect x="4" y="28" width="180" height="56" rx="3"/>
      <rect x="270" y="28" width="180" height="56" rx="3"/>
      <rect x="536" y="28" width="180" height="56" rx="3"/>
    </g>
    <g fill="none" opacity=".3" stroke-width="1">
      <rect x="4" y="28" width="180" height="56" rx="3"/>
      <rect x="270" y="28" width="180" height="56" rx="3"/>
      <rect x="536" y="28" width="180" height="56" rx="3"/>
    </g>
  </g>
  <g fill="currentColor" font-size="12.5">
    <text x="18" y="52">Bronze</text><text x="284" y="52">Silver</text><text x="550" y="52">Gold</text>
  </g>
  <g fill="currentColor" font-size="11" opacity=".6">
    <text x="18" y="70">records present</text>
    <text x="284" y="70">records missing</text>
    <text x="550" y="70">store shows no footfall</text>
  </g>
  <g stroke="currentColor" fill="none" opacity=".35" stroke-width="1.2">
    <path d="M188 56 L264 56" stroke-dasharray="5 4"/>
    <path d="M454 56 L530 56"/>
  </g>
  <g fill="currentColor" opacity=".35">
    <path d="M264 56 l-6 -3.5 v7 z"/><path d="M530 56 l-6 -3.5 v7 z"/>
  </g>
  <g stroke="currentColor" opacity=".55" stroke-width="1.4">
    <path d="M220 44 L232 68"/><path d="M232 44 L220 68"/>
  </g>
  <text x="150" y="106" fill="currentColor" font-size="11" opacity=".6">the transformation filter was the suspect, not the source</text>
</svg>

*The lesson: when data exists upstream and disappears downstream, the filter is the first suspect, not the source.*

## What changed

The business got one footfall view across physical and digital channels, on definitions everyone had agreed. Traffic could sit next to sales, so conversion read the same way across brands and countries instead of being reinvented in every report. Operations could look at traffic against sales by store and by hour. New regions had a clear path to plug in, because the rules for adding a source were already written down. And the metric had an owner, which is what keeps a shared number trusted long after the first dashboard ships.

## What I would tell another analyst

On a single-source-of-truth project, the hard part is almost never the pipeline. It is agreeing what the number means, and then owning that meaning as sources, regions and people change. Define the business logic before engineering starts. Keep each source honest to what it actually measures instead of forcing everything into one shape. And make sure one person is clearly accountable, because a number is only trusted when someone can answer, without hesitating, exactly what it counts.

There is a second thing I took from it, and it is less comfortable.

Look again at that third investigation. I was reading data in a bronze layer, finding it missing in silver, and identifying that the transformation was at fault. I knew that architecture well enough to debug it from the outside. But the fix lived in code I did not write, in a pipeline I did not build, in a model I did not design. Every time.

In a company that size, that is normal and correct. Specialists own their layers. But it left me with a fair question about my own range, and eventually I decided the honest way to answer it was to go and build the whole thing myself, from source to dashboard, and find out where I struggled.

That is [the next post](/posts/al-waha-analytics-platform).
