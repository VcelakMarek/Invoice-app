import * as Yup from "yup";
import { setIn } from "final-form";
import { AnyObject } from "final-form";

type ValidationSchema = Yup.Schema<AnyObject>;

const validationSchema = Yup.object().shape({
  id: Yup.string(),
  createdAt: Yup.string().required(""),
  paymentDue: Yup.string().required(""),
  description: Yup.string().required(""),
  paymentTerms: Yup.number().required(""),
  clientName: Yup.string().required(""),
  clientEmail: Yup.string().required(""),
  status: Yup.string(),
  senderAddress: Yup.object({
    street: Yup.string().required(""),
    city: Yup.string().required(""),
    postCode: Yup.string().required(""),
    country: Yup.string().required(""),
  }),
  clientAddress: Yup.object({
    street: Yup.string().required(""),
    city: Yup.string().required(""),
    postCode: Yup.string().required(""),
    country: Yup.string().required(""),
  }),
  items: Yup.array().of(
    Yup.object({
      name: Yup.string().required(""),
      quantity: Yup.number().required(""),
      price: Yup.number().required(""),
      total: Yup.number(),
    })
  ),
  total: Yup.number(),
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
        console.log("Píčo error", errors);
        return Promise.resolve(errors);
      });
  }
};

const validate = validateSchemaAsync(validationSchema);

export default validate;
