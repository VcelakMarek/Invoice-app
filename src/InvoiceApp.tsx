import { useEffect, useState } from "react";
import Button from "./Button";
import { fetchOnLoadData } from "./fetchOnLoadData";
import Invoice from "./Invoice";
import { InvoiceTypes } from "./types/invoiceTypes";

const InvoiceApp = () => {
  const [invoices, setInvoices] = useState<InvoiceTypes[]>([]);

  useEffect(() => {
    fetchOnLoadData(setInvoices);
  }, []);

  return (
    <div className="flex w-screen bg-light-bg">
      <main className="flex w-screen flex-col">
        <header className="w-800px mt-16 flex h-14 flex-row items-start justify-around">
          <div>
            <h1>Invoices</h1>
            <h2>There are {invoices.length} total invoices</h2>
          </div>
          <div className="flex gap-10">
            <Button dropDown>Filter by status</Button>
            <Button invoice>New Invoice</Button>
          </div>
        </header>
        <div className="mt-16 grid place-items-center">
          {invoices.map((invoice) => (
            <Invoice
              id={invoice.id}
              paymentDue={invoice.paymentDue}
              clientName={invoice.clientName}
              total={invoice.total}
              status={invoice.status}
              key={invoice.id}
            ></Invoice>
          ))}
        </div>
      </main>
    </div>
  );
};

export default InvoiceApp;
