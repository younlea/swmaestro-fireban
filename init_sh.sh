#!/bin/sh
echo Y | sudo add-apt-repository main
echo Y | sudo add-apt-repository universe
echo Y | sudo add-apt-repository restricted
echo Y | sudo add-apt-repository multiverse
echo Y | sudo apt-get update
echo Y | sudo apt-get upgrade
echo Y | sudo apt-get install python
echo Y | sudo apt-get install python3
echo Y | sudo apt-get install gdb
echo Y | sudo apt-get install ssh
echo Y | sudo apt-get install net-tools
echo Y | sudo apt-get install git
echo Y | sudo apt-get install clang
echo Y | sudo apt-get install cmake
echo Y | sudo apt-get install lldb
echo Y | sudo apt-get install vim
echo Y | sudo apt-get install fail2ban
echo Y | sudo apt-get install python-pip
echo Y | sudo python -m pip uninstall pip
echo Y | sudo apt-get install python-pip --reinstall
sudo ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime
echo Y | sudo apt-get upgrade
echo Y | sudo apt-get install python3-pip
echo Y | sudo apt-get install nginx
echo Y | sudo apt-get install libnginx-mod-rtmp
echo Y | apt-get install gunicorn
echo Y | sudo service nginx restart
echo Y | sudo apt-get install mariadb-server
echo Y | sudo apt-get install libmysqlclient-dev
echo Y | sudo apt-get install ffmpeg
echo Y | sudo curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
echo Y | sudo apt update && sudo apt install yarn
echo Y | sudo mkdir /var/www/record
echo Y | sudo mkdir /var/www/record/tic
echo Y | sudo mkdir /var/www/record/stream
echo Y | sudo chown -R www-data /var/www/record
echo Y | sudo mkdir /var/www/detect
echo Y | sudo chmod -R 777 /var/www/detect
echo Y | sudo mkdir /var/www/output
echo Y | sudo mkdir /var/www/output/origin
echo Y | sudo mkdir /var/www/output/result
echo Y | sudo chmod -R 777 /var/www/output
echo Y | sudo mkdir /var/www/api
echo Y | sudo mkdir /var/www/api/stream
echo Y | sudo mkdir /var/www/api/stream/live
echo Y | sudo mkdir /var/www/api/stream/tic
echo Y | sudo chown -R www-data /var/www/api/stream
echo Y | sudo mv ./nginx_conf/fireban_nginx_conf /etc/nginx/sites-available/
echo Y | sudo mv ./nginx_conf/nginx.conf /etc/nginx/
echo Y | sudo ln -s /etc/nginx/sites-available/fireban_nginx_conf /etc/nginx/sites-enabled/
echo Y | sudo rm /etc/nginx/sites-enabled/default
echo Y | sudo rm /etc/nginx/sites-available/default
echo Y | sudo service nginx restart
echo Y | sudo mv ./gunicorn.service /etc/systemd/system/
echo Y | sudo mkdir /home/webmaster
echo Y | sudo mv ./fireban /home/webmaster
echo Y | sudo mv ./front /home/webmaster
echo Y | sudo mv ./stream /home/webmaster
echo Y | sudo mkdir /home/webmaster/fireban/run
pip3 install gunicorn
pip3 install Django gunicorn
echo Y | sudo service gunicorn restart
