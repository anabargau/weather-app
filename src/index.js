import './style.css';
import Clear from './clear.png';
import Thunderstorm from './thunderstorm.png';
import Drizzle from './drizzle.png';
import Rain from './rain.png';
import Snow from './snow.png';
import Mist from './mist.png';
import Cloud from './cloud.png';

let weatherInfo = document.getElementById('weather-info');
weatherInfo.style.display = 'none';

const KEY = '76f6d28bd8907ad6d7de2a847fefca69';

function createIcon(id, node) {
	let img = document.createElement('img');
	node.textContent = '';
	if (id == '800') { 
		img.src = Clear;
	} else if (id.startsWith('2')) {
		img.src = Thunderstorm;
	} else if (id.startsWith('3')) {
		img.src = Drizzle;
	} else if (id.startsWith('5')) {
		img.src = Rain;
	} else if (id.startsWith('6')) {
		img.src = Snow;
	} else if (id.startsWith('7')) {
		img.src = Mist;
	} else if (id.startsWith('80')) {
		img.src = Cloud;
	}
	node.appendChild(img);
}

function displayWeatherInfo(info, speedUnit, tempUnit) {
	let weatherMain = document.getElementById('weather-main');
	let mainTemp = document.getElementById('main-temp');
	let maxTemp = document.getElementById('max-temp-info');
	let minTemp = document.getElementById('min-temp-info');
	let humidity = document.getElementById('humidity-info');
	let visibility = document.getElementById('visibility-info');
	let wind = document.getElementById('wind-info');
	let weatherImg = document.getElementById('weather-image');
	weatherMain.textContent = info.weather[0].description;
	mainTemp.textContent = info.main.temp + ` ${tempUnit}`;
	maxTemp.textContent = info.main.temp_max + ` ${tempUnit}`;
	minTemp.textContent = info.main.temp_min + ` ${tempUnit}`;
	humidity.textContent = info.main.humidity + '%';
	visibility.textContent = info.visibility + ' m';
	wind.textContent = info.wind.speed + ` ${speedUnit}`;
	createIcon(info.weather[0].id.toString(), weatherImg);
	weatherInfo.style.display = 'block';
}

async function getInfo() {
	let location = document.getElementById('location').value;
	let unit = document.querySelector('input[name="units"]:checked').value;
	let speedUnit, tempUnit;
	if (unit == 'metric') {
		speedUnit = 'm/s';
		tempUnit =  '°C';
	} else {
		speedUnit = 'mph';
		tempUnit = '°F';
	}
	try {
		let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${KEY}&units=${unit}`);
		let info = await response.json();
		displayWeatherInfo(info, speedUnit, tempUnit);
	} catch (error) {
		alert('Sorry, that didn\'t work :(');
	}   
}

let radio = document.querySelectorAll('[name="units"]');
for(let i = 0; i < radio.length; i++){
	radio[i].addEventListener('change', getInfo);
}
let searchBtn = document.getElementById('search');
searchBtn.addEventListener('click', getInfo);
getInfo();


