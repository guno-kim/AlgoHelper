#!/bin/bash
cd src

echo ".............START_OF_PROBLEM............."
cnt=0
while (( "${cnt}" < 3 )); do
    echo "testCode:input"
    python ./testCode.py
    echo "testCode:end"

    echo "myCode:input"
    python ./myCode.py
    echo "myCode:end"


    (( cnt = "${cnt}" + 1 )) # 숫자와 변수의 연산은 (())가 필요합니다.
done
echo ".............END_OF_PROBLEM............."