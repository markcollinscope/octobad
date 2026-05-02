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
