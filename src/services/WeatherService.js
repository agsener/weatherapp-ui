import axios from 'axios';

const WEATHER_API_BASE_URL = "http://localhost:8080/weather";

class WeatherService {

    async getWeatherInfoByCityName(cityName){
        return await axios.get(WEATHER_API_BASE_URL + "/" + cityName);
    }
}

export default new WeatherService()