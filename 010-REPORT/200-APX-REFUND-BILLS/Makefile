SRC=\
	010-Apx.pdf \
	100-RefundAndRebill-June2025ReverseCharge.pdf \
	110-OriginalLaterRefunded-1Oct24-26Dec24.pdf \
	120-OriginalLaterRefunded27Dec24-28Mar25.pdf

TGT=ApxRefundBills.pdf

${TGT}: ${SRC}
	pdf --cat ${SRC} -o ${TGT};

010-Apx.pdf: 010-Apx.md
	pan 010-Apx.md;
	mv out.pdf 010-Apx.pdf;




