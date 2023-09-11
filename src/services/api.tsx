import axios from "axios";

export const getWeather = async ({ queryKey }: any) => {
  const [_, latitude, longitude] = queryKey;

  const response = await axios.get(
    `https://api.weatherapi.com/v1/forecast.json?q=${latitude},${longitude}&days=6&lang=en&key=${process.env.WEATHER_API_KEY}`
  );
  return response.data;
};

export const searchLocation = async ({ queryKey }: any) => {
  const [_, query] = queryKey;

  const response = await axios.get(
    `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
  );

  return response.data;
};
