import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { createOrGetUser } from "../utils";
import useAuthStore from "../store/authStore";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import Logo from "../utils/appLogo.png";
import { IUser } from "../types";

const Navbar = () => {
  const { userProfile, addUser, removeUser } = useAuthStore();

  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (searchTerm) {
      router.push(`/search/${searchTerm}`);
    }
  };
  return (
    <div className="w-full flex justify-between items-center border-b-2 border-b-[#333] py-2 px-4 bg-[#111] ">
      <div className="w-full flex justify-between items-center lg:w-[1200px] m-auto overflow-hidden ">
        <Link href="/">
          <div className="w-[100px] md:w-[130px]">
            <Image
              className="cursor-pointer"
              src={Logo}
              layout="responsive"
              alt="tiktik"
            />
          </div>
        </Link>

        <div className="relative hidden md:block">
          <form
            className="absolute md:static top-10 left-20 bg-[#111]"
            onSubmit={handleSearch}
          >
            <input
              type="text"
              value={searchTerm}
              placeholder="Search for profiles and videos"
              className="bg-[#222] py-2 px-5 focus:outline-none focus:border-3 focus:border-[#888] border-2 border-[#666] rounded-full w-[300px] md:w-[350px] font-medium md:top-0 text-[#ccc]"
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
            <button
              onClick={handleSearch}
              className="absolute right-6 md:right-5 top-3 pl-4 border-l-2 border-[#666] text-gray-400 text-2xl bg-[#222] "
            >
              <BiSearch />
            </button>
          </form>
        </div>
        {userProfile ? (
          <div className="flex items-center gap-3 md:gap-6">
            <div className="text-lg font-semibold text-gray-500 flex items-center">
              {userProfile.image ? (
                <Link href={`/profile/${userProfile._id}`}>
                  <Image
                    src={userProfile.image}
                    width={40}
                    height={40}
                    className="rounded-full cursor-pointer"
                  />
                </Link>
              ) : (
                userProfile.userName
              )}
            </div>
            <Link href="/upload">
              <button className="flex border-2 border-[#999] items-center gap-2 px-4 py-1 rounded-md">
                <IoMdAdd fontSize={26} color="#ccc" />
                <span className="hidden md:block text-[#ccc] font-semibold">
                  Upload
                </span>
              </button>
            </Link>
            <button
              onClick={() => {
                googleLogout();
                removeUser();
              }}
            >
              <AiOutlineLogout fontSize={26} color="#5CFF5C" fontWeight="900" />
            </button>
          </div>
        ) : (
          <GoogleLogin onSuccess={(res) => createOrGetUser(res, addUser)} />
        )}
      </div>
    </div>
  );
};
export default Navbar;
