#!/bin/bash

readonly DIRNAME=$(basename $(pwd));
readonly PDF=$DIRNAME.pdf

doApxCover()
{
	local cover="010-Apx"
	
	pan $cover.md;
	mv out.pdf $cover.pdf
}

doApxAll()
{
	ls *.pdf;
	exit;
	pdf --cat *.pdf --out $PDF
}

main()
{
	doApxCover;
	doApxAll;
}

main "$@";
