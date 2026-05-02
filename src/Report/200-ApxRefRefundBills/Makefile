INFRA := $(shell git root )/infra


t: target
c: clean

GPDFS=010-Apx.pdf

XPDFS=\
	100-RefundAndRebill-June2025ReverseCharge.pdf \
	110-OriginalLaterRefunded-1Oct24-26Dec24.pdf \
	120-OriginalLaterRefunded27Dec24-28Mar25.pdf

ALLPDFS=${GPDFS} ${XPDFS}

TPDF=000-ApxRefundBills.pdf

### Generic Stuff

${TPDF}: ${ALLPDFS}
	pdf --cat ${ALLPDFS} -o ${TPDF};

.md.pdf:
	pan $<;
	mv out.pdf $@;


target: ${TPDF}
clean: 
	rm -f ${TPDF}
	rm -f ${GPDFS}

### ---
