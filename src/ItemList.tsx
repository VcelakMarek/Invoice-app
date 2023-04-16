import { InvoiceTypes } from "./types/invoiceTypes";
import FormInput from "./FormInput";
import Button from "./Button";
import { useState } from "react";

type Props = {
  isEdit?: boolean;
} & InvoiceTypes;

const ItemList = ({ total, items, isEdit }: Props) => {
  const item1 = { name: "", quantity: "", price: "", total: "" };
  const [items1, setItems1] = useState([item1]);

  // const deleteByIndex = (index: number) => {
  //   setItems1((oldValues) => {
  //     return oldValues.filter((_, i) => i !== index);
  //   });
  // };

  const deleteByIndex = (index: number) => {
    // const newList = items1.filter((_, i) => i !== index);
    // setItems1(newList);

    const itemsCopy = [...items1];
    itemsCopy.splice(index, 1);
    // setItems1((prev) => prev.splice(index, 1));
    setItems1(itemsCopy);
  };

  if (isEdit) {
    return (
      <div className="m-auto rounded-t-lg">
        <div className="flex justify-between gap-3">
          <h2 className="mr-36">Item Name</h2>
          <h2>QTY</h2>
          <h2>Price</h2>
          <h2>Total</h2>
        </div>
        {items1.length
          ? items1.map((item, index) => (
              <div className="flex items-center justify-between" key={index}>
                <FormInput
                  size="m"
                  inputName="Item Name"
                  withHeading={false}
                  id={`ItemName ${index}`}
                />
                <FormInput
                  size="xs"
                  inputName="Qty"
                  withHeading={false}
                  inputType="number"
                  id={`Qty ${index}`}
                />
                <FormInput
                  size="s"
                  inputName="Price"
                  withHeading={false}
                  inputType="number"
                  id={`Price ${index}`}
                />
                <p className="px-1 pb-1 text-sm font-bold text-grey">156.00</p>
                <Button icon onClick={() => deleteByIndex(index)}>
                  <img
                    src="/Invoice_app/assets/icon-delete.svg"
                    alt="delete-icon"
                  />
                </Button>
              </div>
            ))
          : null}
        <Button
          onClick={() => {
            setItems1((prev) => prev.concat([item1]));
            console.log("items1", items1);
          }}
        >
          + Add New Item
        </Button>
      </div>
    );
  }
  return (
    <>
      <div className="m-auto rounded-t-lg bg-light-bg p-8">
        <div className="flex justify-between gap-3">
          <h2 className="mr-36">Item Name</h2>
          <h2>QTY</h2>
          <h2>Price</h2>
          <h2>Total</h2>
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
