import { useState } from "react";
import Button from "./Button";
import type { DropDownMenuTypes } from "types/dropDownMenuTypes";

const DropDownMenu = ({
  options,
  checkedStatuses,
  onChange,
  menuName,
}: DropDownMenuTypes) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button
        dropDown
        isOpen={isOpen}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {menuName}
      </Button>
      {isOpen && (
        <div className="absolute right-[340px] top-28 z-10 h-32 w-48 rounded-lg bg-[#FFF] drop-shadow-lg">
          {options.map((option, index) => (
            <div className="ml-6 first:mt-6 last:mb-6" key={index}>
              <div className="flex">
                <input
                  id={option}
                  type="checkbox"
                  value={option}
                  checked={checkedStatuses[option]}
                  onChange={onChange}
                  className="mr-3 mb-2 h-4 w-4 border border-purple bg-purple"
                />
                {/* <img
                className="text-blue-600 h-3 w-3 fill-current"
                src="/Invoice_app/assets/icon-check.svg"
                alt="icon-check"
              /> */}

                <div className="mb-2">
                  <label
                    htmlFor={option}
                    className="text-center text-xs font-bold tracking-wider text-black"
                  >
                    {option}
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default DropDownMenu;
