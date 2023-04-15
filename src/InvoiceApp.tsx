import { useContext, useEffect, useState } from "react";
import { InvoicesContext } from "./Invoices.context";
import Button from "./Button";
import { fetchOnLoadData } from "./fetchOnLoadData";
import Invoice from "./Invoice";

const InvoiceApp = () => {
  const { invoices, setInvoices } = useContext(InvoicesContext);
  const [showModal, setShowmodal] = useState(false);

  useEffect(() => {
    if (!invoices.length) {
      fetchOnLoadData(setInvoices);
    }
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
            <Button
              color="purple"
              invoice
              onClick={() => {
                setShowmodal(true);
              }}
            >
              New Invoice
            </Button>
          </div>
        </header>
        <div className="mt-16 grid place-items-center">
          {invoices.map((invoice) => (
            <Invoice invoice={invoice} key={invoice.id} />
          ))}
        </div>
        {showModal && <Invoice newInvoice />}
      </main>
    </div>
  );
};

export default InvoiceApp;
