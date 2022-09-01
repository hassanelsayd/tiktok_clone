import React, { useState } from "react";
import { SanityAssetDocument } from "@sanity/client";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useRouter } from "next/router";
import { client } from "../utils/client";
import { topics } from "../utils/constants";
import useAuthStore from "../store/authStore";
import Spinner from "../components/Spinner";
import axios from "axios";
import Head from "next/head";
import { BASE_URL } from "../utils";

const Upload = () => {
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [wrongFileType, setWrongFileType] = useState<Boolean>(false);
  const [videoAsset, setVideoAsset] = useState<
    SanityAssetDocument | undefined
  >();
  const [caption, setCaption] = useState<String>("");
  const [category, setCategory] = useState<String>(topics[0].name);
  const [shareLoading, setShareLoading] = useState<Boolean>(false);
  const { userProfile }: { userProfile: any } = useAuthStore();
  const router = useRouter();
  const shareVideo = async () => {
    if (category && caption && videoAsset?._id) {
      setShareLoading(true);
      const post = {
        _type: "post",
        caption,
        video: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: videoAsset?._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: "postedBy",
          _ref: userProfile?._id,
        },
        topic: category,
      };
      await axios.post(`${BASE_URL}/api/post`, post);

      router.push("/");
    }
  };

  const uploadVideo = async (event: any) => {
    const selectedVideo = event.target.files[0];
    const fileTypes = ["video/mp4", "video/webm", "video/ogg"];

    if (fileTypes.includes(selectedVideo.type)) {
      setWrongFileType(false);
      setIsLoading(true);
      client.assets
        .upload("file", selectedVideo, {
          contentType: selectedVideo.type,
          filename: selectedVideo.name,
        })
        .then((response) => {
          setVideoAsset(response);
          setIsLoading(false);
        });
    } else {
      setWrongFileType(true);
      setIsLoading(false);
    }
  };

  const discardUpload = () => {
    router.push("/");
  };
  return (
    <div className=" min-h-[100vh] py-6 bg-[#222] w-full  absolute left-0 top-[66px] flex items-center justify-center">
      <Head>
        <title>Upload video</title>
      </Head>
      <div className="w-[80%]  bg-[#444]  p-6 rounded-lg flex items-center  flex-wrap md:gap-10 gap-3 ">
        <div className="w-full h-[460px]  border-dashed border-2 border-gray-400 rounded-xl ">
          <div className="w-full h-full flex flex-col justify-center items-center cursor-pointer hover:bg-[#555] transition-all relative">
            {isLoading ? (
              <Spinner color="#333" />
            ) : videoAsset ? (
              <div className="h-full w-full  bg-[#333] flex items-center justify-center">
                <video
                  className="w-full h-full"
                  loop
                  controls
                  src={videoAsset.url}
                ></video>
              </div>
            ) : (
              <div className="flex flex-col items-center ">
                <p className="text-8xl text-gray-300">
                  <FaCloudUploadAlt />
                </p>
                <p className="text-xl font-bold text-[#ccc]">Upload video</p>
                <span className="text-center mt-2 text-sm text-gray-400 ">
                  You can click or drag to upload
                </span>
                <p className="text-center mt-6 text-sm text-gray-400 leading-6">
                  MP4 or WebM or ogg <br />
                  720x1280 resolution or higher <br />
                  Up to 10 minutes <br />
                  Less than 2 GB
                </p>

                <input
                  type="file"
                  name="upload-video"
                  className="absolute  w-full h-full opacity-0 cursor-pointer top-0 left-0"
                  onChange={uploadVideo}
                  draggable
                />
              </div>
            )}
          </div>
          {wrongFileType && (
            <div className="text-center mt-4 font-semibold text-normal text-[#5CFF5C]">
              Please select a valid video
            </div>
          )}
        </div>

        <div className="flex-1 flex  flex-col mt-10">
          <label className="text-xl font-medium text-[#ccc]">Caption</label>
          <input
            type="text"
            className=" min-w-full rounded-md border-2 border-[#555] px-3 py-3 focus:outline-none my-4 bg-[#333] text-[#ccc]"
            value={`${caption}`}
            onChange={(e) => setCaption(e.target.value)}
          />
          <label className="text-xl font-medium text-[#ccc]">
            Choose a cateogry
          </label>
          <select
            value={`${category}`}
            onChange={(e) => setCategory(e.target.value)}
            className=" min-w-full rounded-md border-2border-[#555] px-3 py-3 focus:outline-none my-4 bg-[#333] text-[#ccc] capitalize"
          >
            {topics.map((topic) => {
              return (
                <option
                  className="capitalize py-3 text-xl text-gray-400"
                  key={topic.name}
                >
                  {topic.name}
                </option>
              );
            })}
          </select>
          <div className="flex gap-6 justify-center mt-4">
            <button
              onClick={discardUpload}
              className="py-2 px-3 w-24 md:w-40 border-2 border-gray-400 font-medium rounded outline-none text-[#ccc]"
            >
              Discard
            </button>
            <button
              onClick={shareVideo}
              className="py-2 px-3 w-24 md:w-40 bg-[#5CFF5C] text-[#222] font-medium rounded outline-none flex items-center justify-center"
            >
              {shareLoading ? <Spinner color="#fff" /> : "Post"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Upload;
