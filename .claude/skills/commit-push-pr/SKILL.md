---
name: commit-push-pr
description: Commit the current work, run the repo's own checks, push, and open a pull request — with a screenshot when it's a UI change. Use when the user is done with a change and wants it committed and PR'd, or says "ship it", "open a PR", "commit and push", or runs "/commit-push-pr".
argument-hint: [optional PR title or note]
allowed-tools: Bash Read Grep Glob Edit
---

# Commit, push, and open a PR

Take the work currently in the working tree all the way to an open pull request, running this repo's own checks first. `$ARGUMENTS` is an optional title or note for the PR.

## Step 0 — Learn this repo's rules

- Run `git status` and `git diff` to see what changed, and `git branch --show-current` to see where you are.
- Find the check commands the same way CI does: read `package.json` scripts (lint, typecheck, test, build), or a `Makefile` / `justfile`, or the workflow files in `.github/workflows/`. Use the commands CI actually runs — don't invent your own.
- Detect the package manager from the lockfile (`pnpm-lock.yaml` → pnpm, `yarn.lock` → yarn, `package-lock.json` → npm, `bun.lockb` → bun).
- Check for a PR template (`.github/pull_request_template.md`) and the repo's commit style (skim `git log --oneline -20`). Match both.

If you can't find a check command, say what you assumed in one line and proceed — don't stall.

## Step 1 — Get on a branch

If you're on the default branch (main/master), create a feature branch named from the change, following the repo's existing branch naming. Never commit directly to the default branch.

## Step 2 — Run the checks, fix what breaks

Run the lint / typecheck / test / build commands you found, in that order. If something fails, fix the cause and re-run, up to a few rounds. If a failure is genuinely outside the scope of this change, or you can't resolve it, stop and report it — never commit broken work or disable a check to make it pass.

## Step 3 — Commit

Stage the change and write a commit message in the repo's style (Conventional Commits if that's what the log shows). The subject says what changed; the body says why. No "WIP" or bare "fix" placeholders.

## Step 4 — Screenshot if it's a UI change

If the diff touches frontend/UI, capture the visual result so the PR is reviewable at a glance: start the dev server or the relevant Storybook story, screenshot the affected view with a headless browser, and save it to a temp path. If you can't render it, say so in the PR body rather than guessing what it looks like.

## Step 5 — Push and open the PR

Push the branch, then open the PR with `gh pr create`. Fill the repo's PR template if present; otherwise write a body with: a one-paragraph summary, a short "what changed" list, a test plan (the checks you ran and their results), and the screenshot if you captured one. Use `$ARGUMENTS` for the title if given, otherwise derive it from the commit.

Finish by printing the PR URL on its own line. Don't merge it — that's the shepherd's job.