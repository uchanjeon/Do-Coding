const idElement = document.getElementById("id");
const commentElement = document.getElementById("comment");
const pwElement = document.getElementById("pw");
const starPoints = document.getElementById("stars");
const loginButton = document.getElementById("addbtn");
const review = document.querySelectorAll(".reviews");

let isEditDone = true;

//확인버튼 클릭 > local storage에 저장
loginButton.addEventListener("click", () => {
  let id = idElement.value.trim();
  let pw = pwElement.value.trim();
  let comment = `${commentElement.value.trim()}`;
  comment = comment.replaceAll(/(\n|\r\n)/g, "<br>");
  let starpoints = starPoints.value;

  // Id 유효성 검사
  if (!id) {
    alert("아이디를 입력해주세요.");
    return;
  }

  // 비밀번호 유효성 검사
  if (!pw || pw.length < 4) {
    alert("비밀번호는 4자 이상 입력해주세요");
    return;
  }

  //comment 유효성 검사
  if (!comment) {
    alert("댓글을 입력해주세요.");
    return;
  }

  let movieId = localStorage.getItem("clickedidmovie");

  if (starpoints == "select") {
    alert("별점을 선택해주세요");
    return;
  }

  let userInfo = {
    id: id,
    pw: pw,
    starpoints: starpoints,
    mv: movieId,
    cmt: comment,
  };
  const time = Number(Date.now());
  localStorage.setItem(JSON.stringify(time), JSON.stringify(userInfo));
  alert("저장완료");
  console.log(comment);
  window.location.reload();
});

//리뷰에서 enter > 클릭이벤트, shift+enter > 엔터
commentElement.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    if (!e.shiftKey) {
      loginButton.click();
    }
  }
});


//localStorage 데이터 key값을 key라는 변수에 저장, 정렬
const keys = Object.keys(window.localStorage);
keys.sort((a, b) => {
  return a - b;
});

const reviewcode = document.getElementById("frozen");

//데이터 받아와서 댓글 보여주기
let showMovieComments = function (keys, list) {
  for (let key of keys) {
    let val = window.localStorage.getItem(key);
    val = JSON.parse(val);
    //특정 영화제목을 가진 데이터만 출력
    if (val["mv"] == localStorage.getItem("clickedidmovie")) {
      let valcmt = val['cmt'].replaceAll('<br>', '\n');
      let temp_HTML = `
            <div class="posted">
                    <div class="idcomment" id="${key}idcomment">
                        <div class="idandstar">
                            <div class="postedid"> 작성자 : ${val["id"]} </div>
                            <div class="starpoints" id="${key}starpoints"> 별점 : ${val["starpoints"]} </div>
                            <select class="editstars" name="별점" id="${key}editstars">
                                <option value="select" selected>--select--</option>
                                <option value="★">★</option>
                                <option value="★★">★★</option>
                                <option value="★★★">★★★</option>
                                <option value="★★★★">★★★★</option>
                                <option value="★★★★★">★★★★★</option>
                            </select>
                        </div>
                        <hr>
                        <div id="${key}postedcmt" class="postedcmt"> ${val["cmt"]} </div>
                        <div class="edittextbox" id="${key}edittext">
                            <textarea type="text" class="edittext" id="${key}editarea">${valcmt}</textarea>
                        </div>
                    </div>
                    <div class="deletebtn" id="${key}deletebtn">
                        <input type="button" class="editbtn" id="${key}edit" value="수정">
                        <input type="button" class="delbtn" id="${key}delete" value="삭제">
                        <input type="password" class="pwforedit" id="${key}pwforedit" placeholder="비밀번호">
                        <input type="button" class="editdonebtn" id="${key}editdone" value="완료">
                        <input type="button" class="cancelbtn" id="${key}cancel" value="취소">
                    </div>
                </div>
            `;
      list.innerHTML += temp_HTML;
    }
  }
  document.querySelectorAll(".pwforedit").forEach((a) => {
    a.style = "display:none";
  });
  document.querySelectorAll(".editdonebtn").forEach((a) => {
    a.style = "display:none";
  });
  document.querySelectorAll(".cancelbtn").forEach((a) => {
    a.style = "display:none";
  });
  document.querySelectorAll(".edittextbox").forEach((a) => {
    a.style = "display:none";
  });
  document.querySelectorAll(".editstars").forEach((a) => {
    a.style = "display:none";
  });
};

showMovieComments(keys, reviewcode);

