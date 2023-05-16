import * as Yup from "yup";
import { setIn } from "final-form";
import { AnyObject } from "final-form";

type ValidationSchema = Yup.Schema<AnyObject>;

const validationSchema = Yup.object().shape({
  fromStreetAddress: Yup.string().required("Street Address is required"),
  fromCity: Yup.string().required("City is required"),
  fromPostCode: Yup.string().required("Post Code is required"),
  fromCountry: Yup.string().required("Country is required"),
  toClientsName: Yup.string().required("Client's Name is required"),
  toClientsEmail: Yup.string()
    .email("Invalid email")
    .required("Client's Email is required"),
  toStreetAddress: Yup.string().required("Street Address is required"),
  toCity: Yup.string().required("City is required"),
  toPostCode: Yup.string().required("Post Code is required"),
  toCountry: Yup.string().required("Country is required"),
  createdAt: Yup.date().required("Issue Date is required"),
  paymentTerms: Yup.string().required("Payment Terms is required"),
  description: Yup.string().required("Project Description is required"),
  "items[].name": Yup.string().required("Item Name is required"),
  "items[].quantity": Yup.number().required("Quantity is required"),
  "items[].price": Yup.number().required("Price is required"),
});

const validateSchemaAsync = (schema: ValidationSchema) => (values: any) => {
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
        console.log("error", errors);
        return Promise.resolve(errors);
      });
  }
};

const validate = validateSchemaAsync(validationSchema);

export default validate;
