import { ReactNode, useState } from "react";
import DropDownMenu from "./DropDownMenu";

type Props = {
  color?: "red" | "purple" | "grey";
  children?: ReactNode;
  dropDown?: boolean;
  onCLick?: () => void;
  invoice?: boolean;
  DropDownMenu?: ReactNode;
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
  const [isOpen, setIsOpen] = useState(false);

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

  const dropDownClasses = [text, flex, "relative"];
  const invoiceClasses = baseClasses.concat(flex);

  if (dropDown) {
    return (
      <>
        <button
          className={dropDownClasses.join(" ")}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {children}
          <img
            className={isOpen ? "rotate-180 duration-500" : "duration-500"}
            src="/Invoice_app/assets/icon-arrow-down.svg"
            alt="arrow-down"
          ></img>
        </button>
        {isOpen && (
          <DropDownMenu options={["Draft", "Pendind", "Paid"]}></DropDownMenu>
        )}
      </>
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
