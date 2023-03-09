import { InvoiceTypes } from "./types/invoiceTypes";
import FormInput from "./FormInput";
import Button from "./Button";

type Props = {
  edit?: boolean;
} & InvoiceTypes;

const ItemList = ({ total, items, edit }: Props) => {
  const item1 = { name: "", quantity: "", price: "", total: "" };
  let items1 = [item1];

  if (edit) {
    return (
      <div className="m-auto rounded-t-lg">
        <div className="flex justify-between gap-3">
          <h2 className="mr-36">Item Name</h2>
          <h2>QTY</h2>
          <h2>Price</h2>
          <h2>Total</h2>
        </div>
        {items1?.map((item) => (
          <div key={item.name}>
            <FormInput size="m" inputName="Item Name" withoutHeading />
            <FormInput
              size="xs"
              inputName="Qty"
              withoutHeading
              inputType="number"
            />
            <FormInput
              size="s"
              inputName="Price"
              withoutHeading
              inputType="number"
            />
            <p className="text-sm font-bold text-grey">156</p>
            <img src="/Invoice_app/assets/icon-delete.svg" alt="" />
          </div>
        ))}
        <Button onCLick={(items1.push(item1), console.log(items1))}>
          + Add New Item
        </Button>
      </div>
    );
  } else
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
