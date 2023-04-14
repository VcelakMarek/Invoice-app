import type { Status } from "types/invoiceTypes";

type States = {
  [key: string]: string[];
};

const states: States = {
  paid: ["bg-[#33D69F]", "text-[#33D69F]"],
  pending: ["bg-[#FF8F00]", "text-[#FF8F00]"],
  draft: ["bg-[#373B53]", "text-[#373B53]"],
};
const Status = ({ status }: Status) => {
  const color = states[status];

  return (
    <div className={`flex h-10 w-[104px] rounded-md bg-opacity-10 ${color[0]}`}>
      <div className="m-auto flex items-center text-xs font-bold">
        <div className={`mr-2 h-2 w-2 rounded-full opacity-100 ${color[0]}`} />
        <p className={`pt-0.5 first-letter:uppercase ${color[1]}`}>{status}</p>
      </div>
    </div>
  );
};

export default Status;
