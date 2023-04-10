from flask import Flask, render_template, request, jsonify, redirect,url_for, make_response
import sqlite3, hashlib, datetime, jwt, itertools,datetime
from mydb import *

app = Flask(__name__)
# db연결
init_db()

# 토큰 시크릿키 설정
SECRET_KEY="GilGeon"

@app.route("/pico")
def pico():
    return render_template("picoTest.html")

# 메인 홈페이지
@app.route("/")
def index():
    cookie=request.cookies.get('mytoken')
    # pid, title 을 db에서 가져오기
    sql="select pid,title from post_info"
    post_data=select_db(sql)
    if len(post_data)%10 == 0:
        page_max=len(post_data)//10
    else:
        page_max=len(post_data)//10+1

    page_index=request.args.get('page')
    if page_index is None:
        page_index=1
    else:
        page_index=int(page_index)

    if page_index==1:
        post_data=post_data[:page_index*10]
    elif page_index >= 2:
        post_data=post_data[(page_index-1)*10:page_index*10]


    page_info = {"page_max":page_max,"page_index":page_index}

    if cookie is not None:
        #토큰 복호화 해서 id값 가져오기
        user_id=jwt.decode(cookie,SECRET_KEY,algorithms='HS256')['id']
        
        #db에서 해당하는 id값의 nickname 가져오기
        sql="select nickname from user_info where id=?"
        user_nickname, =list(itertools.chain(select_db(sql, (user_id,))))[0]

        return render_template("index.html", user_nickname=user_nickname, post_data=post_data, page_info=page_info)
    else:
        return render_template("index.html", post_data=post_data, page_info=page_info)

#글 검색
@app.route("/selectPost", methods=["POST"])
def selectPost():
    title=request.form['title']
    sql="select pid,title from post_info where title like ?"
    title='%'+title+'%'
    post_data=select_db(sql,(title,))
    print(post_data)

    if len(post_data)%10 == 0:
        page_max=len(post_data)//10
    else:
        page_max=len(post_data)//10+1

    page_index=request.args.get('page')
    if page_index is None:
        page_index=1
    else:
        page_index=int(page_index)

    if page_index==1:
        post_data=post_data[:page_index*10]
    elif page_index >= 2:
        post_data=post_data[(page_index-1)*10:page_index*10]

    page_info = {"page_max":page_max,"page_index":page_index}

    return render_template("selectPost.html",post_data=post_data,page_info=page_info)
    

#글 읽어오기
@app.route("/post/<int:pid>")
def post(pid):
    # 글 정보 가져오기
    sql="select id,nickname,posted_date,title,content from post_info where pid=?"
    posted_id,nickname,posted_date,title,content=select_db(sql,(pid,))[0]

    # 글에 달린 댓글 정보 가져오기    
    sql="select cid,id,nickname,commented_date,title,content,updated from comment_info where pid=?"
    comment_data=select_db(sql,(pid,))
    print(comment_data)
    # 글에 달린 댓글이 없다면 0으로 설정
    if comment_data == []:
        comment_data = 0

    print(comment_data)

    check_user=False
    match_user=False
    developer_auth=False
    user_id=0

    # 쿠키를 통해 글을 보는 사람의 아이디 값 가져오기
    cookie=request.cookies.get('mytoken')
    if cookie is not None:
        # 유저라면 check_user가 트루 (쿠키가 있다면)
        check_user=True
        user_id=jwt.decode(cookie,SECRET_KEY,algorithms='HS256')['id']

        sql="select authority from user_info where id=?"
        user_authority,=select_db(sql,(user_id,))[0]

        # 글쓴이와 글을 보는사람이 같은 사람인지 조회 (맞으면 True, 틀리면 False)
        if user_id==posted_id:
            match_user=True
        elif user_authority == True:
            developer_auth=True        

    print(check_user)

    return render_template("post.html",
    developer_auth=developer_auth,match_user=match_user,
    check_user=check_user,user_id=user_id, # 유저 관련 데이터
    pid=pid,nickname=nickname,posted_date=posted_date,title=title,content=content, # 글 관련 데이터
    comment_data=comment_data # 댓글 데이터
    )

@app.route("/createPost", methods=["GET","POST"])
def createPost():
    if request.method=="POST":
        # title, content 가져오기
        title=request.form['title']
        content=request.form['content']

        #토큰 복호화 해서 id값 가져오기
        user_id=jwt.decode(request.cookies.get('mytoken'),SECRET_KEY,algorithms='HS256')['id']
        
        #db에서 해당하는 id값의 nickname 가져오기
        sql="select nickname from user_info where id=?"
        user_nickname, =list(itertools.chain(select_db(sql, (user_id,))))[0]

        #글쓰는 현재 시간 가져오기
        now=datetime.datetime.now()
        now_str = now.strftime("%Y-%m-%d %H:%M:%S")

        post_data=(user_id,user_nickname,now_str,title,content)
        insert_post(post_data)

        return redirect(url_for("index"))
    elif request.method=="GET":
        return render_template("createPost.html")

@app.route("/updatePost/<int:pid>", methods=["GET","POST"])
def updatePost(pid):
    if request.method == "GET": 
        # 글 제목, 내용 가져오기
        sql="select title,content from post_info where pid=?"
        title,content=select_db(sql,(pid,))[0]
    
        return render_template("updatePost.html",pid=pid,title=title,content=content)

    elif request.method == "POST":
        # post요청이 오면 title과 content 값 받아와서 update sql쿼리 실행
        title=request.form['title']
        content=request.form['content']
        post_data=(title,content,pid)
        update_post(post_data)

        return redirect(url_for("post",pid=pid))

