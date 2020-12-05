# Serer Setup

```
chmod 744 init_sh.sh
./init_sh.sh
```

# DB Setup
```
mysql -uroot -p
// mysql 접속
CREATE DATABASE fireban default character set utf8 collate utf8_unicode_ci;

// fireban database 생성
GRANT ALL PRIVILEGES ON fireban.* to fireban@'%' IDENTIFIED BY 'fireban12#$';

//fireban database 접속 계정 생성
```

# Back-End
```
cd /home/webmaster/fireban
pip3 install mysqlclient
pip3 install -r requirement.txt
python3 manage.py makemigraions
python3 manage.py migrate
python3 manage.py createsuperuser
// 어드민 계정 생성 id, 이름, password 입력
service gunicorn restart
```

# Front-End
```
cd /home/webmaster/front
yarn add package
yarn build -p
```


# [IMPORTANT] Server Reboot
```
service gunicorn restart
// 꼭 서버 재식작시 실행해줘야 backend가 제대로 동작함.
```
