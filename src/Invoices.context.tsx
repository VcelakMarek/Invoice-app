import { createContext, useState, Dispatch, SetStateAction } from "react";
import { InvoiceTypes } from "./types/invoiceTypes";

export const InvoicesContext = createContext("");

type Props = {
  children: React.ReactNode;
};

const InvoicesProvider = ({ children }: Props) => {
  const [invoices, setInvoices] = useState<InvoiceTypes[]>([]);

  return (
    <InvoicesContext.Provider value={[invoices, setInvoices]}>
      {children}
    </InvoicesContext.Provider>
  );
};

export default InvoicesProvider;
