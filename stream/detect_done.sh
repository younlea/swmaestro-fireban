#!/bin/sh
today=$(date +%Y%m%d)
path = $1
streamname = $2
echo today > ./today.txt
echo $2 > ./streamname.txt
echo $1 > ./path.txt
mkdir -p /var/www/detect/$today
ffmpeg -i $1  -f mp4 /var/www/detect/$today/$2.mp4;
