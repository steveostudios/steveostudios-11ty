---
title: Data Converter
date: 2021-09-14
tags: project
client: Download Youth Ministry
slider:
  - screen1.jpg
  - screen2.jpg
  - screen3.jpg
  - screen4.jpg
  - screen5.jpg
stack:
  host:
    - Netlify
  front:
    - React
    - React Router
url: https://dataconverter.dymapps.com
repo: https://github.com/downloadyouthministry/data-convert
---

## Overview

Data Converter is an internal tool I created to help our team perform routine data parsing and conversions. It's really a catch all for a few different tools that need to be distributed but don't deserve their own domain. All of the parsing work is run locally in the browser, as to prohibit transferring sensitive data to a server.

The project static pages, running React and React Router. The I use a few dependancies to make the nuts and bolts work (`export-to-csv`, `fast-xml-parser`, `file-saver`, `json-2-csv`, `bible-passage-reference-parser` to name a few.) It also uses the [DYM Design System](/projects/design-system/), brought in as a Github Package. It's hosted on Netlify.

## Customers

The customer data export from SalesForce Commerce Cloud is in XML and custom attributes are hard to spread. With this tool our team can drop in an XML file and it will parse and spread the file. With the UI they can choose which fields, then export as a CSV, which is much friendlier for tools like Excel.

## Orders

The Orders tool is similar to the Customer export. Orders out of SalesForce Commerce Cloud is in XML. The Orders UI allows our team to choose the data they want and export to a CSV.

## Bible Verse Converter

This tool allows our team to paste in blocks of text, like copy/pasted from a sermon. It will look for scripture references and encode them into a format that we use on the backend of our store to attach to products. We haven't built out the function yet, but the idea is that we can build a search tool in SalesForce so users can search for products by passage.

## .URL

This really basic app will create `.url` files, which we put into products at DYM. When `.url` files are clicked they open up the user's preferred browser to that URL. They are the only format compatible with both Mac and PC. Creating them can be a nuisance. This tool generates them quickly with no mistakes.

## Prorate Calculator

Certain DYM Membership upgrades are able to be prorated if the customer emails us. This tool allows our customer support team to select start and upgrade dates and will calculate the proration amount and generate a support message that they can copy/paste to the customer.
