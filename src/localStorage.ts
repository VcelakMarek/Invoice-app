import { Dispatch, SetStateAction } from "react";
import { InvoiceTypes } from "types/invoiceTypes";

export const saveToLocalStorage = (invoices: InvoiceTypes[]) => {
  localStorage.setItem("invoices", JSON.stringify(invoices));
};

export const loadFromLocalStorage = (
  setInvoices: Dispatch<SetStateAction<InvoiceTypes[]>>
) => {
  const localStorageData = JSON.parse(
    localStorage.getItem("invoices") as string
  );
  setInvoices(localStorageData);
};
