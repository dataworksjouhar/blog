---
title: "What nine years of focus data says about how I learn"
description: "I gave 2,563 focus sessions from 2017 to 2026 to Claude and got back a live dashboard and a video. The data showed me something I hadn't noticed about how I learn."
impact: "Nine years of study habits, 2,563 sessions, one live dashboard"
tools: ["Claude", "ChatGPT", "d3.js"]
demo: "https://mohammedjouhar.com/forest/"
date: 2026-10-22
category: "projects"
level: "intermediate"
tags: ["ai", "python", "learning", "data-quality", "claude"]
featured: false
thumbnail: "/images/forest-calendar.jpg"
---

I didn't realize I'd been studying Python, on and off, for nine years until I saw it on a dashboard.

The data came from Forest, a focus app I've used since 2017, and the dashboard was built by Claude from my export. I expected a quick experiment with a new AI feature, but what I got back was a fairly honest picture of how I've learned over the last nine years, including the years I didn't.

[**Open the live dashboard**](/forest/) (interactive, no login)

<!-- VIDEO: replace VIDEO_ID with the YouTube id once the explainer video is uploaded, then remove this comment's markers.
<div style="position:relative;padding-bottom:100%;height:0;margin:26px 0;border-radius:8px;overflow:hidden;">
  <iframe src="https://www.youtube.com/embed/VIDEO_ID" title="Forest focus sessions explainer video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe>
</div>
-->

## Why I started using Forest

I get distracted easily, especially when I'm studying. So I started using the Pomodoro technique, where you work on one task for a fixed block of time, and Forest turns that into something simple. I set a timer for 25 or 50 minutes and a small tree starts growing, and if I leave the app to pick up my phone, the tree withers. It helped me focus on one thing at a time, and I just loved it.

Nine years later that adds up to 2,563 sessions, and 79.5% of them ended with the tree still standing.

![A calendar heatmap with one row per year from 2017 to 2026, showing heavy study periods in mid 2019, through 2020, and again in 2026, with 2023 almost empty](/images/forest-calendar.jpg)

## Four chapters in the data

**2017 and 2018: the start.** Python and business analytics were my top topics from the very first year, and they stayed near the top almost every year after that.

**2019 and 2020: the certification years.** In 2019 I was doing a data analytics certification, and the sessions here are the practice I did outside the classes. That year has my longest streak, 25 days in a row from July into August, and September 2019 is still my busiest month, with 186 sessions. Then 2020 went even further and became my busiest year, with 619 sessions.

**The quiet years.** After that I moved to Kuwait, and my work changed with it. It became more about data migration, business analysis, and working with people, and less about writing code. I built VBA automations here and there, and for the last couple of years we mostly worked in SQL. Python dropped away almost completely, and in 2023 I logged only 23 sessions in the whole year.

**2026: back to it.** This year I'm back to 382 sessions so far, and the reason is AI. A lot of what AI builds runs on Python behind the scenes, so if AI is writing the code, I at least need to understand how it works well enough to check it.

## The pattern I didn't expect

Python was my top topic in nine of the ten years. Honestly, I didn't realize I'd been in touch with it for that long. I wouldn't call myself a Python expert though. I used it heavily in 2019 and 2020, barely touched it for a few years, and now I'm learning it again. I understand how it works, and I'm still learning it.

The success rates added another layer. Sessions tagged as project work were completed 90% of the time, while Python study sessions were completed 75% of the time. It looks like building something held my attention better than studying for it.

![Success rate by tag, with story telling, Projects and AI between 90% and 94%, and Python Programming near 75%](/images/forest-success-by-tag.jpg)

## How the dashboard and video were made

A friend messaged me about Claude's new motion video and dashboard features, so I tried them on this data. The dashboard took one prompt and the video took three to four, but a data check came before both. The export's end-time column was wrong in every single row, and some sessions had "ended" years before they started. If I'd built straight from it, the dashboard would have shown my focus hours very confidently and every one of those numbers would have been wrong. So I used session counts instead, removed my personal notes, and merged the tags that named clients into one tag called Projects.

The video needed a different kind of fix. The first illustration was flat and generic, and the edit options didn't improve it.

![The first attempt: a flat, simple illustration of a figure at a desk facing the viewer](/images/forest-motion-first-attempt.jpg)

So I stopped describing what I wanted and used ChatGPT to create the scene instead, and then four or five more images of the same scene: picking up the phone, putting it down, and so on. I gave those images to Claude and it animated them really well. For visuals, a few reference images did more than any amount of prompt text.

![The reference image: a man seen from behind at a wooden desk with a laptop, books and a lamp, looking out of a window at hills and a town](/images/forest-motion-reference.jpg)

The last surprise came after I shared it on LinkedIn. Several people told me the dashboard link asked them to log in, which defeats the purpose of a portfolio piece. So I asked Claude to turn it into a single standalone file, and now it's hosted here on my site where anyone can open it. Before putting it up, I checked that the data inside the page holds only four things per session: the date, the start hour, the tag, and whether it succeeded.

## Still learning

Nine years in, I'm still learning Python, and it's still a continuous process. What has changed is the reason. AI can write the code now, so I want my foundation strong enough to check and understand what it writes.
