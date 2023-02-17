const DropDownMenu = (options: any) => {
  return (
    <div className="absolute right-[340px] top-28 h-32 w-48 rounded-lg bg-[#FFF]">
      {options.map((option) => (
        <div key={option}>
          <input id={option} type="checkbox"></input>
          <label htmlFor={option}>{option}</label>
        </div>
      ))}
    </div>

    // <div className="absolute right-[340px] top-28 h-32 w-48 rounded-lg bg-[#FFF]">
    //   <div>
    //     <input id="draft" type="checkbox"></input>
    //     <label htmlFor="draft">Draft</label>
    //   </div>
    //   <div>
    //     <input id="pending" type="checkbox"></input>
    //     <label htmlFor="pending">Pending</label>
    //   </div>
    //   <div>
    //     <input id="paid" type="checkbox"></input>
    //     <label htmlFor="paid">Paid</label>
    //   </div>
    // </div>
  );
};

export default DropDownMenu;
