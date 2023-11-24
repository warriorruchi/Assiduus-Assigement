import logo from '/logo.png';
function Navbar() {


  return (
    <div className="bg-white h-16 flex place-items-center justify-between px-4 md:px-8">
      <div className="uppercase text-lg md:text-2xl font-bold flex md:gap-3">
        <img src={logo} alt="" className="h-5 md:h-9" />
      </div>
      <div className="flex place-items-center gap-5">
        <div className="w-36 md:w-[300px] relative flex bg-slate-100 items-center gap-1  rounded-lg py-2 text-color md:gap-4 px-1 md:px-4 ease-in-out duration-300">
          <span className="material-symbols-outlined cursor-pointer">search</span>
          <input className="w-full bg-transparent focus:outline-none" />
        </div>
        <div className="relative cursor-pointer">
          <span className="material-symbols-outlined">notifications</span>
          <div className="bg-green-500 h-[10px] w-[10px] border-white border-[2px] absolute top-0 right-0 rounded-full"></div>
        </div>
        <div className=" cursor-pointer flex gap-3 items-center">
          <span className="material-symbols-outlined text-3xl">account_circle</span>
          <span className="material-symbols-outlined">arrow_drop_down</span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
