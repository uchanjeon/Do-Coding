const idElement = document.getElementById("id");
const commentElement = document.getElementById("comment");
const pwElement = document.getElementById("pw");
const movieCode = document.getElementById("moviecode");
const loginButton = document.getElementById("addbtn");
const review = document.querySelectorAll(".reviews");
let i = 0;


//확인버튼 클릭 > local storage에 저장
loginButton.addEventListener("click", () => {
    let userInfo = {
        id: idElement.value,
        pw: pwElement.value,
        mv: movieCode.value,
        cmt: commentElement.value
    };
    const time = Number(Date.now());
    localStorage.setItem(JSON.stringify(time), JSON.stringify(userInfo));
    alert("저장완료");
    window.location.reload();
})

//엔터 쳐도 클릭과 같은효과
review.forEach((i) => {
    i.addEventListener("keydown", (e) => {
        if (e.code == 'Enter') {
            loginButton.click();
        }
    })
})


const frozen = document.getElementById("frozen");

//localStorage 데이터 key값을 key라는 변수에 저장, 정렬
const keys = Object.keys(window.localStorage);
keys.sort((a, b) => { return (a - b) });

let showMovieComments = function (keys, title, list) {
    for (let key of keys) {
        let val = window.localStorage.getItem(key);
        val = JSON.parse(val);
        //특정 영화제목을 가진 데이터만 출력
        if (val["mv"] == title) {

            let temp_HTML = `
            <div class="posted">
                    <div class="idcomment" id="${key}idcomment">
                        <div class="postedid"> 작성자 : ${val['id']} </div>
                        <div id="${key}postedcmt" class="postedcmt"> ${val['cmt']} </div>
                        <div class="edittextbox" id="${key}edittext">
                            <textarea type="text" class="edittext" id="${key}editarea">${val['cmt']}</textarea>
                        </div>
                    </div>
                    <div class="deletebtn" id="${key}deletebtn">
                        <input type="button" class="editbtn" id="${key}edit" value="수정">
                        <input type="button" class="delbtn" id="${key}delete" value="삭제">
                        <input type="button" class="editdonebtn" id="${key}editdone" value="완료">
                        <input type="button" class="cancelbtn" id="${key}cancel" value="취소">
                    </div>
                </div>
            `
            list.innerHTML += temp_HTML;
        }

    }
    
    document.querySelectorAll(".editdonebtn").forEach((a) => { a.style = "display:none"; });
    document.querySelectorAll(".cancelbtn").forEach((a) => { a.style = "display:none"; });
    document.querySelectorAll(".edittextbox").forEach((a) => { a.style = "display:none"; });
    
};
showMovieComments(keys, "frozen", frozen);


//삭제버튼
const deleteBtn = document.querySelectorAll(".delbtn");
deleteBtn.forEach((delBtn) => {
    delBtn.addEventListener("click", (a) => {

        let inputPw = prompt("비밀번호를 입력하세요");
        let key = a.target.id.substr(0, 13); //버튼의 id에 key값(타임스탬프)을 넣어놓은상태
        let value = window.localStorage.getItem(key); //버튼에서 가져온 key로 해당 데이터 찾아옴 
        let pwValue = JSON.parse(value)["pw"];

        //비번 일치여부 확인
        if (pwValue == inputPw) {
            window.localStorage.removeItem(key);
            alert("삭제 완료");
            window.location.reload();
        } else {
            alert("삭제 실패");
        }
    })
})

//수정버튼
const editBtn = document.querySelectorAll(".editbtn");
editBtn.forEach((edBtn) => {
    edBtn.addEventListener("click", (a) => {
        clickEditBtn(a);
    })
})

//수정 함수
let clickEditBtn = function (a) {
    let inputPw = prompt("비밀번호를 입력하세요");
    let key = a.target.id.substr(0, 13); //버튼의 id에 key값(타임스탬프)을 넣어놓은상태
    let value = window.localStorage.getItem(key); //버튼에서 가져온 key로 해당 데이터 찾아옴 
    let idValue = JSON.parse(value)["id"];
    let pwValue = JSON.parse(value)["pw"];
    let movieValue = JSON.parse(value)["mv"];

    //비번 일치여부 확인
    if (pwValue == inputPw) {
        doEdit(key);
        clickEditDoneBtn(key, idValue, pwValue, movieValue);
        clickCancelBtn(key);
        //alert("수정 완료");
        //window.location.reload();
    } else {
        alert("비밀번호 확인 실패");
    }
}

//수정버튼 클릭 시 없어질 요소들과 나타날 요소들
let doEdit = function (key) {
    document.getElementById(key + "postedcmt").style = "display:none";
    document.getElementById(key + "edit").style = "display:none";
    document.getElementById(key + "delete").style = "display:none";
    document.getElementById(key + "editdone").style = "display:";
    document.getElementById(key + "cancel").style = "display:";
    document.getElementById(key + "edittext").style = "display:";
}

//수정완료 버튼 클릭 > localStorage 반영, 새로고침
let clickEditDoneBtn = function (key, idValue, pwValue, movieValue) {
    document.getElementById(key + "editdone").addEventListener("click", () => {
        let comment = document.getElementById(key + "editarea").value;
        console.log(comment);
        
        let val = localStorage.getItem(key);
        JSON.parse(val)["cmt"] = comment;
        let userInfo = {
            id: idValue,
            pw: pwValue,
            mv: movieValue,
            cmt: comment
        };
        localStorage.setItem(key, JSON.stringify(userInfo));
        alert("수정완료");
        window.location.reload();

    })
}

//수정취소 버튼 함수
let clickCancelBtn = function (key) {
    document.getElementById(key + "cancel").addEventListener("click", () => {
        document.getElementById(key + "postedcmt").style = "display:";
        document.getElementById(key + "edit").style = "display:";
        document.getElementById(key + "delete").style = "display:";
        document.getElementById(key + "editdone").style = "display:none";
        document.getElementById(key + "cancel").style = "display:none";
        document.getElementById(key + "edittext").style = "display:none";
    })
}



