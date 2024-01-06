// import { GridColDef } from "@mui/x-data-grid";

const Add = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    props.setOpen(false);
  };

  return (
    <div className="absolute top-0 left-0 flex items-center justify-center w-screen h-screen bg-black">  
      <div className="relative p-12 bg-white rounded-xl">
        <span className="absolute cursor-pointer top-3 right-3" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1 className="mb-10 text-2xl text-zinc-300">Add new {props.slug}</h1>
        <form onSubmit={handleSubmit} className="flex flex-wrap justify-between max-w-lg">
          {props.columns
            .filter((item) => item.field !== "id" && item.field !== "img")
            .map((column) => (
              <div className="flex flex-col w-2/5 gap-3 mb-5" key={column.field}>
                <label className="text-sm">{column.headerName}</label>
                <input className="p-2.5 bg-transparent outline-none border-solid border-2 rounded" 
                type={column.type} placeholder={column.field} />
              </div>
            ))}
          <button className="p-2.5 cursor-pointer w-full">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Add;
