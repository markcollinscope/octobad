INFRA := $(shell git root)/infra

include ${INFRA}/oct-hd.mk


GENPDFS := 010-Apx.pdf

HARDPDFS := \
	110-RefundRebill.pdf \
	120-Refunded1.pdf \
	130-Refunded2.pdf

ALLPDFS :=${GENPDFS} ${HARDPDFS}

TARGET := 000-ApxRefundBills.pdf

include ${INFRA}/oct.mk