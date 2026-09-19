---
title: "An offline AI that answers from your own documents"
description: "I built a document assistant that runs on a laptop with no internet, answers in English and Arabic, and shows the exact line it used. Here is how, and the one problem that took the longest."
date: 2026-09-13
category: "projects"
level: "intermediate"
tags: ["ai", "data-quality"]
featured: true
---

> The documents in this demo are fictional and were created for
> demonstration. They do not belong to any real organisation. The design,
> the code, and the measurements are real.

<div class="video-embed">
  <iframe
    src="https://www.youtube.com/embed/tc1ZC7bUtuI"
    title="IlmiChat: an AI assistant that runs with no internet"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
    loading="lazy"
  ></iframe>
</div>

*A six minute walkthrough: the machine goes offline, then answers in
English and Arabic, refuses a question it cannot answer, and learns a new
document on camera.*

I built a document assistant, called IlmiChat, that runs entirely on one
machine with no internet connection. It answers questions from an
organisation's own documents in English and Arabic, and for every answer
it shows you the exact paragraph it used.

On a fixed set of test questions it found the right document 31 times out
of 33, gave the correct fact 32 out of 33, and refused correctly on all
36. It runs on my own laptop, which has two cores, 8 GB of memory, and no
graphics card.

## The problem

A few weeks ago I was reading about Kuwait's rules on where sensitive
data can live, and one question stuck with me. If an organisation is not
allowed to send confidential data outside the country, or simply is not
comfortable doing it, how does it use AI at all?

ChatGPT, Claude and Gemini all run in the cloud. So the moment you paste
a confidential document into one of them, that document has left the
building. For a bank, a hospital or a ministry, that is often where the
conversation ends.

I showed an early version to a friend who is a chartered accountant,
mostly to hear what he would say. He told me his organisation already has
ChatGPT Enterprise, and they still are not comfortable putting certain
financial data into it. He wanted to know more, and we are still talking.
That is when it stopped being a hobby project.

## How it works

The whole system runs locally. A small language model does the answering,
a second model turns each document into a form the computer can search by
meaning, and a local database holds it all. There are no API keys and no
external calls, so you can disconnect the machine from the network and it
keeps working. That is not a side effect. It is the entire point.

The method is straightforward to describe. Each document is split into
small, single-topic pieces. Every piece is stored by its meaning rather
than its exact words, so a question about "a patient who missed an
appointment" can find a policy that says "failure to attend". When you
ask something, the system pulls the handful of pieces closest in meaning,
and the model answers using only those, with the source shown beside the
answer.

### What it runs on

For anyone who wants to picture the machine rather than take my word for
it.

| Component | What I used |
| --- | --- |
| Answering model | Qwen3 1.7B, served locally through Ollama |
| Embedding model | A multilingual model producing 768 numbers per piece, chosen because it handles Arabic as well as English |
| Database | LanceDB, a local file on disk, no server process |
| Text extraction | poppler, after the Arabic problem described below |
| Backend | Python with FastAPI |
| Interface | A small React page |
| Machine | Intel i3, two cores, 8 GB of memory, no graphics card |
| Pieces retrieved per question | Three |

Response times on that machine, from the figures printed under each
answer: finding the sources takes a few seconds, and the first word of
the answer appears somewhere between 20 and 60 seconds later, depending
on how much memory is free at the time.

That spread is worth being honest about. It is a laptop running a
language model, a web server and a browser inside 8 GB, so the numbers
move. On a machine with a graphics card the same answers arrive in
seconds. The hardware changes the speed, not the answer.

This is also why the sources appear on screen before the answer does.
Retrieval finishes early, so the excerpts are there to read while the
model is still writing.

## Not everyone should see everything

In most organisations the interesting question is not whether an
assistant can answer. It is whether it answers the wrong person.

Documents belong to a department: HR, Finance, Operations, IT, or a
shared space everyone can see. A member of staff sees only the
departments they belong to.

The demonstration is short and it is the part that matters most to a
bank. One employee asks for the staff salary bands and gets them, with
the source policy shown beside the answer. Another employee asks the
identical question and gets a not-found response. Same system, same
question, same document sitting on the same server.

Two details make that real rather than cosmetic.

The filter runs inside the database query, not on the results afterwards.
Text a user is not allowed to read never enters the model's context at
all. Filtering afterwards looks identical from the outside and is not the
same thing, because a small model will happily quote something it was
told to ignore.

And the refusal never says "access denied". It gives the ordinary
not-found response, exactly as if the document did not exist. Telling
someone they are not permitted to see a file confirms that the file
exists, and in an HR context that is itself a leak.

![Same question asked by an HR user and a Finance user. The HR user gets
the salary bands with the source policy shown beside the answer. The
Finance user gets a not-found response, because retrieval only searched
the departments they belong to.](/images/ilmichat-access-control.png)

Look at the evidence panel on the second one. Unrelated documents appear
there because the search only ever ran across Finance and the shared
space. The salary policy was not ranked lower. It was never a candidate.

