const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'ec5cff4f73msh0390f394466e024p1522dejsn440f03d13f9a',
		'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
	}
};

async function getWeatherData(city = 'Vinnitsa') {
  toggleLoading(true)
  try {
    const response = await fetch(`https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`, options);
    return await response.json()
  } catch (e) {
    console.error(err)
  } finally {
    toggleLoading(false)
  }
}

function toggleLoading(loading = true) {
  document.getElementById('widget').classList.toggle('hidden', loading)
  document.getElementById('loader').classList.toggle('hidden', !loading)
}

function setElement(elementId, text) {
  const element = document.getElementById(elementId)
  element.innerText = text
}

function mapWeatherToElements(weather) {
  if(weather.location) {
    setElement('city', weather.location.name)
    const localTime = new Date(weather.location.localtime)
    setElement('time', `${localTime.getHours()}:${localTime.getMinutes()}`)
  }
  
  if(weather.current) {
    const current = weather.current
    setElement('temperature', current.temp_c)
    setElement('condition', current.condition.text)
    setElement('wind-speed', current.wind_kph)
    setElement('humidity', current.humidity)
    setElement('cloud', current.cloud)

    const conditionImage = document.getElementById('condition-image')
    conditionImage.setAttribute('src', `http:${current.condition.icon}`)
  }
}

async function loadWeather() {
  const weather = await getWeatherData()
  mapWeatherToElements(weather)
}

window.addEventListener('load', async () => {
  await loadWeather()

  document.getElementById('reload').addEventListener('click', async () => {
    await loadWeather()
  })
})


