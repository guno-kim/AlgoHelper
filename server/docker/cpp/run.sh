#!/bin/bash
cd src
g++ testCode.cpp -o main

cnt=0
echo "-----start-----"
while (( "${cnt}" < 12 )); do
    start=$(date +%s%3N)
    ./main  #1
    end=$(date +%s%3N)

    echo "-----time-----$(( $end - $start ))-----end-----"  #2

    (( cnt = "${cnt}" + 1 ))
done
