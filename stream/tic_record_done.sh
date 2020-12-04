#!/bin/sh
today=$(date +%Y%m%d)
path = $1
streamname = $2
echo today > ./today.txt
echo $2 > ./streamname.txt
echo $1 > ./path.txt
ffmpeg -i $1  -f mp4 /var/www/record/tic/$2.mp4;
curl -X POST http://127.0.0.1/api/record/tic_done/$2.mp4;
