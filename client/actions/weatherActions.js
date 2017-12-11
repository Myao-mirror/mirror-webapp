import axios from 'axios';

export default function fetchWeather() {
  return (dispatch) => {
    const apiKey = '91989caa792ff47f0d8628d457e8864b';
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=seattle&appid=${apiKey}`)
      .then((res) => {
        dispatch({ type: 'RECEIVE_WEATHER', payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: 'WEATHER_ERROR', payload: err });
      });
  };
}

