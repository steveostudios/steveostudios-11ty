---
title: Design System
date: 2021-10-04
tags: project
client: Download Youth Ministry
slider:
  - screen1.jpg
  - screen2.jpg
  - screen3.jpg
stack:
  host:
    - Netlify
  front:
    - React
    - Storybook
url: https://designsystem.dymapps.com/
repo: https://github.com/downloadyouthministry/designsystem
---

## Overview

We've spun up several tools and have plans for some upcoming tools at DYM. Rather than reinvent the wheel every time, I decided to learn Storybook and create a design system. Storybook self-documents and has some fun UI features allowing you to test out React Components before you drop them into your project. I love how easy it is to put all of your code, documentation, and use-cases in the same place as the components themselves, because I am terrible at remembering to change everything!

## Behind the Scenes

The system is based on [Storybook](https://storybook.js.org/). The storybook portion is hosted on Netlify. When merging to `main` Netlify deploys a new version.

There is a second "output" for the app, which is a package hosted on Github Packages. When running `auto`, it will bump the version number, update a changelog, and version control another release on Github. In other applications, update the version number to the latest and all projects will have an up-to-date design system!
