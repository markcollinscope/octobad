t: target
c: clean

# INFRA := $(shell git root)/infra

%.pdf: %.md
	pan --quiet $< 
	mv out.pdf $@

GENPDFS := 010-Apx.pdf

HARDPDFS := \
	100-RefundAndRebill-June2025ReverseCharge.pdf \
	110-OriginalLaterRefunded-1Oct24-26Dec24.pdf \
	120-OriginalLaterRefunded27Dec24-28Mar25.pdf

ALLPDFS :=${GENPDFS} ${HARDPDFS}

TARGET := 000-ApxRefundBills.pdf
${TARGET}: ${ALLPDFS}
	pdf --cat ${ALLPDFS} -o ${TARGET};

target: ${TARGET}

### ---

# include ${INFRA}/oct-hd.mk
# include ${INFRA}/oct.mk

clean: 
	rm -f ${TARGET}
	rm -f ${GENPDFS}
