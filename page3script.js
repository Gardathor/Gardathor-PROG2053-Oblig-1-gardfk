const locations = [
    {name: "Oslo", latitude: 59.911491, longitude: 10.757933},
    {name: "Los Angeles", latitude: 34.052235, longitude: -118.243683},
    {name: "Rio de Janeiro", latitude: -22.908333, longitude: -43.196388},
    {name: "Cairo", latitude: 30.033333, longitude: 31.233334},
    {name: "Beijing", latitude: 39.916668, longitude: 116.383331}
];

const weatherSection = document.getElementById('weather-div');

function UpdateWeatherInfo() {
    weatherSection.innerHTML = '';  

    locations.forEach(location => {
        const URLfetch = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true`;

        fetch(URLfetch)
            .then(response => response.json())
            .then(data => {
                const weather = data.current_weather;
                const weatherblock = document.createElement('div');
                weatherblock.classList.add('weather');
                weatherblock.innerHTML = `
                    <h3>${location.name}</h3>
                    <p>Temperature: ${weather.temperature}°C</p>
                    <p>Windspeed: ${weather.windspeed} km/h</p>
                    <p>Weather Code: ${weather.weathercode}</p> `;
                    weatherSection.appendChild(weatherblock);
            })
            .catch(error => {
                console.error("Error fetching weather data: ", error);
            });
    });
}

UpdateWeatherInfo();

setInterval(UpdateWeatherInfo, 10000); //10 sec 