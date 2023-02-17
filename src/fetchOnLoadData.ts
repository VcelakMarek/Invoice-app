import { Dispatch, SetStateAction } from "react";
import { InvoiceTypes } from "./types/invoiceTypes";

export const fetchOnLoadData = async (
  setInvoices: Dispatch<SetStateAction<InvoiceTypes[]>>
) => {
  const res = await fetch(`/Invoice_app/onLoadData.json`);

  const data = await res.json();
  setInvoices(data);
};
