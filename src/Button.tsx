import { ReactNode, useState } from "react";

type Props = {
  color?: "red" | "purple" | "grey";
  children?: ReactNode;
  dropDown?: boolean;
  onCLick?: () => void;
  invoice?: boolean;
};

const backgroundColor = {
  red: "bg-red hover:bg-red-hover",
  purple: "bg-purple hover:bg-purple-hover",
  grey: "bg-[#DFE3FA] hover:bg-light-grey",
};

const textColor = {
  red: "text-white",
  purple: "text-white",
  grey: "light-blue",
};

const Button = ({
  color = "purple",
  dropDown,
  onCLick,
  invoice,
  children,
}: Props) => {
  const [arrowDown, setArrowDown] = useState(true);

  const border = !dropDown ? "rounded-full" : null;
  const dimensions = `h-12 ${invoice ? "pl-2" : "pl-6"} pr-6`;
  const text = "font-bold text-xs tracking-[1px]";
  const flex = "flex items-center gap-4";

  const baseClasses = [
    backgroundColor[color],
    textColor[color],
    border,
    dimensions,
    text,
  ];

  const dropDownClasses = [text, flex];
  const invoiceClasses = baseClasses.concat(flex);

  if (dropDown) {
    return (
      <button
        className={dropDownClasses.join(" ")}
        onClick={() => {
          {
            setArrowDown(!arrowDown);
          }
          onCLick;
        }}
      >
        {children}
        <img
          className={!arrowDown ? "rotate-180 duration-500" : "duration-500"}
          src="/Invoice_app/assets/icon-arrow-down.svg"
          alt="arrow-down"
        ></img>
      </button>
    );
  } else if (invoice) {
    return (
      <button className={invoiceClasses.join(" ")} onClick={onCLick}>
        <div className="grid h-8 w-8 place-items-center rounded-full bg-white">
          <img
            className="pl-px pt-px"
            src="/Invoice_app/assets/icon-plus.svg"
            alt="plus"
          ></img>
        </div>
        {children}
      </button>
    );
  } else {
    return (
      <button className={baseClasses.join(" ")} onClick={onCLick}>
        {children}
      </button>
    );
  }
};

export default Button;
