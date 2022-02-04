import axios from 'axios';

const PRIVATE_KEY = 'xxxxxxxxxxxxxxxxxxxx';

const api = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  params :{
    appid: PRIVATE_KEY
  }

});

export default api;
