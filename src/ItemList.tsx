import { InvoiceTypes } from "./types/invoiceTypes";

const ItemList = ({ total, items }: InvoiceTypes) => {
  console.log(items);
  return (
    <>
      <div className="m-auto rounded-t-lg bg-light-bg p-8">
        <div className="flex justify-between gap-3">
          <h2 className="mr-36">Item Name</h2>
          <h2 className="">QTY</h2>
          <h2 className="">Price</h2>
          <h2 className="">Total</h2>
        </div>
        {items?.map((item) => (
          <div className="mt-8 flex justify-between gap-3" key={item.name}>
            <h3 className="mr-36">{item.name}</h3>
            <h2>{item.quantity}</h2>
            <h2>£ {item.price}</h2>
            <h3>£ {item.total}</h3>
          </div>
        ))}
      </div>
      <div className="center my-auto flex h-20 items-center justify-between rounded-b-lg bg-blue px-8">
        <p className="text-[11px] text-white">Amount Due</p>
        <h1 className="text-2xl text-white">£ {total}</h1>
      </div>
    </>
  );
};

export default ItemList;
