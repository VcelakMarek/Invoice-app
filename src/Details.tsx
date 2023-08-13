import { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { InvoicesContext } from "./Invoices.context";
import Button from "./Button";
import Invoice from "./Invoice";
import Status from "./Status";
import InvoiceForm from "./InvoiceForm";
import { saveToLocalStorage } from "./localStorage";

const Details = () => {
  const location = useLocation();
  const { loadedInvoiceData } = location.state;
  const navigate = useNavigate();
  const { invoices, setInvoices } = useContext(InvoicesContext);
  const [showModal, setShowModal] = useState(false);
  const [invoiceData, setInvoiceData] = useState(loadedInvoiceData);

  const deleteInvoice = () => {
    const invoicesAfterDelete = invoices.filter(
      (invoice) => invoice.id !== invoiceData.id
    );
    saveToLocalStorage(invoicesAfterDelete);
  };

  useEffect(() => {
    invoices.map((invoice) => {
      invoice.id === invoiceData.id ? setInvoiceData(invoice) : null;
      console.log(invoiceData.id);
    });
  }, [invoices]);

  const markAsPaid = () => {
    setInvoices(
      invoices.map((invoice) => {
        if (invoice.id === invoiceData.id) {
          invoiceData.status = "paid";
          return { ...invoice };
        } else {
          return invoice;
        }
      })
    );
    saveToLocalStorage(invoices);
  };

  return (
    <div className="m-auto w-[730px] pt-8">
      <Button
        goBack
        onClick={() => {
          navigate("/Invoice_app/");
        }}
      />
      <div className="mb-6 flex h-[88px] items-center justify-between rounded-lg bg-white px-8">
        <div className="flex gap-2">
          <h2 className="my-auto mr-4">Status</h2>
          <Status status={invoiceData.status}></Status>
        </div>
        <div className="flex gap-2">
          <Button
            color="grey"
            invisible={invoiceData.status != "draft"}
            onClick={() => {
              setShowModal(true);
            }}
          >
            Edit
          </Button>
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
            disabled={
              invoiceData.status === "paid" || invoiceData.status === "draft"
            }
          >
            Mark as Paid
          </Button>
        </div>
      </div>
      <Invoice details invoice={invoiceData} />

      {showModal && (
        <InvoiceForm
          invoiceValues={invoiceData}
          onCloseModal={() => {
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default Details;
