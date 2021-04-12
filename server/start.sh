cd /home/ubuntu/aws-codedeploy/docker
chmod +x build.sh
./build.sh
cd ../
pm2 delete 0
pm2 start index.js