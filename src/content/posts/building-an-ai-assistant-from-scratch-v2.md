---
title: "What is actually inside a Copilot Studio agent"
description: "I built AI agents in Copilot Studio without ever seeing what was underneath. So I took one apart, piece by piece, to understand what each box in that interface really does."
date: 2026-08-20
category: "notes"
level: "beginner"
tags: ["ai", "copilot-studio"]
featured: false
---

I built AI agents in Microsoft Copilot Studio for a while. They worked,
and people used them. But four things kept bothering me, and I could
never quite explain any of them.

I could not control how my documents were split up before the agent
searched them. I could not see why it gave the answer it gave. When it
chose a passage, I could not tell why it picked that one when a clearer
passage was sitting right there in the same documents. And none of it
could run anywhere except Microsoft's cloud.

For a long time that did not matter much. Then someone asked me a simple
question.

They did not use Copilot Studio. They had no cloud infrastructure at all.
But they had their own documents, and they wanted to know whether I could
still build them an AI assistant.

I said yes. Then I realised I could not honestly explain what I would be
building, because I had never seen underneath the interface I had been
using.

So I went and found out.

## Every box in that interface is a real thing

The first surprise was that nothing in Copilot Studio is mysterious. Each
part of the interface stands for something specific, and once you can
name it, you can understand it.

<div style="margin:10px 0 28px">
<svg viewBox="0 0 680 430" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="What Copilot Studio shows compared with what runs underneath" width="680" style="max-width:100%;height:auto;display:block">
<rect x="0.5" y="0.5" width="679" height="429" rx="14" fill="#faf6ee" stroke="#e7dccb"/>
<text x="32" y="42" font-family="Fraunces, Georgia, 'DejaVu Serif', serif" font-size="17" font-weight="600" fill="#201914" text-anchor="start">In Copilot Studio</text>
<text x="318" y="42" font-family="Fraunces, Georgia, 'DejaVu Serif', serif" font-size="17" font-weight="600" fill="#201914" text-anchor="start">What is actually running</text>
<rect x="24" y="60" width="226" height="346" rx="12" fill="#ffffff" stroke="#ddd0ba" stroke-width="1"/>
<rect x="42" y="94" width="190" height="44" rx="8" fill="#faf6ee" stroke="#ddd0ba" stroke-width="1"/>
<text x="58" y="123" font-family="'Hanken Grotesk', system-ui, 'DejaVu Sans', sans-serif" font-size="15" font-weight="600" fill="#201914" text-anchor="start">Knowledge sources</text>
<rect x="42" y="214" width="190" height="44" rx="8" fill="#faf6ee" stroke="#ddd0ba" stroke-width="1"/>
<text x="58" y="243" font-family="'Hanken Grotesk', system-ui, 'DejaVu Sans', sans-serif" font-size="15" font-weight="600" fill="#201914" text-anchor="start">Instructions</text>
<rect x="42" y="326" width="190" height="44" rx="8" fill="#faf6ee" stroke="#ddd0ba" stroke-width="1"/>
<text x="58" y="355" font-family="'Hanken Grotesk', system-ui, 'DejaVu Sans', sans-serif" font-size="15" font-weight="600" fill="#201914" text-anchor="start">The model</text>
<rect x="318" y="90" width="104" height="56" rx="8" fill="#faf6ee" stroke="#1c6fb0" stroke-width="1.3"/>
<text x="370" y="112" font-family="'Hanken Grotesk', system-ui, 'DejaVu Sans', sans-serif" font-size="14" font-weight="600" fill="#0e4d80" text-anchor="middle">Cut into</text>
<text x="370" y="130" font-family="'Hanken Grotesk', system-ui, 'DejaVu Sans', sans-serif" font-size="14" font-weight="600" fill="#0e4d80" text-anchor="middle">pieces</text>
<rect x="438" y="90" width="104" height="56" rx="8" fill="#faf6ee" stroke="#1c6fb0" stroke-width="1.3"/>
<text x="490" y="112" font-family="'Hanken Grotesk', system-ui, 'DejaVu Sans', sans-serif" font-size="14" font-weight="600" fill="#0e4d80" text-anchor="middle">Meaning as</text>
<text x="490" y="130" font-family="'Hanken Grotesk', system-ui, 'DejaVu Sans', sans-serif" font-size="14" font-weight="600" fill="#0e4d80" text-anchor="middle">numbers</text>
<rect x="558" y="90" width="104" height="56" rx="8" fill="#faf6ee" stroke="#1c6fb0" stroke-width="1.3"/>
<text x="610" y="112" font-family="'Hanken Grotesk', system-ui, 'DejaVu Sans', sans-serif" font-size="14" font-weight="600" fill="#0e4d80" text-anchor="middle">Stored to</text>
<text x="610" y="130" font-family="'Hanken Grotesk', system-ui, 'DejaVu Sans', sans-serif" font-size="14" font-weight="600" fill="#0e4d80" text-anchor="middle">search</text>
<line x1="422" y1="118" x2="432" y2="118" stroke="#1c6fb0" stroke-width="1.4"/><path d="M 431 114 L 438 118 L 431 122" fill="none" stroke="#1c6fb0" stroke-width="1.4"/>
<line x1="542" y1="118" x2="552" y2="118" stroke="#1c6fb0" stroke-width="1.4"/><path d="M 551 114 L 558 118 L 551 122" fill="none" stroke="#1c6fb0" stroke-width="1.4"/>
<rect x="318" y="210" width="344" height="56" rx="8" fill="#faf6ee" stroke="#1c6fb0" stroke-width="1.3"/>
<text x="490" y="233" font-family="'Hanken Grotesk', system-ui, 'DejaVu Sans', sans-serif" font-size="14" font-weight="600" fill="#0e4d80" text-anchor="middle">A block of text added</text>
<text x="490" y="251" font-family="'Hanken Grotesk', system-ui, 'DejaVu Sans', sans-serif" font-size="14" font-weight="600" fill="#0e4d80" text-anchor="middle">to every single question</text>
<rect x="318" y="322" width="344" height="56" rx="8" fill="#faf6ee" stroke="#1c6fb0" stroke-width="1.3"/>
<text x="490" y="345" font-family="'Hanken Grotesk', system-ui, 'DejaVu Sans', sans-serif" font-size="14" font-weight="600" fill="#0e4d80" text-anchor="middle">A file of numbers on a disk,</text>
<text x="490" y="363" font-family="'Hanken Grotesk', system-ui, 'DejaVu Sans', sans-serif" font-size="14" font-weight="600" fill="#0e4d80" text-anchor="middle">the language model itself</text>
<line x1="232" y1="118" x2="318" y2="118" stroke="#ddd0ba" stroke-width="1.2" stroke-dasharray="3 4"/>
<line x1="232" y1="238" x2="318" y2="238" stroke="#ddd0ba" stroke-width="1.2" stroke-dasharray="3 4"/>
<line x1="232" y1="350" x2="318" y2="350" stroke="#ddd0ba" stroke-width="1.2" stroke-dasharray="3 4"/>
</svg>
</div>

