import { InvoiceTypes } from "./types/invoiceTypes";
import { Link } from "react-router-dom";
import Status from "./Status";

type Props = {
  details?: boolean;
} & InvoiceTypes;

const Invoice = ({ details, ...props }: Props) => {
  if (details) {
    return (
      <div className="rounded-lg bg-white">
        <div className="flex justify-between">
          <div>
            <h1>#{props.id}</h1>
            <h2>{props.description}</h2>
          </div>

          <div>
            <h2>{props.senderAddress?.street}</h2>
            <h2>{props.senderAddress?.city}</h2>
            <h2>{props.senderAddress?.postCode}</h2>
            <h2>{props.senderAddress?.country}</h2>
          </div>
        </div>

        <div>
          <div>
            <div>
              <h2>Invoice Date</h2>
              <h1>{props.createdAt}</h1>

              <h2>Payment Due</h2>
              <h1>{props.paymentDue}</h1>
            </div>

            <div>
              <h2>Bill To</h2>
              <h1>{props.clientName}</h1>
              <h2>{props.clientAddress?.street}</h2>
              <h2>{props.clientAddress?.city}</h2>
              <h2>{props.clientAddress?.postCode}</h2>
              <h2>{props.clientAddress?.country}</h2>
            </div>
          </div>
        </div>
      </div>
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
