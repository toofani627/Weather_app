// const result = `{"location":{"city":"Delhi","woeid":2295019,"country":"India","lat":28.643999,"long":77.091003,"timezone_id":"Asia/Kolkata"},"current_observation":{"pubDate":1742487782,"wind":{"chill":74,"direction":"WNW","speed":7},"atmosphere":{"humidity":29,"visibility":9.01,"pressure":1015.2},"astronomy":{"sunrise":"6:26 AM","sunset":"6:33 PM"},"condition":{"temperature":77,"text":"Partly Cloudy","code":30}},"forecasts":[{"day":"Thu","date":1742486400,"high":90,"low":65,"text":"Sunny","code":32},{"day":"Fri","date":1742572800,"high":91,"low":63,"text":"Sunny","code":32},{"day":"Sat","date":1742659200,"high":91,"low":63,"text":"Sunny","code":32},{"day":"Sun","date":1742745600,"high":93,"low":65,"text":"Sunny","code":32},{"day":"Mon","date":1742832000,"high":94,"low":69,"text":"Sunny","code":32},{"day":"Tue","date":1742918400,"high":98,"low":69,"text":"Sunny","code":32},{"day":"Wed","date":1743004800,"high":97,"low":68,"text":"Haze","code":21},{"day":"Thu","date":1743091200,"high":103,"low":71,"text":"Hot","code":36},{"day":"Fri","date":1743177600,"high":102,"low":69,"text":"Hot","code":36},{"day":"Sat","date":1743264000,"high":101,"low":69,"text":"Hot","code":36},{"day":"Sun","date":1743350400,"high":100,"low":69,"text":"Sunny","code":32}]}`

// const weatherData = JSON.parse(result);
// console.log(weatherData);

function calculateFeelsLike(temperature, humidity, windSpeed) {
    let feelsLike = temperature;

    if (temperature >= 80) {
        // Heat Index Formula
        feelsLike = -42.379 +
            2.04901523 * temperature +
            10.14333127 * humidity -
            0.22475541 * temperature * humidity -
            6.83783 * Math.pow(10, -3) * Math.pow(temperature, 2) -
            5.481717 * Math.pow(10, -2) * Math.pow(humidity, 2) +
            1.22874 * Math.pow(10, -3) * Math.pow(temperature, 2) * humidity +
            8.5282 * Math.pow(10, -4) * temperature * Math.pow(humidity, 2) -
            1.99 * Math.pow(10, -6) * Math.pow(temperature, 2) * Math.pow(humidity, 2);
    } else if (temperature < 50 && windSpeed > 3) {
        // Wind Chill Formula
        feelsLike = 35.74 +
            0.6215 * temperature -
            35.75 * Math.pow(windSpeed, 0.16) +
            0.4275 * temperature * Math.pow(windSpeed, 0.16);
    }

    return Math.round(feelsLike);
}

function setWeatherImage(weatherCondition) {
    const weatherImg = document.querySelector('.main-weather-condition-img');

    if (weatherCondition.includes('Clear') || weatherCondition.includes('Sunny')) {
        weatherImg.src = 'images/sunny.png';
    } else if (weatherCondition.includes('Partly Cloudy')) {
        weatherImg.src = 'images/partly-cloudy.png';
    } else if (weatherCondition.includes('Mostly Cloudy') || weatherCondition.includes('Overcast') || weatherCondition.includes('Cloudy')) {
        weatherImg.src = 'images/cloudy.png';
    } else if (weatherCondition.includes('Light Rain')) {
        weatherImg.src = 'images/light-rain.png';
    } else if (weatherCondition.includes('Moderate Rain') || weatherCondition.includes('Heavy Rain')) {
        weatherImg.src = 'images/rainy.png';
    } else if (weatherCondition.includes('Thunderstorms')) {
        weatherImg.src = 'images/thunderstorm.png';
    } else if (weatherCondition.includes('Light Snow')) {
        weatherImg.src = 'images/light-snow.png';
    } else if (weatherCondition.includes('Heavy Snow')) {
        weatherImg.src = 'images/heavy-snow.png';
    } else if (weatherCondition.includes('Foggy') || weatherCondition.includes('Mist') || weatherCondition.includes('Foggy')) {
        weatherImg.src = 'images/foggy.png';
    } else if (weatherCondition.includes('Windy')) {
        weatherImg.src = 'images/windy.png';
    } else if (weatherCondition.includes('Haze')) {
        weatherImg.src = 'images/haze.png';
    } else {
        weatherImg.src = 'images/default.png'; // Default image
    }
}

