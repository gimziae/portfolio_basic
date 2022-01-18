/* 
79c0df25605b0f7facb1369d9be6fe68
 */

var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스

const t_on = document.querySelectorAll(".traffic li")[0];
const t_off = document.querySelectorAll(".traffic li")[1];
const branch_btns = document.querySelectorAll(".branch li");


let zoom = true; //확대 축소 가능
let drag = false; // 드래그 가능


var options = { //지도를 생성할 때 필요한 기본 옵션
	center: new kakao.maps.LatLng(37.5120725,127.057503), //지도의 중심좌표.
	level: 3 //지도의 레벨(확대, 축소 정도)
};

var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

//마커 생성하기
var markerOptions =[
    {
        title: "본점",
        latlng: new kakao.maps.LatLng(37.5120725,127.057503),
        imgSrc: 'img/marker1.png',
        imgSize: new kakao.maps.Size(232, 99),
        imgPos: {offset: new kakao.maps.Point(116, 69)},
        button: branch_btns[0]
    },
    {
        title: "지점1",
        latlng: new kakao.maps.LatLng(37.266444,126.9972137),
        imgSrc: 'img/marker2.png',
        imgSize: new kakao.maps.Size(232, 99),
        imgPos: {offset: new kakao.maps.Point(116, 69)},
        button: branch_btns[1]
    },
    {
        title: "지점2",
        latlng: new kakao.maps.LatLng(37.5243081,126.9522836),
        imgSrc: 'img/marker3.png',
        imgSize: new kakao.maps.Size(232, 99),
        imgPos: {offset: new kakao.maps.Point(116, 69)},
        button: branch_btns[2]
    }
];

for(let i=0; i<markerOptions.length; i++){
    new kakao.maps.Marker({
        map: map,
        position: markerOptions[i].latlng,
        title: markerOptions[i].title,
        image: new kakao.maps.MarkerImage(markerOptions[i].imgSrc, markerOptions[i].imgSize, markerOptions.imgPos)
    });

    //branch 버튼을 클릭했을 때 해당위치로 이동 및 버튼 활성화 
    markerOptions[i].button.onclick = e=>{
        e.preventDefault();

        for(let k=0; k<markerOptions.length; k++){
            markerOptions[k].button.classList.remove("on");
        }
        markerOptions[i].button.classList.add("on");

        moveTo(markerOptions[i].latlng);
    }
}

//지도 가운데 위치하기
//: 브라우저 리사이즈 시 현재 활성화 되어 있는 버튼의 data-index구해서
//  setCenter의 매개변수-위치값에 적용
window.onresize = ()=>{

    let active_btn = document.querySelector(".branch li.on");
    let active_index = active_btn.getAttribute("data-index");

    map.setCenter(markerOptions[active_index].latlng);
}

//지도 이동함수 정의
function moveTo(target) {            

    var moveLatLon = target;

    map.setCenter(moveLatLon);
}