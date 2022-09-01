import React, { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import Discover from "./Discover";
import Footer from "./Footer";
import useAuthStore from "../store/authStore";
import SuggestedAccounts from "./SuggestedAccounts";
const SideBar = () => {
  const [showSideBar, setShowSideBar] = useState<Boolean>(true);

  const { fetchAllUsers, allUsers }: any = useAuthStore();
  const activeLink =
    "flex items-center gap-3 hover:bg-[#5CFF5C] hover:text-white p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#5CFF5C] rounded";
  return (
    <div>
      <div
        className="xl:hidden block m-2 ml-4 mt-3 text-xl cursor-pointer"
        onClick={() => setShowSideBar((prev) => !prev)}
      >
        {showSideBar ? (
          <ImCancelCircle color="#ccc" />
        ) : (
          <AiOutlineMenu color="#ccc" />
        )}
      </div>
      {showSideBar && (
        <div className="xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-[#333]   xl:border-0 p-3 ">
          <div className="xl:border-b-2 border-[#333] xl:pb-4">
            <Link href="/">
              <div className={activeLink}>
                <p className="text-2xl">
                  <AiFillHome />
                </p>
                <span className="capitalize text-xl hidden xl:block">
                  For You
                </span>
              </div>
            </Link>
          </div>

          <Discover />
          <SuggestedAccounts
            fetchAllUsers={fetchAllUsers}
            allUsers={allUsers}
          />
          <Footer />
        </div>
      )}
    </div>
  );
};
export default SideBar;
