import { NavLink } from "react-router";
import { ModeToggle } from "../modeToggle/ModeToggle";

const Navbar = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between container mx-auto p-5">
      <div className="flex items-center gap-2">
        <img className="w-12" src="./library.jpg" alt="" />
        <h2 className="font-bold text-xl">Book Ocean</h2>
      </div>
      <div className="flex flex-col md:flex-row gap-5 items-center  ">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-gray-400 font-bold" : " font-bold"
          }
        >
          All Books
        </NavLink>
        <NavLink
          to="/create-book"
          className={({ isActive }) =>
            isActive ? "text-gray-400 font-bold" : " font-bold"
          }
        >
          Add Book
        </NavLink>
        <NavLink
          to="/borrow-summary"
          className={({ isActive }) =>
            isActive ? "text-gray-400 font-bold" : " font-bold"
          }
        >
          Borrow Summary
        </NavLink>
      </div>
      <div className="mt-2 md:mt-0">
        <ModeToggle></ModeToggle>
      </div>
    </div>
  );
};

export default Navbar;
