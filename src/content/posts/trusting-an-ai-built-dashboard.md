---
title: "What I checked before trusting a dashboard Claude built"
description: "I gave nine years of my focus-app data to Claude's new motion video and dashboard features. Both worked well, but only because one data check came first: the export's end-time column was wrong in every single row."
impact: "2,563 focus sessions turned into a video and a live dashboard, after one data check"
tools: ["Claude", "ChatGPT", "d3.js"]
demo: "https://mohammedjouhar.com/forest/"
date: 2026-10-17
category: "projects"
level: "intermediate"
tags: ["ai", "data-quality", "data-analytics", "claude"]
featured: false
thumbnail: "/images/forest-calendar.jpg"
---

When Claude added motion videos and dashboards, I tested both on nine years of my own data: **2,563 focus sessions** from an app called Forest. The dashboard took **one prompt** and the video took **three to four**. Neither would have been right without the step that came before them. The export's end-time column was wrong in every row, and a dashboard built straight from it would have shown my focus hours confidently, and wrongly.

[**Open the live dashboard**](https://mohammedjouhar.com/forest/) (interactive, no login)

<!-- VIDEO: replace VIDEO_ID with the YouTube id once the explainer video is uploaded, then remove this comment's markers.
<div style="position:relative;padding-bottom:100%;height:0;margin:26px 0;border-radius:8px;overflow:hidden;">
  <iframe src="https://www.youtube.com/embed/VIDEO_ID" title="Forest focus sessions explainer video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe>
</div>
-->

## The experiment

I have used Forest since 2017. It is a focus app: when I sit down to study, I set a timer for 25 or 50 minutes and a small tree starts growing. If I leave the app to use my phone, the tree withers. Over nine years that adds up to a long, honest record of when I studied, what I studied, and how often I gave up halfway.

A friend messaged me about Claude's new motion and dashboard features, and this data felt like a fair test. It is real, it is mine, and it is not clean.

## The check before building

Before asking Claude to build anything, I had it profile the export: row counts, date ranges, tags, and whether the start and end times made sense together. That last check stopped everything.

| Start time | End time |
|---|---|
| Fri Apr 02 06:50 **2021** | Sun Apr 09 19:44 **2017** |
| Mon Jul 15 08:03 2019 | Tue **Jul 30** 11:16 2019 |
| Wed Sep 09 16:31 2026 | Wed **Sep 23** 15:19 2026 |

A Forest session lasts 25 or 50 minutes. In the export, some sessions ended four years before they started, and others ran for two weeks. Not one row out of 2,563 had a believable duration.

This matters because "hours of focus" is the first number anyone would put on a dashboard like this. The tools would have calculated it without complaint, and the chart would have looked fine.

## The decisions that followed

Once the column was ruled out, the rest were judgment calls, not technical ones.

- **Session counts instead of hours.** Every chart counts sessions. The dashboard says so on the page, so nobody reads a session as an hour.
- **The notes column was removed.** Some sessions had personal notes attached. I took that column out before the data went anywhere, not just off the screen.
- **Client names were merged away.** A few tags named the businesses I was doing project work for. I merged them into one tag called "Projects".
- **Untagged sessions stayed in the totals** but were left out of the topic charts, where 562 of them would only have added noise.

I also wrote the expected totals into the prompt, so the build could be checked against numbers I already trusted. This is the data section of the dashboard prompt, shortened:

```text
- The End Time column is corrupt. Do not use it. No durations or hours anywhere.
- Remove the Note column completely, before anything else. It must not appear
  on screen, in tooltips, or in any data stored in the page.
- Merge four project tags (names removed here) into one tag called "Projects".
- Before building, confirm these checks match the file: 2,563 sessions;
  2,038 successful; 525 failed; 1,019 active days; longest streak 25 days.
```

That is why the dashboard needed only one prompt. The prompt was short on design and long on data rules.

## What it built

The dashboard has a calendar with one cell per day for nine years, monthly totals, an hour-by-weekday heatmap, topics over time, and success rate by topic.

![The dashboard's headline numbers: 2,563 sessions, a 79.5% success rate, 1,019 active days, a 25-day longest streak, and 2020 as the busiest year](/images/forest-dashboard-overview.jpg)

![A calendar heatmap with one row per year from 2017 to 2026, showing heavy study periods in mid 2019, through 2020, and again in 2026](/images/forest-calendar.jpg)

One pattern I did not expect: sessions tagged as project work were completed **90%** of the time, while Python study sessions were completed **75%** of the time. Building something held my attention better than studying for it.

![Success rate by tag, with story telling, Projects and AI between 90% and 94%, and Python Programming near 75%](/images/forest-success-by-tag.jpg)

## Where the video struggled

The first video was a straightforward data story, and it came out well. For the second, I wanted an animated explainer of the method itself: a person at a desk, a phone put face down, a tree growing. The first illustration was flat and generic, and the in-tool edits did not fix it.

![The first attempt: a flat, simple illustration of a figure at a desk facing the viewer](/images/forest-motion-first-attempt.jpg)

So I stopped describing the picture and showed it instead. I used ChatGPT to create the scene I had in mind, then four or five more images of the same scene: picking up the phone, putting it down, and so on. I gave those images to Claude, and it animated them well.

![The reference image: a man seen from behind at a wooden desk with a laptop, books and a lamp, looking out of a window at hills and a town](/images/forest-motion-reference.jpg)

For visuals, a few reference images did more than any amount of prompt text.

## One thing that surprised me

When I shared the dashboard link on LinkedIn, several people told me it asked them to log in before they could see it. For a portfolio piece, that defeats the purpose. I asked Claude to turn the dashboard into a single standalone file, checked that the numbers still matched, and now host it on this site, where anyone can open it.

Hosting it myself raised one more question. Anyone can view a web page's source, so the data inside the page is public too. I checked that it holds only four fields per session (date, start hour, tag, and success) and nothing else.

## What I would tell another analyst

These tools are fast, and the output looks finished. That is exactly why the checks have to happen before the prompt, not after the chart.

1. **Profile before you prompt.** Row counts, date ranges, and whether related columns agree with each other.
2. **Distrust durations until you have checked them.** Start and end times are among the easiest fields to break in an export.
3. **Decide what is private before uploading,** and remember the data may travel with the page, not just appear on it.
4. **Write the expected totals into the prompt,** so you can check the build against numbers you already trust.
5. **For visuals, show rather than tell.** Reference images beat paragraphs of description.
6. **Check who can open the link** before you share it.

The building part is now fast. The checking part is still the analyst's job, and it still comes first.
