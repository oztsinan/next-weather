import { WeatherConditions } from "@/constants/enum";
import { WeatherItem } from "@/types/WeatherItem";
import moment from "moment";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type WeatherCardProps = {
  data: WeatherItem;
  loading?: boolean;
  timeOfDay?: "afternoon" | "morning" | "night" | "evening";
};

const WeatherCard = ({ data, loading, timeOfDay }: WeatherCardProps) => {
  function getBackgroundColor() {
    if (timeOfDay == "night") {
      return `from-[#272829] to-[#252B48]`;
    } else if (timeOfDay == "morning") {
      return `from-cyan-200 to-cyan-400`;
    } else if (timeOfDay == "afternoon") {
      return `from-cyan-200 to-cyan-400`;
    } else {
      return `from-[#272829] to-[#252B48]`;
    }
  }

  if (loading) {
    return (
      <div className="w-[400px] h-[400px]">
        <Skeleton
          className="shadow-2xl"
          count={1}
          width={"100%"}
          height={"100%"}
          borderRadius={20}
        />
      </div>
    );
  }

  return (
    <div
      className={`text-white w-[400px] h-[400px] flex flex-col justify-between rounded-2xl pointer-events-none	 shadow-2xl bg-gradient-to-r  ${getBackgroundColor()}`}
    >
      <div className="bg-red w-full h-[60%] flex flex-col items-end justify-end">
        <div className="flex items-end justify-center w-full">
          <Image
            priority
            width={400}
            height={400}
            className="w-[50%] rounded-tl-2xl"
            alt="icon"
            src={
              WeatherConditions[
                data?.current.condition.code as keyof typeof WeatherConditions
              ]?.icon
            }
          />
          <div className="w-[50%] pr-5">
            <p className="font-thin">{data?.current.condition.text}</p>
            <label className="text-7xl font-medium">
              {data?.current.feelslike_c}°
            </label>
            <p className="font-light text-md">
              {data?.location.name}/{data?.location.country}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-blue w-full h-[40%]  flex justify-center items-center">
        {data?.forecast?.forecastday?.map((item, index) => (
          <div key={index} className="w-[50px] mr-2 flex flex-col items-center">
            <span>{moment(item.date).format("dd")}</span>
            <Image
              width={45}
              height={45}
              src={`http:${item.day.condition.icon}`}
              alt="weather-icon"
            />
            <span className="font-thin">{item.day.maxtemp_c}°</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherCard;
