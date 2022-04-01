// DOM ELEMENTS
const input = document.querySelector(".input");
const buttonLocation = document.querySelector(".button");
const buttonSearch = document.querySelector(".button-icon");
const cityName = document.querySelector(".city-name");
const photo = document.querySelector(".main-icon");
const temp = document.querySelector(".measurement-temperature");
const wind = document.querySelector(".measurement-wind");
const humidity = document.querySelector(".measurement-humidity");
const pressure = document.querySelector(".measurement-pressure");
const description = document.querySelector(".status");
const currentTemp = document.querySelector(".cur-temp");
const warning = document.querySelector(".warning");
const date = document.querySelector(".date-time");
const weekDays = document.querySelectorAll(".day");
const weekDaysTemp = document.querySelectorAll(".day-temp");
const hours = document.querySelectorAll(".hour");
const hoursTemp = document.querySelectorAll(".hour-temp");
const container = document.querySelector(".container");
const dayIcon = document.querySelectorAll(".day-icon-img");
const hourNow = document.querySelector(".hour-temp-now");
const dayNow = document.querySelector(".day-temp-now");
const main = document.querySelector(".main");
const degC = document.querySelector(".c");
const degF = document.querySelector(".f");

// UNITS SETTINGS
let _apiUnits = "&units=metric";
let degrees = "°C";

// DATE SETTINGS
const now = new Date();
const dayName = now.toLocaleString("eng", { weekday: "long" });
const day = now.getDate();
const month = now.toLocaleString("eng", { month: "long" });
const hour = `${now.getHours()}`.padStart(2, 0);
const minutes = `${now.getMinutes()}`.padStart(2, 0);
date.textContent = `${dayName} | ${month} ${day} | ${hour}:${minutes}`;
// next weekdays
const weekDaysArr = [...weekDays];
weekDaysArr.forEach(function (cur, i, arr) {
  let nextDay = new Date();
  nextDay.setDate(nextDay.getDate() + i + 1);
  let dzien = nextDay.toLocaleString("eng", { weekday: "long" });
  cur.textContent = dzien;
});
// next hours
const huoursArr = [...hours];
huoursArr.forEach(function (cur, i, arr) {
  let nextHour = new Date();
  nextHour.setHours(nextHour.getHours() + i + 1);
  const godz = `${nextHour.getHours()}`.padStart(2, 0);
  cur.textContent = godz;
});
huoursArr[0].textContent = "NOW";
huoursArr[9].textContent = "time";

// DAYTIME SETTINGS -  background color & icons
// Color settings
const duringDayColor = "#FEF2E9";
const duringNightColor = "#3D3A43";
const duringNightColor_light = "#fcefe4";
// Day
// console.log(hour);

let dayDN;
if (hour > 6 && hour < 22) {
  // daytime
  dayDN = true;
} else {
  // night
  dayDN = false;
}
console.log(dayDN);

if (dayDN) {
} else if (!dayDN) {
  // Night
  description.style.color = duringNightColor_light;
  currentTemp.style.color = duringNightColor_light;
  currentTemp.style.fontWeight = "400;";
  description.style.fontWeight = 400;
  main.style.backgroundColor = duringNightColor;
  cityName.style.color = duringNightColor_light;
  document.body.style.color = duringNightColor_light;
}

