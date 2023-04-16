import { Field } from "react-final-form";

type Props = {
  size?: "xs" | "s" | "m" | "l" | "xl" | "xxl";
  inputName: string;
  id: string;
  inputType?: "text" | "date" | "select" | "number";
  selectValues?: [string, number][];
  withHeading?: boolean;
};

const inputSize: { [key: string]: string } = {
  xs: "w-[46px] pl-4 pr-0",
  s: "w-[100px]",
  m: "w-[214px]",
  l: "w-[152px]",
  xl: "w-[240px]",
  xxl: "w-[504px]",
};

const FormInput = ({
  size = "xxl",
  inputName,
  id,
  inputType = "text",
  selectValues,
  withHeading = true,
}: Props) => {
  if (inputType === "select") {
    return (
      <label htmlFor={id}>
        <h2>{inputName}</h2>
        <Field name={id} component="select" className={inputSize[size]} id={id}>
          {selectValues?.map((value) => (
            <option value={value[1]} key={value[0]}>
              {value[0]}
            </option>
          ))}
        </Field>
      </label>
    );
  } else {
    return (
      <label htmlFor={id}>
        {withHeading && <h2>{inputName}</h2>}
        <Field
          name={id}
          className={inputSize[size]}
          type={inputType}
          component="input"
          id={id}
        />
      </label>
    );
  }
};

export default FormInput;
