import { Link } from "react-router-dom";
import { FaIdCardClip, FaIdCard } from "react-icons/fa6";

export const HomePage = () => {

  return (
    <>
      <div className="px-10 py-5 flex flex-wrap items-center justify-center">

        <Link to="/rupes-discapacidad" className="border ml-4 bg-secondary dark:bg-zinc-900 dark:text-zinc-300 w-full md:w-max mt-4 md:mt-0 border-slate-300 p-10 px-12 hover:bg-primary hover:translate-y-2 duration-500 shadow-xl text-white flex flex-col items-center justify-center">
          <FaIdCardClip className="text-4xl" />
          <p className="mt-5 font-semibold"> RUPE - DISCAPACIDAD </p>
        </Link>

        <Link to="/rupes-conductor-discapacitado" className="border ml-4 bg-secondary dark:bg-zinc-900 dark:text-zinc-300 w-full md:w-max mt-4 md:mt-0 border-slate-300 p-10 px-12 hover:bg-primary hover:translate-y-2 duration-500 shadow-xl text-white flex flex-col items-center justify-center">
        <FaIdCard className="text-4xl" />
          <p className="mt-5 font-semibold"> RUPE - COND. DISCAPACITADO </p>
        </Link>

      </div>
      <div>
        <img src="assets/logo.png" alt="Logo Equinoccio" className="flex items-center justify-center mx-auto w-1/4 mt-4" />
      </div>
    </>
  )
}

