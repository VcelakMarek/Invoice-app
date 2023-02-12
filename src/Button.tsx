import { ReactNode } from "react";

type Props = {
  color?: "red" | "purple" | "grey";
  rounded?: boolean;
  children?: ReactNode;
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

const Button = ({ color = "purple", rounded, children }: Props) => {
  const border = rounded ? "rounded-full" : null;
  const dimensions = "h-12 pl-6 pr-6";

  const baseClasses = [
    backgroundColor[color],
    textColor[color],
    border,
    dimensions,
  ];
  return <button className={baseClasses.join(" ")}>{children}</button>;
};

export default Button;
