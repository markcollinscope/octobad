
t: target
c: clean

%.pdf: %.md
	sed -f $(INFRA)/subst.sed < $< > /tmp/sed.out
	pan --quiet /tmp/sed.out
	mv out.pdf $@
