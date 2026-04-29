ssheetDoggy — bills ssheet format for octoGpt

PROJECT
- auto-admin / octoGpt / bills-ssheet

CORE IDEA
- one row = one bill
- left to right blocks:
  1. financial truth
  2. gas
  3. elec
  4. calc / audit
  5. refs

ROW LAYOUT
- rows 1–10  : control / analysis
- row 11     : headers
- row 12+    : data

SIGN MODEL
- + = I owe supplier (debit)   -> red
- - = supplier owes me (credit)-> green

LHS FINANCIAL BLOCK
- SUP
- STMT
- FROM
- TO
- DAYS
- BFWD
- PAY
- ADJ
- NEW
- BNEW

RULE
- BFWD + PAY + ADJ + NEW = BNEW

GAS BLOCK
- G_S
- G_E
- G_U
- G_KWH
- G_RATE
- G_USE£
- G_STND£
- G_TOT£
- G_ANN

ELEC BLOCK
- E_S
- E_E
- E_U
- E_RATE
- E_USE£
- E_STND£
- E_TOT£
- E_ANN

CALC / AUDIT BLOCK
- G_FACT
- G_CV*
- CHK
- G_£/DAY
- E_£/DAY
- TOT_£

REFS BLOCK
- FILE
- NOTES
- SOURCE_TYPE

TOP CONTROL / ANALYSIS
- N_DAYS
- AS_OF_DATE
- LATEST_BAL
- G_AVG_KWH/D
- G_AVG_£/D
- G_ANN_£
- E_AVG_U/D
- E_AVG_£/D
- E_ANN_£
- LATEST_G_PROJ
- LATEST_E_PROJ
- PROJ_Δ_G

COLOUR RULES
- white   = raw bill values
- yellow  = calculated values
- grey    = analysis / refs
- pale blue = editable control cells
- red     = positive money values on balance cols
- green   = negative money values on balance cols

UX RULES
- freeze LHS through BNEW
- collapse everything to the right
- LHS alone should tell money story
- middle explains why
- RHS checks if true

PIPELINE IDEA
- Gmail label -> PDF -> parse -> append row
- sheet does logic
- ingest stays dumb
- sheet stays smart

MINIMUM EXTRACT PER BILL
- supplier
- statement date
- bill from/to
- days
- balances / payments / adjustments / new charges / new balance
- gas values
- elec values
- annual projections
- source filename / note

NOTES
- keep raw values on left/middle
- keep derived / implied / audit values on RHS
- refs far RHS only
- avoid text like “credit/debit” in money cells; use sign instead

STATUS
- model proven with 3 OVO bills
- ready to reuse for Octopus / OctoGpt