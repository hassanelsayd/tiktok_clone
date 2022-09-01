import React from "react";
import { CgUnavailable } from "react-icons/cg";
const NoResults = ({ text }: { text: String }) => {
  return (
    <div className="flex flex-col items-center justify-center h-[400px] text-gray-400 gap-4">
      <p className=" text-8xl">
        <CgUnavailable />
      </p>
      <p className=" text-2xl text-center">{text}</p>
    </div>
  );
};
export default NoResults;
