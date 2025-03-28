// services/weatherService.ts
export const fetchCurrentWeather = async (city: string) => {
    try {
      const response = await fetch(
        `http://localhost:5070/api/Dashbored/Weather/current?city=${city}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      
      const data = await response.json();
      console.log(data.data);
      return data.data; 

    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  };
  export const fetchWeatherForecast = async (city: string) => {
    try {
      const response = await fetch(
        `http://localhost:5070/api/Dashbored/Weather/forecast?city=${city}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch weather forecast');
      }
      
      const data = await response.json();
      console.log(data.data);
      return data.data; 
    } catch (error) {
      console.error('Error fetching weather forecast:', error);
      throw error;
    }
  };