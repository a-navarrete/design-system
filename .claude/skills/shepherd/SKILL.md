Drive open pull requests to merge — fix failing CI, resolve merge conflicts, address review comments, and ping a human when a review is needed and the PR has gone stale. Loops on each PR until it's merged or genuinely blocked. Use when the user says "shepherd my PRs", "get my PRs merged", "babysit CI", or runs "/shepherd".Allowed toolsBash Read Grep Glob EditShepherd PRs to merge
Move open pull requests toward merge with as little human involvement as possible. $ARGUMENTS may name a specific PR (number or URL); if it's empty, work on all of the current user's open PRs.
Setup

Resolve the target PRs with gh pr list --author @me (or the PR named in $ARGUMENTS).
Read each PR's state once up front: gh pr view <n>, gh pr checks <n>, and gh pr view <n> --comments.

For each PR, loop until merged or blocked
Work one PR at a time. On each pass, handle whatever is currently blocking it:

Failing CI — pull the failing job's logs (gh run view --log-failed), diagnose the real cause, fix it in the code, commit, and push. Re-check once CI re-runs. Don't paper over failures by disabling tests or checks.
Merge conflicts — bring in the latest default branch (git fetch, then merge or rebase per the repo's convention), resolve conflicts faithfully to both sides' intent, and push with --force-with-lease only on this PR's own branch — never on a shared branch.
Review comments — for each actionable comment, make the change and reply to the thread saying what you did. If a comment is a question or a judgment call you shouldn't make unilaterally, leave it for the human and note it.
Needs human approval — if the PR is green and only waiting on a required review, check how long it's been waiting. If it's past the staleness threshold (default: ~24h since review was requested or last activity), nudge once: post to Slack if the Slack connector is available (DM the reviewer or the channel related to the change, with the PR link and a one-line summary). If Slack isn't available, fall back to an @-mention in a PR comment. Don't nudge repeatedly.

Respect branch protection and required approvals — never try to bypass them, and don't merge a PR that hasn't met its requirements. When a PR has met everything, merge it using the repo's usual strategy (squash / merge / rebase — check how recent PRs were merged).
Guardrails

Cap the effort: a few rounds per PR. If it's still blocked after that, stop on it, summarize what's blocking it, and move on to the next.
Never force-push to the default branch or to anyone else's branch.
Never hard-delete branches or close PRs unless the user explicitly asked.
If you're unsure whether a change matches a reviewer's intent, make your best attempt and say so in the reply rather than silently guessing.

Finish
Print a short status list: each PR, what you did, and where it stands now (merged / waiting on review / blocked on X).