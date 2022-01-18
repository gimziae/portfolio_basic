/*
youtuba api > 클라우드 플랫폼 > 사용자 인증 정보
key : AIzaSyBLmcoTvbceDJAzuKFsH7ks2aR4MwwJqn4
url : 'http://www.googleapis.com/youtube/v3/playlistItems'

호출 시 옵션값
part : 'snippet',
key : 'AIzaSyBLmcoTvbceDJAzuKFsH7ks2aR4MwwJqn4',
playlistId : 'PLOK2vR6uL5S2pvgetexp7P1dn7lIIfV3W',
maxResult : 5
*/

const vidList = document.querySelector(".vidList");
const key = 'AIzaSyBLmcoTvbceDJAzuKFsH7ks2aR4MwwJqn4';
const playlistId = "PLYOPkdUKSFgXiJXlCnCmIoeK_QReBgOlu"; //?list= 이후 값들
const num = 5;
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}&maxResults=${num}`; 

fetch(url)
.then(data=>{ // 매개변수 data
    return data.json(); // 함수 실행해서 json에 전달
})
.then(json=>{
    

    let items = json.items; //json에서 items만 뽑아온다
    console.log(items);

    let result = ''; //빈문자열 생성해서 map 반복문 생성

    items.map(item=>{//${}값들 consolelog에서 값들 확인

        let title = item.snippet.title;
        if(title.length > 30){
            title = title.substr(0, 30)+"...";
        }

        let con = item.snippet.description;
        if(con.length > 100){
            con = con.substr(0, 100)+"...";
        }

        let date = item.snippet.publishedAt;
        date = date.split("T")[0];
        console.log(date);

        result +=`
                <article>
                    <a href="${item.snippet.resourceId.videoId}" class="pic"> 
                        <img src="${item.snippet.thumbnails.medium.url}" alt="">
                    </a>
                    <div class="con">
                        <h2>${title}</h2>
                        <p>${con}</p>
                        <span>${date}</span>
                    </div>
                </article>
                `;
    })

    vidList.innerHTML = result;
})

vidList.addEventListener("click", e=>{
    e.preventDefault();

    //클릭한 요소의 부모태그가 <a>가 아니라면 중지
    if(!e.target.closest("a")) return;

    const vidId = e.target.closest("a").getAttribute("href");
    let pop = document.createElement("figure");
    pop.classList.add("pop");
    pop.innerHTML = `
                    <iframe src="http://www.youtube.com/embed/${vidId}" frameborder="0" width="100%" height="100%" allofullscreen></iframe>
                    <span class=btnClose>CLOSE</span>
                    `;

    vidList.append(pop);
})

vidList.addEventListener("click", e=>{
    //pop을 변수로 담아
    const pop = vidList.querySelector(".pop");

    //pop이 비어있지 않다면
    if(pop !=null){
        //close버튼 생성
        const close = pop.querySelector("span");

        //현재 타겟과 close버튼이라면 pop 제거
        if(e.target == close) pop.remove();
    }
})