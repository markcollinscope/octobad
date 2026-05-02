#!/bin/bash

. utils.shi

readonly USAGE=$(cat << UTXT
    Usage: $0 [-option] <file(s)>
    option selection is mandatory.

UTXT
);

eval $(boolopt --rem "split pdfs into pages in sub-dir named as pdf prefix" -s,--split SPLIT "$@");
eval $(boolopt --rem "<dir> <pdfs> Copy pg 2 of pdf(s) to <dir>" -2 TWO "$@");
eval $(boolopt --rem "<dir> <pdfs> Run all the preceding operations in order shown" -a,--all ALL "$@");
eval $(boolopt --rem "Convert name fmt: <2024-04-29.G-bill.pdf> -> <2024-04-29.pdf>" -n,--name NAME "$@");
eval $(boolopt --rem "<dir> <pdf> View (the assumed pg 2) of the pdf in <dir> - as per -2 option" --v2 VIEW2 "$@");

mvToDateName()
{
    for i in "$@"; do
        new=$(sed -E 's/\.G-bill//g' <<< $i);
        mv $i $new
    done
}

getSplitDir()
{
    local pdf=$1;
    basename $pdf .pdf
}

mkSplit()
{
    for i in "$@"; do
        dir=$(getSplitDir $i);
        pdf --split $i --out $dir;
        ne mv $dir/doc_data.txt /tmp
    done
}

doPgTwo()
{
    local tdir=$1; 
    shift;
    for i in "$@"; do
        sdir=$(getSplitDir $i);
        mkdir -p $tdir;
        
        local from=$sdir/$sdir.002.pdf;
        local to=$tdir/$(sed 's/.002//g' <<< $sdir.002.pdf);
        vbvar to
        CMD="cp $from $to";
        evalvb $CMD
    done    
}

viewPgTwo()
{
    local tdir=$1;
    local pdf=$2;
    pdf -v $tdir/$pdf;
}

main()
{
    vbfnecho "$@";

    chkargcount -l 1 "$@";

    if $NAME; then
        mvToDateName "$@";
        exitok;

    elif $SPLIT; then
        mkSplit "$@";
        exitok; 

    elif $TWO; then
        chkargcount -l 2 "$@";
        doPgTwo "$@";
        exitok; 

    elif $VIEW2; then
        chkargcount -l 2 "$@";
        vbecho "Viewing pg 2 of $2 in $1";
        viewPgTwo "$@";
        exitok;

    elif $ALL; then 
        chkargcount -l 2 "$@";
        local tdir=$1; 
        shift;
        mkSplit "$@";
        doPgTwo $tdir "$@";
        exitok;

    else
        Usage
        exiterr;
    fi

    mvToDateName "$@";
}

main "$@";