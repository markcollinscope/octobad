
${TARGET}: ${ALLPDFS}
	pdf --cat ${ALLPDFS} -o ${TARGET};

target: ${TARGET}

clean: 
	rm -f ${TARGET}
	rm -f ${GENPDFS}

