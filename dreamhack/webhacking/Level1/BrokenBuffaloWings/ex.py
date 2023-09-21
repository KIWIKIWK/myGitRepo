# 해설
# report.php 의 입력값이 bot.py의 입력값으로 들어가 read_url 함수를 실행시킴
#<Script src="/index.php?&comment=alert(1)></Script>

import requests

url="http://host3.dreamhack.games:10600/index.php?&comment=atestlol"
param={"path":"h"}
res = requests.post(url)

print(res.status_code,res.text)