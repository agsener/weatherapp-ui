import axios from 'axios';

const WEATHER_API_BASE_URL = "http://localhost:8080/weather";

class CityService {

    getCities(){
        return axios.get(WEATHER_API_BASE_URL + "/cities");
    }
}

export default new CityService()