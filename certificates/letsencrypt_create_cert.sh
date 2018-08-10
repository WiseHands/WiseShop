#!/usr/bin/env bash
set -e

# start main config

sourcefile="/home/bogdan/wisehands/domains.txt"
domains=$(readarray < "$sourcefile")
email=bohdaq@gmail.com
w_root=/tmp/certbot/public_html
user=bogdan
group=bogdan

# end main config

if [ "$EUID" -ne 0 ]; then
    echo  "Please run as root"
    exit 1
fi

readarray rows < $sourcefile
for row in "${rows[@]}"; do
row_array=(${row})
first=${row_array[0]}
#echo "-d ${first}"

# domain config start
conffile=/etc/lighttpd/conf.d/${first}.conf
redirecturl="https://%0\$0"
conftext="\$SERVER[\"socket\"] == \":443\" {
    \$HTTP[\"host\"] == \"${first}\" {
        ssl.pemfile = \"/etc/letsencrypt/live/${first}/ssl.pem\"
            ssl.ca-file =  \"/etc/letsencrypt/live/${first}/fullchain.pem\"
                proxy.server = (
                    \"\" => (( \"host\" => \"127.0.0.1\", \"port\" => 3334 ))
                )
    }
}
\$HTTP[\"url\"] !~ \"^/.well-known\" {
   \$HTTP[\"scheme\"] == \"http\" {
       \$HTTP[\"host\"] =~ \"${first}\" {
          url.redirect = ( \".*\" => \"$redirecturl\" )
       }
   } 
}";

# domain config end

if [ ! -f "$conffile" ]
then
echo "config file not found for ${first}"
/usr/bin/certbot certonly --agree-tos --keep --email $email --webroot -w $w_root -d ${first} --post-hook="/sbin/service lighttpd reload"
cat /etc/letsencrypt/live/${first}/privkey.pem  /etc/letsencrypt/live/${first}/cert.pem > /etc/letsencrypt/live/${first}/ssl.pem
    echo "$conftext" >> "$conffile"
    echo "config successfully created for ${first}"
else
	echo "$conffile already exists."
fi

done
# restarting web-server to take effect
/sbin/service lighttpd restart
echo "script execution time is $SECONDS seconds"