| In Copilot Studio | What it does | Technical term |
| --- | --- | --- |
| Knowledge sources | Cuts your documents into pieces, turns each piece into numbers that represent its meaning, and stores them so they can be searched | Chunking, embeddings, vector database |
| Instructions | A block of text quietly added to every question | System prompt |
| Topics | Decides which path a question should take | Routing, intent detection |
| Actions and Power Automate flows | Lets the model ask your own code to go and do something | Function calling, tool use |
| The model behind it | The part that reads and writes, a file of numbers | Large language model (LLM) |
| Publish to Teams | Where people actually type their questions | Frontend, channel |
| Sign in | Checks who is asking | Authentication |

Copilot Studio assembles these for you and connects them to Microsoft's
cloud. That is real value, and for most people it is the right trade. But
it also means every one of my four frustrations was hiding inside one of
those rows.

The rest of this post is about the first row, knowledge sources, because
that is where three of the four were.

## Two employees in a private office

The picture that made it click for me is a small private office inside
your own building. Nobody outside sees it. You hire exactly two people.

**A Filing Clerk.** She works quietly in the back room and never speaks
to visitors. Her only job is to read every document once and file it in a
particular way.

**An Explainer.** He sits at the front desk and is excellent at reading a
page and turning it into a clear answer. But he has never read a single
one of your documents. On his own, he knows nothing about your policies.

Neither can do the other's job. The Clerk cannot hold a conversation, and
the Explainer cannot find anything. Together they can answer questions
about your documents.

That is the whole system. What follows is how the Clerk files things, and
how the two of them work together.

## Chunk: cutting the documents into pieces

