let countries = document.querySelector('#countries')
let cyties = document.querySelector('#cyties')

var mymap = L.map('mapid').setView([22.671188, 120.485712], 13)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
}).addTo(mymap);

axios.get("https://3000.gov.tw/hpgapi-openmap/api/getPostData")
    .then((res) => {
      // console.log(res)
        //處理自動定位
        function getGPS() {
            if (navigator.geolocation) {
                // 成功
                function showPosition(position) {
                    map.setView([position.coords.latitude, position.coords.longitude], 15);
                }
                // 失敗
                function showError() {
                    alert('抱歉，現在無法取的您的地理位置。')
                }
                navigator.geolocation.getCurrentPosition(showPosition, showError);
            } else {
                alert('抱歉，您的裝置不支援定位功能。');
            }
        }
        getGPS();
        // gpsIcon.addEventListener('click', getGPS, false);

        // 處理地圖
        let data = res.data;
        var markers = new L.MarkerClusterGroup().addTo(mymap)
        data.forEach((item) => {
            //判斷標點顏色
            const iconColor = (() => {
                if (item.total != 0) {
                  // console.log(data)
                    return new L.Icon({
                        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
                        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34],
                        shadowSize: [41, 41]
                    });
                } else {
                    return new L.Icon({
                        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34],
                        shadowSize: [41, 41]
                    });
                }
            })();

            //群組標點.增加圖層(leaflet的標點([座標])).增加popup
            markers.addLayer(
                L.marker([item.latitude, item.longitude], {
                    icon: iconColor
                }).bindPopup(`<li class="PC-Content">
                <div class="PC-Name">${item.storeNm}</div>
                <div class="Address">
                  <p>地址：</p>
                  <p>${item.addr}</p>
                </div>
                <div class="Tel">電話：
                  <p>${item.tel}</p>
                </div>
                <div class="BusiTime">
                  <p>營業時間：</p>
                  <p>${item.busiTime}</p>
                </div>
                <div class="Instock">三倍券庫存量：${item.total}</div>
              </li> `)
            );
        });
        map.addLayer(markers);

        //選取地區後的資料顯示
        countries.addEventListener('change', function () {
            let content = '';
            let str = '';
            data.forEach(item => {
                if (item.hsnNm == countries.value && item.townNm == cyties.value) {
                    content = `<li class="PC-Content">
                    <div class="PC-Name">${item.storeNm}</div>
                    <div class="Address">
                      <p>地址：</p>
                      <p>${item.addr}</p>
                    </div>
                    <div class="Tel">電話：
                      <p>${item.tel}</p>
                    </div>
                    <div class="BusiTime">
                      <p>營業時間：</p>
                      <p>${item.busiTime}</p>
                    </div>
                    <div class="Instock">三倍券庫存量：${item.total}</div>
                  </li>`
                    str += content;
                }
            })
            list.innerHTML = str;
        })
        cyties.addEventListener('change', function () {
            let content = '';
            let str = '';
            data.forEach(item => {
                if (item.hsnNm == countries.value && item.townNm == cyties.value) {
                    content = `<li class="PC-Content">
                    <div class="PC-Name">${item.storeNm}</div>
                    <div class="Address">
                      <p>地址：</p>
                      <p>${item.addr}</p>
                    </div>
                    <div class="Tel">電話：
                      <p>${item.tel}</p>
                    </div>
                    <div class="BusiTime">
                      <p>營業時間：</p>
                      <p>${item.busiTime}</p>
                    </div>
                    <div class="Instock">三倍券庫存量：${item.total}</div>
                  </li>`;
                    str += content;
                }
            })
            list.innerHTML = str;
        })
    })
    .catch(function (error) {
        alert(error);
    })

//製作縣市下拉選單
axios.get('https://raw.githubusercontent.com/Churng/Triple-coupon/master/CityCountyData.json')
    .then((res) => {
        let geoData = res.data;
        let countriesOptions = '';
        let cytiesOptions = '';
        countriesOptions = `<option value="" selected disabled>請選擇縣市</option>`;
        geoData.forEach((item, index) => {
            countriesOptions += `<option value="">${item.CityName}</option>`;
        })
        countries.innerHTML = `<select name="" id="countries">${countriesOptions}</select>`;

        countries.addEventListener('change', function () {
            cytiesOptions = '';
            cytiesOptions = `<option value="" selected disabled>請選擇</option>`;
            geoData[countries.selectedIndex - 1].AreaList.forEach(item => {
                cytiesOptions += `<option value="${item.AreaName}">${item.AreaName}</option>`;
            })
            cyties.innerHTML = `<select name="" id="countries">${cytiesOptions}</select>`;
        })
    })