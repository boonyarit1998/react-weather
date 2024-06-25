import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import WeatherData from './types'
import { IoMdSunny,IoMdRainy,IoMdCloudy,IoMdSnow,IoMdThunderstorm } from 'react-icons/io'
import { BsCloudDrizzleFill, BsCloudHaze2Fill } from 'react-icons/bs'





function App() {
  const [weather,setWeather] = useState<WeatherData|null>(null);
  const [city,setCity] = useState<string>('Bangkok');
  const API_KEY = 'API_openweathermap';
  
  const date = new Date();

  const fatchWeather = async () => {
    try {
      const response = await axios.get<WeatherData>(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      setWeather(response.data);
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fatchWeather();

  },[city]);

  const getWeatherIcon = (description : string ) => {
    switch (description) {
      case 'Clouds':
          return <IoMdCloudy/>
          case 'Haze':
            return <BsCloudHaze2Fill/>
            case 'Rain':
          return <IoMdRainy/>
          case 'Clear':
          return <IoMdSunny/>
          case 'Drizzle':
          return <BsCloudDrizzleFill/>
          case 'Snow':
          return <IoMdSnow/>
          case 'Thunderstorm':
          return <IoMdThunderstorm/>
    
      default:
        return <IoMdCloudy/>;
    }
  }



  return (
    <div className='w-full h-screen bg-gradient-to-r from-cyan-500 to-blue-500 items-center flex flex-col justify-center'>
      <div className='w-full max-w-[450px] py-2'>
      <input className=' w-full bg-black/20 text-white rounded-lg p-4' type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder='Input City'/>
      </div>
     {weather && (
      <div className='w-full max-w-[450px] bg-black/20 text-white rounded-lg px-6 py-12 '>
        <h2 className='text-2xl'>{weather.name} , {weather.sys.country}</h2>
        
       
        <p >{date.getUTCDate()}/{date.getUTCMonth()}/{date.getFullYear()}</p>
        <p className='text-8xl my-20 text-center'>{weather.main.temp}<span className='text-8xl justify-center'>°</span></p>
        <p className='text-center text-2xl'>{weather.weather[0].main}</p>
        <div className='flex justify-center text-8xl'>
        {getWeatherIcon(weather.weather[0].main)}
        </div>
        
        <div className='flex justify-between'>
        <p className='text-2xl'>สูงสุด:{weather.main.temp_max}°</p>
        <p className='text-2xl'>ต่ำสุด:{weather.main.temp_min}°</p>
        </div>
        
      </div>
     )}
    </div>
  )
}

export default App
