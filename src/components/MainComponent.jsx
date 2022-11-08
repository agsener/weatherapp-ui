import React, { Component } from 'react';
import CityService from '../services/CityService';
import WeatherService from '../services/WeatherService';

let intervalId;
export default class ListCityComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedPeriodOption: 'hourly',
            selectedCityName: '',
            cityList: [],
            convertedDate: '',
            timestamp: '',
            iconSource: 'http://openweathermap.org/img/w/',
            weatherInfo: {
                weather: [{ icon: '', main: '' }],
                main: {
                    temp: '',
                    temp_min: '',
                    temp_max: ''
                },
                sys: {
                    country: ''
                },
                name: '',
                dt: ''
            }
        }
        this.getWeatherInfo = this.getWeatherInfo.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handlePeriodOptionChange = this.handlePeriodOptionChange.bind(this);
    }

    componentDidMount() {
        CityService.getCities().then((res) => {
            this.setState({ selectedCityName: res.data[0].name, cityList: res.data });
            this.getWeatherInfo(res.data[0].name);
        })
    }

    handleCityChange = (event) => {
        this.state.selectedCityName = event.target.value;
        this.getWeatherInfo(this.state.selectedCityName);
        clearInterval(intervalId);
        if (this.state.selectedPeriodOption === "hourly") {
            intervalId = setInterval(this.getWeatherInfo, 5000, this.state.selectedCityName);
        }
        else if (this.state.selectedPeriodOption === "minute") {
            intervalId = setInterval(this.getWeatherInfo, 3000, this.state.selectedCityName);
        } else {
            intervalId = setInterval(this.getWeatherInfo, 1000, this.state.selectedCityName);
        }
    }

    handlePeriodOptionChange = (event) => { //selectedPeriodOption
        this.setState({ selectedPeriodOption: event.target.value });
        let period = event.target.value;
        this.state.selectedPeriodOption = period;
        /*let period = event.target.value;
        this.state.selectedPeriodOption = period;*/
        clearInterval(intervalId);
        if (this.state.selectedPeriodOption === "hourly") {
            intervalId = setInterval(this.getWeatherInfo, 5000, this.state.selectedCityName);
        }
        else if (this.state.selectedPeriodOption === "minute") {
            intervalId = setInterval(this.getWeatherInfo, 3000, this.state.selectedCityName);
        } else {
            intervalId = setInterval(this.getWeatherInfo, 1000, this.state.selectedCityName);
        }
    }

    async getWeatherInfo(cityName) {
        WeatherService.getWeatherInfoByCityName(cityName).then((res) => {
            this.setState({ weatherInfo: res.data, timestamp: res.data.dt });
            this.state.iconSource = "http://openweathermap.org/img/w/" + res.data.weather[0].icon + ".png";
            let dateFormat = new Date(this.state.timestamp*1000)
            this.state.convertedDate = dateFormat.getDate()+
            "/"+(dateFormat.getMonth()+1)+
            "/"+dateFormat.getFullYear();
        });
    }

    render() {

        return (
            <div className='container'>
                <div className='row'>

                    <div className='col-4'>
                        <div className='form-group'>
                            <br />
                            <h3>Cities</h3>
                            <select className='form-control' onChange={(e) => this.handleCityChange(e)}>
                                {
                                    this.state.cityList.map((city) => (
                                        <option key={city.name} value={city.name}>{city.name.toUpperCase()}</option>
                                    ))
                                }
                            </select>
                        </div>


                        <br />

                        <h3>Request Frequency</h3>
                        <form>
                            <div className="radio">
                                <label>
                                    <input type="radio" value="hourly"
                                        checked={this.state.selectedPeriodOption === 'hourly'}
                                        onChange={(e) => this.handlePeriodOptionChange(e)} />
                                    Every Hour
                                </label>
                            </div>
                            <div className="radio">
                                <label>
                                    <input type="radio" value="minute"
                                        checked={this.state.selectedPeriodOption === 'minute'}
                                        onChange={(e) => this.handlePeriodOptionChange(e)} />
                                    Every Minute
                                </label>
                            </div>
                            <div className="radio">
                                <label>
                                    <input type="radio" value="secondly"
                                        checked={this.state.selectedPeriodOption === 'secondly'}
                                        onChange={(e) => this.handlePeriodOptionChange(e)} />
                                    Every Second
                                </label>
                            </div>
                        </form>





                    </div>
                    <div className='col-8'>
                        <div className="card card-1">
                            <div id="demo" className="carousel slide" data-ride="carousel">
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="temp">{this.state.weatherInfo.main.temp}&deg;</div>
                                                <div className="maxmin">max: {this.state.weatherInfo.main.temp_max}&deg; - min: {this.state.weatherInfo.main.temp_min}&deg;</div>
                                                <div className="location">{this.state.weatherInfo.name}, {this.state.weatherInfo.sys.country}</div>
                                                <div className="location">{this.state.convertedDate}
                                                </div>
                                            </div>
                                            <div className="col-6 justify-content-right aaa">

                                                <img className="img-fluid" src={this.state.iconSource} />
                                                <div className="weatMain">{this.state.weatherInfo.weather[0].main}</div>

                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
