---
title: "Classification vs Clustering, in one simple test"
description: "The single question that tells you whether a problem is classification or clustering — a common exam trap, made easy."
date: 2026-06-22
category: "notes"
level: "beginner"
tags: ["ai", "machine-learning", "fundamentals"]
---

A lot of people mix up **classification** and **clustering**, and exams love to
test exactly that confusion. Here's the one question that settles it every time.

## The test

> Does your training data already have the answers (labels)?

- **Yes →** it's **classification**. You're sorting things into categories that
  already exist. *Is this email spam or not? Is this review positive or negative?*
- **No, and you're discovering the groups yourself →** it's **clustering**.
  *Which customers naturally group together? What segments exist in this data?*

## The trap

If coffee samples were each scored 1–5 by an expert, those scores **are labels** —
so predicting them is classification, not clustering. The presence of labels is
the whole story.

## Quick recap

| You have... | It's... |
| --- | --- |
| Labelled data, known categories | Classification |
| Unlabelled data, finding groups | Clustering |

That's it. One question, no more mix-ups.