## The hard part was getting it to say "I don't know"

The demo that impresses people is the one where it answers. The problem
that actually mattered was the opposite one.

A model that invents a confident answer is worse than useless when the
documents are financial or medical, because the confident wrong answer is
the one someone acts on. So I needed it to refuse cleanly when the answer
was not in the documents.

At first it refused too often. It would decline questions even when the
answer was sitting right there in the text it had retrieved. I had
written this down as a limitation of using a small model, and I was close
to spending money on a bigger machine to fix it.

Then I measured it properly and found the cause was my own instruction,
not the model. I had been forcing it to reproduce a long refusal sentence
word for word, which is harder for a small model than simply answering,
so under any doubt it took the easy way out and refused. I changed it to
reply with a short marker instead, and show the human sentence in its
place. Refusal accuracy went to 36 out of 36, and several questions I had
blamed on the model started answering correctly.

I had almost bought hardware to fix a wording problem.

## Arabic broke in a way my own tests could not see

Arabic was not an afterthought. It was in from the first version, because
in Kuwait a system that only works in English solves half the problem.

Getting Arabic text out of a PDF is harder than it looks. Arabic runs
right to left, but numbers inside it run left to right, and many PDFs
store the text in the order it appears on the page rather than the order
you read it. The library I started with misread Arabic lines as
left-to-right and reversed them at the wrong level. Words survived.
Numbers did not. A time like 09:00 ended up fused to the wrong word and
sitting in the wrong sentence.

Here is the part worth remembering. When I fixed it, the retrieval score
did not move at all. Not by one question.

The words in each passage were intact and only the numbers had shifted,
so the system still found the right document every time and every
automatic check I had passed cleanly, before and after. For weeks the
dates and times in every Arabic document had been wrong, and nothing in
my own tests could see it.

In a policy document, the numbers are the entire point. A dose, a
deadline, a percentage. That bug would have produced confident, cited,
wrong answers in Arabic and nothing would have flagged it.

The fix was to change how the text is read and then add a check that
refuses a document outright rather than indexing broken text.

## I measured it, I did not guess

Anyone can show a chatbot answering one question. Almost nobody shows a
number for how often it retrieves the right document, or how often the
answer contains the correct fact.

So I built a fixed set of 36 questions with known answers, in both
languages, including three that cannot be answered from the documents at
all. The system is scored against it on three separate things: did it
find the right document, did the answer contain the correct fact, and did
it refuse exactly when it should. The scores are written to a file with
the date and the settings, and the whole test re-runs whenever I change
anything, failing loudly if any score drops.

That third check exists because of one specific failure, and it is worth
describing.

Asked when the second term ends, the system answered with the end of the
academic year instead. It had retrieved the right document, at the top of
the list, and cited it correctly. Retrieval scored it a success. The
refusal check scored it a success. Two out of three measurements called a
wrong date a win.

The cause was in the source text: one passage holding ten dates across
three terms, with one date appearing twice in two different roles. A
model this small loses the thread across that.

I tried the cheap fix first, because a wording change had already solved
the refusal problem without new hardware. It did not work here. So this
one is genuinely the model being small, and I know that because I tested
the alternative rather than assuming it.

That is the single question it still gets wrong. I would rather publish
the real number and explain it than show a perfect score on a test I
wrote myself.

## What it will not do

Scanned documents are rejected, not indexed.

I tested Arabic character recognition on a deliberately degraded scan,
the kind of photocopied circular a ministry archive is full of. It did
not return errors. It returned confident nonsense: reference numbers
reversed, invented English words sitting inside Arabic sentences, and the
figures that carry the actual meaning simply gone.

That is worse than failing, because nothing downstream can tell. The text
chunks normally, stores normally, retrieves normally, and gets cited with
a page number. So scanned documents are detected and refused at upload
until a person can review the recovered text before it is indexed.

I would rather say that plainly than claim support for something I have
watched produce fiction.

## Built for one thing, pointed at another

The system was built and measured against one set of documents, a
fictional school. The demonstration in the video uses a completely
different set, a fictional hospital.

Nothing in the code changed between the two. New documents, a new
assistant name, new departments, and it worked. That is the claim this
project actually makes: not that it knows about schools or hospitals, but
that it is the same engine pointed at whichever documents an organisation
has, running inside their own building.

## What I would tell another builder

Measure before you spend. I was one purchase order away from fixing a
prompt with a new computer, and only the number stopped me.

Build the test set before you start improving things. Every change I made
after that point was measurable. Everything before it was a feeling.

And the unglamorous parts were the real work. Reading the text cleanly,
keeping each piece on one topic, and building the harness mattered more
than any clever prompt.

A system that admits when it does not know is worth more than one that
always has an answer, especially when the documents are the kind you are
not allowed to send to the cloud in the first place.

If your organisation has documents it cannot put into a cloud AI, this is
the direction I would look, and I am happy to talk about how it works.
