const form = document.querySelector("#member");
const btnSubmit = form.querySelector("input[type=submit]");

//btnSubmit 클릭 시 생성되는 이벤트
btnSubmit.addEventListener("click", ()=>{
    //인증함수 조건식
//id 인증함수
if(!isText("id",5)) e.preventDefault();
//comments 인증함수
if(!isText("comments",20)) e.preventDefault();
});

/* form요소 인증함수 */
// Text 인증함수 > id, comments 문자 길이
function isText(name, len){
    
    //if(len === undefined) len = 5;

    let input = form.querySelector(`[name=${name}]`);
    let txt = input.value;

    if(txt.length >= len){
        
        //경고문구 삭제
        const errMsgs = input.closest("td").querySelectorAll("p");
        if(errMsgs.length > 0) input.closest("td").querySelector("p").remove();

        return true;
    }else{

        //경고문구 삭제
        const errMsgs = input.closest("td").querySelectorAll("p");
        if(errMsgs.length > 0) input.closest("td").querySelector("p").remove();

        //새로운 경고문구 생성
        const errMsg = document.createElement("p");
        errMsg.append(`항목을 ${len}글자 이상 입력해 주세요.`);
        input.closest("td").append(errMsg);

        return false;
    }

}