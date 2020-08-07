// let postOfficeMarker = {};
// let map;
// let marker;
// let pharmacyMarker = {};
// const search= document.querySelector('.searchbar');
// const searchbutton = document.querySelector('.search_btn');
// search.addEventListener('keydown',callit);
// searchbutton.addEventListener('click',callit);
//皆本地端資料
// const xhr = new XMLHttpRequest();
// xhr.open("GET", "getPostData.json", true)
// xhr.send();
// xhr.onreadystatechange = function () {
//     if (xhr.readyState == 4) {
//         if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
//             console.log(xhr)
//             data = JSON.parse(this.responseText).features;
//             initMap();
//         } else {
//             console.log(`NOT FOUND`)
//         }
//     }
    
// }
// xhr.onload = function () {
//     callit(event)
  
// };




function callit(e){ // (e)為要表示的事件
	var searchnewlist = []; //要第一次篩選過後的值有地方收起來，給他一個空陣列
	var list= document.querySelector('.PC-Info'); //讓篩選出來的東西帶入原本寫好的list裡
	var str = '';
	var resoure = search.value; //因為不知道要輸入的值為何，先給一個名稱為resoure=search的值
	if(e.type === 'click' && e.keyCode ==13){  //防呆機制,便是點擊或是按鍵,若事件類型嚴格相等於click’和‘按鍵keycode＝enter按鍵
			let resoure = search.value.trim();//（撇除空值）如果以搜尋的值為空值的話
	}
	if(e.type === 'keydown' && e.keyCode !==13){
			return;
	}
	if(resoure == ''){//如果resoure是字串
			return; //就不繼續進行; 這裡做兩次判斷。1:空值 2:字串
	};

	for(var i=0;i<data.length;i++){
		var postmail = data[i];
		if (data[i].properties.addr.indexOf(resoure) != -1 || data[i].properties.StoreNm.indexOf(resoure) != -1 ){ //！！！！！！！選取data下的address＝-1或是name=-1時;indexOf() 方法會回傳給定元素於陣列中第一個被找到之索引，若不存在於陣列中則回傳 -1。
			searchnewlist.push(data[i]); //將取出的數據塞回：searchlist   //塞資料到ul框內
			str += 
			`<li class="PC-Content">
            <div class="PC-Name">${data[i].properties.StoreNm}</div>
            <div class="Address">
              <p>地址：</p>
              <p>${data[i].properties.addr}</p>
            </div>
            <div class="Tel">電話：
              <p>${data[i].properties.tel}</p>
            </div>
            <div class="BusiTime">
              <p>營業時間：</p>
              <p>${data[i].properties.busiTime}</p>
            </div>
            <div class="Instock">三倍券庫存量：${data[i].properties.total}</div>
          </li>`;
		}
	}
	list.innerHTML = str; //最後印出來
	var searchList = document.querySelectorAll('.PC-Content');
	searchList.forEach(function(item, i) { 
		item.addEventListener('click', function(){ //監聽點擊ul的時候會實現飛到地圖上的圖示
			flyTo(searchnewlist[i]); //打開物件內容
		});
	});
};


// 設定地圖＋圖標
function initMap(){
    var mymap = L.map('mapid').setView([22.671188, 120.485712], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);

markers = L.markerClusterGroup({disableClusteringAtZoom: 16});



// for(let i = 0;data.length >i; i++){
//     markers.addLayer(L.marker([data[i].lat, data[i].lng], {icon:greenIcon}))
// }

// var pulsingIcon = L.icon.pulse({iconSize: [20, 20], color: '#FFA573', fillColor: '#FFA573'});

  
//處理自動定位

function getGPS () {
    if (navigator.geolocation) {
        function showPosition (position) {
            mymap.setView([position.coords.latitude, position.coords.longitude], 15)
        }
        function showError (){
            alert('抱歉，現在無法讀取您的位置')
        }
        navigator.geolocation.getCurrentPosition(showPosition, showError)
    }else{
        alert('抱歉，您的裝置不支援定位功能。')
    }
}
getGPS()

//處理地圖、圖標
let data = res.data
var markers = new L.markerClusterGroup().addTo(mymap);
data.forEach((item) => {
  const iconColor = (() => {
      if(item.total != 0){
        return new L.Icon({
            iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          })
      }else{
        return new L.Icon({
          iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        })
      } 
  })
})
// var data = [
//     {'name': 'Ａ1', lat:22.669738, lng:120.486259 },
//     {'name': 'Ａ2', lat:22.671497, lng:120.486495 }
// ]

// L.marker([22.669738, 120.486259],{icon:redIcon}).addTo(mymap)
//         .bindPopup('<h1>HelloWorld</h1>')
//         .openPopup();

// L.marker([22.671497, 120.486495]).addTo(mymap)
//         .bindPopup('<h1>Second</h1>')
//         .openPopup();

}


//群組增加圖層
// let marker = L.marker([data[i].geometry.coordinates[1],data[i].geometry.coordinates[0]], {icon: mask});
// postOfficeMarker[data[i].properties.id] = marker;
// marker.bindPopup(
//     ` <li class="PC-Content">
//     <div class="PC-Name">${item.storeNm}</div>
//     <div class="Address">
//       <p>地址：</p>
//       <p>${item.addr}</p>
//     </div>
//     <div class="Tel">電話：
//       <p>${item.tel}</p>
//     </div>
//     <div class="BusiTime">
//       <p>營業時間：</p>
//       <p>${item.busiTime}</p>
//     </div>
//     <div class="Instock">三倍券庫存量：${item.total}</div>
//     <div class="Instock">數據更新時間：${item.updateTime}</div>
//   </li>`
// );
// markers.addLayer(marker);









