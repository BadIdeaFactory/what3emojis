# Contributing Guidelines

Contributions welcome!

**Before spending lots of time on something, ask for feedback on your idea first!**

Please search issues and pull requests before adding something new to avoid duplicating efforts and conversations.

In addition to improving the project by refactoring code and and implementing relevant features, this project welcomes the following types of contributions:

- **Ideas**: participate in an issue thread or start your own to have your voice heard.
- **Writing**: contribute your expertise in an area by helping expand the included content.
- **Copy editing**: fix typos, clarify language, and generally improve the quality of the content.
- **Formatting**: help keep content easy to read with consistent formatting.

## Installing

Fork and clone the repo, then `npm install` to install all dependencies.

The `app` folder has the actual app, and it has its own `package.json`. If you are adding a dependency to the app, add it to `app/package.json`. The top level `package.json` has the build `devDependencies` (like electron).

## Testing

Tests are run with `npm test`. Please ensure all tests are passing before submitting a pull request (unless you're creating a failing test to increase test coverage or show a problem).

## Code Style

[![standard][standard-image]][standard-url]

This repository uses [`standard`][standard-url] to maintain code style and consistency, and to avoid style arguments. `npm test` runs `standard` so you don't have to!

[standard-image]: https://cdn.rawgit.com/feross/standard/master/badge.svg
[standard-url]: https://github.com/feross/standard

---

# Collaborating Guidelines

**This is an OPEN Open Source Project.**

## What?

Individuals making significant and valuable contributions are given commit-access to the project to contribute as they see fit. This project is more like an open wiki than a standard guarded open source project.

## Rules

There are a few basic ground-rules for contributors:

1. **No `--force` pushes** or modifying the Git history in any way.
1. **Non-master branches** ought to be used for ongoing work.
1. **External API changes and significant modifications** ought to be subject to an **internal pull-request** to solicit feedback from other contributors.
1. Internal pull-requests to solicit feedback are *encouraged* for any other non-trivial contribution but left to the discretion of the contributor.
1. Contributors should attempt to adhere to the prevailing code style.

## Releases

Declaring formal releases remains the prerogative of the project maintainer.

## Changes to this arrangement

This is an experiment and feedback is welcome! This document may also be subject to pull-requests or changes by contributors where you believe you have something valuable to add or change.
