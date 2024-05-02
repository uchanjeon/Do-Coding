const idElement = document.getElementById("id");
const commentElement = document.getElementById("comment");
const pwElement = document.getElementById("pw");
const movieCode = document.getElementById("moviecode");
const loginButton = document.getElementById("login-btn");
const enter = document.querySelectorAll(".reviews");
let i = 0;


//확인버튼 클릭 > local storage에 저장
loginButton.addEventListener("click", () => {
    id = idElement.value.trim();
    pw = pwElement.value.trim();
    comment = commentElement.value.trim();
    mvCode = movieCode.value.trim();
    // Id 유효성 검사
    if (!id ) {
        alert("아이디를 입력해주세요.");
        return;
    }

    // 비밀번호 유효성 검사 
    if (!pw || pw.length < 4) {
        alert("비밀번호는 4자 이상 입력해주세요");
        return;
    }
    //영화의ID 유효성 검사 삭제예정이지만 test할때 입력안하면 댓글안생겨서 해봤음
    if (!mvCode||!"frozen") {
        alert("영화 제목을 바르게 입력해주세요")
        return;
    }
    //comment 유효성 검사 
    if (!comment) {
        alert("댓글을 입력해주세요.");
        return;
    }

    let userInfo = {
        id: id,
        pw: pw,
        mv: mvCode,
        cmt: comment
    };
    const time = Number(Date.now());
    localStorage.setItem(JSON.stringify(time), JSON.stringify(userInfo));
    alert("저장완료");
    window.location.reload();

    //엔터 쳐도 클릭과 같은효과
    enter.forEach((i) => {
        i.addEventListener("keydown", (e) => {
            if (e.code == 'Enter') {
                loginButton.click();
            }
        })
    })
})

const frozen = document.getElementById("frozen");
const frozen2 = document.getElementById("frozen2");

//localStorage 데이터 key값을 key에 저장, 정렬
const keys = Object.keys(window.localStorage);
keys.sort((a, b) => { return (a - b) });

let showMovieComments = function (keys, title, list) {
    for (let key of keys) {
        let value = window.localStorage.getItem(key);
        value = JSON.parse(value);
        //특정 영화제목을 가진 데이터만 출력
        if (value["mv"] == title) {

            let temp_HTML = `
            <div class="posted">
                    <div class="idcomment">
                        <div class="postedid"> 작성자 : ${value['id']} </div>
                        <div class="postedcmt"> ${value['cmt']} </div>
                    </div>
                    <div class="deletebtn">
                        <input type="button" class="delbtn" id="${key}delete" value="삭제">
                    </div>
                </div>
            `
            list.innerHTML += temp_HTML;
        }
    }
};
showMovieComments(keys, "frozen", frozen);
showMovieComments(keys, "frozen2", frozen2);


//삭제버튼
const deleteBtn = document.querySelectorAll(".delbtn");
deleteBtn.forEach((delBtn) => {
    delBtn.addEventListener("click", (a) => {

        let inputPw = prompt("비밀번호를 입력하세요");
        let id = a.target.id.substr(0, 13); //버튼의 id에 key값(타임스탬프)을 넣어놓은상태
        let value = window.localStorage.getItem(id); //버튼에서 가져온 key로 해당 데이터 찾아옴 
        let pwValue = JSON.parse(value)["pw"];

        // 삭제하기 전에 한 번 더 확인
        let confirmDelete = confirm("확인을 누르면 삭제가 완료됩니다.");
        if (!confirmDelete) {
            return;
        }
        //비번 일치여부 확인

        if (pwValue == inputPw) {
            window.localStorage.removeItem(id);
            alert("삭제 완료");
            window.location.reload();
        } else {
            alert("삭제 실패");
        }
    })
})
