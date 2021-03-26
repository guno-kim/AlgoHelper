#!/bin/bash
cd src

cnt=0
echo "-----start-----"
while (( "${cnt}" < 11 )); do
    start=$(date +%s%3N)
    python ./testCode.py  #1
    end=$(date +%s%3N)

    echo "${cnt}-----time-----$(( $end - $start ))"  #2

    (( cnt = "${cnt}" + 1 ))
done
echo "-----end-----"
