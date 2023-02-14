import { Dispatch, SetStateAction } from "react";

export const fetchOnLoadData = async (
  setInvoices: Dispatch<SetStateAction<unknown[]>>
) => {
  const res = await fetch(`/Invoice_app/onLoadData.json`);

  const data = await res.json();
  setInvoices(data);
};
