# Mohammed Jouhar — personal blog

Your blog, built with [Astro](https://astro.build). It gives you a homepage that
lists your posts, four tabs (Notes, Projects, Reflections, About), tags, and the
same header and footer on every page — automatically. You write posts as simple
Markdown files; the site builds itself.

---

## What's already here

- **Home** — intro + your latest posts
- **Notes / Projects / Reflections** — one tab per content type
- **About** — your bio (already filled in)
- **The Story of Ali** — your Azure AI showpiece, kept exactly as you designed it
- A few starter posts so nothing looks empty

---

## First Saturday: get it online (do this once)

You'll do four things. Take it slow — setup is only slow the first time.

### 1. Install the tools on your computer
- Install **Node.js** (the LTS version): https://nodejs.org
- Install **Git**: https://git-scm.com

### 2. Run it on your own machine first
Open a terminal in this folder and run:

```bash
npm install
npm run dev
```

Open the address it prints (usually `http://localhost:4321`). That's your blog
running locally. Press `Ctrl + C` to stop it.

### 3. Put it on GitHub
- Create a free account at https://github.com
- Make a new repository (call it `blog`). **Don't** add a README — you already have one.
- Follow GitHub's "push an existing repository" instructions. It looks like:

```bash
git init
git add .
git commit -m "First version of my blog"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/blog.git
git push -u origin main
```

### 4. Publish it for free with Cloudflare Pages
- Go to https://pages.cloudflare.com and sign in (free).
- Click **Create a project → Connect to Git**, pick your `blog` repo.
- When asked for build settings:
  - **Framework preset:** Astro
  - **Build command:** `npm run build`
  - **Output directory:** `dist`
- Click deploy. In a minute you'll get a live web address.

From now on, anything you push to GitHub publishes automatically.

> Netlify (https://netlify.com) works exactly the same way if you prefer it.

---

## Every Saturday: write a post

You don't need the terminal for this. The easiest way:

1. On GitHub, open the `src/content/posts` folder.
2. Click **Add file → Create new file**.
3. Name it something like `my-new-post.md`.
4. At the top, paste this block and edit it:

```markdown
---
title: "Your post title"
description: "One sentence shown on the card."
date: 2026-07-05
category: "notes"        # notes | projects | reflections
level: "beginner"         # beginner | intermediate | advanced (optional)
tags: ["sql", "learning"]
---

Write your post here in plain text.

## A heading

A paragraph. **Bold** and *italic* work. Lists too:

- point one
- point two
```

5. Commit it. Your site rebuilds and the post appears — on the right tab, on the
   homepage, and under each of its tags. Done.

### Adding an image to a post
Drop the image file into the `public/images` folder, then in your post write:

```markdown
![A short description](/images/your-image.png)
```

### Adding another designed showpiece (like Ali)
Put the finished `.html` file in `public/posts/`, then create a Markdown file
with an `external` line pointing to it:

```markdown
---
title: "My designed guide"
description: "..."
date: 2026-08-01
category: "notes"
featured: true
external: "/posts/my-guide.html"
---
```

---

## The Markdown front-matter fields

| Field | Required | What it does |
| --- | --- | --- |
| `title` | yes | Post title |
| `description` | yes | One-line summary on the card |
| `date` | yes | `YYYY-MM-DD`, controls ordering |
| `category` | yes | `notes`, `projects`, or `reflections` |
| `level` | no | `beginner` / `intermediate` / `advanced` badge |
| `tags` | no | List of tags, e.g. `["sql", "ai"]` |
| `featured` | no | `true` shows a "Featured" badge |
| `external` | no | Link the card to a standalone page instead |

---

## One thing to change later
When you connect a custom domain, open `astro.config.mjs` and set `site` to your
real address (e.g. `https://mohammedjouhar.com`).
