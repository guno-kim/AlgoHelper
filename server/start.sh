cd /home/ubuntu/aws-codedeploy
chmod +x build.sh
./build.sh
cd /home/ubuntu/aws-codedeploy
pm2 delete 0
pm2 start index.js