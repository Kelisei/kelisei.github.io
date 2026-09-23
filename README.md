# Kelisei Ventura - Blog & Portfolio

Personal website, portfolio, and technical blog built with Astro and Tailwind CSS styled in the Catppuccin Mocha colorscheme.

## Projects

Projects are managed as a native Astro content collection in `src/content/projects/`:
- `arkantos.json` (Arkantos code editor)
- `arkship.json` (Arkship game)
- `orgmode.json` (Org Mode Neovim Plugin)
- `kftr5.json` (KFTR5 Twitter clone)

Each project file defines the title, description, screenshot image, status badge, repository URL, and display order.

## Blog CLI Tool (`npm run new-post`)

The repository includes a custom CLI script in `scripts/new-post.mjs` to automate creating blog posts and devlogs.

### Basic Usage

Create a new standalone blog post:

```sh
npm run new-post -- "My Post Title"
```

If run without arguments, it defaults to using today's date as the title:

```sh
npm run new-post
```

### Linking Posts to Projects

To create a devlog linked directly to one of your projects, pass the `--project` (or `-p`) flag:

```sh
npm run new-post -- "Buffer Architecture" --project arkantos
```

Short flag syntax:

```sh
npm run new-post -- "Spaceship Movement" -p arkship
```

Supported project IDs:
- `arkantos`
- `arkship`
- `orgmode`
- `kftr5`

### What the CLI Automates

1. Project Validation:
   Checks the `--project` argument against files in `src/content/projects/`. If an invalid project name is entered, it prints an error and lists available project IDs.

2. Slug and File Generation:
   Converts the post title into a URL-safe slug and creates the file at `src/content/blog/<slug>.md`.

3. Collision Handling:
   If a file with the same title already exists, it automatically appends an incrementing counter (e.g., `<slug>-1.md`, `<slug>-2.md`).

4. Automatic Frontmatter:
   Generates standard YAML frontmatter with today's date (YYYY-MM-DD), default tags, and the relational project reference:

```yaml
---
title: "Buffer Architecture"
description: ""
pubDate: 2026-09-23
tags: ["arkantos"]
project: "arkantos"
---
```

### How Posts Appear on the Site

- General Blog: Every article automatically appears on `/blog` and is indexed by the real-time search, tag filter, and date sort.
- Single Article: Each post is rendered at `/blog/<slug>`. If linked to a project, a badge linking to that project's filtered view is displayed in the header.
- Project Cards: On the home page (`/`), each project card displays a "Devlogs" button linking directly to `/blog?project=<id>`, filtering the blog to show only posts written for that project.

## Development

```sh
npm install
npm run dev
```

The local development server runs at `http://localhost:4321`.

## Build

```sh
npm run build
```

Runs type and syntax checks via `astro check` and outputs the static site to `./dist/`.
