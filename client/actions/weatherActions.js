import axios from 'axios';

export default function fetchWeather() {
  const apiKey = '91989caa792ff47f0d8628d457e8864b';
  return (dispatch) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&&units=imperial`)
        .then((res) => {
          dispatch({ type: 'RECEIVE_WEATHER', payload: res.data });
        })
        .catch((err) => {
          dispatch({ type: 'WEATHER_ERROR', payload: err });
        });
    });
  };
}

