const Invoice = () => {
  return (
    <button className="flex h-[72px] w-[65%] items-center justify-around rounded-lg bg-white">
      <h3>XM9141</h3>
      <h2>Due 20 Sep 2021</h2>
      <h2>Alex Grim</h2>
      <h4>£ 556.00</h4>
      <div className="flex h-10 w-[104px] items-center justify-evenly rounded-md bg-[#FF8F00] bg-opacity-20 text-xs font-bold">
        <div className="h-2 w-2 rounded-full bg-[#FF8F00] opacity-100"></div>
        <p className="pt-1 text-[#FF8F00]">Pending</p>
      </div>
      <img src="/Invoice_app/assets/icon-arrow-right.svg" alt="arrow-right" />
    </button>
  );
};

export default Invoice;
