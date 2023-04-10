import sqlite3
from flask import Flask
import os

BASE_DIR   =  os.path.abspath('./project/')
TARGET_DIR =  os.path.join(BASE_DIR, "database")
if not os.path.isdir( TARGET_DIR ):
        os.makedirs( TARGET_DIR )
TARGET_FILE = 'database.db'
TARGET_FILE_FULL_PATH = os.path.join(TARGET_DIR, TARGET_FILE)

print(TARGET_FILE_FULL_PATH)

def get_cur():
    connect=sqlite3.connect(TARGET_FILE_FULL_PATH,isolation_level=None)
    return connect.cursor()

def init_db():
    cur=get_cur()
    # user_info 테이블 유무 조회
    sql = "SELECT COUNT(*) FROM sqlite_master WHERE type='table' AND name='user_info'"
    cur.execute(sql)
    result=cur.fetchone()

    if result[0] != 1:
        # id, pw, nickname, authority (0 or 1 *1은 관리자 권한)
        cur.execute("create table user_info(id text primary key not null, pw text not null, nickname text unique not null, authority integer not null)")

    # post_info 테이블 유무 조회
    sql = "SELECT COUNT(*) FROM sqlite_master WHERE type='table' AND name='post_info'"
    cur.execute(sql)
    result=cur.fetchone()
    if result[0] != 1:
        # pid, id, nickname, datetime, title, content
        cur.execute("create table post_info(pid integer primary key autoincrement, id text not null, nickname text not null, posted_date DATETIME not null, title text not null, content text not null, foreign key (id) references user_info(id))")
    
    # comment 테이블 유무 조회
    sql = "SELECT COUNT(*) FROM sqlite_master WHERE type='table' AND name='comment_info'"
    cur.execute(sql)
    result=cur.fetchone()

    if result[0] == 1:
        cur.close()
        return
    else:
        # cid, pid, id, nickname, commented_date, title, content, updated
        cur.execute("create table comment_info(cid integer primary key autoincrement, pid integer not null, id text not null, nickname text not null, commented_date DATETIME not null, title text not null, content text not null, updated integer not null, foreign key (pid) references post_info(pid), foreign key (id) references user_info(id))")
    # 없으면 생성하고 함수 종료
    cur.close()

def insert_user(user_data):
    cur=get_cur()
    cur.execute("select count(*) from user_info")
    result = cur.fetchone()
    if result==0:
        cur.execute("insert into user_info values(?, ?, ?, 1)",user_data)
    else:
        cur.execute("insert into user_info values(?, ?, ?, 0)",user_data)
    cur.close()

def update_user(user_data):
    cur=get_cur()
    cur.execute("update user_info set pw=? where id=?",user_data)
    cur.close()

def delete_user(user_data):
    cur=get_cur()
    cur.execute("delete from user_info where id=?",user_data)
    cur.close()

def insert_post(post_data):# ? = id, nickname, datetime, title, content
    cur=get_cur()
    cur.execute("insert into post_info (id, nickname, posted_date, title, content) values(?, ?, ?, ?, ?)",post_data)
    cur.close()

def update_post(post_data):
    cur=get_cur()
    cur.execute("update post_info set title=?,content=? where pid=?",post_data)
    cur.close()

def delete_post(post_data):
    cur=get_cur()
    # 글 삭제
    cur.execute("delete from post_info where pid=?",post_data)
    
    # 글에 쓰인 댓글 삭제
    cur.execute("select count(*) from comment_info where pid=?",post_data)
    result=cur.fetchone()

    # 댓글이 있는지 확인 댓글이 없으면 글만 삭제하고 끝남
    if result[0] != 0:
        cur.execute("delete from comment_info where pid=?",post_data)

    cur.close()

def insert_comment(comment_data):
    cur=get_cur()
    # cid, pid, id, nickname, commented_date, title, content
    sql="insert into comment_info (pid, id, nickname, commented_date, title, content, updated) values(? ,? ,? ,? ,? ,? ,?)"
    cur.execute(sql,comment_data)
    cur.close()

def update_comment(comment_data):
    cur=get_cur()
    sql="update comment_info set title=?,content=?,updated=? where cid=?"
    cur.execute(sql,comment_data)
    cur.close()

def delete_comment(cid):
    cur=get_cur()
    cur.execute("delete from comment_info where cid=?",cid)
    cur.close()

def select_db(sql,data=None):
    cur=get_cur()
    if data is None:
        cur.execute(sql)
        result=cur.fetchall()
    else: 
        cur.execute(sql,data)
        result=cur.fetchall()
    return result

def select_id(sql):
    cur=get_cur()
    cur.execute(sql)
    result=cur.fetchall()
    
    return result