const API_KEY = 'ASC7V8CHGLEPQNHBA4DXHHP5J'

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

    console.log(dataWeather)
  } catch (error) {
    console.log('Error', error)
  }
}

console.log(getDataWeather5Days('Seville'))
