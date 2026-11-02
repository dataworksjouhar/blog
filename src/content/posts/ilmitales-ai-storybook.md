---
title: "My son said “Let's ask Gemini.” So I built a way to teach him what AI is."
description: "IlmiTales is a free, interactive storybook in English and Arabic that teaches children how AI works. Building it tested whether I understood AI well enough to explain it to a child, and whether what AI built for me was actually right."
date: 2026-11-01
category: "projects"
level: "beginner"
tags: ["ai", "claude-code", "learning", "data-analytics"]
tools: ["Learning design", "Claude Code", "Arabic RTL", "Web analytics"]
impact: "Two series, 13 chapters, English and Arabic, read in 20 countries"
demo: "https://ilmitales.com"
repo: "https://github.com/dataworksjouhar/ilmitales"
priority: 2
---

IlmiTales is a free, interactive storybook in English and Arabic that teaches children how AI works, through a story they follow and activities they do themselves. It has been used at home, in a summer camp classroom, and by readers in 20 countries.

## Why I built it

My children don't get much screen time, but they see me working with AI every day. One afternoon my wife asked my son a question about life, the kind no machine can really answer. He said we should ask Gemini.

That made me stop. We can tell children to use AI responsibly, but if they don't understand what it is, what it can and can't do, and why it gets things wrong, those words don't mean much to them.

I looked at what was already out there, including Code.org and Google's resources. All of it was good, but none of it taught AI the way children actually learn: through a story they follow and activities they do themselves. So I decided to build it myself.

I was learning AI myself at the same time: a focused session with the Microsoft team, webinars, weekend classes and a few paid courses, and later more structured courses from DataCamp and Anthropic. Building IlmiTales became the test of that learning. If I could explain how AI works to a child, in a way the child could follow and use, then I understood it myself, and anyone reading it could follow it too.

## What it is

IlmiTales follows Ali, a Kuwaiti boy travelling through Turkey, and Rafeeq, an AI companion who has read every story in the world but lived none of them.

Series 1, *Ali and the Story-Weaver*, has eight chapters on how AI learns: data, training, tokens, prompting, hallucination, bias and agents. Series 2, *Ali and the Longest Relay*, has five chapters on how machines learned to read, leading up to attention and transformers.

Every chapter is a story with activities inside it, where children train, test and fix small models themselves. It is free, needs no sign-up, works in English and Arabic, and gives a certificate to anyone who finishes a series.

I first used the material with my own children. After Series 1 launched, I also used it to [teach data and AI to a group of boys aged nine to twelve](/posts/what-teaching-children-taught-me/) at a summer camp in Kuwait.

<figure style="margin:28px auto;max-width:420px">
<img src="/images/ilmitales/english-activity.jpg" alt="The Feed the brain examples activity from Chapter 1: four cat cards above a brain that children drag them into" loading="lazy" />
<figcaption style="font-family:'JetBrains Mono',monospace;font-size:12px;color:#726657;margin-top:10px;text-align:center">Chapter 1: children drag cats into the brain and watch the pattern grow stronger.</figcaption>
</figure>

## Who did what

I learned the concepts from several courses, wrote the story, and decided what each chapter had to teach. I made the illustrations with Gemini and Kimi. Claude and I worked out the activity designs and the rules behind them, and Claude Code built them. I reviewed every chapter, and native readers and a translator checked the Arabic.

## From a concept to an activity

Explaining an idea to a child is one thing. Getting the child to understand it takes more, so every activity followed a small set of rules.

- **The child commits before getting feedback.** Each activity asks for a guess or a choice first, and feedback comes after.
- **Failing is part of the lesson.** Some activities are designed so the first attempt goes wrong, because that is when the idea lands.
- **No activity sits below its own answer.** If the story text above an activity already gives the answer away, the activity only tests whether the child read the paragraph. A word being named in the story is also not the same as it being explained. This rule came in partway through Series 2, and every activity after it was held to it.
- **No eyes.** Illustrations follow a respectful no-eyes style throughout, including emoji.

## How it was built

The work was split in two. Decisions happened in conversation with Claude: the story structure, what each activity should do, and what counted as finished. Building was done by Claude, and later by Claude Code, working on the actual files. Changes went to a review site first and moved to the live site only after I had been through them.

The site is plain HTML, CSS and JavaScript, hosted on Netlify's free tier, with the review copy on Cloudflare Pages. The code is public on GitHub.

