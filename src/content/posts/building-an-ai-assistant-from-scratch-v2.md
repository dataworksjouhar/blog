---
title: "Building an AI Assistant From Scratch, No Cloud Required"
description: "I had built AI agents in Copilot Studio without ever seeing what was underneath. So I rebuilt one from scratch on a basic laptop, with no cloud and no graphics card."
date: 2026-08-26
category: "notes"
level: "beginner"
tags: ["ai", "automation"]
featured: false
---

I was talking to someone about the AI agents I had built in Microsoft Copilot Studio. They asked a simple question. They do not use Copilot Studio. They have no cloud infrastructure. But they do have their own data. Could I still build an AI solution for them?

I said yes. I knew the theory well enough to explain how it would work.

Then I actually built it, and learned more in a week than the theory had taught me in a year.

The biggest realisation came early. Copilot Studio is a visual way to configure things I could configure in code: instructions, knowledge sources, topics, actions. It is not doing anything magic. It is doing specific, nameable things, and hiding them behind a clean interface. Once I understood what those things were, the interface stopped being a black box and started being a shortcut.

This post is what those things actually are, explained the way I wish someone had explained them to me.

## First, what "no cloud" really rules out

Less than most people assume.

It does not rule out AI. It rules out one delivery route. The real question is not cloud or no cloud. It is **where the model runs**.

Every AI product you have used sends your text to a company's servers, where their model reads it and sends a reply back. That round trip is the thing a bank, a hospital, or a government department often cannot allow.

But the round trip is a business arrangement, not a law of physics. The model is a file. Put the file on your own machine and there is no round trip at all.

## The private office

Here is the picture that made everything click for me.

Imagine a small private office inside your building. Nobody outside ever sees it or hears what is said in it. You hire exactly two employees.

**A Filing Clerk.** Slow, quiet, works in the back room, never speaks to visitors. Her only job is to read every document once and file it in a very particular way.

**An Explainer.** Fast, well spoken, sits at the front desk. He is excellent at reading a page and turning it into a clear answer. But he has never read a single one of your documents. He knows nothing about your policies.

Neither can do the other's job. The Clerk cannot hold a conversation. The Explainer cannot find anything. Together, they can answer questions about your documents.

That is the whole system. Everything else is the filing cabinet and the house rules.

## The Explainer is a file you download

The Explainer is a **large language model**, or LLM. It is not a service you connect to. It is a file sitting on a disk, a few gigabytes of numbers, that a program loads into memory and runs.

I used **Qwen**, an open-weight model published free for anyone to download. I picked it for four practical reasons: it is small enough to run on a laptop CPU with no graphics card, the licence allows commercial use, it handles Arabic as well as English, and swapping it for a different model later is a one line change.

To run it I used **Ollama**, which is not a model at all. Ollama is the office building. It is a program you install that loads model files and lets other programs talk to them over a local address.

The test that settles every security conversation takes ten seconds: download the model, unplug the internet, ask a question. It still answers. Nothing that works with the network cable pulled out is sending your data anywhere.

## The four words worth actually understanding

**A chunk** is a small piece of a document, roughly 500 words. You cut documents up because a whole 20 page policy is too much for one search entry. Squeeze twenty topics into one and you get a vague average that matches nothing well. Small pieces stay sharp, and they let you cite an exact page.

**An embedding** is a list of numbers that represents meaning. Mine were 768 numbers per chunk. Think of it as a GPS coordinate, but for meaning instead of location. Text about similar topics gets coordinates close together. This is what lets a search for "how do I clean my hands" find a document that says "hand hygiene protocol," even though not a single word matches. Keyword search fails there. Coordinate search does not.

**Retrieval** is the search step: turn the question into its own coordinate, then find the three or four chunks sitting closest to it.

**RAG** is the name for the whole pattern, Retrieval Augmented Generation. Retrieve the right chunks. Augment the prompt by pasting them in. Generate an answer from them. That is it. It sounded intimidating before I built it. It is two employees and a filing cabinet.

