---
layout: post
title:  "On the Road to a Super Assistant"
date:   2025-05-29 10:00:00 +0100
categories: assistant ai
---

i've been building my own ai assistant on and off for a month now.

right now, like 90% of everything is ai-generated code.  
another 9% is me refactoring or cleaning up that code.  
maybe 1% is handwritten by me.

some stuff is probably faster to just do by hand, but having an ai bang it all out at typing speed is just awesome.

<img src="/assets/images/tonystark-jarvis.GIF" width="300" alt="Tony Stark and JARVIS" style="display: block; margin: 0 auto;">

> learning and applying random knowledge is super easy with ai these days.  
> you really don’t need to be a pro at any specific software—just understanding the basics of good software is enough.  
> honestly, you can get away with not knowing some things, because the ai usually overdelivers when you prompt it.
> the key is just having a sense of what you know vs. what you don’t.

## what it can do

- **gmail:** reads and writes my emails (could be risky if i’m not careful 🙃)
- **calendar:** creates google calendar events for me—i just say stuff like “next week monday, tuesday, and saturday from 14:30 to 00:15” and it adds them all.
- **todo app:** hooks into things for adding and editing tasks the lazy way (by talking).
- **cover letter generator:** throw it a job ad and it whips up a cover letter in google docs, using my own style, past references, cv, etc.
- **personal finances:** tracks and updates my finances with its own little database.
- **transaction tracking:** i send a receipt photo and it parses out items and the payment total.

<div class="video-container">
  <video width="360" height="640" controls class="centered-video" poster="/assets/videos/gcal_h264_thumbnail.jpg">
    <source src="/assets/videos/gcal_h264.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</div>
<div class="video-container">
  <video width="360" height="640" controls class="centered-video" poster="/assets/videos/letter_h264_thumbnail.jpg">
    <source src="/assets/videos/letter_h264.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</div>

## next up

- actually link the apps together for “real” integration, not just doing tasks separately.
  maybe start with automating something like tax declaration.
- scan my inbox for important mails and actually handle follow-up: schedule invoices, catch errors, handle small admin tasks, ask for clarifications, etc.

## the goal

- deal with invoices and boring, repeating stuff like bills and renewals.
- make reminders smarter (right now they’re pretty basic).

## the stack

- node server running on a raspberry pi
- connects to openai api
- uses google docs + calendar apis

## privacy notes

- uses telegram api, openai api, so there are obviously privacy risks to consider. but openai probably has all my data so whatever

