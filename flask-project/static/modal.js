document.getElementById("withdraw-btn").addEventListener("click", function() {
    var modal = createModal("회원 탈퇴", "정말로 탈퇴하시겠습니까?", withdrawal);
    document.body.appendChild(modal);
  });
// 모달 창 생성 함수
function createModal(title, message, callback) {
    let modal = document.createElement("div");
    modal.classList.add("modal");

    let modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");
    modal.appendChild(modalContent);

    let modalTitle = document.createElement("h2");
    modalTitle.classList.add("modal-title");
    modalTitle.innerText = title;
    modalContent.appendChild(modalTitle);

    let modalMessage = document.createElement("p");
    modalMessage.classList.add("modal-message");
    modalMessage.innerText = message;
    modalContent.appendChild(modalMessage);

    let modalButtons = document.createElement("div");
    modalButtons.classList.add("modal-buttons");
    modalContent.appendChild(modalButtons);

    let confirmButton = document.createElement("button");
    confirmButton.innerText = "확인";
    confirmButton.style.marginLeft = "10px";
    confirmButton.addEventListener("click", function() {
      document.body.removeChild(modal);
      if (callback) {
        callback();
      }
    });
    modalButtons.appendChild(confirmButton);

    let cancelButton = document.createElement("button");
    cancelButton.innerText = "취소";
    cancelButton.style.marginLeft = "10px";
    cancelButton.addEventListener("click", function() {
      document.body.removeChild(modal);
    });
    modalButtons.appendChild(cancelButton);

    return modal;
}
function withdrawal(){
    $.ajax({
        type:"POST",
        url:"/deleteUser",
        data: {
        },
        success: function(response){
            if (response['result']=='success'){
                $.removeCookie('mytoken',{path:'/'});
                alert('Success withdrawal!');
                window.location.href='/';
                //console.log(response['token']);
            } else {
                // 로그인 실패시 에러메시지
                alert(response['msg'])
            }
        }
    });
}