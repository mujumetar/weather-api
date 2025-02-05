let b_url = `http://api.openweathermap.org/`;
let end_point = `data/2.5/weather`;
let week_endpoint = `data/2.5/forecast`;

let key = `&appid=d0eb85f816dcca901fd9dddf4cad3e17`;

let week_api_url = b_url + week_endpoint + `?q=india` + key;
let api_url = b_url + end_point + `?q=india` + key;
getdata(api_url);
getWeatherWeek(week_api_url);
document.getElementById("search").addEventListener("change", function (e) {
  getdata(b_url + end_point + `?q=${e.target.value}` + key);
  getWeatherWeek(b_url + week_endpoint + `?q=${e.target.value}` + key);
});

function getWeatherWeek(week_api_url) {
  fetch(week_api_url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.list);
      showWeatherWeek(data.list);
    });
}

function getdata(api_url) {
  fetch(api_url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      showweather(data);
    });
}

function showweather(data) {
  document.getElementById("card-main").innerHTML = `
   <div class="row g-3 shadow p-5 mx-auto rounded-5" style="max-width: 500px;">
   <h3>Real-Time Data of ${data.name}</h3>
            <div class="col-6">
                <div class="border">
                <img src="http://openweathermap.org/img/w/${
                  data.weather[0].icon
                }.png" alt="" />
                <b>${data.weather[0].main}</b>
                </div>
            </div>
            <div class="col-6">
                <div class="border">
                <b>
                ${data.name}
                </b>
                </div>
            </div>
            <div class="col-4">
                <div class="border">
                <i class="fa-solid fa-temperature-three-quarters"></i>
                ${Math.round(data.main.temp - 272.15)} &#8451;
                </div>
            </div>
            <div class="col-4">
                <div class="border">
                ${data.wind.speed} m/s
                </div>
            </div>
            <div class="col-4">
                <div class="border">
                ${data.main.temp}
                </div>
            </div>
         
        </div>
`;
}

function showWeatherWeek(d) {
      document.getElementById("card-week").innerHTML = ""
  d.map((data) => {
    document.getElementById("card-week").innerHTML += `
    <td class="text-truncate">${data.dt_txt}</td>
                    <td>   <img src="http://openweathermap.org/img/w/${
                      data.weather[0].icon
                    }.png" alt="" />
                <b>${data.weather[0].main}</b></td>
                    <td><i class="fa-solid fa-temperature-three-quarters"></i>
                ${Math.round(data.main.temp - 272.15)} &#8451;</td>
                    <td><i class="fa-solid fa-fan"></i> ${data.wind.speed} m/s</td>
                    <td><i class="fa-solid fa-droplet"></i> ${data.main.humidity} %</td>
 `;
  });
}