Before the Clerk can file anything, the documents have to be cut into
smaller pieces. Each piece is called a chunk.

<div style="margin:10px 0 28px">
<svg viewBox="0 0 680 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="One document cut into smaller pieces, one topic each" width="680" style="max-width:100%;height:auto;display:block">
<rect x="0.5" y="0.5" width="679" height="319" rx="14" fill="#faf6ee" stroke="#e7dccb"/>
<text x="32" y="42" font-family="Fraunces, Georgia, 'DejaVu Serif', serif" font-size="17" font-weight="600" fill="#201914" text-anchor="start">Cutting a document into pieces</text>
<rect x="40" y="64" width="170" height="230" rx="8" fill="#ffffff" stroke="#ddd0ba" stroke-width="1"/>
<text x="56" y="88" font-family="'Hanken Grotesk', system-ui, 'DejaVu Sans', sans-serif" font-size="13.5" font-weight="600" fill="#726657" text-anchor="start">Staff leave policy</text>
<rect x="56" y="104" width="130" height="5" rx="2.5" fill="#ddd0ba"/>
<rect x="56" y="116" width="130" height="5" rx="2.5" fill="#ddd0ba"/>
<rect x="56" y="128" width="130" height="5" rx="2.5" fill="#ddd0ba"/>
<rect x="56" y="140" width="88" height="5" rx="2.5" fill="#ddd0ba"/>
<rect x="56" y="170" width="130" height="5" rx="2.5" fill="#ddd0ba"/>
<rect x="56" y="182" width="130" height="5" rx="2.5" fill="#ddd0ba"/>
<rect x="56" y="194" width="130" height="5" rx="2.5" fill="#ddd0ba"/>
<rect x="56" y="206" width="88" height="5" rx="2.5" fill="#ddd0ba"/>
<rect x="56" y="236" width="130" height="5" rx="2.5" fill="#ddd0ba"/>
<rect x="56" y="248" width="130" height="5" rx="2.5" fill="#ddd0ba"/>
<rect x="56" y="260" width="88" height="5" rx="2.5" fill="#ddd0ba"/>
<path d="M 216 104 L 222 104 L 222 145 L 216 145" fill="none" stroke="#1c6fb0" stroke-width="1.4"/>
<path d="M 216 170 L 222 170 L 222 211 L 216 211" fill="none" stroke="#1c6fb0" stroke-width="1.4"/>
<path d="M 216 236 L 222 236 L 222 265 L 216 265" fill="none" stroke="#1c6fb0" stroke-width="1.4"/>
<line x1="222" y1="124.5" x2="400" y2="118" stroke="#ddd0ba" stroke-width="1.2" stroke-dasharray="3 4"/>
<rect x="400" y="92" width="240" height="52" rx="8" fill="#faf6ee" stroke="#1c6fb0" stroke-width="1.3"/>
<text x="418" y="114" font-family="'Hanken Grotesk', system-ui, 'DejaVu Sans', sans-serif" font-size="15" font-weight="600" fill="#0e4d80" text-anchor="start">Sick leave</text>
<rect x="418" y="123" width="160" height="4" rx="2" fill="#ddd0ba"/>
<rect x="418" y="132" width="110" height="4" rx="2" fill="#ddd0ba"/>
<line x1="222" y1="190.5" x2="400" y2="190" stroke="#ddd0ba" stroke-width="1.2" stroke-dasharray="3 4"/>
<rect x="400" y="164" width="240" height="52" rx="8" fill="#faf6ee" stroke="#1c6fb0" stroke-width="1.3"/>
<text x="418" y="186" font-family="'Hanken Grotesk', system-ui, 'DejaVu Sans', sans-serif" font-size="15" font-weight="600" fill="#0e4d80" text-anchor="start">Annual leave</text>
<rect x="418" y="195" width="160" height="4" rx="2" fill="#ddd0ba"/>
<rect x="418" y="204" width="110" height="4" rx="2" fill="#ddd0ba"/>
<line x1="222" y1="250.5" x2="400" y2="262" stroke="#ddd0ba" stroke-width="1.2" stroke-dasharray="3 4"/>
<rect x="400" y="236" width="240" height="52" rx="8" fill="#faf6ee" stroke="#1c6fb0" stroke-width="1.3"/>
<text x="418" y="258" font-family="'Hanken Grotesk', system-ui, 'DejaVu Sans', sans-serif" font-size="15" font-weight="600" fill="#0e4d80" text-anchor="start">Leave for study</text>
<rect x="418" y="267" width="160" height="4" rx="2" fill="#ddd0ba"/>
<rect x="418" y="276" width="110" height="4" rx="2" fill="#ddd0ba"/>
</svg>
</div>

