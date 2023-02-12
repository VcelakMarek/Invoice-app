import { createRoot } from "react-dom/client";
import InvoiceApp from "./InvoiceApp";

const App = () => {
  return <InvoiceApp />;
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
