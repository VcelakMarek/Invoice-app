import * as Yup from "yup";
import { setIn } from "final-form";
import { AnyObject } from "final-form";

type ValidationSchema = Yup.Schema<AnyObject>;

const validationSchema = Yup.object().shape({
  fromStreetAddress: Yup.string().required("can't be empty"),
  fromCity: Yup.string().required("can't be empty"),
  fromPostCode: Yup.string().required("can't be empty"),
  fromCountry: Yup.string().required("can't be empty"),
  toClientsName: Yup.string().required("can't be empty"),
  toClientsEmail: Yup.string()
    .email("invalid email")
    .required("can't be empty"),
  toStreetAddress: Yup.string().required("can't be empty"),
  toCity: Yup.string().required("can't be empty"),
  toPostCode: Yup.string().required("can't be empty"),
  toCountry: Yup.string().required("can't be empty"),
  createdAt: Yup.date().required("can't be empty"),
  paymentTerms: Yup.string().required("can't be empty"),
  description: Yup.string().required("can't be empty"),
  items: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required("can't be empty"),
        quantity: Yup.string().required("can't be empty"),
        price: Yup.string().required("can't be empty"),
      })
    )
    .required("Items are required"),
});

const validateFormValues = (schema: ValidationSchema) => (values: any) => {
  if (values.status === "pending") {
    return schema
      .validate(values, { abortEarly: false })
      .then(() => {
        console.log("Validation successful");
        return Promise.resolve(undefined);
      })
      .catch((err: Yup.ValidationError) => {
        console.log("Validation errors:", err);
        const errors = err.inner.reduce(
          (formError, innerError) =>
            setIn(formError, innerError.path as string, innerError.message),
          {}
        );
        console.log("Validation error:", errors);
        return Promise.resolve(errors);
      });
  }
};

const validate = validateFormValues(validationSchema);

export default validate;
