---
title: Pipeline
date: 2020-09-24
tags: project
client: Download Youth Ministry
slider:
  - screen1.jpg
  - screen2.jpg
  - screen3.jpg
stack:
  host:
    - Digital Ocean
  front:
    - React
    - React Router
  back:
    - Express
    - Node JS
    - Mongo DB
---

## Overview

The core of Download Youth Ministry is resource submissions from youth workers. Every submission goes through a process where we edit, organize, offering feedback and design graphics for it. This app keeps track of the history, organization, and communication for each resource.

Before we made Pipeline, our team was using a home-brew combination of tools: several Google Sheets to manage where things were in the process, Dropbox and Word files to hold resource data, Facebook and email for communication to other editors and authors, and every resource required hours of work to keep up with by hand!

The Pipeline app we created holds all of the data for the resources in a database (instead of Word files!). The author submits directly to the application and editors can move resources from person to person. There is a chat for the editors to leave notes and an email channel for the admin to reach out to the author.

## Behind the Scenes

Pipeline is built on React and tied to a Mongo database. In order to handle file management, we connect to Dropbox. When an author submits a resource via their own Dropbox, Pipeline copies that zip file to our own Dropbox. As the editors move resources down the line, Dropbox permissions are granted and revoked. The app also communicates with out middleware server to handle authentication and permissions.

## Involvement

I collaborated with the Pipeline team to determine what they needed the tool to do and took that back to Figma to design the screens for the app. I helped the developer on the project work through ideas and issues. For the last few years I've overseen the app while it was in maintenance mode.
