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
import { saveToLocalStorage } from "./localStorage";

type FormData = {
  [key: string]: InvoiceTypes[];
};

type InvoiceFormProps = {
  onCloseModal: (e: React.MouseEvent<HTMLButtonElement>) => void;
  form?: FormApi<FormData>;
};

const InvoiceForm: FC<InvoiceFormProps> = ({ onCloseModal, invoiceValues }) => {
  const { invoices, setInvoices } = useContext(InvoicesContext);

  const createEmptyItem = () => ({
    name: "",
    quantity: 0,
    price: 0,
    total: 0,
  });

  const onSubmit = (
    values: FormData,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    console.log("FormValues", values);

    const id = generateId(invoices);

    const countTotal = values.items.reduce((total, item) => {
      return total + item.total;
    }, 0);

    const countPaymentDue = (currentDate, daysToAdd, status) => {
      if (status === "pending") {
        const originalDate = new Date(currentDate);
        const newDate = new Date(
          originalDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000
        );
        const formattedNewDate = newDate.toISOString().split("T")[0];
        return formattedNewDate;
      }
    };

    const createdInvoice = {
      id: id,
      ...values,
      paymentDue: countPaymentDue(
        values.createdAt,
        values.paymentTerms,
        values.status
      ),
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
      total: countTotal,
    };

    console.log("createdInovice", createdInvoice);
    setInvoices((prev) => [...prev, createdInvoice] as InvoiceTypes[]);

    if (invoiceValues) {
      const editedInvoices = invoices.map((invoice: InvoiceTypes) =>
        invoice.id === createdInvoice.id ? createdInvoice : invoice
      );
      saveToLocalStorage(editedInvoices);
      setInvoices(editedInvoices);
    }

    onCloseModal(e);
  };

  let initialValues;
  if (invoiceValues) {
    initialValues = {
      ...invoiceValues,
      toClientsName: invoiceValues.clientName,
      toClientsEmail: invoiceValues.clientEmail,
      fromStreetAddress: invoiceValues.senderAddress.street,
      fromCity: invoiceValues.senderAddress.city,
      fromPostCode: invoiceValues.senderAddress.postCode,
      fromCountry: invoiceValues.senderAddress.country,
      toStreetAddress: invoiceValues.clientAddress.street,
      toCity: invoiceValues.clientAddress.city,
      toPostCode: invoiceValues.clientAddress.postCode,
      toCountry: invoiceValues.clientAddress.country,
    };
  }

  return (
    <Modal>
      <div className="absolute z-10 h-screen w-screen bg-neutral-900/40">
        <div className="fixed h-screen w-[719px] overflow-auto bg-gradient-to-b from-white via-white to-light-bg pb-36 pl-40 pt-14 pr-10">
          <h1>
            {invoiceValues ? (
              <>
                Edit
                <span className="font-bold text-grey"> #</span>
                {initialValues.id}
              </>
            ) : (
              "New Invoice"
            )}
          </h1>

          <Form
            id="newInvoice"
            className="w-[504px]"
            onSubmit={onSubmit}
            validate={validate}
            initialValues={
              invoiceValues
                ? { ...initialValues }
                : { items: [createEmptyItem()] }
            }
            mutators={{ ...arrayMutators }}
            render={({ handleSubmit, values, form }) => (
              <form onSubmit={handleSubmit}>
                <h5 className="mb-4">Bill From</h5>

                <FormInput inputName="Street Address" id="fromStreetAddress" />

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
                      ["Select Term", 0],
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
                    <h6>Item List</h6>
                    <div className="flex gap-[25px]">
                      <h2 className="w-[214px]">Item Name</h2>
                      <h2 className="w-[46px]">Qty.</h2>
                      <h2 className="w-[100px]">Price</h2>
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
                                    onChange={
                                      (value.total =
                                        value.price * value.quantity)
                                    }
                                  />
                                  <FormInput
                                    size="s"
                                    inputName="Price"
                                    withHeading={false}
                                    inputType="number"
                                    id={`items[${index}].price`}
                                    onChange={
                                      (value.total =
                                        value.price * value.quantity)
                                    }
                                  />

                                  <p className="px-1 pb-1 text-sm font-bold text-grey">
                                    {value.total}
                                  </p>

                                  <Button
                                    icon
                                    onClick={() => fields.remove(index)}
                                  >
                                    <img
                                      src="/Invoice_app/icon-delete.svg"
                                      alt="delete-icon"
                                    />
                                  </Button>
                                </div>
                              ))
                            : null}
                          <Button
                            color="grey"
                            full
                            onClick={() => fields.push(createEmptyItem())}
                          >
                            + Add New Item
                          </Button>
                        </>
                      )}
                    />
                  </div>
                </div>

                <div
                  className={`
                  fixed bottom-0 left-[103px] flex h-28 w-[616px] items-center rounded-tr-[20px] bg-white
                  ${
                    invoiceValues ? "justify-end gap-2 pr-14" : "justify-around"
                  }`}
                >
                  <Button color="grey" onClick={onCloseModal}>
                    {invoiceValues ? "Cancel" : "Discard"}
                  </Button>
                  <div className="flex gap-2">
                    {!invoiceValues && (
                      <Button
                        color="darkBlue"
                        onClick={() => {
                          if (!form.isValidationPaused()) {
                            form.pauseValidation();
                          }
                          form.change("status", "draft");
                          form.submit();
                        }}
                      >
                        Save as Draft
                      </Button>
                    )}
                    <Button
                      color="purple"
                      submit
                      onClick={() => {
                        form.change("status", "pending");
                        if (form.isValidationPaused()) {
                          form.resumeValidation();
                        }
                      }}
                    >
                      {invoiceValues ? "Save Changes" : "Save & Send"}
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
