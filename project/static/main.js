const page_now = parseInt(document.getElementById("pageIndex").innerText);

console.log(page_now,page_index,page_max);
console.log("/?page="+(page_now+1).toString());

if(page_now===1){
    if(page_max===1){
        // 아무것도 안함.
    } else{
        document.getElementById("pageRight").addEventListener("click",pageUp);
    }
} else if (page_now===page_max){
    document.getElementById("pageLeft").addEventListener("click",pageDown);
} else {
    document.getElementById("pageRight").addEventListener("click",pageUp);
    document.getElementById("pageLeft").addEventListener("click",pageDown);
}

function login(){
    $.ajax({
        type:"POST",
        url:"/login",
        data: {
            id:$('#userid').val(), pw:$('#userpw').val()
        },
        success: function(response){
            if (response['result']=='success'){
                // 로그인이 정상적으로 되면, 토큰 받아서 쿠키에 저장
                $.cookie('mytoken', response['token']);
                alert('Success Login!');
                window.location.href='/';
                //console.log(response['token']);
            } else {
                // 로그인 실패시 에러메시지
                alert(response['msg'])
            }
        }
    });
}

function logout(){
    $.removeCookie('mytoken',{path:'/'});
    window.location.href='/';
}

function pageUp(){
    window.location.href="/?page="+(page_now+1).toString();
}

function pageDown(){
    window.location.href="/?page="+(page_now-1).toString();
}