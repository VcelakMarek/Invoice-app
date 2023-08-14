import { InvoiceTypes } from "./types/invoiceTypes";
import { Link } from "react-router-dom";
import Status from "./Status";
import ItemList from "./ItemList";

type Props = {
  details?: boolean;
  newInvoice?: boolean;
  invoice: InvoiceTypes;
} & InvoiceTypes;

const Invoice = ({ details, invoice }: Props) => {
  if (details) {
    return (
      <div className="rounded-lg bg-white p-12">
        <div className="flex justify-between">
          <div>
            <h4>
              <span className="font-bold text-grey">#</span>
              {invoice.id}
            </h4>
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
  }

  return (
    <Link
      to={`/Invoice_app/details/${invoice.id}`}
      state={{ loadedInvoiceData: invoice }}
      className="mb-4 flex h-[72px] w-[65%] items-center justify-around rounded-lg border-[1.5px] border-transparent bg-white px-[2%] drop-shadow hover:border-[1.5px] hover:border-[#7C5DFA]"
    >
      <h3 className="basis-2/12">
        <span className="font-bold text-grey">#</span>
        {invoice.id}
      </h3>
      <h2 className="basis-2/12">Due {invoice.paymentDue}</h2>
      <h2 className="basis-2/12">{invoice.clientName}</h2>
      <h4 className="basis-2/12">£ {invoice.total}</h4>
      <div className="flex basis-2/12 items-center gap-5">
        <Status status={invoice.status ?? "draft"} />
        <img
          className="h-2.5"
          src="/Invoice_app/icon-arrow-right.svg"
          alt="arrow-right"
        />
      </div>
    </Link>
  );
};

export default Invoice;
