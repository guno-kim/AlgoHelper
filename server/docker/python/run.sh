#!/bin/bash
cd src

echo ".............START_OF_PROBLEM............."
echo ""


cnt=0
while (( "${cnt}" < 3 )); do
    echo "${cnt}"
    echo ".....input....."
    python ./main.py
    echo ".....end....."
    (( cnt = "${cnt}" + 1 )) # 숫자와 변수의 연산은 (())가 필요합니다.
done
echo ""
echo ".............END_OF_PROBLEM............."