#!/bin/sh
today=$(date +%Y%m%d)
path = $1
streamname = $2
ffmpeg -i $1  -f mp4 /var/www/record/stream/$2.mp4;
curl -X POST http://127.0.0.1/api/record/stream_done/$2.mp4;