//삭제버튼  prompt()에서는 input내용을 가리지 못해서 클릭시 팝업 레이어를 불러오게 변경
const deleteBtn = document.querySelectorAll(".delbtn");
deleteBtn.forEach((delBtn) => {
  delBtn.addEventListener("click", (a) => {
    let key = a.target.id.substr(0, 13); // 버튼의 id에 key값(타임스탬프)을 넣어놓은상태
    let value = window.localStorage.getItem(key); // 버튼에서 가져온 key로 해당 데이터 찾아옴
    let pwValue = JSON.parse(value)["pw"];

    document.getElementById("passwordPopup").style.display = "block";

    // .delbtn 버튼 클릭 시 팝업레이어를 불러옴
    document.getElementById("passwordSubmit").addEventListener("click", () => {
      // 입력한 비밀번호를 가져옴
      let inputPw = document.getElementById("passwordInput").value;
      // 입력한 비밀번호와 저장된 비밀번호를 비교하여 일치할 경우에만 삭제 기능 실행
      if (pwValue == inputPw) {
        // 삭제하기 전에 한번 더 확인
        let confirmDelete = confirm("확인을 누르면 삭제가 완료됩니다.");
        if (confirmDelete) {
          window.localStorage.removeItem(key);
          alert("삭제 완료");
          window.location.reload();
        }
      } else {
        alert("비밀번호가 일치하지 않습니다.");
      }
    });
  });
});
// 닫기 버튼 클릭 시 팝업 레이어 닫기
document.getElementById("closePopup").addEventListener("click", function () {
  document.getElementById("passwordPopup").style.display = "none";
  document.getElementById("passwordInput").value = null;
});

//수정버튼
const editBtn = document.querySelectorAll(".editbtn");
editBtn.forEach((edBtn) => {
  edBtn.addEventListener("click", (a) => {
    clickEditBtn(a);
  });
});

//수정 함수
let clickEditBtn = function (a) {
  //let inputPw = prompt("비밀번호를 입력하세요");
  let key = a.target.id.substr(0, 13); //버튼의 id에 key값(타임스탬프)을 넣어놓은상태
  let value = window.localStorage.getItem(key); //버튼에서 가져온 key로 해당 데이터 찾아옴
  let idValue = JSON.parse(value)["id"];
  let pwValue = JSON.parse(value)["pw"];
  let movieValue = JSON.parse(value)["mv"];
  isEditDone = false;
  console.log(isEditDone);
  doEdit(key);
  clickEditDoneBtn(key, idValue, pwValue, movieValue);
  clickCancelBtn(key);
};

//수정버튼 클릭 시 없어질 요소들과 나타날 요소들
let doEdit = function (key) {
  document.getElementById(key + "postedcmt").style = "display:none";
  document.getElementById(key + "edit").style = "display:none";
  document.getElementById(key + "delete").style = "display:none";
  document.getElementById(key + "starpoints").style = "display:none";
  document.getElementById(key + "editdone").style = "display:";
  document.getElementById(key + "cancel").style = "display:";
  document.getElementById(key + "edittext").style = "display:";
  document.getElementById(key + "pwforedit").style = "display:";
  document.getElementById(key + "editstars").style = "display:";
};

//수정완료 버튼 클릭 > localStorage 반영, 새로고침
let clickEditDoneBtn = function (key, idValue, pwValue, movieValue) {

  document.getElementById(key + "editdone").addEventListener("click", () => {
    let inputPw = document.getElementById(key + "pwforedit").value;
    let editedcomment = document.getElementById(key + "editarea").value;
    let editedstar = document.getElementById(key + "editstars").value;
    if (isEditDone) {
      return;
    }
    if (pwValue == inputPw && editedstar != "select") {
      editedcomment = editedcomment.replaceAll(/(\n|\r\n)/g, "<br>");
      let userInfo = {
        id: idValue,
        pw: pwValue,
        starpoints: editedstar,
        mv: movieValue,
        cmt: editedcomment,
      };
      localStorage.setItem(key, JSON.stringify(userInfo));
      alert("수정완료");
      isEditDone = true;
      window.location.reload();
    } else if (editedstar == "select") {
      alert("별점을 선택해주세요");
      CancelFunc(key);
    } else {
      alert("비밀번호가 일치하지 않습니다.");
      CancelFunc(key);
    }
  });
};

//수정취소 버튼 함수
let clickCancelBtn = function (key) {
  document.getElementById(key + "cancel").addEventListener("click", () => {
    CancelFunc(key);
  });
};

let CancelFunc = function (key) {
  isEditDone = true;
  document.getElementById(key + "postedcmt").style = "display:";
  document.getElementById(key + "edit").style = "display:";
  document.getElementById(key + "delete").style = "display:";
  document.getElementById(key + "starpoints").style = "display:";
  document.getElementById(key + "editdone").style = "display:none";
  document.getElementById(key + "cancel").style = "display:none";
  document.getElementById(key + "edittext").style = "display:none";
  document.getElementById(key + "pwforedit").style = "display:none";
  document.getElementById(key + "editstars").style = "display:none";
  document.getElementById(key + "pwforedit").value = null;
}
