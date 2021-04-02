domain="${DOMAINNAME:-localhost}"
email="${EMAIL:-noreply@gmail.com}"

echo "domain=$domain email=$email"


sleep 3 # give renewcerts a sec to do it's first check

echo "Entrypoint finished, executing nginx..."; echo
exec nginx