---
title: CLI for my website 2.0
date: 2022-10-06
tags:
  - CLI
  - web
---

I've been using my [CLI](/blog/2022-04-19-cli-for-my-website/) for updating the [books page](/books) on this site for a while now and it's been great... until I got a new computer. I tried reinstalling it and can't get it to work :(. I think that I was using a global dependency that isn't on my new machine, or that there is a missing path. 

I need (need is a strong word), to fix it, but thought I'd take another stab and see if I could make it little more interactive. I started from scratch because I needed some pretty big changes. In version 2.0, here is what has changed.

## 1. It works!

I can install it, uninstall, reinstall and it works. I also seems to work from any working directory. Yay!

## 2. Inquirer instead of Prompt

It seems like [Inquirer](https://www.npmjs.com/package/inquirer) may be more popular lately than [Prompts](https://www.npmjs.com/package/prompts). They are almost identical, but I decided to make the switch. I'm not sure if it is actually any better and I may switch back if there is a feature I need that Inquirer doesn't have, but for now this is working. :shrug:

## 3. Adding books is easier

With 1.0 adding a book was a little tedious. I mean, it was easier than manually editing a JSON file and manipulating images, but it still required looking up and answering prompts for questions.

In 2.0, there is one question: What is the ISBN number. It will use the [OpenLibrary API]() to look up the book. If it can find an image it will download it, resize it, compress it, and save it locally. 

To make things even easier, I bought a cheap barcode scanner so I can answer the single ISBN question in less than a second. Is it lazy? Maybe. Is it awesome? you-betcha!

## 4. A menu structure

1.0 was driven by flags, which I kept forgetting the exact flag needed to run the different commands. In this new version I have an interactive menu that will walk me through necessary steps. I can still use flags to speed the process up, but only if I want to.

## 5. It can push to git

Probably the coolest feature is that once I make a change it will ask me if I want to deploy. Since this site is built on [Eleventy](https://www.11ty.dev/) and hosted on [Netlify](https://www.netlify.com/), in order to deploy, all I need to do it push to the main branch in Github.

Every change I make gets stored in a txt file until I deploy, so if I finish a book and start another I can bulk those changes in one git commit. When I decide to deploy (which I can do after any command or independently) it will add all, commit and push, then clear the list of changes for next time.

## 6. It has a confetti drop at the end

As an added bonus, when I finish deploying it it will give me 3 seconds of CLI confetti, congratulating my progress. It's the little things, amiright?

---

The source code can be found on [Github](https://github.com/steveostudios/read-cli).
