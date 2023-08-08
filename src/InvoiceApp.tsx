import { useContext, useEffect, useState } from "react";
import { InvoicesContext } from "./Invoices.context";
import Button from "./Button";
import { fetchOnLoadData } from "./fetchOnLoadData";
import Invoice from "./Invoice";
import InvoiceForm from "./InvoiceForm";
import type { CheckedStatuses } from "types/dropDownMenuTypes";
import type { InvoiceTypes } from "types/invoiceTypes";
import DropDownMenu from "./DropDownMenu";

const InvoiceApp = () => {
  const { invoices, setInvoices } = useContext(InvoicesContext);
  const [filteredInvoices, setFilteredInvoices] = useState<InvoiceTypes[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [checkedStatuses, setcheckedStatuses] = useState<CheckedStatuses>({
    draft: false,
    pending: false,
    paid: false,
  });
  const OPTIONS = ["draft", "pending", "paid"];

  useEffect(() => {
    document.body.className = showModal
      ? "overflow-hidden"
      : "overflow-visible";
  }, [showModal]);

  useEffect(() => {
    if (localStorage.getItem("invoices")) {
      const localStorageDate = JSON.parse(localStorage.getItem("invoices"));
      setInvoices(localStorageDate);
    } else if (!invoices.length) {
      fetchOnLoadData(setInvoices);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("invoices", JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    const trueValues = Object.keys(checkedStatuses).filter(
      (key) => checkedStatuses[key] === true
    );

    setFilteredInvoices(
      invoices.filter((invoice) => trueValues.includes(invoice.status))
    );
  }, [checkedStatuses]);

  const onCheckitemsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setcheckedStatuses((prev) => ({ ...prev, [value]: !prev[value] }));
  };

  return (
    <div className="flex w-screen bg-light-bg">
      <main className="flex w-screen flex-col">
        <header className="w-800px mt-16 flex h-14 flex-row items-start justify-around">
          <div>
            <h1>Invoices</h1>
            <h2>
              There are{" "}
              {filteredInvoices.length > 0
                ? filteredInvoices.length
                : invoices.length}{" "}
              total invoices
            </h2>
          </div>
          <div className="flex gap-10">
            <DropDownMenu
              options={OPTIONS}
              checkedStatuses={checkedStatuses}
              onChange={onCheckitemsChange}
              menuName="Filter by status"
            ></DropDownMenu>
            <Button
              color="purple"
              invoice
              onClick={() => {
                setShowModal(true);
              }}
            >
              New Invoice
            </Button>
          </div>
        </header>
        <div className="mt-16 grid place-items-center">
          {Array.isArray(filteredInvoices) && filteredInvoices.length > 0
            ? filteredInvoices.map((invoice) => (
                <Invoice invoice={invoice} key={invoice.id} />
              ))
            : invoices.map((invoice) => (
                <Invoice invoice={invoice} key={invoice.id} />
              ))}
        </div>
        {showModal && (
          <InvoiceForm
            onCloseModal={() => {
              setShowModal(false);
            }}
          />
        )}
      </main>
    </div>
  );
};

export default InvoiceApp;
