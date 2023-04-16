import { InvoiceTypes } from "./types/invoiceTypes";
import { Link } from "react-router-dom";
import Status from "./Status";
import ItemList from "./ItemList";
import Modal from "./Modal";
import FormInput from "./FormInput";
import { Form } from "react-final-form";
import Button from "./Button";

type Props = {
  details?: boolean;
  newInvoice?: boolean;
  invoice: InvoiceTypes;
} & InvoiceTypes;

type FormData = {
  [key: string]: any;
};

const Invoice = ({
  details,
  newInvoice,
  invoice,
  onSubmit,
  ...props
}: Props) => {
  if (details) {
    return (
      <div className="rounded-lg bg-white p-12">
        <div className="flex justify-between">
          <div>
            <h4>#{invoice.id}</h4>
            <h2>{invoice.description}</h2>
          </div>

          <div>
            <h2>{invoice.senderAddress?.street}</h2>
            <h2>{invoice.senderAddress?.city}</h2>
            <h2>{invoice.senderAddress?.postCode}</h2>
            <h2>{invoice.senderAddress?.country}</h2>
          </div>
        </div>

        <div className="mt-12 flex justify-between pb-12">
          <div>
            <h2>Invoice Date</h2>
            <h4>{invoice.createdAt}</h4>

            <h2 className="mt-8">Payment Due</h2>
            <h4>{invoice.paymentDue}</h4>
          </div>

          <div>
            <h2>Bill To</h2>
            <h4>{invoice.clientName}</h4>
            <h2>{invoice.clientAddress?.street}</h2>
            <h2>{invoice.clientAddress?.city}</h2>
            <h2>{invoice.clientAddress?.postCode}</h2>
            <h2>{invoice.clientAddress?.country}</h2>
          </div>

          <div className="mr-32">
            <h2>Sent To</h2>
            <h4>{invoice.clientEmail}</h4>
          </div>
        </div>
        <ItemList items={invoice.items} total={invoice.total} />
      </div>
    );
  } else if (newInvoice) {
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

                  <FormInput
                    inputName="Street Address"
                    id="fromStreetAddress"
                  />

                  <div className="flex justify-between">
                    <FormInput inputName="City" size="l" id="fromCity" />
                    <FormInput
                      inputName="Post Code"
                      size="l"
                      id="fromPostCode"
                    />
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
  }

  return (
    <Link
      to={`/details/${invoice.id}`}
      state={{ invoiceData: invoice }}
      className="mb-4 flex h-[72px] w-[65%] items-center justify-around rounded-lg border-[#7C5DFA] bg-white drop-shadow hover:border-[1.5px] hover:p-[-3px]"
    >
      <h3 className="first-letter:text-grey">#{invoice.id}</h3>
      <h2>Due {invoice.paymentDue}</h2>
      <h2>{invoice.clientName}</h2>
      <h4>£ {invoice.total}</h4>
      <div className="flex items-center gap-5">
        <Status status={invoice.status ?? "draft"} />
        <img
          className="h-2.5"
          src="/Invoice_app/assets/icon-arrow-right.svg"
          alt="arrow-right"
        />
      </div>
    </Link>
  );
};

export default Invoice;
