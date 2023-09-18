"use client"

import { logOut } from "@/redux/features/authSlice";
import Link from "next/link";
import { FaRegUser, FaSignOutAlt, FaLock, FaUserPlus } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector((state) => state.authReducer)

  const dispach = useDispatch();
  const logout = () => {
    if(confirm("Are you sure about log out?")){
      localStorage.removeItem("LOGIN_TOKEN");
      dispach(logOut());
    }
  }

  return (
    <div className="flex shadow-lg flex-row justify-between mb-6 sm:mb-6 sm:mt-6 mx-auto py-4 px-5 lg:py-7 lg:px-20 md:py-5 md:px-10 bg-brown items-center sm:rounded-t-xl w-full">
      <div className="flex">
        <Link href="/" className="cursor-pointer font-bold hover:scale-105 duration-150 text-2xl sm:text-3xl lg:text-5xl md:text-4xl font-300 sm:tracking-wider text-common font-rare">
          <h1 className=" drop-shadow-lg">Broker Diary</h1>
        </Link>
      </div>


      <div className="flex flex-row justify-between items-center">
        {
          user && Object.keys(user).length > 0 && user.name ?

            <div className="flex gap-x-4 md:gap-x-6 lg:gap-x-8 items-center" >
              <div className="flex hover:scale-110 duration-150 gap-x-1 md:gap-x-2 items-center justify-center cursor-pointer ">
                <FaRegUser className="w-2 h-3 lg:w-5 lg:h-5 md:w-4 md:h-4 text-dul" />
                <p className="text-heading text-dul tracking-wide text-xs sm:text-base lg:text-xl md:text-lg font-semibold">{user.name}</p>
              </div>
              <div className="flex gap-x-1 md:gap-x-2 hover:scale-110 duration-150 items-center justify-center cursor-pointer" onClick={logout}>
                <FaSignOutAlt className="w-3 h-4 lg:w-5 lg:h-5 md:w-4 md:h-4 text-dul cursor-pointer" />
                <p className="text-heading text-dul hidden tracking-wide sm:block sm:text-base lg:text-xl md:text-lg font-semibold">LogOut</p>
              </div>
            </div>

            :

            <div className="flex gap-x-4 md:gap-x-6 lg:gap-x-8 items-center" >
              <div className="hover:scale-110 duration-150 cursor-pointer ">
                <Link href="login" className="flex gap-x-1 md:gap-x-2 cursor-pointer text-xl font-heading justify-center items-center">
                  <FaLock className="w-3 h-4 lg:w-5 lg:h-5 md:w-4 md:h-4 text-common cursor-pointer" />
                  <p className="text-heading text-offwhite text-xs sm:text-base lg:text-xl md:text-lg">Login</p>
                </Link>
              </div>
              <div className=" hover:scale-110 duration-150 cursor-pointer ">
                <Link href="signup" className="flex gap-x-1 md:gap-x-2 cursor-pointer text-xl font-heading justify-center items-center">
                  <FaUserPlus className="w-3 h-4 lg:w-5 lg:h-5 md:w-4 md:h-4 text-common cursor-pointer" />
                  <p className="text-heading text-offwhite text-xs sm:text-base lg:text-xl md:text-lg">Signup</p>
                </Link>
              </div>
            </div>
        }
      </div>
    </div >
  )
}

export default Navbar;