import classNames from "classnames";

type GradientBackgroundProps = {
  color?: string;
  timeOfDay?: "afternoon" | "morning" | "night" | "evening";
};

const GradientBackground = ({ color, timeOfDay }: GradientBackgroundProps) => {
  function getBackgroundColor() {
    if (timeOfDay == "night") {
      return `linear-gradient(-20deg, #1c1c1c 0%, ${color} 100%)`;
    } else if (timeOfDay == "morning") {
      return `linear-gradient(-20deg, #50DBF1 0%, ${color} 100%)`;
    } else if (timeOfDay == "afternoon") {
      return `linear-gradient(-20deg, #50DBF1 0%, ${color} 100%)`;
    } else {
      return `linear-gradient(-20deg, #1c1c1c 0%, ${color} 100%)`;
    }
  }

  return (
    <div
      style={{
        background: getBackgroundColor(),
      }}
      className={classNames(
        "fixed",
        "w-screen",
        "h-screen",
        "transition-colors",
        "duration-500"
      )}
    />
  );
};

export default GradientBackground;
