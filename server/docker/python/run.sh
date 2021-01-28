#!/bin/bash
cd src

cnt=0
echo "-----start-----"
while (( "${cnt}" < 3 )); do
    start=$(date +%s%3N)
    python ./testCode.py  #1
    end=$(date +%s%3N)

    echo "$(( $end - $start ))"  #2

    start=$(date +%s%3N)
    python ./myCode.py  #3
    end=$(date +%s%3N)

    echo "$(( $end - $start ))" #4
    (( cnt = "${cnt}" + 1 ))
done
echo "-----end-----"
