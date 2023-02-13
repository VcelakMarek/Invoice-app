import Button from "./Button";

const InvoiceApp = () => {
  return (
    <main className="flex bg-light-bg">
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
      <header className="mt-16 flex w-screen flex-row items-start justify-around">
        <div>
          <h1 className="text-4xl font-bold text-black">Invoices</h1>
          <h2 className="text-xs font-medium text-grey">
            There are 7{/*{numberOfInvoices}*/} total invoices
          </h2>
        </div>
        <div className="flex gap-10">
          <Button dropDown>Filter by status</Button>
          <Button invoice>New Invoice</Button>
        </div>
      </header>
    </main>
  );
};

export default InvoiceApp;
