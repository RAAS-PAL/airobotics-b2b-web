@AGENTS.md

# AI Robotics

B2B marketing site for autonomous commercial cleaning robots. Six machines
(L3, L4, L50, SP50, S5, V3), sold as AI Robotics, quote-only — no prices on the site.

**Before starting work, read [docs/project-context.md](docs/project-context.md).** It
covers the stack, the design system, how robot content is wired, and the environment
gotchas — enough to make a correct change without re-reading the codebase.
[docs/README.md](docs/README.md) indexes the rest.

Three things that bite immediately:

- **The dev server port moves between sessions.** The user keeps their own `next dev`
  running. Find the live port from the "Another next dev server is already running"
  error before smoke-testing — don't assume, don't start a second server.
- **Never invent a specification.** If a manufacturer doesn't publish a figure, it
  stays `—`.
- **Supply a commit message with every change.** The user runs the commits.
