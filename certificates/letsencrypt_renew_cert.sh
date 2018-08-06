#!/usr/bin/env bash
set -e

# start config

sourcefile="/home/bogdan/wisehands/domains.txt"
domains=$(readarray < "$sourcefile")
email=bohdaq@gmail.com
w_root=/tmp/certbot/public_html
user=bogdan
group=bogdan

# end config

if [ "$EUID" -ne 0 ]; then
    echo  "Please run as root"
    exit 1
fi

readarray rows < /home/bogdan/wisehands/domains.txt
for row in "${rows[@]}"; do
row_array=(${row})
first=${row_array[0]}
#echo "-d ${first}"
/usr/bin/certbot certonly --agree-tos --keep-until-expiring --email $email --webroot -w $w_root -d ${first} --post-hook="/sbin/service lighttpd reload"
cat /etc/letsencrypt/live/${first}/privkey.pem  /etc/letsencrypt/live/${first}/cert.pem > ssl.pem
done
/sbin/service lighttpd restart
### Test ###

#for domain in ${domains[@]}; do
#echo "-d $domain"
#done

#for domain in "${domains[@]}"; do
#echo "/usr/bin/certbot certonly --agree-tos --keep-until-expiring --dry-run --email $email --webroot -w $w_root -d $domain --post-hook="service lighttpd reload""
#    cat /etc/letsencrypt/live/$domain/privkey.pem  /etc/letsencrypt/live/$domain/cert.pem > ssl.pem
    #&&service lighttpd restart in crontab
#done