You cut them up because a whole policy is too much for one search entry.
Squeeze twenty topics into one entry and you get a vague average that
matches nothing well. Small pieces, one topic each, stay sharp, and they
let you point to the exact place an answer came from.

But the size matters in both directions. Cut too large and unrelated
topics blur together. Cut too small and a piece loses the context that
gave it meaning, so a sentence ends up on its own without the paragraph
that explained it.

This was my first frustration. In Copilot Studio I could not find a way
to decide where those cuts happened, and they decide a great deal about
what the agent can later find.

## Embedding: giving every piece a position

Next the Clerk turns each piece into a long list of numbers. That list is
called an embedding, and it represents what the piece means.

The easiest way to think about it is a map. The numbers work like
coordinates, except they describe meaning instead of location. Pieces
about similar topics end up close together. Pieces about different topics
end up far apart.

<div style="margin:10px 0 28px">
<svg viewBox="0 0 680 390" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Pieces of text placed on a map so similar meanings sit close together" width="680" style="max-width:100%;height:auto;display:block">
<rect x="0.5" y="0.5" width="679" height="389" rx="14" fill="#faf6ee" stroke="#e7dccb"/>
<text x="32" y="42" font-family="Fraunces, Georgia, 'DejaVu Serif', serif" font-size="17" font-weight="600" fill="#201914" text-anchor="start">Every piece gets a position by meaning</text>
<line x1="32" y1="64" x2="32" y2="364" stroke="#e7dccb" stroke-width="1"/>
<line x1="80" y1="64" x2="80" y2="364" stroke="#e7dccb" stroke-width="1"/>
<line x1="128" y1="64" x2="128" y2="364" stroke="#e7dccb" stroke-width="1"/>
<line x1="176" y1="64" x2="176" y2="364" stroke="#e7dccb" stroke-width="1"/>
<line x1="224" y1="64" x2="224" y2="364" stroke="#e7dccb" stroke-width="1"/>
<line x1="272" y1="64" x2="272" y2="364" stroke="#e7dccb" stroke-width="1"/>
<line x1="320" y1="64" x2="320" y2="364" stroke="#e7dccb" stroke-width="1"/>
<line x1="368" y1="64" x2="368" y2="364" stroke="#e7dccb" stroke-width="1"/>
<line x1="416" y1="64" x2="416" y2="364" stroke="#e7dccb" stroke-width="1"/>
<line x1="464" y1="64" x2="464" y2="364" stroke="#e7dccb" stroke-width="1"/>
<line x1="512" y1="64" x2="512" y2="364" stroke="#e7dccb" stroke-width="1"/>
<line x1="560" y1="64" x2="560" y2="364" stroke="#e7dccb" stroke-width="1"/>
<line x1="608" y1="64" x2="608" y2="364" stroke="#e7dccb" stroke-width="1"/>
<line x1="32" y1="64" x2="648" y2="64" stroke="#e7dccb" stroke-width="1"/>
<line x1="32" y1="112" x2="648" y2="112" stroke="#e7dccb" stroke-width="1"/>
<line x1="32" y1="160" x2="648" y2="160" stroke="#e7dccb" stroke-width="1"/>
<line x1="32" y1="208" x2="648" y2="208" stroke="#e7dccb" stroke-width="1"/>
<line x1="32" y1="256" x2="648" y2="256" stroke="#e7dccb" stroke-width="1"/>
<line x1="32" y1="304" x2="648" y2="304" stroke="#e7dccb" stroke-width="1"/>
<line x1="32" y1="352" x2="648" y2="352" stroke="#e7dccb" stroke-width="1"/>
<ellipse cx="170" cy="168" rx="112" ry="66" fill="#dcedf8" opacity=".6"/>
<text x="170" y="122" font-family="'Hanken Grotesk', system-ui, 'DejaVu Sans', sans-serif" font-size="14" font-weight="600" fill="#726657" text-anchor="middle">Leave</text>
<circle cx="128" cy="160" r="5.5" fill="#1c6fb0"/>
<text x="140" y="165" font-family="'Hanken Grotesk', system-ui, 'DejaVu Sans', sans-serif" font-size="14.5" font-weight="400" fill="#201914" text-anchor="start">Sick leave</text>
<circle cx="178" cy="190" r="5.5" fill="#1c6fb0"/>
<text x="190" y="195" font-family="'Hanken Grotesk', system-ui, 'DejaVu Sans', sans-serif" font-size="14.5" font-weight="400" fill="#201914" text-anchor="start">Annual leave</text>
<circle cx="122" cy="214" r="5.5" fill="#1c6fb0"/>
<text x="134" y="219" font-family="'Hanken Grotesk', system-ui, 'DejaVu Sans', sans-serif" font-size="14.5" font-weight="400" fill="#201914" text-anchor="start">Study leave</text>
<ellipse cx="505" cy="160" rx="112" ry="62" fill="#dcedf8" opacity=".6"/>
<text x="505" y="118" font-family="'Hanken Grotesk', system-ui, 'DejaVu Sans', sans-serif" font-size="14" font-weight="600" fill="#726657" text-anchor="middle">Fees</text>
<circle cx="452" cy="156" r="5.5" fill="#1c6fb0"/>
<text x="464" y="161" font-family="'Hanken Grotesk', system-ui, 'DejaVu Sans', sans-serif" font-size="14.5" font-weight="400" fill="#201914" text-anchor="start">Late payment</text>
<circle cx="470" cy="190" r="5.5" fill="#1c6fb0"/>
<text x="482" y="195" font-family="'Hanken Grotesk', system-ui, 'DejaVu Sans', sans-serif" font-size="14.5" font-weight="400" fill="#201914" text-anchor="start">Sibling discount</text>
<ellipse cx="330" cy="304" rx="150" ry="50" fill="#dcedf8" opacity=".6"/>
<text x="330" y="270" font-family="'Hanken Grotesk', system-ui, 'DejaVu Sans', sans-serif" font-size="14" font-weight="600" fill="#726657" text-anchor="middle">Hygiene</text>
<circle cx="246" cy="296" r="5.5" fill="#1c6fb0"/>
<text x="258" y="301" font-family="'Hanken Grotesk', system-ui, 'DejaVu Sans', sans-serif" font-size="14.5" font-weight="400" fill="#201914" text-anchor="start">Hand hygiene protocol</text>
<circle cx="262" cy="324" r="5.5" fill="#1c6fb0"/>
<text x="274" y="329" font-family="'Hanken Grotesk', system-ui, 'DejaVu Sans', sans-serif" font-size="14.5" font-weight="400" fill="#201914" text-anchor="start">Washing before patient contact</text>
<path d="M 232 292 L 226 292 L 226 328 L 232 328" fill="none" stroke="#1c6fb0" stroke-width="1.4"/>
<text x="218" y="306" font-family="'Hanken Grotesk', system-ui, 'DejaVu Sans', sans-serif" font-size="13.5" font-weight="600" fill="#0e4d80" text-anchor="end">No shared words,</text>
<text x="218" y="324" font-family="'Hanken Grotesk', system-ui, 'DejaVu Sans', sans-serif" font-size="13.5" font-weight="600" fill="#0e4d80" text-anchor="end">still close together</text>
</svg>
</div>

