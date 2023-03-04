import { InvoiceTypes } from "./types/invoiceTypes";
import { Link } from "react-router-dom";
import Status from "./Status";
import ItemList from "./ItemList";
import Modal from "./Modal";
import FormInput from "./FormInput";

type Props = {
  details?: boolean;
  newInvoice?: boolean;
} & InvoiceTypes;

const Invoice = ({ details, newInvoice, ...props }: Props) => {
  if (details) {
    return (
      <div className="rounded-lg bg-white p-12">
        <div className="flex justify-between">
          <div>
            <h4>#{props.id}</h4>
            <h2>{props.description}</h2>
          </div>

          <div>
            <h2>{props.senderAddress?.street}</h2>
            <h2>{props.senderAddress?.city}</h2>
            <h2>{props.senderAddress?.postCode}</h2>
            <h2>{props.senderAddress?.country}</h2>
          </div>
        </div>

        <div className="mt-12 flex justify-between pb-12">
          <div>
            <h2>Invoice Date</h2>
            <h4>{props.createdAt}</h4>

            <h2 className="mt-8">Payment Due</h2>
            <h4>{props.paymentDue}</h4>
          </div>

          <div>
            <h2>Bill To</h2>
            <h4>{props.clientName}</h4>
            <h2>{props.clientAddress?.street}</h2>
            <h2>{props.clientAddress?.city}</h2>
            <h2>{props.clientAddress?.postCode}</h2>
            <h2>{props.clientAddress?.country}</h2>
          </div>

          <div className="mr-32">
            <h2>Sent To</h2>
            <h4>{props.clientEmail}</h4>
          </div>
        </div>
        <ItemList items={props.items} total={props.total} />
      </div>
    );
  } else if (newInvoice) {
    return (
      <Modal>
        <div className="absolute z-10 h-screen w-screen bg-neutral-900/40">
          <div className="fixed h-screen w-[719px] overflow-auto bg-white pl-40 pt-14 pr-14">
            <h1>New Invoice</h1>
            <form>
              <h5 className="mb-4">Bill From</h5>

              <FormInput
                inputName="Street Address"
                customId="fromStreetAddress"
              />

              <div className="flex justify-between">
                <FormInput inputName="City" size="small" customId="fromCity" />
                <FormInput
                  inputName="Post Code"
                  size="small"
                  customId="fromPostCode"
                />
                <FormInput
                  inputName="Country"
                  size="small"
                  customId="fromCountry"
                />
              </div>

              <h5 className="mb-4">Bill To</h5>

              <FormInput inputName="Client`s Name" customId="toClientsName" />
              <FormInput inputName="Client`s Email" customId="toClientsEmail" />
              <FormInput
                inputName="Street Address"
                customId="toStreetAddress"
              />

              <div className="flex justify-between">
                <FormInput inputName="City" size="small" customId="toCity" />
                <FormInput
                  inputName="Post Code"
                  size="small"
                  customId="toPostCode"
                />
                <FormInput
                  inputName="Country"
                  size="small"
                  customId="toCountry"
                />
              </div>
            </form>
            <div className="fixed bottom-0 left-[103px] h-28 w-[616px] bg-green-500"></div>
          </div>
        </div>
      </Modal>
    );
  } else {
    return (
      <Link
        to={`/details/${props.id}`}
        state={{ invoiceData: props }}
        className="mb-4 flex h-[72px] w-[65%] items-center justify-around rounded-lg border-[#7C5DFA] bg-white drop-shadow hover:border-[1.5px] hover:p-[-3px]"
      >
        <h3 className="first-letter:text-grey">#{props.id}</h3>
        <h2>Due {props.paymentDue}</h2>
        <h2>{props.clientName}</h2>
        <h4>£ {props.total}</h4>
        <div className="flex items-center gap-5">
          <Status status={props.status} />
          <img
            className="h-2.5"
            src="/Invoice_app/assets/icon-arrow-right.svg"
            alt="arrow-right"
          />
        </div>
      </Link>
    );
  }
};

export default Invoice;