@app.route("/deletePost/<int:pid>", methods=["POST"])
def deletePost(pid):
    delete_post((pid,))
    return redirect(url_for("index"))

@app.route("/createComment/<int:pid>", methods=["POST"])
def createComment(pid):

    # 쿠키에서 유저id 가져오기
    user_id=jwt.decode(request.cookies.get('mytoken'),SECRET_KEY,algorithms='HS256')['id']
    
    # db에서 id 조회해서 해당하는 닉네임 가져오기
    sql="select nickname from user_info where id=?"
    nickname,=select_db(sql,(user_id,))[0]

    # 댓글 다는 현재 시간 구하기
    now=datetime.datetime.now()
    now_str = now.strftime("%Y-%m-%d %H:%M:%S")

    # pid, id, nickname, commented_date, title, content
    comment_data=(pid, user_id, nickname, now_str,request.form["title"],request.form["content"], 0)
    insert_comment(comment_data)

    return redirect(url_for("post",pid=pid))

@app.route("/updateComment/<int:cid>",methods=["POST"])
def updateComment(cid):
    title=request.form["title"]
    content=request.form["content"]
    comment_data=(title,content,1,cid)
    update_comment(comment_data)

    pid,=select_db("select pid from comment_info where cid=?",(cid,))[0]

    return redirect(url_for("post",pid=pid))

@app.route("/deleteComment/<int:cid>",methods=["POST"])
def deleteComment(cid):
    pid,=select_db("select pid from comment_info where cid=?",(cid,))[0]
    delete_comment((cid,))

    return redirect(url_for("post",pid=pid))

# 로그인할때 쓸 페이지
@app.route("/login", methods=["POST"])
def login():
    id_receive=request.form['id']
    pw_receive=request.form['pw']

    pw_hash=hashlib.sha256(pw_receive.encode('utf-8')).hexdigest()

    login_data=(id_receive,pw_hash)

    # sql에서 해당 유저 조회
    sql="select * from user_info where id=? and pw=?"
    result=select_db(sql,login_data)

    # 조회가 됬다면
    if result != []:
        payload = {
            'id': id_receive,
            'exp': datetime.datetime.utcnow()+datetime.timedelta(hours=9,days=1)
            #유효기간
        }

        token = jwt.encode(payload, SECRET_KEY,algorithm='HS256')
        #print(token)

        #토큰 복호화 하면 사전형태로 key값을 id로 해서 id를 불러올 수 있음
        #print(jwt.decode(token,SECRET_KEY,algorithms='HS256'))
        return jsonify({'result':'success','token':token})
    else:
        return jsonify({'result': 'fail', 'msg': '아이디/비밀번호가 일치하지 않습니다.'})

@app.route("/register", methods=["GET","POST"])
def register():
    if request.method == "GET":
        return render_template("register.html")
    elif request.method =="POST":
        # 패스워드 해쉬 암호화
        pw_receive=request.form['pw']
        pw_hash=hashlib.sha256(pw_receive.encode('utf-8')).hexdigest()

        # 아이디, 닉네임 받아오기
        id_receive=request.form['id']
        nickname_receive=request.form['nickname']

        # 데이터를 튜플로 만들어서 db에 삽입
        user_data=(id_receive,pw_hash,nickname_receive)
        insert_user(user_data)

        return redirect(url_for("index"))

@app.route("/mypage")
def mypage():
    # 쿠키로 id값 가져와서 닉네임과 권한 조회
    cookie=request.cookies.get("mytoken")
    user_id=jwt.decode(cookie,SECRET_KEY,algorithms='HS256')['id']
    
    sql="select nickname,authority from user_info where id=?"
    nickname,authority=select_db(sql,(user_id,))[0]

    return render_template("mypage.html", id=user_id, nickname=nickname, authority=authority)

@app.route("/modifyUser", methods=["GET","POST"])
def modifyUser():
    if request.method=="GET":
        return render_template("modifyUser.html")
    elif request.method=="POST":
        # id와 pw 값 가져오기
        cookie=request.cookies.get("mytoken")
        user_id=jwt.decode(cookie,SECRET_KEY,algorithms='HS256')['id']
        pw=request.form['pw']
        pw_hash=hashlib.sha256(pw.encode('utf-8')).hexdigest()

        # id에 해당하는 pw 값 수정
        update_user((pw_hash,user_id))

        return redirect(url_for("index"))

# 유저 삭제
@app.route("/deleteUser", methods=["POST"])
def deleteUser():
    cookie=request.cookies.get("mytoken")
    if cookie is not None:
        user_id=jwt.decode(cookie,SECRET_KEY,algorithms='HS256')['id']
        delete_user((user_id,))

        return jsonify({'result':'success','mytoken':cookie})

# 웹에서 DB 조회하는 용
@app.route("/selectUser", methods=["GET","POST"])
def selectUser():
    if request.method=="POST":
        sql=request.form['sql']
        result=select_id(sql)

        #디버깅 용
        #print(type(result),result)
        
        return render_template("selectUser.html",result=result)
    return render_template("selectUser.html")

@app.route("/test")
def test():
    return render_template("test.html")

app.run()
