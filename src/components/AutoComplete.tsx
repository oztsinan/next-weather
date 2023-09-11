import classNames from "classnames";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type AutoCompleteInputProps = {
  options?: any[];
  inputValue: string;
  labelKey: string;
  loading?: boolean;
  onChangeInput?: (value: any) => void;
  onChange?: (item: any) => void;
};

const Loading = () => {
  return (
    <div className={classNames("absolute", "w-12", "h-[42px]", "right-0")}>
      <Image
        width={50}
        height={50}
        alt="loading"
        src="/images/cat-loading.gif"
        priority={true}
      />
    </div>
  );
};

const AutoCompleteInput = ({
  options,
  inputValue,
  labelKey,
  loading,
  onChangeInput,
  onChange,
}: AutoCompleteInputProps) => {
  const [containerVisible, setContainerVisible] = useState(false);

  const divRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClickOutside = (e: any) => {
    if (
      divRef.current &&
      !divRef.current.contains(e.target) &&
      inputRef.current !== e.target
    ) {
      setContainerVisible(false);
    }
  };

  const selectItem = (item: any) => {
    onChange && onChange(item);
    setContainerVisible(false);
  };

  const handleInputClick = () => {
    setContainerVisible(!containerVisible);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="text-sm">
      <div>
        {loading && <Loading />}
        <input
          ref={inputRef}
          value={inputValue}
          onChange={onChangeInput}
          onClick={handleInputClick}
          placeholder="Search"
          className={classNames(
            "w-full",
            "px-3",
            "py-2",
            "rounded-xl",
            "outline-none",
            "mb-3",
            "border-4",
            "focus:border-blue-500"
          )}
        />
      </div>
      {containerVisible && (
        <div
          ref={divRef}
          id="optionsContainer"
          onClick={() => setContainerVisible(true)}
          className={classNames(
            "w-full",
            "bg-white",
            "max-h-72",
            "absolute",
            "rounded-xl",
            "shadow-xl",
            "border-4",
            "p-3",
            "overflow-scroll"
          )}
        >
          {(options?.length == 0 || !options) && <span>No data...</span>}
          {options?.map((item, index) => (
            <div
              key={index}
              onClick={() => selectItem(item)}
              className="border-b py-2 hover:opacity-50 transition-all cursor-pointer"
            >
              <span>{item[labelKey]}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutoCompleteInput;
