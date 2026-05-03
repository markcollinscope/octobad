
t: target
c: clean

%.pdf: %.md
	pan --quiet $< 
	mv out.pdf $@

