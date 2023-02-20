import { useLocation } from "react-router-dom";
import Button from "./Button";
import Invoice from "./Invoice";
import Status from "./Status";

const Details = () => {
  const location = useLocation();
  const { invoiceData } = location.state;

  return (
    <div className="m-auto w-[730px] pt-8">
      {/* button "go back" */}
      <div className="mb-6 flex h-[88px] items-center justify-between rounded-lg bg-white px-8">
        <div className="flex gap-2">
          <h2 className="my-auto mr-4">Status</h2>
          <Status status={invoiceData.status}></Status>
        </div>
        <div className="flex gap-2">
          <Button color="grey">Edit</Button>
          <Button color="red">Delete</Button>
          <Button color="purple">Mark as Paid</Button>
        </div>
      </div>
      <Invoice
        details
        id={invoiceData.id}
        createdAt={invoiceData.createdAt}
        paymentDue={invoiceData.paymentDue}
        description={invoiceData.description}
        paymentTerms={invoiceData.paymentTerms}
        clientName={invoiceData.clientName}
        clientEmail={invoiceData.clientEmail}
        status={invoiceData.status}
        senderAddress={invoiceData.senderAddress}
        total={invoiceData.total}
      ></Invoice>
    </div>
  );
};

export default Details;
