import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InvoiceApp from "./InvoiceApp";
import Details from "./Details";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Invoice_app/" element={<InvoiceApp />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
