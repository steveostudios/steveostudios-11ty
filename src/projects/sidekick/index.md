---
title: Sidekick
date: 2018-07-26
tags: portfolio
client: Download Youth Ministry
slider:
  - screen1.jpg
  - screen2.jpg
stack:
  host:
    - Electron
  front:
    - React
    - Redux
    - Styled Components
  back:
    - Node JS
repo: https://github.com/downloadyouthministry/sidekick
---

## Overview

Sidekick is a presentation software, similar to ProPresenter or Powerpoint, that allows you to play games in your service, like spin a wheel, play Family Feud, keep score, or pick a random (or not so random) kid. It's part of Download Youth Ministry's Gold Membership and standalone Sidekick membership. It's used in tons of churches every week.

Files (games) can be exported, shared, and imported on different devices. They can even be sold on the DYM store. All files are stored locally, automatically saved, and rapidly accessible for off-the-cuff gameplay.

## The Idea

Sidekick is the latest iteration in a line of projects that I've been working on, starting with a Flash app called Spin that Wheel. We've always wanted to make a presentation software that did the things you can't do with other apps.

The overall design and architecture of the project had some tricky guidelines:

1. The audience cannot know what you're doing, so there needed to be independent control and display windows.
2. We wanted the app to work offline, incase you happen to be at camp or in a church basement.
3. It has to require a login to determine if you have a valid membership.
4. The UI has to be easy enough to train a volunteer that has never used Sidekick in a matter of minutes to feel confident.
5. The games have to auto-save incase of the app crashing or switching quickly between games.
6. Files (stored locally) had to work in newer versions of the app.
7. We don't the screen size or aspect ratio of the projectors or TVs this is being played on, so we need to make it look decent on as many as possible.

## Evolution

Sidekick's predecessor, DYM Games, was built with jQuery and state management was awful to deal with. We'd seen success with it, but with every additional builder and feature it seemed development time was increasing exponentially. On top of that, the most common feature request was that people wanted to switch back and forth between games.

During Christmas break, 2017, I was playing around React. After a few hours, it became apparent that rebuilding DYM Games as a new app in React would allow us to add a ton of features faster! We were able to combine common code within builders, make the app more performant, create a library system, and iterate much faster

## Version 1.0

Version 1.0 was launched July 26, 2018 (just over 6 months after that fateful Christmas break). It included 10 fully-customizable "builders", which are like apps within the app.

- Boxes: A random box picker.
- Emoji Hunt: An Emoji slot machine.
- Wheel of Destiny: A completely customizable spinny-wheel.
- Pick Me: An easy people picker complete with odds!
- Leaderboard: Keep score with up to 10 teams.
- Survey Says: A Family Feud-style game builder.
- Countdown Maker: Customizable countdowns in seconds!
- Pixelate: Customizable "Image guessing" game without Photoshop!
- Trivia: Full-featured, multiple-choice game builder.
- Photo Fury: A fully-customizable, fast-paced, random image picker.

It also included 45 built in games, a library system that allowed you switch between games quickly.

## Behind the Scenes

Sidekick uses Electron so we can talk between a control interface to a display interface, to that the audience can't see behind the curtain. It uses React and Redux for state management. It uses the local filesystem to store settings and files. We created our own filetypes, which are zip files with media and JSON files, that can be exported and shared.

Sidekick has a lot of and animation and graphic generation included, which means I used Greensock, CSS animations, filters, and a boatload of realtime generated SVGs. When necessary, Sidekick will actually export screenshots of screens and save out thumbnails in realtime to speed up the app.



