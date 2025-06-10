import React from "react";
import { useSelector } from "react-redux";
import LogoutButton from "../Logout";

const Navbar = () => {
  const user = useSelector((store) => store.user);

  return (
    <>
    {user &&
        <div className="navbar bg-base-300 shadow-md px-4 py-2 flex justify-between items-center">
            <h1 className="text-lg  text-amber-100">Hello {user.name}</h1>
            <div className="flex-none">
                <LogoutButton />
            </div>
        </div>
    }
    </>
  );
};

export default Navbar;