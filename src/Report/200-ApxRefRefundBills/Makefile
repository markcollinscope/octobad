INFRA := $(shell git root)/infra

include ${INFRA}/oct-hd.mk


GENPDFS := 010-Apx.pdf

HARDPDFS := \
	100-RefundAndRebill-June2025ReverseCharge.pdf \
	110-OriginalLaterRefunded-1Oct24-26Dec24.pdf \
	120-OriginalLaterRefunded27Dec24-28Mar25.pdf

ALLPDFS :=${GENPDFS} ${HARDPDFS}

TARGET := 000-ApxRefundBills.pdf

include ${INFRA}/oct.mk