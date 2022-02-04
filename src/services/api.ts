import axios from 'axios';

const PRIVATE_KEY = 'ba05151b246603b356fe87389c4fab9d';

const api = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  params :{
    appid: PRIVATE_KEY
  }

});

export default api;
