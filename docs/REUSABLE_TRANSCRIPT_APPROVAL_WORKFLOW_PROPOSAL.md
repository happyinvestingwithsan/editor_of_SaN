# Reusable Transcript Approval Workflow Proposal

**Document Version:** 1.0  
**Date:** October 10, 2026  
**Status:** **PROPOSAL ONLY (NO CODE OR PIPELINE IMPLEMENTATION AUTHORIZED YET)**  
**Scope:** Reusable End-to-End Production Architecture for All Future Happy Investing Recordings

---

## 1. Executive Summary & Design Philosophy

The investigation of `HappyInvesting_Test_v10` revealed a fundamental architectural gap: **the rough-cut pipeline previously attempted to solve editorial content selection and video rendering in a single unmonitored pass**. This allowed automated heuristics to silently retain abandoned takes, duplicate phrases, and stuttered sign-offs, delivering flawed edits to CapCut without human verification.

This document proposes a permanent, reusable production architecture that enforces a **strict two-phase separation of concerns**:
1. **Phase 1: Editorial Intelligence & Content Approval Gate.**  
   The system transcribes, identifies alternative takes, clusters thoughts, and formulates an editorial recommendation. **Execution halts completely.** A human reviewer must explicitly approve the final spoken transcript and source ranges.
2. **Phase 2: Deterministic Assembly, Rendering, & Independent Validation.**  
   Once (and only once) a versioned transcript is formally approved, downstream engines consume that decision contract deterministically. No downstream component (EDL generator, video renderer, CapCut adapter) is permitted to re-decide content, alter boundaries, or choose alternative takes.

---

## 2. Separation of the Reusable Engine from Video-Specific Editorial Plans

```
┌────────────────────────────────────────────────────────────────────────┐
│                   REUSABLE EDITING ENGINE                              │
│  • GPU Acoustic Transcription (Word-level timestamps & probabilities) │
│  • Global Semantic Take Clustering (Identifies rehearsed/competing takes)│
│  • Cadence & Boundary Refiner (Preserves natural vocal attack/decay)   │
│  • Deterministic Gated Pipeline Executor (Enforces approval contract)  │
│  • Independent Post-Render Verification (Whisper transcript audit)     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ consumes
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   VIDEO-SPECIFIC EDITORIAL CONTRACT                    │
│  • Unique Recording ID & Source File Hash                              │
│  • Explicit Hook, Explanation, Pitch, & Sign-off blocks                │
│  • Zero Hardcoded Phrases (Supports CTA, Multiple CTAs, or No CTA)    │
│  • Arbitrary Duration, Block Count, and Narrative Structure           │
│  • Explicit Rejection Log & Human Decision Audit Trail                 │
└────────────────────────────────────────────────────────────────────────┘
```

### 2.1 The Reusable Editing Engine (Platform Invariants)
The reusable engine provides domain-agnostic, video-independent capabilities:
- **Acoustic Transcription:** Uses GPU Whisper (`small` or `medium`) with word-level forced alignment, tracking start, end, and confidence for every spoken token.
- **Global Alternative-Take Detection:** Compares speech segments across arbitrary time distances (including takes separated by 10s–30s of silence or intervening discussion) using semantic embedding similarity and ngram overlap, rather than naive adjacent-segment checks.
- **Thought-Block Clustering:** Aggregates related sentences into logical thematic blocks (Hook, Context, Framework, Offer, Outro).
- **Phonetic Boundary Protection:** Automatically computes leading attack handles (+0.05s–0.15s) and trailing decay handles (+0.20s–0.40s) to prevent phoneme truncation.
- **Independent Quality Gate (Audit):** Transcribes rendered video audio from scratch and validates that the output matches the approved editorial contract word-for-word.

### 2.2 The Video-Specific Editorial Plan (No Hardcoded Assumptions)
Every recording is unique. The engine must never impose hardcoded assumptions:
- **Zero Fixed Phrasing:** The engine must never search for hardcoded words like *"In this tool"*, *"For the full video"*, or *"Happy investing"*.
- **Zero Structural Assumptions:** Recordings may have:
  - No call-to-action (pure educational Short).
  - Multiple calls-to-action (e.g., newsletter signup + YouTube channel).
  - No formal sign-off (cold cut).
  - Non-standard formats (interviews, multi-speaker, continuous monologue).
- **Integrity of the Spoken Word:** The engine must never invent missing words, synthesize transition phrases, or silently rewrite dialogue. What was spoken on camera is the sole authority.

### 2.3 The Current Recording (`Test_v10.mp4`) as a Regression Fixture
`Test_v10.mp4` serves as a permanent regression fixture to verify the engine's ability to solve known failure modes:
1. Rehearsal take pruning across long gaps (Take 1 vs. Take 4 separated by 98 seconds).
2. Lexical duplicate excision across cut boundaries (*"In this tool"*).
3. Aborted sentence fragment exclusion (trailing CTA stumble after pitch climax).
4. Hesitant retake rejection (2.0s mid-sentence freeze in bio-link take).
5. Duplicate sign-off suppression (*"See you in the next one"* loop).

