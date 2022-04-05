---
title: NDO Host
date: 2020-01-20
tags: portfolio
client: Download Youth Ministry
slider:
  - screen1.jpg
  - screen4.jpg
  - screen2.jpg
  - screen3.jpg
stack:
  host:
    - Netlify
  front:
    - React
    - React Router
  apis:
    - Google Sheets API
    - Brushfire
url: https://host.trainmyvolunteers.com
repo: https://github.com/downloadyouthministry/ndo-hosts-app
---

## Overview

We host a distributed conference every year at DYM. We produce the resources and 2.5 hour video teaching and provide them to host churches which they use to train their volunteers. This site is the secure backend that let's them download their resources.

## Behind the Scenes

We needed this to work with several APIs so our team would have to do the minimal amount of repetitive work. The host information (and main database) was held in a Google Sheet to make it easy for our administrators to keep up to date. This would be used for some host data.

Hosts can have other churches come to their church, which we use a service called [Brushfire](https://www.brushfire.com/) to handle those transactions. I set up a Lambda function on AWS to hit the Brushfire API several times a day to get a list of attendee churches and save it to a secure AWS bucket. This app would then read that data back to the host so they can see how many people the need to set chairs and provide meals for.

Stylistically, this project had to look similar to the conference material and attendee landing page.

The app is hosted on Netlify using their automatic deploy from Github.