<svg viewBox="0 0 720 470" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;margin:26px 0;font-family:'Hanken Grotesk',system-ui,sans-serif;">
  <rect x="0" y="0" width="720" height="470" fill="#f4ece0"/>
  <rect x="16" y="16" width="688" height="180" rx="10" fill="#ffffff" stroke="#d8cbb6" stroke-width="1.5"/>
  <text x="36" y="46" font-size="16" font-weight="700" fill="#0e4d80" font-family="Fraunces,Georgia,serif">Filing: happens once</text>
  <text x="36" y="66" font-size="12" fill="#726657">Slow back office work. Run again only when documents change.</text>
  <rect x="36" y="88" width="112" height="58" rx="8" fill="#dcedf8" stroke="#1c6fb0" stroke-width="1.5"/>
  <text x="92" y="112" font-size="12.5" fill="#201914" text-anchor="middle">PDF</text>
  <text x="92" y="130" font-size="12.5" fill="#201914" text-anchor="middle">documents</text>
  <path d="M156 117 L188 117" stroke="#726657" stroke-width="1.5" marker-end="url(#a)"/>
  <rect x="196" y="88" width="112" height="58" rx="8" fill="#dcedf8" stroke="#1c6fb0" stroke-width="1.5"/>
  <text x="252" y="112" font-size="12.5" fill="#201914" text-anchor="middle">Cut into</text>
  <text x="252" y="130" font-size="12.5" fill="#201914" text-anchor="middle">chunks</text>
  <path d="M316 117 L348 117" stroke="#726657" stroke-width="1.5" marker-end="url(#a)"/>
  <rect x="356" y="88" width="122" height="58" rx="8" fill="#f4ece0" stroke="#3f7d54" stroke-width="2"/>
  <text x="417" y="106" font-size="11" fill="#3f7d54" text-anchor="middle" font-family="'JetBrains Mono',monospace">THE CLERK</text>
  <text x="417" y="126" font-size="12.5" fill="#201914" text-anchor="middle">Embedding</text>
  <text x="417" y="140" font-size="12.5" fill="#201914" text-anchor="middle">model</text>
  <path d="M486 117 L518 117" stroke="#726657" stroke-width="1.5" marker-end="url(#a)"/>
  <rect x="526" y="88" width="158" height="58" rx="8" fill="#dcedf8" stroke="#1c6fb0" stroke-width="1.5"/>
  <text x="605" y="112" font-size="12.5" fill="#201914" text-anchor="middle">Filing cabinet</text>
  <text x="605" y="130" font-size="12.5" fill="#201914" text-anchor="middle">(vector database)</text>
  <text x="36" y="176" font-size="11.5" fill="#726657" font-style="italic">Each chunk is stored with its meaning coordinates, its source file, and its page number.</text>
  <rect x="16" y="212" width="688" height="242" rx="10" fill="#ffffff" stroke="#d8cbb6" stroke-width="1.5"/>
  <text x="36" y="242" font-size="16" font-weight="700" fill="#c8623b" font-family="Fraunces,Georgia,serif">Answering: happens every time</text>
  <text x="36" y="262" font-size="12" fill="#726657">Fast front desk work. Runs fresh for every single question.</text>
  <rect x="36" y="284" width="112" height="52" rx="8" fill="#f4ece0" stroke="#c8623b" stroke-width="1.5"/>
  <text x="92" y="315" font-size="12.5" fill="#201914" text-anchor="middle">Question</text>
  <path d="M156 310 L188 310" stroke="#726657" stroke-width="1.5" marker-end="url(#a)"/>
  <rect x="196" y="284" width="122" height="52" rx="8" fill="#f4ece0" stroke="#3f7d54" stroke-width="2"/>
  <text x="257" y="302" font-size="11" fill="#3f7d54" text-anchor="middle" font-family="'JetBrains Mono',monospace">THE CLERK</text>
  <text x="257" y="322" font-size="12.5" fill="#201914" text-anchor="middle">Same model again</text>
  <path d="M326 310 L358 310" stroke="#726657" stroke-width="1.5" marker-end="url(#a)"/>
  <rect x="366" y="284" width="130" height="52" rx="8" fill="#dcedf8" stroke="#1c6fb0" stroke-width="1.5"/>
  <text x="431" y="306" font-size="12.5" fill="#201914" text-anchor="middle">Find closest</text>
  <text x="431" y="322" font-size="12.5" fill="#201914" text-anchor="middle">3 to 5 chunks</text>
  <path d="M431 344 L431 372" stroke="#726657" stroke-width="1.5" marker-end="url(#a)"/>
  <rect x="330" y="380" width="202" height="52" rx="8" fill="#f4ece0" stroke="#c8623b" stroke-width="2"/>
  <text x="431" y="398" font-size="11" fill="#c8623b" text-anchor="middle" font-family="'JetBrains Mono',monospace">THE EXPLAINER</text>
  <text x="431" y="418" font-size="12.5" fill="#201914" text-anchor="middle">LLM, plus the house rule</text>
  <path d="M330 406 L298 406" stroke="#726657" stroke-width="1.5" marker-end="url(#a)"/>
  <rect x="130" y="380" width="160" height="52" rx="8" fill="#dcedf8" stroke="#1c6fb0" stroke-width="1.5"/>
  <text x="210" y="402" font-size="12.5" fill="#201914" text-anchor="middle">Answer, with</text>
  <text x="210" y="418" font-size="12.5" fill="#201914" text-anchor="middle">file and page cited</text>
  <defs>
    <marker id="a" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0 0 L8 4 L0 8 z" fill="#726657"/>
    </marker>
  </defs>
