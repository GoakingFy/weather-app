import { $DivCardWeather } from './variables/variablesDOM.js'
const API_KEY = 'ASC7V8CHGLEPQNHBA4DXHHP5J'

function loadIconWeather (icon) {
  let image

  if (icon === 'cloudy') {
    image = 'src/img/HeavyCloud.png'
  } else if (icon === 'clear-day') {
    image = 'src/img/Clear.png'
  } else if (icon === 'snow') {
    image = 'src/img/Snow.png'
  } else if (icon === 'rain') {
    image = 'src/img/HeavyRain.png'
  } else if (icon === 'partly-cloudy-day') {
    image = 'src/img/LightCloud.png'
  } else if (icon === 'showers-day') {
    image = 'src/img/Shower.png'
  } else if (icon === 'thunder-rain') {
    image = 'src/img/Thunderstorm.png'
  }

  return image
}

const fetchDataWeather5days = async (location) => {
  const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next5days?key=${API_KEY}`)

  if (!response.ok) {
    throw new Error('La solicitud no se pudo completar')
  }

  const dataWeather = await response.json()
  return dataWeather
}

async function getDataWeather5Days (location) {
  try {
    const dataWeather = await fetchDataWeather5days(location)

    return dataWeather.days
  } catch (error) {
    console.log('Error', error)
  }
}

function toCelsius (degrees) {
  const c = (degrees - 32) * 5 / 9
  return Math.trunc(c)
}

async function printDays (days) {
  try {
    const getdays = await days
    console.log(getdays[0].icon === 'clear-day')
    // Cambiar formato fecha
    // Comoponetizar el elemento cardWeather
    $DivCardWeather.forEach((elem, i) => {
      elem.innerHTML = `
      <h3 class="divCardWeather--h3Day">${getdays[i].datetime}</h3>
      <img src="${loadIconWeather(getdays[i].icon)}" alt="shower image" class="divCardWeather--imgWeather">
      <div class="divCardWeather--divContainerDegrees">
          <p class="divContainerDegrees--pMaxDegrees">${toCelsius(getdays[i].tempmax)}ºC</p>
          <p class="divContainerDegrees--pMinDegrees">${toCelsius(getdays[i].tempmin)}ºC</p>
      </div>
      `
    })

    console.log(getdays)
  } catch (error) {
    console.log('Error', error)
  }
}

printDays(getDataWeather5Days('seville'))
