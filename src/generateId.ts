import type { InvoiceTypes } from "types/invoiceTypes";

const generateRandomId = () => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let generatedId = "";

  generatedId += alphabet[Math.floor(Math.random() * alphabet.length)];
  generatedId += alphabet[Math.floor(Math.random() * alphabet.length)];
  generatedId += Math.floor(Math.random() * 9999);

  return generatedId;
};

const generateId = (invoices: InvoiceTypes[]) => {
  const existingIds = invoices.map((invoice) => invoice.id);

  let generatedId = generateRandomId();

  while (existingIds.includes(generatedId)) {
    generatedId = generateRandomId();
  }

  return generatedId;
};

export default generateId;
