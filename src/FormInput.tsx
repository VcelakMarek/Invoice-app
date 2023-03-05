type Props = {
  size?: "small" | "medium" | "large";
  inputName: string;
  customId?: string;
  inputType?: "text" | "date" | "select";
  selectValues?: string[];
  // inputSize: { [key: string]: string };
};

const inputSize: { [key: string]: string } = {
  small: "w-[152px]",
  medium: "w-[240px]",
  large: "w-[504px]",
};

const FormInput = ({
  size = "large",
  inputName,
  customId,
  inputType = "text",
  selectValues,
}: Props) => {
  const id = customId ? customId : inputName.replace(" ", "");

  if (inputType === "select") {
    return (
      <label htmlFor={id}>
        <h2>{inputName}</h2>
        <select className={inputSize[size]} id={id}>
          {selectValues?.map((value) => (
            <option value={value} key={value}>
              {value}
            </option>
          ))}
        </select>
      </label>
    );
  } else {
    return (
      <label htmlFor={id}>
        <h2>{inputName}</h2>
        <input className={inputSize[size]} type={inputType} id={id} />
      </label>
    );
  }
};

export default FormInput;
