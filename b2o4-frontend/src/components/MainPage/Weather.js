import React, { useState, useEffect } from 'react';
import '../css/Weather.css';
import axios from 'axios';

const DisplayWeather = () => {
    const [weatherValue, setWeatherValue] = useState(null);
    const [forecastValue, setForecastValue] = useState([]);
    const [weatherKey, setWeatherKey] = useState('');

    // 요일 계산
    const getDayOfWeek = (dateStr) => {
        const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
        const date = new Date(dateStr);
        return daysOfWeek[date.getDay()];
    };

    useEffect(() => {
        axios.get("/api/weather-api-key")
            .then(res => {
                setWeatherKey(res.data);
            })
            .catch(error => {
                console.error("Failed to fetch weather key:", error);
            });
    }, []);

    // 위치 정보 허용했을 때 위치 정보 가져옴
    const currentLocation = () => {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        resolve({ latitude, longitude });
                    },
                    (error) => {
                        reject(error);
                    }
                );
            } else {
                reject("위치 정보에 오류가 발생했습니다.");
            }
        });
    };

    useEffect(() => {
        if (!weatherKey) return;

        const getWeather = async () => {
            try {
                const { latitude, longitude } = await currentLocation();

                const getCityStateName = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`, {
                    headers: {
                        'Accept-Language': 'en'
                    }
                });
                const cityOrState = await getCityStateName.json();
                const locationName = cityOrState.address.city || cityOrState.address.state;

                const responseCurrent = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${locationName}&appid=${weatherKey}&units=metric&lang=KR`
                );

                const responseForecast = await fetch(
                    `https://api.openweathermap.org/data/2.5/forecast?q=${locationName}&appid=${weatherKey}&units=metric&lang=KR`
                );

                if (!responseCurrent.ok || !responseForecast.ok) {
                    throw new Error('네트워크 응답이 좋지 않습니다.');
                }

                const resultCurrent = await responseCurrent.json();
                const resultForecast = await responseForecast.json();

                const oneDay = 1000 * 60 * 60 * 24;
                const offset = 1000 * 60 * 60 * 9;
                const current = new Date().getTime() + offset;
                const DesiredTime = ' 21:00:00';
                const futureDates = Array.from({ length: 5 }, (_, i) =>
                    new Date(current + oneDay * i).toISOString().slice(0, 10) + DesiredTime
                );

                const weatherData = resultForecast.list.filter(item => {
                    return futureDates.includes(item.dt_txt);
                });

                setWeatherValue(resultCurrent);
                setForecastValue(weatherData);

                console.log(resultCurrent);
                console.log(weatherData);

            } catch (error) {
                console.error('Error: ', error);
                alert('⚠️ 위치를 받아올 수 없습니다. 잠시만 기다려주세요.');
            }
        };
        getWeather();
    }, [weatherKey]);

    // 날씨 상태에 따라 배경 이미지 선택하기
    const getBackgroundImage = (weather) => {
        if (!weather) return '';
        const mainWeather = weather.weather[0].main;
        switch (mainWeather) {
            case 'Clear':
                return '/images/weatherBackground_sunny.jpg';
            case 'Clouds':
                return '/images/weatherBackground_cloudy.jpg';
            case 'Rain':
                return '/images/weatherBackground_rainy.jpg';
            case 'Snow':
                return '/images/weatherBackground_snowy.jpg';
            case 'Thunderstorm':
                return '/images/weatherBackground_thunderstorm.jpg';
            case 'Fog':
                return '/images/weatherBackground_foggy.jpg';
            case 'Breeze':
                return '/images/weatherBackground_windy.jpg';
            case 'Hail':
                return '/images/weatherBackground_hail.webp';
            default:
                return '/images/weatherBackground_sunny.jpg';
        }
    };

    return (
        <div className='weather-widget'
            style={{ backgroundImage: `url(${process.env.PUBLIC_URL}${getBackgroundImage(weatherValue)})` }}>
            <div className='weather-view'>
                <div className='today-weather-container'>
                    {weatherValue && (
                        <div>
                            <h1>{weatherValue.name}</h1>
                            <div className="today-weather">
                                <div>
                                    <img src={`/images/${weatherValue.weather[0].icon}.png`} alt={weatherValue.weather[0].description} />
                                    <h3>{Math.round(weatherValue.main.temp)}°C</h3>
                                </div>
                                <ul>
                                    <li style={{fontSize: "18px"}}>
                                        <img src={`${process.env.PUBLIC_URL}/images/humidity.png`} alt='습도' />
                                        {weatherValue.main.humidity} %
                                    </li>
                                    <li style={{fontSize: "18px"}}>
                                        <img src={`${process.env.PUBLIC_URL}/images/windspeed.png`} alt='풍속' />
                                        {weatherValue.wind.speed} m/s
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
                <hr style={{ padding: 0, marginBottom: 10, margin: 0, border: '1px solid white', width: '100%' }} />
                <div className='forecast-container'>
                    <ul className='forecast-list'>
                        {forecastValue.map((item, index) => (
                            <li className='feature-weather' key={index}>
                                <p style={{ fontWeight: "bold" }}>{getDayOfWeek(item.dt_txt)}</p>
                                <img
                                    src={`${process.env.PUBLIC_URL}/images/${item.weather[0].icon}.png`}
                                    alt=''
                                />
                                <p style={{ fontWeight: "bold" }}>{parseInt(item.main.temp)}°C</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </div>
    );
};

export default DisplayWeather;