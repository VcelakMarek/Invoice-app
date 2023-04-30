import Modal from "./Modal";
import FormInput from "./FormInput";
import { Form } from "react-final-form";
import Button from "./Button";
import ItemList from "./ItemList";

const InvoiceForm = () => {
  const initialValues: FormData = {};

  const onSubmit = (values: FormData) => {
    console.log("FormValues", values);

    const createdInvoice = {
      id: "test",
      ...values,
      paymentDue: "",
      clientName: values.toClientsName,
      clientEmail: values.toClientsEmail,
      status: "depends on button",
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
      // items: [
      //   {
      //     name: values.},
      //     quantity: values.},
      //     price: values.,
      //     total: values,
      //   },
      // ],
      // total: values,
    };
    console.log("createdInovice", createdInvoice);
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
            initialValues={initialValues}
            render={({ handleSubmit }) => (
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
                      ["Net 1 Day", 1],
                      ["Net 7 Days", 7],
                      ["Net 14 Days", 14],
                      ["Net 30 Days", 30],
                    ]}
                  ></FormInput>
                </div>
                <FormInput inputName="Project Description" id="description" />

                <ItemList isEdit />

                <div className="fixed bottom-0 left-[103px] flex h-28 w-[616px] items-center justify-around bg-white shadow-inner shadow-slate-900">
                  <Button color="grey">Discard</Button>
                  <div className="flex gap-2">
                    <Button color="darkBlue">Save as Draft</Button>
                    <Button color="purple">Save & Send</Button>

                    <button type="submit">submit</button>
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
