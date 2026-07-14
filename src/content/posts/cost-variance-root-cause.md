---
title: "Cutting a two-year cost variance from 48% to under 2%"
description: "A root cause analysis across a Medallion data platform. How I traced a long-standing cost gap to two hidden causes and worked with engineering to fix both."
date: 2025-06-14
category: "projects"
level: "advanced"
tags: ["data-analytics", "sql", "power-bi", "business-learning"]
featured: false
---

When I joined the team at Alshaya Data team, the Single Transaction View sales Table was reporting the
wrong margins for around 10 Oracle RMS brands. The sales were fine. The problem
was the cost behind the margin, which was inaccurate, and it threw the reported
margins off from finance by nearly **48%**. The gap had stood for almost two
years. I traced it through the data platform, found two root causes, and worked
with engineering to fix both. The variance dropped to **under 2%**.

## The problem

The margins on the main sales table did not match the official finance
figures, off by close to 48% across about 10 brands. The sales numbers were
correct. The cost feeding the margin was not, and wrong cost means wrong margin.
When reporting is off by that much, people stop trusting it. Finance and category
teams could not rely on the margin numbers, and decisions that should have leaned
on the dashboards were held back.

The issue had existed for nearly two years. The team had tried to solve it more
than once, but limited capacity meant it was never fully chased down.

