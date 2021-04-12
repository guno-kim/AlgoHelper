@echo off
docker build -t python-compiler-test:1.0 ./python
docker build -t cpp-compiler-test:1.0 ./cpp
docker build -t java-compiler-test:1.0 ./java