</svg>

## The house rule that makes it trustworthy

The Explainer is fluent, and fluent people sometimes fill gaps rather than admit they do not know. That is the real risk in this design, bigger than any privacy concern.

So he gets one instruction, attached to every question:

> Answer using only the pages in front of you. If the answer is not there, say "I could not find this in the available documents." Never guess.

I tested this by asking about a policy that existed in none of my documents. It refused, correctly, instead of inventing something plausible. That refusal is the most important thing the system does. A tool that confidently makes things up is worse than no tool at all.

## What Copilot Studio was doing all along

This is the part that reframed everything for me. Every box in that interface maps to something specific underneath.

| In Copilot Studio | What it actually is |
|---|---|
| Knowledge sources | Chunking, embedding, vector storage |
| Instructions | The system prompt |
| Topics | Routing logic |
| Actions and Power Automate flows | Function calling |
| The model behind it | The LLM itself |
| Publish to Teams | Your own frontend |
| Sign in | Your own authentication layer |

Copilot Studio is not doing something you cannot do. It is assembling these pieces for you, connecting them to Microsoft's cloud, and giving you a clean interface over the top. That is real value when the cloud is available. When it is not, you assemble the same pieces yourself.

Knowing this changed how I use the no-code tool too. I stopped guessing why an agent behaved strangely and started asking which underlying piece was misbehaving.

## Three things that surprised me

**The model was the easy part.** Almost every quality problem traced back to the documents or the chunking, not the LLM. A PDF exported from a dashboard extracts as scattered numbers with no grammar, and no model can rescue that. The skills that mattered most were the ones I already had from years of data work: knowing whether source data is fit for purpose.

**Refusing well matters more than answering well.** Anyone can demo a correct answer. The trustworthy behaviour is admitting ignorance, and it has to be designed in deliberately.

**Slow is often fine.** On my laptop, answers took several seconds. That is a poor experience next to a cloud service, and a perfectly good one next to no AI at all.

## Build it yourself

The whole thing runs on a normal laptop. No graphics card, no cloud account, no API key, no cost.

The complete project is on GitHub, with the documents, the code, and setup instructions: **[github.com/dataworksjouhar/learnedge-assistant](https://github.com/dataworksjouhar/learnedge-assistant)**

The core of it, ingestion and the API, is a little over 200 lines of Python. That number surprised me more than anything else.

## Next in this series

This post was the tidy version. The real build was messier, and the mess is where the interesting parts are.

In Part 2 I will cover what happened when I stress tested it: the real numbers from running an LLM on a weak CPU, and a retrieval bug that produced a completely correct looking answer while quietly failing underneath, which I only caught by checking the numbers behind the answer instead of the answer itself.
