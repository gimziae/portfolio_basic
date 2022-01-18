//변수 설정  요청하는 것
const btnCall = document.querySelector(".btnCall");
const menuMo = document.querySelector(".menuMo");

//이벤트 바인딩(연결)
//btnCall 클릭 시 
btnCall.onclick = function(e){
    //링크 이동 금지 ; 기본으로 해야지 #해둔거에 위로 안올라와
    e.preventDefault(); 
    
    //btnCall에 on이 있으면 제거, 없으면 추가
    btnCall.classList.toggle("on");
    //menuMo에 on이 있으면 제거, 없으면 추가
    menuMo.classList.toggle("on");

}