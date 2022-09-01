import React from "react";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import { topics } from "../utils/constants";

const Discover = () => {
  const router = useRouter();
  const { topic } = router.query;
  const activeStyle =
    "xl:border-2  xl:border-[#5CFF5C] px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-[#5CFF5C]";
  const topicStyle =
    "xl:border-2 hover:bg-primary hover:text-[#444] xl:border-[#888] px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-[#ccc]";
  return (
    <div className="xl:border-b-2 xl:border-[#333] pb-6">
      <p className="text-[#ccc] font-semibold m-3 mt-4 hidden xl:block">
        Popular Topics
      </p>
      <div className="flex gap-3 flex-wrap">
        {topics.map((item) => {
          return (
            <Link href={`/?topic=${item.name}`} key={item.name}>
              <div className={item.name === topic ? activeStyle : topicStyle}>
                <span className="font-bold text-2xl xl:text-md ">
                  {item.icon}
                </span>
                <span
                  className={`font-medium text-md hidden xl:block capitalize`}
                >
                  {item.name}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default Discover;
