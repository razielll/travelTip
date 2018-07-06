function getWeather(lat, lng) {
    const WEATHER_API_KEY = `026a8c3051a2993a75e3424a25650f70`;

    return new Promise((resolve) => {
        axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&APPID=${WEATHER_API_KEY}&units=metric`)
            .then(res => {
                console.log(`weather res:`, res.data.main);
                let temp = res.data.main.temp
                document.querySelector('.weather-today').innerHTML = `${temp} &#x2103;`
                resolve();
            });

    });

}


export default {
    getWeather
}