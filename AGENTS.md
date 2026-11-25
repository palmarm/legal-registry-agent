# AGENTS.md

## Project

Build a local Legal Registry & Matter Briefing Agent as a standalone personal
learning project. Use fictional firms, parties, documents, and court sessions
throughout. Explain legal terms in plain language when introducing them in
documentation for registry users.

Use TypeScript, NestJS, Prisma, PostgreSQL, and the MCP TypeScript SDK. Prefer
open-source components where practical.

Use **developer** for the person building the project, **registry user** for
the person operating the application, and **Registry CLI** for its command-line
interface. Preserve **current user** in access-control descriptions.

## Configuration ownership

- The project developer normally applies configuration changes personally,
  including credentials, databases, ports, volumes, environment variables, and
  Prisma connections.
- Discuss the configuration choice, provide Ubuntu WSL commands or precise file
  edits, explain the expected result, and show how the developer can verify it.
- The developer can explicitly delegate a specific configuration task to Codex,
  as with Prisma installation and connection setup. Codex applies configuration
  changes only within that explicitly delegated task.
- Never request or print the developer's password or full connection URL.

## Architecture

- The Registry CLI calls the registry backend for `create_demo_matter`,
  `add_demo_event`, and `explain_registry_term`.
- The briefing agent calls the MCP server. Expose exactly two read-only tools:
  `get_matter_timeline` and `read_matter_document`.
- The MCP server requests records from the backend on behalf of the current
  user. Only the backend accesses PostgreSQL.
- The backend checks the current user's access on every matter-scoped request.
  For a document-version read, also verify that the version belongs to the
  requested document and matter. Apply the same checks when reopening a citation.

## Evidence and acceptance

- Cite the exact source record and version for each factual briefing claim.
  The registry user must be able to reopen the citation and verify the claim.
- Preserve uncertainty. An attendance note can leave attendance unconfirmed.
  Approval applies to the specific draft reviewed. Dispatch requires its own
  evidence.
- Use `fixtures/matters/ALA-DEMO-001/acceptance.md` as the reference for the
  first scenario. Run the same briefing before and after adding D07. Only the
  hearing date/time and its citation should change.

## Working with the developer

- Work on the agreed step in milestone order: model the fictional matter,
  build the registry API, expose the MCP tools, then add and evaluate the agent.
- Give commands for Ubuntu WSL. Explain what each command does, the expected
  result, and how the developer can verify it in the VS Code terminal.
- When a summit presentation informs a decision, identify the deck and slide
  by title or number and describe a test we can run locally. Ask for the slide
  or excerpt if the source is unavailable in the current session.
- Keep changes focused. Leave implementation changes unstaged for review
  unless the developer asks for a Git action. After the foundation commit,
  use feature branches from `staging`, with release PRs from `staging` to `main`.
- End each session with what changed, what was verified, and where to resume.
  Distinguish checks actually run from checks proposed for a later milestone.
