"use client";

import WeatherCard from "@/components/WeatherCard";
import { getWeather, searchLocation } from "@/services/api";
import { useQuery } from "react-query";
import { usePalette } from "react-palette";
import { WeatherConditions } from "@/constants/enum";
import GradientBackground from "@/components/GradientBackground";
import { useFormik } from "formik";
import moment from "moment";
import AutoCompleteInput from "@/components/AutoComplete";
import { weatherExample } from "@/constants/datas";

const Home = () => {
  const formik = useFormik({
    initialValues: {
      search: "",
      latitude: "41",
      longitude: "29",
    },
    onSubmit: () => {},
  });

  const {
    data: weatherData,
    isLoading: weatherIsLoading,
    isError: weatherIsError,
  } = useQuery({
    queryKey: ["weather", formik.values.latitude, formik.values.longitude],
    queryFn: getWeather,
  });

  const { data: searchData, isLoading: searchIsLoading } = useQuery({
    queryKey: ["locations", formik.values.search],
    queryFn: searchLocation,
  });

  const { data: colorPaletteData } = usePalette(
    WeatherConditions[
      weatherData?.current.condition.code as keyof typeof WeatherConditions
    ]?.icon
  );

  function checkTimeOfDay(dateStr: string) {
    const date = moment(dateStr, "YYYY-MM-DD HH:mm");

    const hour = Number(date.format("HH"));

    if ((hour >= 0 && hour < 6) || (hour >= 20 && hour < 24)) {
      return "night";
    } else if (hour >= 6 && hour < 12) {
      return "morning";
    } else if (hour >= 12 && hour < 18) {
      return "afternoon";
    } else {
      return "evening";
    }
  }

  return (
    <main className="font-sans flex w-screen h-screen justify-center items-center">
      <GradientBackground
        timeOfDay={checkTimeOfDay(weatherExample.location.localtime)}
        color={colorPaletteData.vibrant}
      />
      <div className="relative z-20">
        <AutoCompleteInput
          labelKey="display_name"
          loading={searchIsLoading}
          inputValue={formik.values.search}
          options={searchData}
          onChangeInput={formik.handleChange("search")}
          onChange={(item) => {
            formik.setFieldValue("search", item?.display_name);
            formik.setFieldValue("latitude", item?.lat);
            formik.setFieldValue("longitude", item?.lon);
          }}
        />
        <WeatherCard
          timeOfDay={checkTimeOfDay(weatherExample.location.localtime)}
          data={weatherData}
          loading={weatherIsLoading || weatherIsError}
        />
      </div>
    </main>
  );
};

export default Home;