This is what lets the system find a policy about hand hygiene when the
question talks about washing before touching a patient, even though the
two share no words at all. An ordinary keyword search would fail there.
A search by position on this map does not.

## Retrieval: finding the nearest pieces

When a question comes in, it gets turned into numbers in exactly the same
way, so it lands on the same map. Then the system simply takes the pieces
sitting closest to it. Usually three or four. That step is called
retrieval.

This is the answer to my third frustration, and it was the most useful
thing I learned.

<div style="margin:10px 0 28px">
<svg viewBox="0 0 680 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The three pieces nearest the question are picked; a clearer answer just outside is missed" width="680" style="max-width:100%;height:auto;display:block">
<rect x="0.5" y="0.5" width="679" height="379" rx="14" fill="#faf6ee" stroke="#e7dccb"/>
<text x="32" y="42" font-family="Fraunces, Georgia, 'DejaVu Serif', serif" font-size="17" font-weight="600" fill="#201914" text-anchor="start">Why it picks one passage over a clearer one</text>
<line x1="32" y1="64" x2="32" y2="356" stroke="#e7dccb" stroke-width="1"/>
<line x1="80" y1="64" x2="80" y2="356" stroke="#e7dccb" stroke-width="1"/>
<line x1="128" y1="64" x2="128" y2="356" stroke="#e7dccb" stroke-width="1"/>
<line x1="176" y1="64" x2="176" y2="356" stroke="#e7dccb" stroke-width="1"/>
<line x1="224" y1="64" x2="224" y2="356" stroke="#e7dccb" stroke-width="1"/>
<line x1="272" y1="64" x2="272" y2="356" stroke="#e7dccb" stroke-width="1"/>
<line x1="320" y1="64" x2="320" y2="356" stroke="#e7dccb" stroke-width="1"/>
<line x1="368" y1="64" x2="368" y2="356" stroke="#e7dccb" stroke-width="1"/>
<line x1="416" y1="64" x2="416" y2="356" stroke="#e7dccb" stroke-width="1"/>
<line x1="464" y1="64" x2="464" y2="356" stroke="#e7dccb" stroke-width="1"/>
<line x1="512" y1="64" x2="512" y2="356" stroke="#e7dccb" stroke-width="1"/>
<line x1="560" y1="64" x2="560" y2="356" stroke="#e7dccb" stroke-width="1"/>
<line x1="608" y1="64" x2="608" y2="356" stroke="#e7dccb" stroke-width="1"/>
<line x1="32" y1="64" x2="648" y2="64" stroke="#e7dccb" stroke-width="1"/>
<line x1="32" y1="112" x2="648" y2="112" stroke="#e7dccb" stroke-width="1"/>
<line x1="32" y1="160" x2="648" y2="160" stroke="#e7dccb" stroke-width="1"/>
<line x1="32" y1="208" x2="648" y2="208" stroke="#e7dccb" stroke-width="1"/>
<line x1="32" y1="256" x2="648" y2="256" stroke="#e7dccb" stroke-width="1"/>
<line x1="32" y1="304" x2="648" y2="304" stroke="#e7dccb" stroke-width="1"/>
<line x1="32" y1="352" x2="648" y2="352" stroke="#e7dccb" stroke-width="1"/>
<text x="300" y="102" font-family="'Hanken Grotesk', system-ui, 'DejaVu Sans', sans-serif" font-size="13.5" font-weight="600" fill="#0e4d80" text-anchor="middle">The three nearest pieces</text>
<circle cx="300" cy="204" r="92" fill="#dcedf8" opacity=".6" stroke="#1c6fb0" stroke-width="1.3" stroke-dasharray="4 5"/>
<line x1="300" y1="204" x2="246" y2="154" stroke="#1c6fb0" stroke-width="1.4"/>
<circle cx="246" cy="154" r="6.5" fill="#1c6fb0"/>
<line x1="300" y1="204" x2="360" y2="168" stroke="#1c6fb0" stroke-width="1.4"/>
<circle cx="360" cy="168" r="6.5" fill="#1c6fb0"/>
<line x1="300" y1="204" x2="262" y2="262" stroke="#1c6fb0" stroke-width="1.4"/>
<circle cx="262" cy="262" r="6.5" fill="#1c6fb0"/>
<text x="234" y="159" font-family="'Hanken Grotesk', system-ui, 'DejaVu Sans', sans-serif" font-size="14" font-weight="400" fill="#201914" text-anchor="end">Exam leave needs sign-off</text>
<text x="372" y="164" font-family="'Hanken Grotesk', system-ui, 'DejaVu Sans', sans-serif" font-size="14" font-weight="400" fill="#201914" text-anchor="start">Annual leave: book early</text>
<text x="250" y="267" font-family="'Hanken Grotesk', system-ui, 'DejaVu Sans', sans-serif" font-size="14" font-weight="400" fill="#201914" text-anchor="end">Study leave: 5 days a year</text>
<path d="M 300 192 L 312 204 L 300 216 L 288 204 Z" fill="#0e4d80"/>
<text x="320" y="209" font-family="'Hanken Grotesk', system-ui, 'DejaVu Sans', sans-serif" font-size="14.5" font-weight="700" fill="#0e4d80" text-anchor="start">Can I take leave to sit an exam?</text>
<circle cx="382" cy="282" r="7" fill="#c8623b"/>
<text x="396" y="280" font-family="'Hanken Grotesk', system-ui, 'DejaVu Sans', sans-serif" font-size="14.5" font-weight="700" fill="#c8623b" text-anchor="start">Paid leave on the day</text>
<text x="396" y="298" font-family="'Hanken Grotesk', system-ui, 'DejaVu Sans', sans-serif" font-size="14.5" font-weight="700" fill="#c8623b" text-anchor="start">of any exam you sit</text>
<text x="396" y="322" font-family="'Hanken Grotesk', system-ui, 'DejaVu Sans', sans-serif" font-size="13.5" font-weight="400" fill="#4a4039" text-anchor="start">Clearest answer. Worded</text>
<text x="396" y="339" font-family="'Hanken Grotesk', system-ui, 'DejaVu Sans', sans-serif" font-size="13.5" font-weight="400" fill="#4a4039" text-anchor="start">differently, so just outside.</text>
</svg>
</div>

