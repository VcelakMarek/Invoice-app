import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InvoiceApp from "./InvoiceApp";
import Details from "./Details";

const App = () => {
  return (
    <BrowserRouter>
      <div className="h-screen bg-light-bg">
        <nav className="fixed flex h-screen w-[103px] flex-col justify-between rounded-tr-[20px] rounded-br-[20px] bg-blue">
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
        <Routes>
          <Route path="/Invoice_app/" element={<InvoiceApp />} />
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