// CHECK WEATHER BY COORDINATIONS
const getLocationWeather = () => {
  // Geolocation settings
  if (navigator.geolocation)
    navigator.geolocation.getCurrentPosition(function (position) {
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      // console.log(latitude, longitude);

      // API settings
      const _apiKey = "a2591461f23002bc81cc20c054b1cc73";
      const _apiLink = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&appid=`;
      const _url = _apiLink + _apiKey + _apiUnits;
      fetch(_url)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          const loc = data.timezone.split("/")[1];
          // console.log(loc);
          // Render current weather forecast by city name
          getWeather(loc);
          // Render long range weather forecast by coord
          longForecast(latitude, longitude);
        })
        .catch((err) => {
          console.log(`${err} Something went wrong.Try agian!`);
        });
    });
};

// SET LONG RAGE WEATHER FORECAST FUNCTION
const longForecast = (latitude, longitude) => {
  // API settings
  const _apiKey = "a2591461f23002bc81cc20c054b1cc73";
  const _apiLink = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&appid=`;
  const _url = _apiLink + _apiKey + _apiUnits;
  fetch(_url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      //SET NEXT HOURS WEATHER
      const hoursTempArr = [...hoursTemp];
      hoursTempArr.forEach(function (cur, i, arr) {
        cur.textContent = Math.round(data.hourly[i].temp);
        // console.log(cur);
      });
      hoursTempArr[8].textContent = degrees;
      hourNow.textContent = Math.round(data.current.temp);
      //SET NEXT DAYS WEATHER
      const daysTempArr = [...weekDaysTemp];
      daysTempArr.forEach(function (cur, i, arr) {
        let dayT = Math.round(data.daily[i].temp.day);
        let nightT = Math.round(data.daily[i].temp.night);
        cur.textContent = dayT + " | " + nightT;
        // console.log(cur);
      });

      const dayIconArr = [...dayIcon];
      // console.log(dayIconArr);
      dayIconArr.forEach(function (cur) {
        // console.log(cur);
        let icon;
        let id = data.daily[0].weather[0].id;
        console.log(id);
        //   setting main icon photo
        if (id >= 200 && id < 300) {
          cur.setAttribute("src", "img/grahp-thunder.png");
        } else if (id >= 300 && id < 600) {
          cur.setAttribute("src", "img/graph-rain.png");
        } else if (id >= 600 && id < 700) {
          cur.setAttribute("src", "img/graph-snow.png");
        } else if (id >= 700 && id < 800) {
          cur.setAttribute("src", "img/graph-drizzle.png");
        } else if (id === 800 && dayDN) {
          cur.setAttribute("src", "img/graph-sun.png");
        } else if (id === 800 && !dayDN) {
          cur.setAttribute("src", "img/graph-moon.png");
        } else if (id > 800 && id <= 802) {
          cur.setAttribute("src", "img/graph-clouds.png");
        } else if (id > 800 && id <= 802) {
          cur.setAttribute("src", "img/graph-clouds.png");
        } else if (id >= 803 && id <= 804) {
          cur.setAttribute("src", "img/graph-clouds.png");
        }
      });
    })
    .catch((err) => {
      console.log(`${err} Something went wrong.Try agian!`);
    });
};

// CHECK WEATHER BY CITY NAME
const getWeather = (city) => {
  // let city = input.value || "Cape Town";
  cityName.textContent = city;
  // clearing inputs
  input.value = "";
  warning.textContent = " ";

  // API settings
  const _apiLink = "https://api.openweathermap.org/data/2.5/weather?q=";
  const _apiKey = "&appid=a2591461f23002bc81cc20c054b1cc73";
  const _url = _apiLink + city + _apiKey + _apiUnits;

  fetch(_url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      const lat = data.coord.lat;
      const long = data.coord.lon;
      // console.log(lat, long);
      longForecast(lat, long);

      // Changing metrical vs imperial
      // const changeUnitCF = function () {
      //   _apiUnits = "&units=imperial";
      //   degrees = "°F";
      //   getWeather(city);
      // };
      // const changeUnitFC = function () {
      //   _apiUnits = "&units=metric";
      //   degrees = "°C";
      //   getWeather(city);
      // };

      // degF.addEventListener("click", changeUnitCF);
      // degC.addEventListener("click", changeUnitFC);

      // Setting parametrs
      temp.textContent =
        Math.round(data.main.temp_max) +
        " | " +
        Math.round(data.main.temp_min) +
        degrees;
      humidity.textContent = data.main.humidity + "%";
      wind.textContent = data.wind.speed + " km/h";
      pressure.textContent = data.main.pressure + " hPa";

      //   setting main icon description
      const status = Object.assign({}, ...data.weather);
      // console.log(status);
      description.textContent = status.description;
      currentTemp.textContent = Math.round(data.main.temp) + degrees;
      const id = status.id;

      //   setting main icon photo
      if (id >= 200 && id < 300) {
        photo.setAttribute("src", "img/icon-thunderstorm.png");
      } else if (id >= 300 && id < 600) {
        photo.setAttribute("src", "img/icon-rain.png");
      } else if (id >= 600 && id < 700) {
        photo.setAttribute("src", "img/icon-snow.png");
      } else if (id >= 700 && id < 800) {
        photo.setAttribute("src", "img/icon-atmosphere.png");
      } else if (id === 800 && dayDN) {
        photo.setAttribute("src", "img/icon-clearsky.png");
      } else if (id === 800 && !dayDN) {
        photo.setAttribute("src", "img/icon-clearsky-night.png");
      } else if (id > 800 && id <= 802 && dayDN) {
        photo.setAttribute("src", "img/icon-cloudsmin.png");
      } else if (id > 800 && id <= 802 && !dayDN) {
        photo.setAttribute("src", "img/icon-cloudsmin-night.png");
      } else if (id >= 803 && id <= 804) {
        photo.setAttribute("src", "img/icon-cloudsmax.png");
      }
    })
    .catch(() => {
      warning.textContent = "Type correct city name!";
      cityName.textContent = "City not found";
    });
};

const checkWeather = function () {
  let city = input.value || "Cape Town";
  cityName.textContent = city;
  getWeather(city);
};

// Enter submit
const enterCheck = (e) => {
  if (e.key === "Enter") {
    checkWeather();
  }
};

input.addEventListener("keyup", enterCheck);
buttonSearch.addEventListener("click", checkWeather);
buttonLocation.addEventListener("click", getLocationWeather);
window.addEventListener("load", function (e) {
  e.preventDefault;
  checkWeather();
});
