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

const validateFormValues =
  (schema: ValidationSchema) => async (values: any) => {
    if (typeof schema === "function") {
      schema = schema();
    }
    try {
      await schema.validateSync(values, { abortEarly: false });
    } catch (err: Yup.ValidationError) {
      const errors = err.inner.reduce((formError, innerError) => {
        return setIn(formError, innerError.path, innerError.message);
      }, {});
      console.log("catched", errors);
      return errors;
    }
  };

const validate = validateFormValues(validationSchema);

export default validate;
