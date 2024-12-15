const apiKey = "656f61b879534fc0b6871258241412"
let search = document.querySelector("#search");
let icon = document.querySelector("#wicon")
let forecast = document.querySelector("#forecast")
const currentDate = new Date();
const dayOfWeek = currentDate.getDay();
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const dayName = days[dayOfWeek];
let day2 = days[dayOfWeek + 1]
let day3 = days[dayOfWeek + 2]
let monthNum = currentDate.getMonth() + 1
let day = currentDate.getDate()
const monthIndex = currentDate.getMonth()
const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];
const monthName = months[monthIndex];
let currentHour = currentDate.getHours()
const windDirections = { N: 'North', NNE: 'North-Northeast', NE: 'Northeast', ENE: 'East-Northeast', E: 'East', ESE: 'East-Southeast', SE: 'Southeast', SSE: 'South-Southeast', S: 'South', SSW: 'South-Southwest', SW: 'Southwest', WSW: 'West-Southwest', W: 'West', WNW: 'West-Northwest', NW: 'Northwest', NNW: 'North-Northwest' };

document.addEventListener('DOMContentLoaded',  async function() { 
   getApi("libya")
  

})
 async function getApi(term){
  try {
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=656f61b879534fc0b6871258241412&q=${term}&days=3&aqi=yes&alerts=yes`)
    if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`); 
  }
  let data = await response.json()
  console.log(data);
  let current = {
    day:dayName,
    date:day,
    month:monthName,
    name:data.location.name,
    temp:data.current.temp_c, 
    icon:data.current.condition.icon,
    condition:data.current.condition.text,
    rain:data.forecast.forecastday[0].hour[currentHour].chance_of_rain,
    wind:data.current.wind_kph,
    windDir:data.current.wind_dir

  } 
  let tommorow = {
    day:day2,
    icon:data.forecast.forecastday[1].day.condition.icon,
    maxTemp: data.forecast.forecastday[1].day.maxtemp_c,
    minTemp:data.forecast.forecastday[1].day.mintemp_c,
    condition:data.forecast.forecastday[1].day.condition.text

  }
  let thirdDay = {
    day:day3,
    icon:data.forecast.forecastday[2].day.condition.icon,
    maxTemp: data.forecast.forecastday[2].day.maxtemp_c,
    minTemp:data.forecast.forecastday[2].day.mintemp_c,
    condition:data.forecast.forecastday[2].day.condition.text
    
    
  }
  forecast.innerHTML = ` <div class="row">
          <div class="col-lg-4 p-0 ">
            <div class="today forecast">
              <div class="forecast-header d-flex justify-content-between" id="today">
                <div class="day ps-2">${current.day}</div>
                <div class=" date">${current.date} ${current.month}</div>
              </div> <!-- .forecast-header -->
              <div class="forecast-content" id="current">
                <div class="location">${current.name}</div>
                <div class="degree first d-flex flex-lg-column ">
                  <div class="num">${current.temp}<sup>o</sup>C</div>
    
                  <div class="forecast-icon  align-self-start">
                    <img src="${current.icon}" alt="" width="90">
                  </div>
    
                </div>
                <div class="custom">${current.condition}</div>
                <div class="w-info d-flex gap-2 ">
                <span><img src="images/icon-umberella.png" alt="">${current.rain}%</span>
                <span><img src="images/icon-wind.png" alt="">${current.wind}km/h</span>
                <span class= "pe-5"><img src="images/icon-compass.png" alt="">${windDirections[current.windDir]}</span>

                </div>
                
              </div>
            </div>

          </div>
          <div class="col-lg-4 p-0  second">
            <div class="forecast">
              <div class="forecast-header">
                <div class="day">${tommorow.day}</div>
              </div> <!-- .forecast-header -->
              <div class="forecast-content d-flex justify-content-center align-items-center flex-column">
                <div class="forecast-icon">
                  <img src="${tommorow.icon}" alt="" width="48">
                </div>
                <div class="degree">${tommorow.maxTemp}<sup>o</sup>C</div>
                <small>${tommorow.minTemp}<sup>o</sup></small>
                <div class="custom">${tommorow.condition}</div>
              </div>
            </div>

          </div>
          <div class="col-lg-4 p-0">
            <div class="forecast">
              <div class="forecast-header">
                <div class="day ">${thirdDay.day}</div>
              </div> <!-- .forecast-header -->
              <div class="forecast-content d-flex flex-column justify-content-center align-items-center">
                <div class="forecast-icon">
                  <img src="${thirdDay.icon}" alt="" width="48">
                </div>
                <div class="degree">${thirdDay.maxTemp}<sup>o</sup>C</div>
                <small>${thirdDay.minTemp}<sup>o</sup></small>
                <div class="custom">${thirdDay.condition}</div>
              </div>
            </div>

          </div>
        </div> `
  
  } catch (error) {
    console.log(error);
    
    
  }
}
search.addEventListener("input",function(){
  term = search.value

    
    getApi(term)

})

