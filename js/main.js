function GetInfo() {

    let newName = document.getElementById("cityInput");
    let cityName = document.getElementById("cityInput");
    cityName.innerHTML = newName.value;

    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + newName.value + '&appid=812854c2f6e78ef64133b77500f929b8')
        .then(response => response.json())
        .then(data => {

            // Temperature
            for (i = 0; i < 7; i++) {
                document.getElementById("temp" + (i + 1)).innerHTML = "Temperature: " + Number(data.list[i].main.temp - 273.15).toFixed(1) + "°";
                //Number(1.3450001).toFixed(2); // 1.35
                // console.log(Number(data.list[i].main.temp - 273.15).toFixed(1) + "°")
            }

            // Humidity
            for (i = 0; i < 7; i++) {
                document.getElementById("humidity" + (i + 1)).innerHTML = "Humidity: " + Number(data.list[i].main.humidity);
            }

            // Wind Speed
            for (i = 0; i < 7; i++) {
                document.getElementById("wind" + (i + 1)).innerHTML = "Wind Speed: " + Number(data.list[i].wind.speed);
            }

            // Date Time
            const forecasts = data.list;
            for (i = 0; i < 7; i++) {
                const forecast = forecasts[i];
                const date = new Date(forecast.dt_txt);
                console.log(date.toLocaleString());
                document.getElementById("date" + (i + 1)).innerHTML = "Date & Time: " + date.toLocaleString();
            }
        })
        .catch(err => console.log("Something Went Wrong: Try Checking Your Internet Coneciton"))
}

function DefaultScreen() {
    document.getElementById("cityInput").defaultValue = "Delhi";
    GetInfo();
}

//Getting and displaying the text for the upcoming five days of the week
const d = new Date();
let weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];

//Function to get the correct integer for the index of the days array
function CheckDay(day) {
    if (day + d.getDay() > 6) {
        return day + d.getDay() - 7;
    }
    else {
        return day + d.getDay();
    }
}

for (i = 0; i < 7; i++) {
    document.getElementById("day" + (i + 1)).innerHTML = weekday[CheckDay(i)];
}