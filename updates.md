# Updates Log

## 2026-03-09 09:15:42 +09:00
- Initial release of role-based public administration writing assistant UI.
- Added Section 1 for phrase draft improvement:
  - Input for user draft text.
  - Input for nuance/tone intent.
  - Input for internal/external search keywords.
  - Generated 3 report-ready phrase proposals.
  - Simulated expert opinions from roles a~d and coordinator d consolidation.
- Added Section 2 for regulation/procedure adequacy review:
  - Input for document type.
  - Input for user-defined check focus.
  - Input for legal keyword search.
  - Generated compliance checklist and review opinion.
- Implemented source-search helper buttons opening law and security-related sources.
- Added framework disclosure section (CoSTAR, Self-Refine, Metacognition, role-based review).
- Styled UI for desktop/mobile with responsive layout.

## 2026-03-09 09:45:10 +09:00
- Updated title and subtitle text:
  - Title changed to "보고서 문구 노가다 도비".
  - Subtitle changed to "언제쯤 이 도비생활을 끝낼 수 있을까?".
- Refactored layout for readability:
  - Enforced clear two-column structure (Section 1 / Section 2 separated by dedicated columns).
- Section 1 changes:
  - Removed "내/외부 자료 검색 키워드" input.
  - Removed external source-open buttons.
  - Kept objective-focused rewrite flow: user draft -> polished report-ready 3 options.
- Section 2 changes:
  - Removed "검토용 법령 키워드" input.
  - Replaced document type text input with file upload input.
  - Added uploaded-file-based regulation detection logic (keyword-driven from file text + user check focus).
  - Added fallback behavior when text extraction is limited by file format.
- Removed separate framework display section from UI.
- Redesigned theme to bright/simple visual style with lighter palette and cleaner spacing.

## 2026-03-09 09:54:55 +09:00
- Section 1 updated:
  - Renamed "원하는 뉘앙스" to "요청사항".
  - Changed flow to request-driven rewrite: draft + request -> 3 finalized outputs.
  - Added explicit reason per output.
  - Updated result policy to show only expert a~d consensus-completed outputs (no intermediate debate logs).
- Section 2 updated:
  - Removed file-upload requirement.
  - Added text-based review target input.
  - Added external-search-based legal/procedural comparison mode with automatic regulation candidate detection.
  - Added per-law external search links (law.go.kr) and quick open search button.
- Updated UI controls and responsive button grid for the new flow.

## 2026-03-09 10:13:53 +09:00
- Section 2 redesign (as requested):
  - Restored file-upload-first review flow.
  - Added uploaded file text parsing (text-based formats) and analysis pipeline.
  - Added request-aware regulation/procedure detection and compliance comparison.
  - Added external search link generation per detected regulation (law text + procedure/guideline search).
  - Added review opinion + alternatives + explanation blocks.
- Added new productivity features:
  - Result copy buttons (Section 1 outputs, Section 2 review opinion).
  - Writing-style presets for Section 1.
  - Regulation comparison table in Section 2.
  - Version history for both sections using localStorage (restore/clear).
- Improved behavior details:
  - Section 1 shows only consensus-completed outputs.
  - Section 2 history restore now restores request field and guides file re-upload.

## 2026-03-09 10:22:23 +09:00
- Removed version history feature entirely:
  - Deleted Section 1/2 history UI blocks.
  - Deleted localStorage save/restore/clear logic.
- Removed "관련 규정 외부 검색 열기" button and related manual-open handler.
- Updated Section 2 flow to run automatically on "적정성 검토 실행":
  - Uploaded file analysis + request-based regulation/procedure mapping.
  - Auto-generated reference links shown directly in results (no extra open action needed).

## 2026-03-09 10:45:10 +09:00
- Moved project files into new folder: `wording/`.
- Section 2 upload UX upgraded:
  - Supports both file picker and drag-and-drop upload.
  - Added drop-zone UI with dragover highlight and keyboard activation.
  - Added selected-file status line.
- Updated Section 2 runtime to use whichever file source is active (picked or dropped).

## 2026-03-09 11:21:53 +09:00
- Removed Section 2 entirely from UI and logic.
- Upgraded file-to-draft extraction in Section 1:
  - Added PDF text extraction via pdf.js.
  - Added DOCX text extraction via mammoth.
  - Added auto-fill of extracted text into draft textarea.
- Added organization standard-set preset in Section 1:
  - 과기정통부형 / 공공기관형 / 지자체형 / 범용형.
  - Preset rules are reflected in phrase generation rationale.
- Updated layout to single-section structure and simplified CSS.

## 2026-03-09 13:02:22 +09:00
- Updated output-shape logic:
  - Detects draft form (list/prose) and preserves same form in generated outputs.
  - List draft -> list-style outputs, prose draft -> prose outputs.
- Strengthened request reflection:
  - Extracts core request focus and injects it directly into recommendation sentences.
- Strengthened org preset reflection:
  - Org preset now affects the generated sentence body (not only reasons).
- Added `phrase-text` style to preserve line breaks in list-format outputs.

## 2026-03-09 13:17:59 +09:00
- Changed output fallback policy: if format match is unclear, outputs are forced to list-style by default.


## 2026-03-09 13:23:01 +09:00
- Added forced output-format option in UI (개조식 고정/서술형 고정/초안 자동 감지).
- Set default output mode to 개조식 고정 and wired generation logic to prioritize this setting.


## 2026-03-09 13:29:46 +09:00
- Re-defined list-style output rule and enforced structural rendering.
- List output now renders as true <ul><li> items instead of sentence-like blocks.
- Added explicit list-style definition message in results (itemized, parallel, low-connective style).


## 2026-03-09 13:36:24 +09:00
- Removed file-upload section and extraction scripts from UI.
- Updated list-format output to show value-only bullets (removed labels like 핵심목표/요청사항 반영/기관기준).
- Renamed 제시 이유 to 추천 사유 and replaced with logic-based rationale text (no request-echo style).


## 2026-03-09 13:39:58 +09:00
- Simplified output to show only merged results and recommendation reasons.
- Removed extra header/status text from result area.
- Removed direct request-text echo from generated results/reasons.

