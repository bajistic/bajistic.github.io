---
layout: post
title:  "Files as Memory: Building an AI Personal OS"
date:   2026-02-09 03:00:00 +0100
categories: ai assistant architecture
---

i've been running my ai assistant for almost a year now. what started as a telegram bot with some api calls has turned into something closer to an operating system for my life.

the core idea is simple: **files are memory**.

no database. no vector store. no fancy RAG pipeline. just markdown files in a folder, version-controlled with git, synced across devices with obsidian.

## the architecture

the system lives inside an obsidian vault. the ai reads and writes to it like a second brain. here's what the structure looks like:

```
clawd/
├── SOUL.md          # personality, values, boundaries
├── IDENTITY.md      # who the ai is
├── USER.md          # who i am (preferences, timezone, etc.)
├── MEMORY.md        # curated long-term knowledge
├── TOOLS.md         # integrations and api configs
├── HEARTBEAT.md     # periodic check-in schedule
├── memory/          # daily logs, goals, lessons learned
├── scripts/         # automation (backups, sync, transcription)
├── templates/       # reusable document templates
├── contacts/        # professional references, cv
└── config/          # oauth, mcp tool configs
```

every file has a purpose. the ai loads what it needs per session. no bloated context windows, no loading everything at once.

## three-tier memory

this is probably the most useful pattern i've found:

**1. daily logs** — raw capture of what happened. decisions made, tasks done, things learned. these are ephemeral. most get deleted after review.

**2. curated memory** — the good stuff gets promoted to `MEMORY.md`. facts worth keeping: preferences, active projects, lessons learned, key dates. this is loaded in every session.

**3. strategic context** — goals with deadlines and metrics, job search pipeline, financial plans. separate files that get loaded when relevant.

the key insight: **memory should be curated, not accumulated.** a 50-line file of things that matter beats a 5000-line dump of everything that ever happened.

## the heartbeat system

the ai checks in 2-4 times a day on a rotation:

- **cycle 0:** morning briefing
- **cycle 1:** goal tracking
- **cycle 2:** job/project follow-ups
- **cycle 3:** finances and admin
- **cycle 4:** memory maintenance (prune old logs, promote important stuff)
- **cycle 5:** proactive — surface opportunities, suggest things i haven't thought of

state is tracked in a simple json file. no cron daemon, no lambda functions. just a state machine that picks up where it left off.

## what it actually does

after a year of iteration, the practical stuff is what matters most:

- **cover letter pipeline:** i send a job url. the ai fetches the listing, fills a google docs template with a tailored letter, exports to pdf. takes about 2 minutes end to end.
- **multi-channel messaging:** whatsapp, telegram, email — all through one interface. i talk to the ai and it handles the routing.
- **form filling:** government forms, applications, admin paperwork. the ai reads the pdf, fills in fields, outputs a completed document.
- **voice transcription:** send a voice memo, get back structured text. great for capturing ideas on the go.
- **task management:** hooked into my todo app via applescript on my mac. "add X to my list" just works.

none of this is groundbreaking on its own. but having one system that does all of it, with persistent memory of my preferences and context — that's the multiplier.

## subagent architecture

one thing that works surprisingly well: spawning specialized sub-agents for focused tasks.

the main ai handles orchestration and conversation. but for something like job searching, a separate agent runs 3x a day with its own persona, its own channel, and its own memory file. it reports back findings without polluting the main conversation.

same idea for heavy computation — delegate to a code-capable agent, get results back, keep the main context clean.

## the backup strategy

everything is git-tracked. hourly auto-commits push to a private repo. the `.gitignore` excludes binaries (pdfs, audio files) but every markdown file and config is versioned.

this means i can:
- roll back to any point in time
- see exactly when a decision was made or a memory was updated
- never lose context even if a device dies

obsidian handles the human-readable layer. git handles durability. simple.

## what i've learned

**1. files beat databases for personal ai.** you can read them, edit them, version them, sync them. no migrations, no schemas, no orm. just text.

**2. identity documents matter.** giving the ai a `SOUL.md` with explicit values and boundaries makes it behave consistently. "has opinions, allowed to disagree, concise over performative" — these instructions compound over time.

**3. curation over accumulation.** the urge is to save everything. resist it. a lean memory file that gets reviewed and pruned is 10x more useful than a massive knowledge base.

**4. automation should be boring.** the best automations are the ones you forget exist. hourly backups, daily job scans, periodic memory cleanup. set it and forget it.

**5. privacy is a spectrum.** some data stays local, some goes through apis, some gets shared. being explicit about boundaries (in the soul file, no less) keeps things sane.

## what's next

the obvious evolution is making this a product. an ai assistant framework that non-technical people can set up and customize. define your identity files, connect your tools, let it run.

but honestly, the rough-around-the-edges version that lives in a folder and runs on a cheap vps is already more useful than any polished app i've tried. sometimes the best tool is the one you built yourself.

---

*this post was written with help from the system it describes. meta enough for you?*