<figure style="margin:28px 0;text-align:center">
<svg viewBox="0 0 760 300" role="img" aria-label="Line chart: margin variance between reporting and finance falling from 48 percent to under 2 percent after the two fixes" style="max-width:100%;height:auto">
  <style>
    .v-axis{font-family:'JetBrains Mono',monospace;font-size:12px;fill:#8f8371}
    .v-anno{font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:600}
    .v-head{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.12em;fill:#726657}
    .v-line{fill:none;stroke:url(#vTrend);stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:760;stroke-dashoffset:760;animation:vDraw 1.6s cubic-bezier(.65,.05,.36,1) .2s forwards}
    @keyframes vDraw{to{stroke-dashoffset:0}}
    @media (prefers-reduced-motion:reduce){.v-line{animation:none;stroke-dashoffset:0}}
  </style>
  <defs>
    <linearGradient id="vTrend" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#c8623b"/>
      <stop offset="100%" stop-color="#3f7d54"/>
    </linearGradient>
    <linearGradient id="vArea" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#c8623b" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="#3f7d54" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <text x="20" y="24" class="v-head">REPORTING VS FINANCE, MARGIN VARIANCE</text>
  <line x1="66" y1="70" x2="740" y2="70" stroke="#e4d9c6"/>
  <line x1="66" y1="132" x2="740" y2="132" stroke="#e4d9c6"/>
  <line x1="66" y1="194" x2="740" y2="194" stroke="#e4d9c6"/>
  <line x1="66" y1="256" x2="740" y2="256" stroke="#d8cbb6"/>
  <text x="20" y="74" class="v-axis">48%</text>
  <text x="20" y="136" class="v-axis">32%</text>
  <text x="20" y="198" class="v-axis">16%</text>
  <text x="34" y="260" class="v-axis">0%</text>
  <path fill="url(#vArea)" d="M78,70 L150,96 L222,84 L294,146 L366,157 L438,198 L510,217 L582,236 L730,249 L730,256 L78,256 Z"/>
  <path class="v-line" d="M78,70 L150,96 L222,84 L294,146 L366,157 L438,198 L510,217 L582,236 L730,249"/>
  <circle cx="78" cy="70" r="5.5" fill="#c8623b"/>
  <circle cx="730" cy="249" r="5.5" fill="#3f7d54"/>
  <text x="94" y="60" class="v-anno" fill="#c8623b">48% variance</text>
  <text x="714" y="278" class="v-anno" fill="#3f7d54" text-anchor="end">under 2%</text>
</svg>
<figcaption style="font-family:'JetBrains Mono',monospace;font-size:12px;color:#726657;margin-top:12px">Two years of a 48% gap, closed to under 2% once the two root causes were fixed.</figcaption>
</figure>

## How I approached it

Our data platform runs on Azure using a Medallion architecture, Bronze then
Silver then Gold, with the Gold data mart feeding Power BI. If a number is wrong
at the end, it entered somewhere along that path. So my plan was simple: follow
the data through each layer and find exactly where the gap appeared.

I started by categorizing the brands, and a pattern showed up quickly in the Home
Improvement brands. From there I drilled down step by step, from brand to period,
to day, and finally to individual products, comparing the Power BI data against
the finance data side by side. Narrowing from the category down to a single row
is what exposed the cause.

## Root cause one: pack items

At product level, several items were missing cost entirely. When I looked closer,
they were all **pack items**, collections sold as one unit. A table and four
chairs, for example, sold as a single pack, but the cost only existed for the
individual components.

The mismatch was in the keys. The sales table held the *pack* item number, while
the cost table held only the *component* item numbers. The existing logic looked
up the pack number in the cost table, found nothing, and returned no cost. That
missing cost was a large part of the 48%.

<figure style="margin:28px 0;text-align:center">
<svg viewBox="0 0 760 300" role="img" aria-label="Pack item cost lookup: the old logic failed, the new rule maps pack to components" style="max-width:100%;height:auto">
  <style>
    .lbl{font-family:'Hanken Grotesk',sans-serif;font-size:13px;fill:#4a4039}
    .box{font-family:'Hanken Grotesk',sans-serif;font-weight:700;font-size:13px}
    .mono{font-family:'JetBrains Mono',monospace;font-size:12px}
    .head{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.12em;fill:#726657}
  </style>
  <text x="20" y="24" class="head">THE OLD LOGIC</text>
  <rect x="20" y="36" width="150" height="52" rx="10" fill="#dcedf8" stroke="#1c6fb0"/>
  <text x="32" y="58" class="box" fill="#0e4d80">Sales table</text>
  <text x="32" y="76" class="mono" fill="#4a4039">PK-100 (pack)</text>
  <line x1="170" y1="62" x2="286" y2="62" stroke="#c8623b" stroke-width="2" stroke-dasharray="5 4"/>
  <polygon points="286,57 296,62 286,67" fill="#c8623b"/>
  <text x="178" y="52" class="lbl" fill="#c8623b">look up PK-100</text>
  <rect x="300" y="36" width="150" height="52" rx="10" fill="#fff" stroke="#d8cbb6"/>
  <text x="312" y="58" class="box" fill="#211b16">Cost table</text>
  <text x="312" y="76" class="mono" fill="#4a4039">C-11, C-12 only</text>
  <line x1="450" y1="62" x2="560" y2="62" stroke="#c8623b" stroke-width="2"/>
  <polygon points="560,57 570,62 560,67" fill="#c8623b"/>
  <rect x="574" y="40" width="166" height="44" rx="10" fill="#f8e6e0" stroke="#c8623b"/>
  <text x="586" y="59" class="box" fill="#a04a28">No match</text>
  <text x="586" y="76" class="mono" fill="#a04a28">cost blank, 48% gap</text>
  <text x="20" y="150" class="head">THE NEW RULE</text>
  <rect x="20" y="162" width="150" height="52" rx="10" fill="#dcedf8" stroke="#1c6fb0"/>
  <text x="32" y="184" class="box" fill="#0e4d80">Sales table</text>
  <text x="32" y="202" class="mono" fill="#4a4039">PK-100 (pack)</text>
  <line x1="170" y1="188" x2="286" y2="188" stroke="#3f7d54" stroke-width="2"/>
  <polygon points="286,183 296,188 286,193" fill="#3f7d54"/>
  <text x="178" y="178" class="lbl" fill="#3f7d54">pack? map to parts</text>
  <rect x="300" y="162" width="150" height="52" rx="10" fill="#e6f0e9" stroke="#3f7d54"/>
  <text x="312" y="184" class="box" fill="#2c5c3c">Components</text>
  <text x="312" y="202" class="mono" fill="#4a4039">C-11 + C-12</text>
  <line x1="450" y1="188" x2="560" y2="188" stroke="#3f7d54" stroke-width="2"/>
  <polygon points="560,183 570,188 560,193" fill="#3f7d54"/>
  <rect x="574" y="166" width="166" height="44" rx="10" fill="#e6f0e9" stroke="#3f7d54"/>
  <text x="586" y="185" class="box" fill="#2c5c3c">Cost found</text>
  <text x="586" y="202" class="mono" fill="#2c5c3c">variance under 2%</text>
</svg>
<figcaption style="font-family:'JetBrains Mono',monospace;font-size:12px;color:#726657;margin-top:12px">The cost hid behind the keys: sales carried the pack number, cost carried the parts.</figcaption>
</figure>

I validated the pattern across many examples, then worked with the data
engineering team to add a new business rule. The logic now checks whether an item
is a pack or a standard item first. If it is a pack, it references the component
items, then pulls their cost from the cost table. That closed most of the gap
across the Home Improvement brands.

## Root cause two: concession brands

The second cause sat with concession brands. These products are supplier-owned,
so a standard product cost simply does not exist for them. The old logic had
nothing to find.

Working with the Data Architect, I traced the correct source and designed a new
data model built on the agreed supplier margin percentages. I helped define the
business logic, validated the SQL, and made sure the data flowed correctly
through the pipeline and into the Power BI dashboards.

## The result

Together, the two fixes brought the Power BI reporting back in line with finance.
The variance fell from nearly 48% to under 2%. More than the number, it restored
trust: finance and category teams could rely on the margin dashboards again, and
the reporting could be used for decisions instead of being questioned.

## What I would tell another analyst

When a total is wrong, do not argue with the number. Trace it. Narrow from the
category down to the single row, and the cause usually shows itself.

The variance almost always hides in the edge cases the general logic never
planned for, here it was pack items and supplier-owned goods, not the ordinary
products. And the fix is often a business rule, not a clever formula. Get
engineering and finance into the room early, because the answer usually lives
across all three.
