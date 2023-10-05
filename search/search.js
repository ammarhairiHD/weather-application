const apiKey = "a8eb5b7fe95f433f8fce64025324fb9e";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather (city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  var data = await response.json();

  console.log(data);

  document.querySelector(".location").innerHTML = data.name;
  document.querySelector(".day-temp").innerHTML = Math.round (data.main.temp ) + "°c";
  document.querySelector(".max-temp").innerHTML =  Math.round (data.main.temp_max ) + "°c";
  document.querySelector(".sea-level").innerHTML = data.main.sea_level;
  document.querySelector(".humidity-level").innerHTML = data.main.humidity;
  document.querySelector(".wind-speed").innerHTML = data.wind.speed;

  if(data.weather[0].main === "Clouds"){
  weatherIcon.src = "/icons/Cloudy.svg";
  } else if (data.weather[0].main === "Clear"){
    weatherIcon.src= "/icons/Sunny.svg"
  }  else if (data.weather[0].main === "Rain"){
    weatherIcon.src= "/icons/Thunderstorm.svg"
  }  else if (data.weather[0].main === "Drizzle"){
    weatherIcon.src= "/icons/Rain.svg"
  }  else if (data.weather[0].main === "Mist"){
    weatherIcon.src= "/icons/Party CLoudy.svg"
  }



}

searchBtn.addEventListener("click", () =>{
  checkWeather(searchBox.value);
})

