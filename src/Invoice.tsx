import { InvoiceTypes } from "./types/invoiceTypes";

const statuses = {
  paid: "[#33D69F]",
  pending: "[#FF8F00]",
  draft: "[#373B53]",
};

const Invoice = ({ ...props }: InvoiceTypes) => {
  return (
    <div className="mb-4 flex h-[72px] w-[65%] items-center justify-around rounded-lg border-[#7C5DFA] bg-white hover:border-[1.5px] hover:p-[-3px]">
      <h3 className="first-letter:text-grey">#{props.id}</h3>
      <h2>Due {props.paymentDue}</h2>
      <h2>{props.clientName}</h2>
      <h4>£ {props.total}</h4>
      <div className="flex items-center gap-5">
        <div
          className={`flex h-10 w-[104px] items-center justify-evenly rounded-md bg-opacity-10 text-xs font-bold bg-${
            statuses[props.status]
          }`}
        >
          <div
            className={`h-2 w-2 rounded-full opacity-100 bg-${
              statuses[props.status]
            }`}
          ></div>
          <p
            className={`pt-0.5 first-letter:uppercase text-${
              statuses[props.status]
            }`}
          >
            {props.status}
          </p>
        </div>
        <img
          className="h-2.5"
          src="/Invoice_app/assets/icon-arrow-right.svg"
          alt="arrow-right"
        />
      </div>
    </div>
  );
};

export default Invoice;
