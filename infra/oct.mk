ALLPDFS := ${GENPDFS} ${HARDPDFS}
TARGET := $(shell basename $$(pwd) ).pdf
XTARGET := $(shell echo $(TARGET) | sed 's/^.*-/999-/'  )

${TARGET}: ${ALLPDFS}
	pdf --cat ${ALLPDFS} -o ${TARGET};
	cp $(TARGET) $(XTARGET)
	@echo built: $(TARGET) $(XTARGET)

target: ${TARGET}

clean: 
	rm -f ${TARGET}
	rm -f ${XTARGET}
	rm -f ${GENPDFS}