Generalized unit tests with synthetic transcript fixtures will verify that the take clustering engine correctly handles recordings with 0 CTAs, 2 CTAs, or completely different vocabulary.

---

## 3. Explicit Workflow State Machine

The pipeline operates as a deterministic finite-state machine with an immutable human approval barrier:

```
[SOURCE_READY]
      │
      ▼
[TRANSCRIPTION_READY]
      │
      ▼
[EDITORIAL_REVIEW_READY]
      │
      ▼
══════════════════════════════════════════════════════════════════
[AWAITING_APPROVAL] ◄──────────────────────┐
      │                                    │
      ├───► [REVISION_REQUESTED] ──────────┘ (Human feedback / edits)
      │
      ▼ (Explicit Human Sign-Off)
[APPROVED]
      │
      ▼
[EDL_GENERATED]
      │
      ▼
[RENDERED]
      │
      ▼
[VALIDATED] ───► (Validation Fails) ───► [VALIDATION_FAILED] ───► [REVISION_REQUESTED]
      │
      ▼ (Validation Passes)
[CAPCUT_READY]
```

### State Definitions & Transition Rules

| State | Prerequisites | Allowed Actions | Hard Gate Enforcement |
|---|---|---|---|
| `SOURCE_READY` | Raw video file exists, valid audio stream verified. | Resample audio to 16 kHz mono WAV. | Cannot generate EDL or render. |
| `TRANSCRIPTION_READY` | Word-level GPU Whisper transcript generated. | Run take clustering & dead-air analysis. | Cannot generate EDL or render. |
| `EDITORIAL_REVIEW_READY` | Initial recommendation generated. | Compile markdown review doc & draft JSON contract. | Cannot generate EDL or render. |
| **`AWAITING_APPROVAL`** | `FINAL_TRANSCRIPT_REVIEW_VX.md` presented to human. | Human review; line adjustment; rejection. | **MANDATORY HARD STOP.** Pipeline runner terminates with exit code 0 or halts. Any attempt to invoke EDL generator or renderer raises `UnapprovedTranscriptError`. |
| `REVISION_REQUESTED` | Human provided feedback or changed in/out bounds. | Regenerate review document with incremented version (`V2`, `V2.1`, etc.). | Transitions back to `AWAITING_APPROVAL`. Previous approvals are completely voided. |
| **`APPROVED`** | Human issued explicit cryptographic/metadata sign-off. | Generate production EDL strictly bound to approved ranges. | Downstream tools verify approval hash. If transcript file is touched, status immediately reverts to `AWAITING_APPROVAL`. |
| `EDL_GENERATED` | Deterministic EDL produced from approved contract. | Invoke FFmpeg lossless cutter/renderer. | EDL must strictly match approved contract SHA-256. |
| `RENDERED` | Preview / master video file exported to disk. | Resample rendered audio; invoke independent Whisper audit. | CapCut timeline cannot be touched yet. |
| `VALIDATED` | Rendered transcript matches approved contract $\ge 99.5\%$; no audio drift. | Inject cuts into CapCut `draft_content.json`. | CapCut integration authorized. |
| `VALIDATION_FAILED` | Audio dropped, phoneme clipped, or sync drifted. | Generate failure forensic report; halt. | CapCut update blocked; reverts to `REVISION_REQUESTED`. |
| `CAPCUT_READY` | CapCut project updated and verified. | Production complete; ready for color/sound/captioning. | Final state. |

---

## 4. The Machine-Readable Editorial Contract (`editorial_contract.json`)

To prevent the renderer from silently making independent editorial choices, the approved decisions are encoded into a strictly validated JSON contract.

