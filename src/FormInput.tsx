type Props = {
  size?: string;
  inputName: string;
  customId?: string;
  // inputSize: { [key: string]: string };
};

const inputSize: { [key: string]: string } = {
  small: "w-[152px]",
  medium: "w-[240px]",
  large: "w-[504px]",
};

const FormInput = ({ size = "large", inputName, customId }: Props) => {
  const id = customId ? customId : inputName.replace(" ", "");

  console.log("id", id);

  return (
    <label htmlFor={id}>
      <h2>{inputName}</h2>
      <input className={inputSize[size]} type="text" id={id} />
    </label>
  );
};

export default FormInput;