## The Arabic version

Within the first three days, 18 people asked for an Arabic version. With AI, I could have translated all eight chapters in an afternoon. Doing it properly took weeks.

The translation went through three layers. First, a professional translator reviewed the key terms and expressions: which words were wrong, which ones nobody uses locally, and what a native reader would expect instead. Then AI translated the full eight chapters using that guidance. Finally, a Kuwaiti family and an Arabic teacher from Egypt read every chapter.

They still found mistakes. In Chapter 1, children feed a brain examples by dragging cats into it. AI translated "feed" as أطعم, the word for feeding someone a meal. In English, feeding stretches beyond food. In Arabic, it does not. The translator's guidance already had the right word, and AI had replaced it with its own choice.

<figure style="margin:28px auto;max-width:640px">
<img src="/images/ilmitales/arabic-before-correction.jpg" alt="The Chapter 1 activity in English and in the first Arabic version, where the title uses the word أطعم" loading="lazy" />
<figcaption style="font-family:'JetBrains Mono',monospace;font-size:12px;color:#726657;margin-top:10px;text-align:center">The first Arabic version, with أطعم in the activity title.</figcaption>
</figure>

<figure style="margin:28px auto;max-width:560px">
<img src="/images/ilmitales/reviewer-corrections.jpg" alt="A reviewer's message listing corrections chapter by chapter, starting with the Chapter 1 activity title" loading="lazy" />
<figcaption style="font-family:'JetBrains Mono',monospace;font-size:12px;color:#726657;margin-top:10px;text-align:center">One reviewer's notes, chapter by chapter.</figcaption>
</figure>

<figure style="margin:28px auto;max-width:420px">
<img src="/images/ilmitales/arabic-after-correction.jpg" alt="The same Arabic activity today, titled أعطِ عقلك أمثلة" loading="lazy" />
<figcaption style="font-family:'JetBrains Mono',monospace;font-size:12px;color:#726657;margin-top:10px;text-align:center">After review, the title reads أعطِ عقلك أمثلة (give your brain examples).</figcaption>
</figure>

Every wrong word looked fluent to me. The errors were visible only to people who know the language, which is the same reason any AI output needs someone who knows the field to check it.

The build needed the same care as the words. Pages run right to left, numbers use Arabic-Indic digits, and every page was checked so that no English word remained, including text generated by JavaScript. The token-chopper activity, which shows how AI breaks words into pieces, was rewritten for Arabic, because Arabic words carry prefixes and suffixes, such as ال and ات, that work differently from English.

One build problem also looked correct at first. A conversion script used temporary markers, and some of those markers matched characters inside the embedded image data. The images in three Arabic chapters were corrupted. One of the translators spotted it while reviewing the Arabic chapters. The fix was to replace the image data with byte-identical copies from the English files, then confirm that each image opened correctly.

## What the numbers showed

The readers are children, and schools use the site, so I chose analytics that use no cookies and do not track individual visitors. Google Analytics would have shown more, but children's data was not something I wanted to collect.

- **First three days:** 244 readers in 9 countries.
- **By the Series 2 launch:** 800+ readers.
- **By October:** readers in 20 countries.

<figure style="margin:28px auto;max-width:640px">
<img src="/images/ilmitales/day3-map.jpg" alt="World map with countries highlighted where IlmiTales was read in its first three days" loading="lazy" />
<figcaption style="font-family:'JetBrains Mono',monospace;font-size:12px;color:#726657;margin-top:10px;text-align:center">Readers in the first three days.</figcaption>
</figure>

The most useful report was exit pages. Chapter 1 and Chapter 8 had almost the same exit rate, a little over half. On Chapter 1, readers were leaving at the start of the story. On Chapter 8, they had finished the series and closed the tab. The same number had opposite meanings, and only knowing the product told them apart. For Chapter 1, I moved the Next Chapter button to where readers finish the page and added a progress bar showing how far through the series they were.

The data also taught me what to set up from the first day next time: keep my own testing out of the reader numbers, give each page one address so its visits are not split in two, and record a baseline when making a change, so I can tell whether it worked.

## Links

- Live site: [ilmitales.com](https://ilmitales.com) (English) and [ilmitales.com/ar](https://ilmitales.com/ar/) (Arabic)
- Code: [github.com/dataworksjouhar/ilmitales](https://github.com/dataworksjouhar/ilmitales)