### Contract Schema Specification:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "contract_version": "1.0.0",
  "recording_id": "HappyInvesting_Test_v10",
  "source_file": {
    "relative_path": "input/Test_v10.mp4",
    "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "total_duration_seconds": 225.109
  },
  "review_version": "V2.1",
  "approval_status": "APPROVED",
  "approval_metadata": {
    "approved_by": "USER",
    "approved_at": "2026-10-10T20:15:00Z",
    "contract_content_hash": "a1b2c3d4e5f6...",
    "playback_speed_target": 1.0
  },
  "retained_blocks": [
    {
      "block_id": 1,
      "label": "Hook Premise",
      "spoken_text": "A 52 week low for a stock does not mean the stock is cheap, but it can tell you something",
      "speech_range": {
        "start_seconds": 6.584,
        "end_seconds": 12.784,
        "timecode_start": "00:06.584",
        "timecode_end": "00:12.784"
      },
      "clip_bounds": {
        "source_start_seconds": 6.800,
        "source_end_seconds": 19.500,
        "leading_handle_seconds": 0.216,
        "trailing_handle_seconds": 0.396
      },
      "confidence": 0.98,
      "review_flag": false
    }
  ],
  "rejected_ranges": [
    {
      "source_start_seconds": 1.720,
      "source_end_seconds": 2.680,
      "spoken_text": "And 52 week",
      "category": "false_start",
      "reason": "Aborted pre-speech false start before clean opening hook"
    },
    {
      "source_start_seconds": 32.800,
      "source_end_seconds": 33.680,
      "spoken_text": "in this tool,",
      "category": "lexical_echo",
      "reason": "Redundant qualifier; excised to prevent duplicate against Block 04"
    }
  ],
  "summary_metrics": {
    "total_pure_speech_seconds": 82.122,
    "total_assembled_seconds": 84.134,
    "total_clips_count": 7,
    "cut_count": 6
  }
}
```

### Cryptographic Hash Lock:
Before `edl_generator.py` or `renderer.py` executes, it computes the SHA-256 hash of `retained_blocks`. If this hash does not match `contract_content_hash` in `approval_metadata`, the engine aborts immediately with:
```
RuntimeError: Execution halted. Editorial contract has been modified since approval!
```

---

## 5. Smallest Practical Implementation Plan

We recommend extending the existing, battle-tested Python codebase rather than building a redundant parallel framework.

### 5.1 Module Responsibility Matrix

| Existing Module | Current Responsibility | Required Refactor / Extension |
|---|---|---|
| `transcriber.py` | Transcribes audio via Faster-Whisper. | **Keep unchanged.** Already produces accurate word-level timestamps. |
| `analyzer.py` | Detects pauses and adjacent false starts. | **Extend:** Add global alternative-take clusterer (`TakeClusterer`) that matches thoughts across long gaps. Stop it from auto-generating cuts; have it emit proposed decisions. |
| **`editorial_gate.py` (NEW)** | *None (did not exist).* | **Create:** Generates `FINAL_TRANSCRIPT_REVIEW_VX.md` and `editorial_contract.json`. Manages approval states and verifies approval signatures. |
| `edl_generator.py` | Emits EDL from heuristic cuts. | **Refactor:** Make it a pure consumer of an `APPROVED` `editorial_contract.json`. Disallow any heuristic take selection. |
| `renderer.py` | FFmpeg video render & mix. | **Extend:** Add precondition check that verifies contract approval hash before rendering. |
| **`validator.py` (NEW)** | *None (did not exist).* | **Create:** Transcribes rendered output and runs automated WER/phoneme diff against approved transcript. |
| `capcut_adapter.py` | Modifies CapCut `draft_content.json`. | **Refactor:** Only callable if `validator.py` reports `VALIDATED`. |

### 5.2 Preventing Accidental Rendering Before Approval
1. **Pipeline Execution Guard:** The CLI command `python run_rough_cut.py --input <video>` will by default execute only up to Phase 1 (`AWAITING_APPROVAL`) and exit with instructions for human review.
2. **Explicit Approval Command:** Rendering can only be triggered via an explicit approval flag:
   ```bash
   python run_rough_cut.py --input <video> --approve-contract docs/editorial_contract.json
   ```
3. If `--approve-contract` is missing or the contract hash is unverified, `renderer.py` raises an exception and writes zero video frames.

### 5.3 Test Suite Strategy
1. **Gate Enforcement Test (`test_approval_gate.py`):**
   - Asserts that attempting to render an unapproved contract raises `UnapprovedTranscriptError`.
   - Asserts that modifying a single timestamp in an approved contract invalidates approval.
2. **Generic Take-Clustering Tests (`test_take_clusterer.py`):**
   - Synthetic fixtures testing:
     - 0 CTAs (clean monologue).
     - Multiple competing CTAs across 45-second gaps.
     - Unrelated digressions and mid-sentence stumbles.
3. **Regression Test Fixture (`test_v10_regression.py`):**
   - Asserts that running the pipeline on `Test_v10.mp4` successfully proposes the 11-block sequence without hardcoding words.

---

## 6. Artifact Directory Organization

To avoid workspace clutter and confusion between different video projects, artifacts will follow a strict hierarchical structure:

```
work/
└── [Recording_ID]/                         (e.g., HappyInvesting_Test_v10)
    ├── source/
    │   ├── raw_16k.wav
    │   └── raw_transcript.json
    ├── editorial/
    │   ├── FINAL_TRANSCRIPT_REVIEW_V1.md   (Historical)
    │   ├── FINAL_TRANSCRIPT_REVIEW_V2.md   (Historical)
    │   ├── FINAL_TRANSCRIPT_REVIEW_V2_1.md (Current Active Review)
    │   └── editorial_contract.json         (Machine-readable contract)
    ├── production/                         (Created ONLY after APPROVAL)
    │   ├── production_edl.json
    │   ├── rendered_master.mp4
    │   ├── rendered_master_transcript.json
    │   └── validation_report.md
    └── capcut/
        └── capcut_placement_manifest.json
```

---

## 7. Status of Current Production Gate

```
================================================================================
🛑 MANDATORY PRODUCTION GATE: CURRENT STATUS
================================================================================
1. Part A (docs/FINAL_TRANSCRIPT_REVIEW_V2_1.md) is complete and awaiting approval.
2. Part B (this proposal) is documented and awaiting architectural review.
3. NO code has been modified.
4. NO video has been rendered.
5. NO EDL has been updated.
6. NO CapCut timeline has been altered.

Awaiting your explicit sign-off on:
• The V2.1 final transcript and source ranges for Test_v10.mp4.
• The reusable workflow architecture proposal.
================================================================================
```
