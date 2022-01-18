//flickr

/*
key = "c28ef65e9616935b8277269f68f1a99d"

https://www.flickr.com/services/rest/?method=flickr.test.echo&name=value

//method
flickr.interestingness.getList
flickr.photos.search

https://live.staticflickr.com/{server-id}/{id}_{secret}_{size-suffix}.jpg
*/

//1)변수설정
const body = document.querySelector("body");
const frame = document.querySelector("#list");
const loading = document.querySelector(".loading");
const input = document.querySelector("#search");
const btnSearch = document.querySelector(".btnSearch");

const base = "https://www.flickr.com/services/rest/?";
const key = "c28ef65e9616935b8277269f68f1a99d";
const method1 = "flickr.interestingness.getList";
const method2 = "flickr.photos.search";
const per_page = 10;

const url =`${base}method=${method1}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1`;

callData(url);

//이벤트 바인딩---------------------------------------------
btnSearch.addEventListener("click", e=>{

    let tag = input.value;
    tag = tag.trim();
    
    const url =`${base}method=${method2}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1&privacy_filter=1&tags=${tag}`;

    if(tag !=""){
        callData(url);
    }else{
        frame.innerHTML = "";
        frame.classList.remove("on");
    }

})

input.addEventListener("keyup", e=>{
    if(e.key === "Enter"){
        let tag = input.value;
        tag = tag.trim();
        
        const url =`${base}method=${method2}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1&privacy_filter=1&tags=${tag}`;
    
        if(tag !=""){
            callData(url);
        }else{
            frame.innerHTML = "";
            frame.classList.remove("on");
        }
    }
})

frame.addEventListener("click", e=>{
    e.preventDefault();

    let target = e.target.closest(".item").querySelector(".thumb");

    if(e.target == target){
         
        let imgSrc = target.parentElement.getAttribute("href");

        let pop = document.createElement("aside");
        pop.classList.add("pop");
        let pops =`
                <div img src = "con">
                    <img src="${imgSrc}">
                </div>
                <span class="close">CLOSE</span>
                `;
        pop.innerHTML = pops;
        body.append(pop);

    }
})



//함수 정의---------------------------------------------

function callData(url){

    frame.innerHTML = "";
    loading.classList.remove("off");
    frame.classList.remove("on");

    fetch(url)
    .then(data=>{
        
        return data.json();
    })
    .then(json=>{
        let items = json.photos.photo;
        console.log(items);
        if(items.length >0){
            createList(items);
            delayLoading();
        }else{
        
        }
    });
}

function createList(items){
    //3)동적dom 삽입
    let htmls = "";

    items.map(data=>{

        let imgSrc = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_m.jpg`;
        let imgSrcBic = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg`;

        htmls += `
                <li class="item">
                    <div>
                        <a href=${imgSrcBic}>
                            <img class="thumb" src=${imgSrc}>
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

};

function delayLoading(){

    //5)이미지 로오딩
    const imgs = frame.querySelectorAll("img");
    const len = imgs.length;
    let count = 0;
    
    for(let el of imgs){

        el.onload = ()=>{
            count++;
            
            if(count == len) isoLayout();
        }

        let thumb = el.closest(".item").querySelector(".thumb");
        thumb.onerror = e=>{
            e.currentTarget.closest(".item").querySelector("thumb").setAttribute("src", "img/loading.gif");
        }

        let profile = el.closest(".item").querySelector(".profile");
        profile.onerror = e=>{
            e.currentTarget.closest(".item").querySelector("profile").setAttribute("src", "img/loading.gif")
        }
    }
}


//4)isotope 적용
function isoLayout(){

    loading.classList.add("off");
    frame.classList.add("on");

    new Isotope("#list",{
        itemSelector : ".item",
        columnWidth : ".item",
        transitionDuration : "0.5s"
    })
}