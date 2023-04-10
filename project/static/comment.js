function updateComment(cid){
    // 바꿀 태그의 선택자 가져오기
    const oldTitleTag = document.getElementById("update_comment_"+String(cid)+"_title");
    const oldContentTag = document.getElementById("update_comment_"+String(cid)+"_content");
    const oldSubmitTag = document.getElementById("update_comment_"+String(cid)+"_button");

    // title과 content에 쓸 새 입력 태그 생성
    const newTitleTag=document.createElement("input");
    newTitleTag.setAttribute("type","text");
    newTitleTag.setAttribute("name","title");
    newTitleTag.setAttribute("value",oldTitleTag.innerText);
    newTitleTag.setAttribute("style","display:block;")
    newTitleTag.setAttribute("placeholder","title");

    const newContentTag=document.createElement("textarea");
    newContentTag.setAttribute("name","content");
    newContentTag.setAttribute("title","content");
    newContentTag.innerHTML = oldContentTag.innerText;
    newContentTag.setAttribute("style","display:block;")
    newContentTag.setAttribute("placeholder","content");
    
    // 입력버튼으로 원래 버튼 변경
    const newSubmitTag=document.createElement("input");
    newSubmitTag.setAttribute("type","submit");
    newSubmitTag.setAttribute("value","Update");

    oldTitleTag.parentNode.replaceChild(newTitleTag,oldTitleTag);
    oldContentTag.parentNode.replaceChild(newContentTag,oldContentTag);
    oldSubmitTag.parentNode.replaceChild(newSubmitTag,oldSubmitTag);
}