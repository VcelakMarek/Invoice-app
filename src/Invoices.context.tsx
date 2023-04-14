import { createContext, useState, Dispatch, SetStateAction } from "react";
import type { InvoiceTypes } from "./types/invoiceTypes";

type Context = {
  invoices: InvoiceTypes[];
  setInvoices: Dispatch<SetStateAction<InvoiceTypes[]>>;
};

export const InvoicesContext = createContext<Context>({
  invoices: [],
  setInvoices: () => {},
});

type Props = {
  children: React.ReactNode;
};

const InvoicesProvider = ({ children }: Props) => {
  const [invoices, setInvoices] = useState<InvoiceTypes[]>([]);

  const contextValue = {
    invoices,
    setInvoices,
  };

  return (
    <InvoicesContext.Provider value={contextValue}>
      {children}
    </InvoicesContext.Provider>
  );
};

export default InvoicesProvider;