function setWeatherImageCard(weatherCondition) {
    if (weatherCondition.includes('Clear') || weatherCondition.includes('Sunny')) {
        return 'images/sunny.png';
    } else if (weatherCondition.includes('Partly Cloudy')) {
        return 'images/partly-cloudy.png';
    } else if (weatherCondition.includes('Mostly Cloudy') || weatherCondition.includes('Overcast') || weatherCondition.includes('Cloudy')) {
        return 'images/cloudy.png';
    } else if (weatherCondition.includes('Light Rain')) {
        return 'images/light-rain.png';
    } else if (weatherCondition.includes('Moderate Rain') || weatherCondition.includes('Heavy Rain')) {
        return 'images/rainy.png';
    } else if (weatherCondition.includes('Thunderstorms')) {
        return 'images/thunderstorm.png';
    } else if (weatherCondition.includes('Light Snow')) {
        return 'images/light-snow.png';
    } else if (weatherCondition.includes('Heavy Snow')) {
        return 'images/heavy-snow.png';
    } else if (weatherCondition.includes('Foggy') || weatherCondition.includes('Mist')) {
        return 'images/foggy.png';
    } else if (weatherCondition.includes('Windy')) {
        return 'images/windy.png';
    } else if (weatherCondition.includes('Haze')) {
        return 'images/haze.png';
    } else {
        return 'images/default.png'; // Default image
    }
}



// console.log(weatherData.current_observation.condition.temperature);

document.querySelector('.ri-search-line').addEventListener('click', async () => {
    console.log('clicked');
    document.querySelector('.overlay').style.zIndex = '2';
    let location = document.querySelector('input').value;
    const url = `https://yahoo-weather5.p.rapidapi.com/weather?location=${location}&format=json&u=f`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '38d992a7e4mshe4fe7cf3484d459p1d3d4ajsn2e4fa8f3a7a1',
            'x-rapidapi-host': 'yahoo-weather5.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        const weatherData = await JSON.parse(result);
        let lat = Math.floor(weatherData.location.lat)
        let long = Math.floor(weatherData.location.long)
        function gettime(lat, long) {
            document.querySelector('.time').innerHTML = 'Contacting to Server...';
            fetch(`https://timeapi.io/api/time/current/coordinate?latitude=${lat}&longitude=${long}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    const timeData = data;
                    console.log(timeData);
                    document.querySelector('.time').innerHTML = timeData.time
                    document.querySelector('.overlay').style.zIndex = '0';

                })
                .catch(error => console.error('Error fetching time:', error));

        }
        gettime(lat, long);

        setWeatherImage(weatherData.current_observation.condition.text);
        const feelsLikeTemperature = calculateFeelsLike(
            weatherData.current_observation.condition.temperature,
            weatherData.current_observation.atmosphere.humidity,
            weatherData.current_observation.wind.speed
        );

        document.querySelector('.feels-like-temp').innerHTML = feelsLikeTemperature + `<sup>F</sup>`;
        const weeklyCastContainer = document.querySelector('.weekly-cast');
        weeklyCastContainer.innerHTML = ''; // Clear previous content

        for (const forecast of weatherData.forecasts) {
            const card = document.createElement('div');
            card.classList.add('weekCastCard');

            card.innerHTML = `
    <div class="castCard1">
      <img src="${setWeatherImageCard(forecast.text)}" alt="">
      <div class="castCard1-1">
        <h5>${forecast.day}</h5>
        <h4>${forecast.text}</h4>
      </div>
    </div>
    <div class="castCard2">
      <div class="castCard2Top">
        <div class="cc2temp">
          <h3>MAX</h3>
          <h4>${(Math.floor((forecast.high - 32) * 5 / 9))}°C</h4>
        </div>
        <div class="cc2temp">
          <h3>MIN</h3>
          <h4>${(Math.floor((forecast.high - 32) * 5 / 9))}°C</h4>
        </div>
      </div>
      <div class="castCard2Bottom">
        <h2><span>Date </span> ${new Date(forecast.date * 1000).toLocaleDateString()}</h2>
      </div>
    </div>
  `;

            weeklyCastContainer.appendChild(card);
        }
        document.querySelector('.city').innerHTML = weatherData.location.city + ',';
        document.querySelector('.country').innerHTML = weatherData.location.country
        document.querySelector('.temp').innerHTML = (Math.floor((weatherData.current_observation.condition.temperature - 32) * 5 / 9)) + ` <sup> C</sup>`;
        document.querySelector('.text').innerHTML = weatherData.current_observation.condition.text;
        document.querySelector('.feels-like-text').innerHTML = weatherData.current_observation.condition.text;
        document.querySelector('#wind').innerHTML = weatherData.current_observation.wind.speed + ' MPH'
        document.querySelector('#humidity').innerHTML = weatherData.current_observation.atmosphere.humidity + ' %';
        document.querySelector('#visibility').innerHTML = weatherData.current_observation.atmosphere.visibility + ' mi';
        document.querySelector('#pressure').innerHTML = weatherData.current_observation.atmosphere.pressure + ' mb';
        document.querySelector('#sunrise-time').innerHTML = weatherData.current_observation.astronomy.sunrise;
        document.querySelector('#sunset-time').innerHTML = weatherData.current_observation.astronomy.sunset;
        console.log(result);



    } catch (error) {
        console.error(error);
    }









})
