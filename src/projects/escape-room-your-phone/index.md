---
title: Escape Your Phone
date: 2021-01-19
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
    - React Router
    - Styled Components
hiddenurl: https://escape49309228497.dymgames.com/
hiddenrepo: https://github.com/downloadyouthministry/escape-room-phone
---

## Overview

After the wild success of [Escape the North Pole](/projects/escape-room-north-pole), we at DYM set out to make another room. This one we wanted to be a little more evergreen instead of limited to a season.

Like the other escape room, the idea is that this is played collaboratively via Zoom breakouts with your youth group. If you need a hint, you can go to the main Zoom room and ask the leader. In each room you will find clues to unlock screen allowing you to move to the next screen. When you reach the end, you get a secret phrase to tell your leader.

There is no "collecting items". Individuals who unlock a room can freely give their team a link to the newly unlocked room so they can continue to collaborate.

For this one, we wanted the story to be that you were sucked into your phone and the evil voice-assistant wanted to trap in you in there. You have to use clues found in the "apps" to advance to the next screen.

## Behind the Scenes

There are 6 "pre-rooms", which have a video that have instructions and move the plot forward. There are 6 home screen (rooms) with apps filled with clues and red-herrings and puzzles. In order to keep all of this organized I needed to create a design style and organization system to handle the sheer quantity of content. I had to make username/password, pin-code, a slew of toggle "settings", a snake game, and multi-question, timed quiz components. It was super fun!

Some of the hardest parts were trying to responsively put a phone on the screen. This had to work on any device, which could also be a phone! This caused some weird scrolling behavior and issues with mobile Safari. I also struggled with a good pattern unlock. I tried several components I found online, but none worked in the weird phone-inception. I even tried writing my own and we ran out of time.

It was really fun. Like the other one I got to help write the scripts, collaborate with the designers, and do all the code myself!
