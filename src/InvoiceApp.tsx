import { useEffect, useState } from "react";
import Button from "./Button";
import { fetchOnLoadData } from "./fetchOnLoadData";
import Invoice from "./Invoice";

const InvoiceApp = () => {
  const [invoices, setInvoices] = useState<unknown[]>([]);

  useEffect(() => {
    fetchOnLoadData(setInvoices);
  }, []);

  console.log(invoices);

  return (
    <div className="flex w-screen bg-light-bg">
      <nav className="flex h-screen w-[103px] flex-col justify-between rounded-tr-[20px] rounded-br-[20px] bg-blue">
        <div className="relative z-10 h-[103px] w-[103px] rounded-tr-[20px] rounded-br-[20px] bg-purple">
          <img
            className="absolute top-8 left-8 z-30 w-10"
            src="/Invoice_app/assets/logo.svg"
            alt="logo"
          />
          <div className="absolute top-1/2 z-20 h-[51px] w-full rounded-tl-[20px] rounded-br-[20px] bg-purple-hover"></div>
        </div>

        <div className="grid h-[167px] place-items-center">
          <img
            className="pointer w-5 cursor-pointer hover:text-light-grey"
            src="/Invoice_app/assets/icon-moon.svg"
            alt="icon-moon"
          />
          {/* <img src="/Invoice_app/assets/icon-sun.svg" alt="icon-sun" /> */}
          <div className="h-[1px] w-full bg-light-blue"></div>
          <img
            className="mb-3 w-10 rounded-full"
            src="/Invoice_app/assets/image-avatar.jpg"
            alt="avatar"
          />
        </div>
      </nav>
      <main className="flex w-screen flex-col">
        <header className="mt-16 flex h-14 flex-row items-start justify-around">
          <div>
            <h1>Invoices</h1>
            <h2>There are {invoices.length} total invoices</h2>
          </div>
          <div className="flex gap-10">
            <Button dropDown>Filter by status</Button>
            <Button invoice>New Invoice</Button>
          </div>
        </header>
        <div className="grid place-items-center ">
          <Invoice></Invoice>
        </div>
      </main>
    </div>
  );
};

export default InvoiceApp;
