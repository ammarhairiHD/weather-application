const apiKey = "c5b2046cafd528818d5d615f6b0c1f94";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apiUrl2 = "https://api.openweathermap.org/data/2.5/weather?units=metric&lat="
const apiUrl3 = "https://api.openweathermap.org/data/2.5/forecast?units=metric&lat="

const searchBox = document.getElementById("input-el");
const searchBtn = document.getElementById("input-btn");
const locationEl = document.getElementById("location")
const dateEl = document.getElementById("date")
const weatherIcon = document.getElementById("icon")

if(searchBtn){
    searchBtn.addEventListener("click", function(){
        checkWeather(searchBox.value); 
    })
}

window.onload = getLocation;

function getLocation(){
    if (navigator.geolocation) {    
        navigator.geolocation.getCurrentPosition(showElement);
    } else { 
        locationEl.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function myFunction() {
    let bodyEl = document.body;
    
    if( bodyEl.hasAttribute("data-bs-theme")){
        bodyEl.removeAttribute("data-bs-theme");
    } else {
        bodyEl.setAttribute("data-bs-theme", "dark");
    }
}

function weatherCondition(data){
    if (data.weather[0].main == "Clouds"){
        weatherIcon.src = "images/clouds.png"
    } else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "images/clear.png"
    } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "images/rain.png"
    } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "images/drizzle.png"
    } else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "images/mist.png"
    }
}

function weatherConditionForecast(data){

    const weatherIcon1 = document.getElementById("icon1")
    const weatherIcon2 = document.getElementById("icon2")
    const weatherIcon3 = document.getElementById("icon3")

    if (data.list[0].weather[0].main == "Clouds"){
        weatherIcon1.src = "images/clouds.png"
    } else if (data.list[0].weather[0].main == "Clear") {
        weatherIcon1.src = "images/clear.png"
    } else if (data.list[0].weather[0].main == "Rain") {
        weatherIcon1.src = "images/rain.png"
    } else if (data.list[0].weather[0].main == "Drizzle") {
        weatherIcon1.src = "images/drizzle.png"
    } else if (data.list[0].weather[0].main == "Mist") {
        weatherIcon1.src = "images/mist.png"
    }

    if (data.list[1].weather[0].main == "Clouds"){
        weatherIcon2.src = "images/clouds.png"
    } else if (data.list[1].weather[0].main == "Clear") {
        weatherIcon2.src = "images/clear.png"
    } else if (data.list[1].weather[0].main == "Rain") {
        weatherIcon2.src = "images/rain.png"
    } else if (data.list[1].weather[0].main == "Drizzle") {
        weatherIcon2.src = "images/drizzle.png"
    } else if (data.list[1].weather[0].main == "Mist") {
        weatherIcon2.src = "images/mist.png"
    }

    if (data.list[2].weather[0].main == "Clouds"){
        weatherIcon3.src = "images/clouds.png"
    } else if (data.list[2].weather[0].main == "Clear") {
        weatherIcon3.src = "images/clear.png"
    } else if (data.list[2].weather[0].main == "Rain") {
        weatherIcon3.src = "images/rain.png"
    } else if (data.list[2].weather[0].main == "Drizzle") {
        weatherIcon3.src = "images/drizzle.png"
    } else if (data.list[2].weather[0].main == "Mist") {
        weatherIcon3.src = "images/mist.png"
    }
}

async function checkWeather(city){
    const response = await fetch(apiUrl + city + "&appid=" + apiKey);
    var data = await response.json();
    console.log(data)
    document.getElementById("location").innerHTML = data.name;
    document.getElementById("temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.getElementById("humidity").innerHTML = data.main.humidity + "%";
    document.getElementById("wind").innerHTML = data.wind.speed + "km/h";
    document.getElementById("pressure").innerHTML = data.main.pressure + "hPa";
    document.getElementById("condition").innerHTML = data.weather[0].main;

    weatherCondition(data)
}

async function showElement(position) {
    const response = await fetch(apiUrl2 + position.coords.latitude + "&lon=" + position.coords.longitude + "&appid=" + apiKey);
    var data = await response.json();
    let regionNames = new Intl.DisplayNames(['en'], {type: 'region'});
    
    console.log(data)

    locationEl.innerHTML = data.name + "<br><b>" +regionNames.of(data.sys.country) + "</b>";
    document.getElementById("temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.getElementById("condition").innerHTML = data.weather[0].main;
    
    if(document.getElementById("humidity") && document.getElementById("wind") && document.getElementById("pressure")){
        document.getElementById("humidity").innerHTML = data.main.humidity + "%";
        document.getElementById("wind").innerHTML = data.wind.speed + "km/h";
        document.getElementById("pressure").innerHTML = data.main.pressure + "hPa";
    }

    const date = new Date();
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    const options1 = {
        weekday: 'long'
    };
    if(dateEl){
        dateEl.innerHTML = date.toLocaleString('en-GB', options) + "<br><b>" + date.toLocaleString('en-GB', options1) + "</b>"
    }
    
    weatherCondition(data)
    showForecast(position)
}

async function showForecast(position){
    const response = await fetch(apiUrl3 + position.coords.latitude + "&lon=" + position.coords.longitude + "&appid=" + apiKey);
    var data = await response.json();
    weatherConditionForecast(data)

    console.log(data)

    const x = [data.list[0].dt, data.list[1].dt, data.list[2].dt]
    let timeEL = []
    
    for(let i = 0; i < x.length; i++){
        let dateObj = new Date(x[i] * 1000)
        let utcString = dateObj.toUTCString();
        let time = utcString.slice(-11, -4);
        timeEL.push(time)
    }

    document.getElementById("temp1").innerHTML = Math.round(data.list[0].main.temp) + "°C";
    document.getElementById("time1").innerHTML = timeEL[0];

    document.getElementById("temp2").innerHTML = Math.round(data.list[1].main.temp) + "°C";
    document.getElementById("time2").innerHTML = timeEL[1];

    document.getElementById("temp3").innerHTML = Math.round(data.list[2].main.temp) + "°C";
    document.getElementById("time3").innerHTML = timeEL[2];
}
