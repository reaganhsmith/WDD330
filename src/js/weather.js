const url = 'https://api.openweathermap.org/data/2.5/weather?q=rexburg&units=imperial&appid=c0299471663639e3035fb06977385833' ;

async function apiFetch() {

    const weatherElement = document.querySelector(".weather");
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log(data); 

        weatherElement.insertAdjacentHTML(
            "afterBegin",
            weatherDisplay(data))

      } else {
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }
  }

  function weatherDisplay(data) {
    const sunrise = getTime(parseFloat(data.sys.sunrise) * 1000);
    const sunset = getTime(parseFloat(data.sys.sunset) * 1000);

    function getTime(time){
    const date = new Date(time);

    const hours = date.getHours();
    let adjustedHour;
    console.log(hours);
    if(hours <= 12){
        adjustedHour = hours;
    }else{
        adjustedHour = hours - 12;
    }
    const minutes = date.getMinutes();

    const timeStamp = `${adjustedHour}:${minutes}`;
    return timeStamp;
    }



      return `<h4>Weather</h4>
      <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="${data.weather[0].description}">
      <h5> <span class="material-symbols-outlined">
      location_on
      </span> ${data.name} </h5>
      <h6>${data.main.feels_like}°F </h6>
      <p> ${data.weather[0].description}</p>
      <p> Sunset: ${sunrise}AM</p>
      <p> Sunset: ${sunset}PM </p>
      `;
    }
apiFetch();

