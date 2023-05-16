import { useContext, FC } from "react";
import Modal from "./Modal";
import FormInput from "./FormInput";
import { Form } from "react-final-form";
import { FormApi } from "final-form";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import Button from "./Button";
import type { InvoiceTypes } from "types/invoiceTypes";
import { InvoicesContext } from "./Invoices.context";
import generateId from "./generateId";
import validate from "./validation";

import { setIn } from "final-form";
import { AnyObject } from "final-form";

type FormData = {
  [key: string]: InvoiceTypes[];
};

type InvoiceFormProps = {
  onCloseModal: (event: React.MouseEvent<HTMLButtonElement>) => void;
  form: FormApi<FormData>;
};

const InvoiceForm: FC<InvoiceFormProps> = ({ onCloseModal, form }) => {
  const { invoices, setInvoices } = useContext(InvoicesContext);

  const createEmptyItem = () => ({
    name: "",
    quantity: 0,
    price: "",
    total: "",
  });

  const onSubmit = (values: FormData, form: FormApi<FormData>) => {
    console.log("FormValues", values);

    form.submit();
    const id = generateId(invoices);

    const createdInvoice = {
      id: id,
      ...values,
      paymentDue: "",
      clientName: values.toClientsName,
      clientEmail: values.toClientsEmail,
      senderAddress: {
        street: values.fromStreetAddress,
        city: values.fromCity,
        postCode: values.fromPostCode,
        country: values.fromCountry,
      },
      clientAddress: {
        street: values.toStreetAddress,
        city: values.toCity,
        postCode: values.toPostCode,
        country: values.toCountry,
      },
    };
    console.log("createdInovice", createdInvoice);
    setInvoices((prev) => [...prev, createdInvoice] as InvoiceTypes[]);
  };

  return (
    <Modal>
      <div className="absolute z-10 h-screen w-screen bg-neutral-900/40">
        <div className="fixed h-screen w-[719px] overflow-auto bg-white pb-28 pl-40 pt-14 pr-14">
          <h1>New Invoice</h1>
          <Form
            id="newInvoice"
            className="w-[504px]"
            onSubmit={onSubmit}
            validate={(values) => validate(values)}
            initialValues={{ items: [createEmptyItem()] }}
            mutators={{ ...arrayMutators }}
            render={({ handleSubmit, values, form }) => (
              <form onSubmit={handleSubmit}>
                <h5 className="mb-4">Bill From</h5>

                <FormInput
                  inputName="Street Address"
                  id="fromStreetAddress"
                  validateFields={["fromStreetAddress"]}
                />

                <div className="flex justify-between">
                  <FormInput inputName="City" size="l" id="fromCity" />
                  <FormInput inputName="Post Code" size="l" id="fromPostCode" />
                  <FormInput inputName="Country" size="l" id="fromCountry" />
                </div>

                <h5 className="mb-4">Bill To</h5>

                <FormInput inputName="Client`s Name" id="toClientsName" />
                <FormInput inputName="Client`s Email" id="toClientsEmail" />
                <FormInput inputName="Street Address" id="toStreetAddress" />

                <div className="flex justify-between">
                  <FormInput inputName="City" size="l" id="toCity" />
                  <FormInput inputName="Post Code" size="l" id="toPostCode" />
                  <FormInput inputName="Country" size="l" id="toCountry" />
                </div>
                <div className="flex justify-between">
                  <FormInput
                    inputName="Issue Date"
                    id="createdAt"
                    size="xl"
                    inputType="date"
                  />

                  <FormInput
                    id="paymentTerms"
                    inputName="Payment Terms"
                    size="xl"
                    inputType="select"
                    selectValues={[
                      ["Net 1 Day", 1],
                      ["Net 7 Days", 7],
                      ["Net 14 Days", 14],
                      ["Net 30 Days", 30],
                    ]}
                  ></FormInput>
                </div>
                <FormInput inputName="Project Description" id="description" />

                <div>
                  <div className="m-auto rounded-t-lg">
                    <div className="flex justify-between gap-3">
                      <h2 className="mr-36">Item Name</h2>
                      <h2>QTY</h2>
                      <h2>Price</h2>
                      <h2>Total</h2>
                    </div>
                    <FieldArray
                      name="items"
                      render={({ fields }) => (
                        <>
                          {values.items.length
                            ? values.items.map((value, index) => (
                                <div
                                  className="flex items-center justify-between"
                                  key={index}
                                >
                                  <FormInput
                                    size="m"
                                    inputName="Item Name"
                                    withHeading={false}
                                    id={`items[${index}].name`}
                                  />
                                  <FormInput
                                    size="xs"
                                    inputName="Qty"
                                    withHeading={false}
                                    inputType="number"
                                    id={`items[${index}].quantity`}
                                  />
                                  <FormInput
                                    size="s"
                                    inputName="Price"
                                    withHeading={false}
                                    inputType="number"
                                    id={`items[${index}].price`}
                                  />
                                  <p className="px-1 pb-1 text-sm font-bold text-grey">
                                    £ {value.quantity * value.price}
                                  </p>
                                  <Button
                                    icon
                                    onClick={() => fields.remove(index)}
                                  >
                                    <img
                                      src="/Invoice_app/assets/icon-delete.svg"
                                      alt="delete-icon"
                                    />
                                  </Button>
                                </div>
                              ))
                            : null}
                          <Button
                            onClick={() => fields.push(createEmptyItem())}
                          >
                            + Add New Item
                          </Button>
                        </>
                      )}
                    />
                  </div>
                </div>

                <div className="fixed bottom-0 left-[103px] flex h-28 w-[616px] items-center justify-around bg-white shadow-inner shadow-slate-900">
                  <Button color="grey" onClick={onCloseModal}>
                    Discard
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      color="darkBlue"
                      submit
                      onClick={() => {
                        form.change("status", "draft");
                      }}
                    >
                      Save as Draft
                    </Button>
                    <Button
                      color="purple"
                      submit
                      onClick={() => {
                        form.change("status", "pending");
                        onSubmit(form.getState().values, form);
                      }}
                    >
                      Save & Send
                    </Button>
                  </div>
                </div>
              </form>
            )}
          />
        </div>
      </div>
    </Modal>
  );
};

export default InvoiceForm;
