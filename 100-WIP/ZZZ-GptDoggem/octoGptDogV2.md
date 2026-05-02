OCTOGPTFOLDOG

STATE / CHECKPOINT
- Current source snapshot saved earlier as latest working set.
- Spreadsheet workflow active:
  - Template received
  - G V1 received
  - mapped workbook created
  - OctoFin1 rows appended into mapped workbook
- Current workbook checkpoint:
  - OctoSheet_mapped_v2_with_OctoFin1.xlsx
- Rule remains:
  - DATA_IN → classify → integrate → status → checkpoint
  - one step at a time
  - preserve state first

CORE CASE STRUCTURE
- P01 DD increase / shock increase
- P02 DD inconsistency vs projected usage, especially Sept
- P03 unauthorised DD withdrawal / attempt
- P04 Avro transfer / sign / interpretation / unexplained correction
- P05 complaint handling failures
- P06 refund / balance discrepancy issues

MOST IMPORTANT OPEN AVRO QUESTION
- What is the evidential and calculation basis for the £831.49 Avro credit adjustment?

AVRO POSITION
- Octopus arithmetic is internally consistent:
  - transferred balance -£1,124.93
  - credit applied £831.49
  - remaining -£293.44
- But:
  - source/rationale for £831.49 not evidenced
  - no auditable reconciliation shown
  - customer cannot independently verify balance
- Best framing:
  - do not argue arithmetic
  - argue lack of traceability, interpretation clarity, and source proof

APP / BILL PRESENTATION ISSUE
- App wording reportedly says things like:
  - “We credited your account”
  - “DEBT SET ASIDE”
  - “Balance = £0.00”
- Concern:
  - a reasonable customer could read that as debt cleared / no longer payable
- Related evidence lead:
  - Feb 2023 statement framing appears Jan/Feb-ish but includes older Oct-Dec gas charges
  - possible “presentation-slippage” between app, bill, and cover framing
- This is a strong “misleading in effect” point, regardless of intent

NEW EVIDENCE LEAD: GAS METER HISTORY ANOMALY
- App gas reading history seen:
  - 25 Mar 2025: 65,416
  - 1 Apr 2025: 64,046
  - 16 Jun 2025: 64,120
  - 29 Jun 2025: 65,837
- Sequence appears to go down, then up again, rather than monotonic increase
- Treat as:
  - evidence lead
  - possible material billing-impact issue
- Needs comparison against:
  - bill readings
  - estimated/actual markers
  - correction history
  - any meter replacement/reset explanation

SPREADSHEET / FIGURES STATUS
- G data is useful but not source-truth
- Best rule:
  - empirical document fact > extracted data > hypothesis > model
- G sheet should be treated as:
  - working reconstruction / analysis layer
  - not final evidence by itself
- Gemini-style interpretation belongs in:
  - GEM_COMMENT
- Future/working field ideas now established:
  - DIR = IN / OUT
  - bill dates / period_from / period_to
  - fuel scope
  - read type
  - standing charge
  - p/kWh
  - balance before / after
  - notes / source / comment

CURRENT ANALYSIS METHOD
- Use bill/pdf/app/email as truth tier
- Use extracted figures / FinGem / sheets as analysis tier
- Use comments / inferred labels as hypothesis tier
- Pattern recognition allowed only as:
  - lead generation
  - not proof

WORKBOOKS
- Created:
  - OctoSheet_mapped_v1.xlsx
  - OctoSheet_mapped_v2_with_OctoFin1.xlsx
- v2 includes:
  - OctoFin1_Raw sheet
  - pasted finance rows appended into Bills
  - FLAG + GEM_COMMENT population
- Expected review flags include:
  - MISS_AMT
  - REVIEW
  - BAL_MISMATCH
  - SIGN_CHECK

OCTOTODO / STATUS SHAPE
DONE
- Gmail evidence classified
- structure-response email sent
- naming system defined
- thread evidence concept established
- latest source snapshot checkpointed
- gas meter-history anomaly captured as evidence lead

IN PROGRESS
- integrate / review workbook rows and flags
- P05 email evidence integration
- finance xcheck against extracted figures and screenshots

NEXT
- xcheck flagged spreadsheet rows
- compare meter anomaly against bills / estimated-actual markers
- tighten P04 Avro section
- build exhibit index
- upgrade summary to control panel
- expand P02 DD Sept logic + evidence
- add DD_CHECK
- review status and plug gaps
- checkpoint again after controlled pass

LATER
- Apps Script pass over tagged Gmail:
  - save bill PDFs
  - capture cover-note text
  - build final dataset
- then graphs:
  - cost by period
  - usage by period
  - DD vs billed cost
  - balance trajectory
  - unit-rate / standing-charge changes

TACTICAL STYLE
- calm
- polite
- no accusations
- ask questions that expose gaps
- let lack of answers do the damage

MEMORY / PROJECT RULE
- This thread = workflow / execution
- Freeform goes elsewhere
- Return here to convert ideas into actions
- If drift starts, pull back to pipeline