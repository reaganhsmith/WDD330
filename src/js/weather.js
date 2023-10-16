const url =
  "https://api.openweathermap.org/data/2.5/weather?q=rexburg&units=imperial&appid=c0299471663639e3035fb06977385833";

async function apiFetch() {
  const weatherElement = document.querySelector(".weather");
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      weatherElement.insertAdjacentHTML("afterBegin", weatherDisplay(data));
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    error;
  }
}

function weatherDisplay(data) {
  const sunrise = getTime(parseFloat(data.sys.sunrise) * 1000);
  const sunset = getTime(parseFloat(data.sys.sunset) * 1000);

  function getTime(time) {
    const date = new Date(time);

    const hours = date.getHours();
    let adjustedHour;
    if (hours <= 12) {
      adjustedHour = hours;
    } else {
      adjustedHour = hours - 12;
    }
    const minutes = date.getMinutes();

    const timeStamp = `${adjustedHour}:${minutes}`;
    return timeStamp;
  }

  const today = new Date().toDateString();

  console.log(data);
  return `<h4> <span class="material-symbols-outlined">
      location_on
      </span> ${data.name} </h4>
      <div class="weath">
      <div class="weatherLeft"> 
      <h5>${data.main.feels_like.toFixed(0)}°F</h5>
      <div class="weatherDesc">
      <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="${data.weather[0].description}">
      <p> ${data.weather[0].description}</p>
      </div>
      <p> ${today} </p>
      
      </div><div class="weatherRight">
      <p> High: ${data.main.temp_max.toFixed(0)}°F </p>
      <p> Low: ${data.main.temp_min.toFixed(0)}°F </p>
      <p> Wind Speed: ${data.wind.speed}mph</p>
      <p> Sunset: ${sunrise}AM</p>
      <p> Sunset: ${sunset}PM </p>
      </div></div>
      `;
}
apiFetch();
