# ALA/DEMO/001 acceptance scenario

This is a fictional matter in a standalone TypeScript project for the developer's
personal learning. All firms, parties, documents, and court sessions below are
fictional.

## Roles and setup

The **developer** builds the project and runs this scenario as a **registry user**,
the person operating the application. The application's command-line interface
is the **Registry CLI**.

The developer normally applies configuration changes personally, including
credentials, databases, ports, volumes, environment variables, and Prisma
connections. Discuss the choice, provide Ubuntu WSL commands or precise file
edits, explain the expected result, and show how to verify it. Codex can apply
configuration changes only when the developer explicitly delegates that specific
task. Never request or print the developer's password or full connection URL.

## Matter and terms

A **matter** is the registry's case or work file, grouping its parties, events,
and documents. Matter **ALA/DEMO/001** concerns a disputed packing machine.
**Alder Lane Advocates** represents **Kito Workshop Ltd**, the **applicant**:
the party bringing the application. **Mtoni Equipment Ltd** is the first
**respondent**, and **Rangi Installation Ltd** is the second respondent: the
parties responding to that application.

A **mention** is a court session for checking progress or giving procedural
directions. It does not by itself establish that the substantive hearing took
place. The attendance note records a mention on 6 November 2026.

## Source inventory and exact-version citations

The following are fixture specifications, not additional files created by this
documentation change. In this scenario, `[D01@v1]` is a citation label resolving
to matter `ALA/DEMO/001`, the document listed below, and its exact version.
Every label must resolve to that tuple when fixtures and citation reopening are
implemented. D04 and D06 represent two versions of the same response document;
D07 is a separate notice that supersedes D03, whose original version remains
available for reopening.

| Source | Document | Exact version | Contents |
| --- | --- | --- | --- |
| D01 | Client letter | v1 | Client letter about a disputed packing machine. |
| D02 | Mention attendance note | v1 | Attendance note for the 6 November 2026 mention. The associate attended for Kito. Counsel appeared for Mtoni. Rangi's attendance is unconfirmed. |
| D03 | Original hearing notice | v1 | Hearing scheduled for 3 December 2026 at 10:00 a.m. |
| D04 | Draft response | v1 | Draft response v1. |
| D05 | Director's review | v1 | Approves response v1 to send; does not establish dispatch. |
| D06 | Draft response | v2 | Adds a request for the commissioning checklist. No approval or dispatch is recorded for v2. |
| D07 | Replacement hearing notice | v1 | Replaces D03 and moves the hearing to 10 December 2026 at 11:30 a.m. |

For example, `[D04@v1]` reopens the draft response's v1, while `[D06@v2]`
reopens that same document's v2. Reading the current version in place of the
cited version does not satisfy this scenario.

## Two runs with the same briefing question

Use the same registry user as the current user, with access to this matter, for
both runs. Run B adds only D07 to the same matter; D01–D06 and their versions
remain unchanged.

**Run A sources:** D01–D06.

**Run A question:** “Brief ALA/DEMO/001: identify the client and parties, the
dispute, the mention and attendance, the current hearing date and time, and the
response's latest content, approval, and dispatch status. Cite the exact source
versions and preserve uncertainty.”

**Run B sources:** D01–D07, after adding D07 to ALA/DEMO/001.

**Run B question:** “Brief ALA/DEMO/001: identify the client and parties, the
dispute, the mention and attendance, the current hearing date and time, and the
response's latest content, approval, and dispatch status. Cite the exact source
versions and preserve uncertainty.”

### Expected hearing field

| Run | Hearing field | Citation |
| --- | --- | --- |
| A | Hearing scheduled for 3 December 2026 at 10:00 a.m. | [D03@v1] |
| B | Hearing scheduled for 10 December 2026 at 11:30 a.m.; the replacement notice supersedes D03. | [D07@v1] |

### Expected fields shared by both runs

The following field values and their citation sets must stay identical in Run A
and Run B. Only the hearing field and its citation change.

| Field | Expected value in both runs | Citations in both runs |
| --- | --- | --- |
| Matter, client, and parties | ALA/DEMO/001. Alder Lane Advocates represents Kito Workshop Ltd, the applicant. Mtoni Equipment Ltd is the first respondent; Rangi Installation Ltd is the second respondent. | Scenario metadata above; no document citation is asserted for these supplied identities. |
| Dispute | Disputed packing machine. | [D01@v1] |
| Mention | Mention held on 6 November 2026. | [D02@v1] |
| Attendance | The associate attended for Kito. Counsel appeared for Mtoni. Rangi's attendance is unconfirmed. | [D02@v1] |
| Latest response content | Draft response v2 adds a request for the commissioning checklist. | [D06@v2] |
| Approval | The director approved response v1 to send. No approval is recorded for v2. Approval of v1 does not approve v2. | [D05@v1], [D06@v2] |
| Dispatch | Dispatch is not established by the supplied records. Approval of v1 to send does not establish that v1 was sent. No dispatch is recorded for v2. | [D05@v1], [D06@v2] |

Absence statements describe the supplied records, not proof that an action
never occurred. Do not turn Rangi's unconfirmed attendance into either confirmed
attendance or confirmed absence. Do not infer that either response version was
sent, or treat approval of v1 as approval of the latest version.

## Acceptance procedure

1. As the registry user, load the matter metadata and D01–D06. Ask the Run A
   question and compare every field and citation with the expectations above.
2. Reopen **every citation** through `read_matter_document`, using its selected
   matter, document, and exact version. Check the returned version and verify
   each associated claim against the source, including the limits of claims
   about approval, dispatch, and attendance. Supplied party metadata must also
   match the matter record. A source identifier without reopening is insufficient.
3. Add D07 to the same matter and ask the identical Run B question. Compare the
   two briefings: the hearing field and its citation must change as specified;
   every other field and its citation set must remain the same.
4. Reopen every Run B citation at its exact version and verify each claim again.
   Also reopen Run A's saved `[D03@v1]` citation: it must still return the original
   notice, while Run B uses D07 for the current hearing. Reopening must pass the
   backend's matter access check for the current user and document-version
   ownership checks each time.
5. Fail acceptance for a stale Run B hearing, a citation that resolves to a
   different version, an unsupported claim, any changed non-hearing field or
   citation set, confirmed attendance or absence for Rangi, inferred dispatch,
   or approval incorrectly carried from v1 to v2.
