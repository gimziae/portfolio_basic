//flickr

/*
key = "c28ef65e9616935b8277269f68f1a99d"

https://www.flickr.com/services/rest/?method=flickr.test.echo&name=value

//method
flickr.interestingness.getList
flickr.photos.search

https://live.staticflickr.com/{server-id}/{id}_{secret}_{size-suffix}.jpg
*/
//1)변수들을 설정한다.
const input = document.querySelector("#search");
const btnSearch = document.querySelector(".btnSearch");
const frame = document.querySelector("#list");
const loading = document.querySelector(".loading");

const base = "https://www.flickr.com/services/rest/?";
const method1 = "flickr.interestingness.getList";
const method2 = "flickr.photos.search";
const key = "c28ef65e9616935b8277269f68f1a99d";
const per_page = 12;

const url = `${base}method=${method1}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1`; // 변동사항이므로 베틱을 쓴다.


callData(url);

//이벤트 바인딩
btnSearch.addEventListener("click",e=>{

})

input.addEventListener("keyup", e=>{

})







//함수 정의
function callData(url){

    frame.innerHTML = "";
    loading.classList.remove("off");
    frame.classList.remove("on");
    
    //2)fetch로 json으로 변환한다.
    fetch(url)
    .then(data=>{
    
        return data.json();
    })
    .then(json=>{
        let items = json.photos.photo;
        if(items.length > 0){
            createList(items);
            delayLoading();
        }else{

        }
    });
}

function createList(items){

    //3)동적 DOM 삽입 > 지금 ul(#list)안의 내용이 비어있는데 js를 통해 동적으로 안에다가 넣어주는 작업.
    let htmls = ""; //비어있는 변수를 생성한다. 바뀌므로 let으로 선언.        
            
    items.map(data=>{  //map?배열 각 요소에 대해 주어진 함수를 수행한 결과값을 모아 새로운 배열을 반환하는 함수
        //console.log(data);
        
        let imgSrc = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_m.jpg`;
        let imgSrcBig = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg`;

        htmls +=`
                <li class="item">
                    <div>
                        <a class="thumb" href="${imgSrcBig}">
                            <img src="${imgSrc}" alt="">
                        </a>
                        <p>${data.title}</p>
                        <span>
                        <img class="profile" src="http://farm${data.farm}.staticflickr.com/${data.server}/buddyicons/${data.owner}.jpg">
                        <strong>${data.owner}</strong>
                        </span>
                    </div>
                    
                </li> 
                `;
    });

    frame.innerHTML = htmls;
}

function delayLoading(){
    const imgs = frame.querySelectorAll("img");
    const len = imgs.length;
    let count = 0;

    for(let el of imgs){

        el.onload = ()=>{
            count++;

            if(count == len) isoLayout();
        }
    }

}

function isoLayout(){

    loading.classList.add("off");
    frame.classList.add("on"); //바 봡보바보바보바봐보바보바봐보바봡

    new Isotope("#list", {
        itemSelector : ".item",
        columnWidth : ".item",
        trasitionDuration : "0.5s"
    })
}
 