Retrieval picks what is nearest in meaning. It does not pick what answers
the question best. Those are usually the same thing, but not always.

A piece that uses the same kind of language as the question can sit
closer than a piece that actually contains the answer but phrases it
differently. So the system can hand over three passages that are about
roughly the right subject and miss the one passage that settles it, even
when that passage is sitting just outside the circle.

That is exactly what I had been seeing in Copilot Studio and could not
explain. It was not the agent being careless. It was the distance on the
map, and I had no way to see the map.

## RAG: the whole pattern

Put those pieces together and you have the pattern behind nearly every
document assistant, including the knowledge sources in Copilot Studio. It
is called RAG, which stands for Retrieval Augmented Generation.

Retrieve the nearest pieces. Augment the question by pasting those pieces
into it. Generate an answer from them.

<div style="margin:10px 0 28px">
<svg viewBox="0 0 680 296" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Question, then retrieval, then an answer written only from the retrieved pieces" width="680" style="max-width:100%;height:auto;display:block">
<rect x="0.5" y="0.5" width="679" height="295" rx="14" fill="#faf6ee" stroke="#e7dccb"/>
<text x="32" y="42" font-family="Fraunces, Georgia, 'DejaVu Serif', serif" font-size="17" font-weight="600" fill="#201914" text-anchor="start">The whole pattern, start to finish</text>
<rect x="32" y="70" width="136" height="118" rx="10" fill="#faf6ee" stroke="#ddd0ba" stroke-width="1.3"/>
<text x="48" y="97" font-family="'Hanken Grotesk', system-ui, 'DejaVu Sans', sans-serif" font-size="14" font-weight="700" fill="#726657" text-anchor="start">1</text>
<text x="48" y="124" font-family="'Hanken Grotesk', system-ui, 'DejaVu Sans', sans-serif" font-size="14" font-weight="500" fill="#201914" text-anchor="start">You ask a</text>
<text x="48" y="143" font-family="'Hanken Grotesk', system-ui, 'DejaVu Sans', sans-serif" font-size="14" font-weight="500" fill="#201914" text-anchor="start">question</text>
<line x1="168" y1="129.0" x2="186" y2="129.0" stroke="#726657" stroke-width="1.4"/><path d="M 185 125.0 L 192 129.0 L 185 133.0" fill="none" stroke="#726657" stroke-width="1.4"/>
<rect x="192" y="70" width="136" height="118" rx="10" fill="#faf6ee" stroke="#1c6fb0" stroke-width="1.3"/>
<text x="208" y="97" font-family="'Hanken Grotesk', system-ui, 'DejaVu Sans', sans-serif" font-size="14" font-weight="700" fill="#726657" text-anchor="start">2</text>
<text x="208" y="124" font-family="'Hanken Grotesk', system-ui, 'DejaVu Sans', sans-serif" font-size="14" font-weight="500" fill="#201914" text-anchor="start">The Clerk finds</text>
<text x="208" y="143" font-family="'Hanken Grotesk', system-ui, 'DejaVu Sans', sans-serif" font-size="14" font-weight="500" fill="#201914" text-anchor="start">the nearest</text>
<text x="208" y="162" font-family="'Hanken Grotesk', system-ui, 'DejaVu Sans', sans-serif" font-size="14" font-weight="500" fill="#201914" text-anchor="start">pieces</text>
<line x1="328" y1="129.0" x2="346" y2="129.0" stroke="#726657" stroke-width="1.4"/><path d="M 345 125.0 L 352 129.0 L 345 133.0" fill="none" stroke="#726657" stroke-width="1.4"/>
<rect x="352" y="70" width="136" height="118" rx="10" fill="#faf6ee" stroke="#1c6fb0" stroke-width="1.3"/>
<text x="368" y="97" font-family="'Hanken Grotesk', system-ui, 'DejaVu Sans', sans-serif" font-size="14" font-weight="700" fill="#726657" text-anchor="start">3</text>
<text x="368" y="124" font-family="'Hanken Grotesk', system-ui, 'DejaVu Sans', sans-serif" font-size="14" font-weight="500" fill="#201914" text-anchor="start">The Explainer</text>
<text x="368" y="143" font-family="'Hanken Grotesk', system-ui, 'DejaVu Sans', sans-serif" font-size="14" font-weight="500" fill="#201914" text-anchor="start">reads only</text>
<text x="368" y="162" font-family="'Hanken Grotesk', system-ui, 'DejaVu Sans', sans-serif" font-size="14" font-weight="500" fill="#201914" text-anchor="start">those pieces</text>
<line x1="488" y1="129.0" x2="506" y2="129.0" stroke="#726657" stroke-width="1.4"/><path d="M 505 125.0 L 512 129.0 L 505 133.0" fill="none" stroke="#726657" stroke-width="1.4"/>
<rect x="512" y="70" width="136" height="118" rx="10" fill="#faf6ee" stroke="#ddd0ba" stroke-width="1.3"/>
<text x="528" y="97" font-family="'Hanken Grotesk', system-ui, 'DejaVu Sans', sans-serif" font-size="14" font-weight="700" fill="#726657" text-anchor="start">4</text>
<text x="528" y="124" font-family="'Hanken Grotesk', system-ui, 'DejaVu Sans', sans-serif" font-size="14" font-weight="500" fill="#201914" text-anchor="start">An answer, with</text>
<text x="528" y="143" font-family="'Hanken Grotesk', system-ui, 'DejaVu Sans', sans-serif" font-size="14" font-weight="500" fill="#201914" text-anchor="start">its source</text>
<text x="528" y="162" font-family="'Hanken Grotesk', system-ui, 'DejaVu Sans', sans-serif" font-size="14" font-weight="500" fill="#201914" text-anchor="start">shown</text>
<line x1="420" y1="188" x2="420" y2="214" stroke="#1c6fb0" stroke-width="1.2" stroke-dasharray="3 4"/>
<rect x="192" y="214" width="456" height="60" rx="9" fill="#ffffff" stroke="#1c6fb0" stroke-width="1.2"/>
<text x="210" y="238" font-family="'Hanken Grotesk', system-ui, 'DejaVu Sans', sans-serif" font-size="13.5" font-weight="600" fill="#726657" text-anchor="start">The house rule, sent with every question:</text>
<text x="210" y="260" font-family="'Hanken Grotesk', system-ui, 'DejaVu Sans', sans-serif" font-size="14.5" font-weight="700" fill="#0e4d80" text-anchor="start">Answer only from these. If it isn’t here, say so.</text>
</svg>
</div>

