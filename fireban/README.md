# FireBan Streaming Server

This Project is for stream & detect API server.

Using python3 & django rest-framework.

### PROJECT

- fireban

### APP LIST

1. detect
   - req/res for detect (fire, man)
2. hwInfo
   - req/res for hw (hw-info, gps)
3. record
   - req/res for record video (when stream done)
4. streamInfo
   - req/res for stream video (hw > server > api)
5. userApp
   - req/res for user (just user for this project)



# API List

It is restful api server. So you can find api list to urls.py in each app

|URL|METHOD|PARAM|EXPLAINATION|
|:----|:---:|:----|:---:|
|detect/list/|  GET   |[int] page_param|탐지 이미지 정보 가져오기|
|detect/info/|  GET   | [string] target                                            |탐지 이미지 상세 정보 전송|
|detect/update/|  POST  |targetKey, target|탐지 이미지 정보 수정(AI 학습 플랫폼)|
|detect/find/|POST|mac, image width, height, min_x, min_y, max_x, max_y, type|탐지 정보 업로드|
|hw/info|GET|x|카메라 장비 정보 가져오기|
|hw/init|POST|mac|카메라 장비 등록|
|hw/gps|POST|mac, cordinate_x, cordinate_y, alt|GPS 정보 등록|
|hw/check/|GET|[string] target|카메라 장비 GPS 상세정보 가져오기|
|hw/record/|POST|mac, createdAt|녹화 영상 GPS 가져오기|
|record/tic_done/|GET|[string] name|열화상 스트리밍 종료 후, 영상 생성|
|record/stream_done/|GET|[string] name|실화상 스트리밍 종료 후, 영상 생성|
|record/tic/|GET|[int] page_param|열화상 녹화 영상 가져오기|
|record/stream/|GET|[int] page_param|실화상 녹화 영상 가져오기|
|record/tic/detail/|GET|[string] target|열화상 녹화 영상 상세정보 가져오기|
|record/stream/detail|GET|[string] target|실화상 녹화영상 상세정보 가져오기|
|stream/info|GET|X| 모든 hw 정보 가져오기 (스트리밍 정보) |
|stream/info/active|GET|X|스트리밍 중인 hw 정보 가져오기|
|stream/url/|GET|[string] target|스트리밍 URL 정보 가져오기|
|stream/start_stream|GET|x|스트리밍 시작 상태 전송|
|stream/stop_stream|GET|X|스트리밍 종료 상태 전송|
|stream/live/<username>/index.m3u8|GET|[string] username|[fake-view]|
|stream/check|POST|stream_key|스트리밍 영상 팡리 생성 확인|
|user/login|POST|userid, password|로그인|
|user/register|POST|userid, password, name|회원가입|
|user/refresh|POST|refresh token|토큰 갱신|
|user/user|GET||유저 정보 가져오기|





# SET-UP

Please check this "SET-UP" contents before start this project.



## 1. NGINX SETTINGS

check nginx_conf dir
- fireban_nginx_conf = nginx-site-available file
  
    > move to /etc/nginx/site-available/ and ln to site-enable
- nignx.conf = nginx conf file
  
    > overwrite to /etc/nginx/nginx.conf



## 2. OS
ubuntu 18.04



## 3. Dependancy
- Dependancy List

	> asgiref==3.2.10
	> certifi==2020.6.20
	> chardet==3.0.4
	> Django==3.0.8
	> django-cors-headers==3.4.0
  > django-markdownx==3.0.1
  > djangorestframework==3.11.0
  > djangorestframework-simplejwt==4.4.0
  > idna==2.10
  > importlib-metadata==2.0.0
  > Markdown==3.3
  > numpy==1.19.4
  > Pillow==7.2.0
  > PyJWT==1.7.1
  > pytz==2020.1
  > PyYAML==5.3.1
  > requests==2.24.0
  > six==1.15.0
  > sqlparse==0.3.1
  > urllib3==1.25.10
  > zipp==3.3.0

- How to Install

```
    apt-get install -y python3
    apt-get install -y python3-pip
    apt-get install -y nginx
    apt-get install -y nginx-rtmp
    apt-get install -y gunicorn
    service nginx restart
    pip3 install -r requirements.txt
    
```



## 4. gunicorn set

### 4.1 gunicorn.service
use gunicorn and set service 
make file to /etc/systmed/system/gunicorn.service

```
[Unit]
Description=gunicorn daemon
After=network.target



[Service]
User=root
Group=www-data
WorkingDirectory=/home/webmaster/fireban
ExecStart=/usr/local/bin/gunicorn --workers=5 --max-requests=1000 --bind=unix:/home/webmaster/fireban/run/gunicorn.sock fireban.wsgi:application
#ExecStart=/home/ubuntu/[project_directory]/venv/bin/gunicorn --workers 3 --bind unix:/home/ubuntu/[project_directory]/gunicorn.sock config.wsgi:application

[Install]
WantedBy=multi-user.target

```

have to make run dir in "WorkingDirectory"

### 4.2 gunicorn service
```
    service gunicorn restart
```

