import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { InvoicesContext } from "./Invoices.context";
import Button from "./Button";
import Invoice from "./Invoice";
import Status from "./Status";
import { InvoiceTypes } from "./types/invoiceTypes";

const Details = () => {
  const location = useLocation();
  const { invoiceData } = location.state;
  const navigate = useNavigate();
  const { invoices, setInvoices } = useContext(InvoicesContext);

  const deleteInvoice = () => {
    setInvoices((current: InvoiceTypes[]) =>
      current.filter((invoice) => invoice.id !== invoiceData.id)
    );
  };

  const markAsPaid = () => {
    setInvoices(
      invoices.map((obj) => {
        if (obj.id === invoiceData.id) {
          invoiceData.status = "paid";
          return { ...obj, status: "paid" };
        } else {
          return obj;
        }
      })
    );
  };

  return (
    <div className="m-auto w-[730px] pt-8">
      {/* button "go back" */}
      <div className="mb-6 flex h-[88px] items-center justify-between rounded-lg bg-white px-8">
        <div className="flex gap-2">
          <h2 className="my-auto mr-4">Status</h2>
          <Status status={invoiceData.status}></Status>
        </div>
        <div className="flex gap-2">
          <Button color="grey">Edit</Button>
          <Button
            color="red"
            onClick={() => {
              deleteInvoice();
              navigate("/Invoice_app/");
            }}
          >
            Delete
          </Button>
          <Button
            color="purple"
            onClick={() => {
              markAsPaid();
            }}
            disabled={invoiceData.status === "paid"}
          >
            Mark as Paid
          </Button>
        </div>
      </div>
      <Invoice
        details
        id={invoiceData.id}
        createdAt={invoiceData.createdAt}
        paymentDue={invoiceData.paymentDue}
        description={invoiceData.description}
        paymentTerms={invoiceData.paymentTerms}
        clientName={invoiceData.clientName}
        clientEmail={invoiceData.clientEmail}
        status={invoiceData.status}
        senderAddress={invoiceData.senderAddress}
        clientAddress={invoiceData.clientAddress}
        items={invoiceData.items}
        total={invoiceData.total}
      />
    </div>
  );
};

export default Details;