The house rule matters as much as anything else in the diagram. The
Explainer is fluent, and fluent people sometimes fill a gap rather than
admit they do not know. So he gets one instruction with every question:
answer only from the pieces in front of you, and if the answer is not
there, say so.

This is where my second frustration lived. The answer can only ever be as
good as the pieces the Clerk retrieved. If you cannot see which pieces
those were, you cannot see why the answer came out the way it did. You
are looking at the end of the process with no view of the middle.

## And the fourth one: the cloud

The last frustration turned out to be the simplest.

The Explainer, the language model, is not really a service you have to
connect to. It is a file, a few gigabytes of numbers, that a program
loads and runs. Put that file on your own machine and there is nothing
travelling to anyone else's server.

Which meant the answer to the person who asked me was not "you need the
cloud". It was "you need the pieces, and you can run all of them
yourself".

## So I am going to build one

Knowing the theory is one thing. I wanted to know whether I actually
understood it.

So I am going to build a document assistant from scratch, on an ordinary
laptop, with no cloud and no graphics card. Every piece in this post,
built by hand, where I can see what happens at each step.

If the theory is right, it should work with the network cable pulled out.

---

**Update:** I built it. It runs completely offline, answers in English
and Arabic, shows the exact paragraph behind every answer, and taught me
a great deal that this post could not. The full write-up, with a video of
it running:
[An offline AI that answers from your own documents](/posts/offline-ai-assistant-ilmichat/).
