import React, { useEffect, useState } from "react";

const Weather = () => {
    const cities = [
        { name: "Ahmedabad", lat: 23.0225, lon: 72.5714 },
        { name: "Delhi", lat: 28.6139, lon: 77.2090 },
        { name: "Mumbai", lat: 19.0760, lon: 72.8777 },
        { name: "Jaipur", lat: 26.9124, lon: 75.7873 },
        { name: "Banglore", lat: 12.9629, lon: 77.5775 },
        { name: "Kolkata", lat: 22.5744, lon: 88.3629 },
        { name: "Rajkot", lat: 22.3039, lon: 70.8022 },
    ];

    const [weatherData, setWeatherData] = useState([]);

    const getAqiLabel = (aqi) => {
        if (aqi <= 50) return { label: "Good", color: "text-green-500", icon: "cloud" };
        if (aqi <= 100) return { label: "Moderate", color: "text-yellow-500", icon: "cloud-sun" };
        if (aqi <= 150) return { label: "Sensitive", color: "text-orange-500", icon: "cloud-fog" };

    };

    useEffect(() => {
        const fetchWeather = async () => {
            const data = await Promise.all(
                cities.map(async (city) => {
                    const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true`;
                    const response = await fetch(url);
                    const result = await response.json();

                    const aqiUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${city.lat}&longitude=${city.lon}&hourly=pm10`;
                    const aqiResp = await fetch(aqiUrl);
                    const aqiResult = await aqiResp.json();
                    const currentAqi = aqiResult.hourly.pm10 ? aqiResult.hourly.pm10[0] : null;

                    return {
                        name: city.name,
                        temperature: result.current_weather.temperature,
                        windspeed: result.current_weather.windspeed,
                        aqi: currentAqi,
                    };
                })
            );
            setWeatherData(data);
        };

        fetchWeather();
    }, []);

    return (
        <div className="w-full max-w-7xl mx-auto flex justify-center gap-10 mt-10 flex-wrap pb-25">
            {weatherData.map((city) => {
                const { label, color, icon } = getAqiLabel(city.aqi || 0);
                return (
                    <div key={city.name} className="rounded-2xl w-[24%] shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-amber-200">
                        <h1 className="text-3xl font-bold text-gray-800 mb-4 pb-3 border-b border-amber-200">{city.name}</h1>
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3 rounded-xl p-3">
                                <div className="bg-orange-100 p-2 rounded-lg">
                                    <i className="bi bi-brightness-high text-2xl text-orange-500"></i>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-600 font-medium">Temperature</span>
                                    <span className="text-xl font-bold text-gray-800">{city.temperature} °C</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 rounded-xl p-3">
                                <div className="bg-blue-100 p-2 rounded-lg">
                                    <i className="bi bi-wind text-2xl text-blue-500"></i>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-600 font-medium">Wind Speed</span>
                                    <span className="text-xl font-bold text-gray-800">{city.windspeed} km/h</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 rounded-xl p-3">
                                <div className="bg-sky-100 p-2 rounded-lg">
                                    <i className={`bi bi-${icon} text-2xl text-sky-500`}></i>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-600 font-medium">Air Quality Index</span>
                                    <div className="flex items-center text-xl">
                                        <span className=" font-bold text-gray-800">{city.aqi}</span>
                                        <span className={` font-bold px-2 py-1 rounded-full ${color}`}>{label}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Weather;
