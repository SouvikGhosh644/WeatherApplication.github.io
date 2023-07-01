//store apikey & apiurl//

const apikey = "71429b4cd98238a6cbb18345a8f52432";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";


// store input variable, search button & weather icon//
const search_box = document.querySelector(".search input");
const search_btn = document.querySelector(".search button");
const weather_icon = document.querySelector(".weather_icon");

// function to get weather
async function checkWeather(city)
{
    //fetch weather details and store it//
    const response = await fetch(apiurl + city + `&appid=${apikey}`);

    // if the input city not found//
    if (response.status == 404) 
    {
        // show the error msg//
        document.querySelector(".error").style.display = "block";

        // do not display the weather details//
        document.querySelector(".weather").style.display = "none";
    }
    // Correct input city//
    else
    {
        //store the response into variable//
        var data = await response.json();

        // console.log(data);


        //display output//
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        //check weather and give proper image accordingly//

        if (data.weather[0].main == "Clouds") {
            weather_icon.src = "images/clouds.png";
        }
        else if (data.weather[0].main == "Clear") {
            weather_icon.src = "images/clear.png";
        }
        else if (data.weather[0].main == "Rain") {
            weather_icon.src = "images/rain.png";
        }
        else if (data.weather[0].main == "Drizzle") {
            weather_icon.src = "images/drizzle.png";
        }
        else if (data.weather[0].main == "Mist") {
            weather_icon.src = "images/mist.png";
        }

        //display weather information//
        document.querySelector(".weather").style.display = "block";

        //do not display error msg//
        document.querySelector(".error").style.display = "none";
    }


}

//active search button//
search_btn.addEventListener("click", () => {

    // Get the input value
    const inputValue = search_box.value;

    if(inputValue.trim() === ""){
        alert("You must have to enter a city!!");
    }
    else{
        //weather function call//
        checkWeather(inputValue);
    }
})

