import React, { useEffect, useRef, useState } from "react";
import { Video } from "../types";
import Link from "next/link";
import Image from "next/image";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import { BsPlay } from "react-icons/bs";

interface Post {
  post: Video;
}

const VideoCard = ({ post }: Post) => {
  const [playing, setPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const onVideoPress = () => {
    if (playing) {
      videoRef.current?.pause();
      setPlaying(false);
    } else {
      videoRef.current?.play();
      setPlaying(true);
    }
  };

  useEffect(() => {
    if (post) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted, post]);
  return (
    <div className="flex flex-col border-b-2 border-[#333] pb-6">
      {/* Video details */}
      <div>
        {/* Video details wrapper */}
        <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded ">
          {/* Image section */}
          <div className="md:w-16 md:h-16 w-10 h-10">
            <Link href={`/`}>
              <>
                <Image
                  width={62}
                  height={62}
                  className=" rounded-full"
                  src={post.postedBy.image}
                  alt="user-profile"
                  layout="responsive"
                />
              </>
            </Link>
          </div>

          {/* Text section */}
          <div>
            {/* User name */}
            <Link href={`/profile/${post.postedBy._id}`}>
              <div className="flex items-center gap-2">
                <p className="flex gap-2 items-center md:text-md font-bold text-[#ccc]">
                  {post.postedBy.userName}{" "}
                  <GoVerified className="text-blue-400 text-md" />
                </p>
                <p className="capitalize font-medium text-xs text-[#999] hidden md:block">
                  {post.postedBy.userName}
                </p>
              </div>
            </Link>
            {/* Video caption */}
            <Link href={`/`}>
              <p className="mt-2 font-semibold text-[#5CFF5C] tracking-wide">
                {post.caption}
              </p>
            </Link>
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div className="lg:ml-20 flex gap-4 relative">
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className="rounded-3xl w-[95%]"
        >
          <Link href={`/detail/${post._id}`}>
            <video
              onEnded={() => {
                setPlaying(false);
              }}
              ref={videoRef}
              src={post.video.asset.url}
              className="lg:w-[600px] h-[300px] md:h-[400px] lg:h-[528px] w-full rounded-2xl cursor-pointer bg-[#222]"
            ></video>
          </Link>

          {isHover && (
            <div className="absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 lg:justify-between w-[100px] md:w-[50px] lg:w-[600px] p-3">
              {playing ? (
                <button onClick={onVideoPress}>
                  <BsFillPauseFill className="text-[#ccc] text-2xl lg:text-4xl" />
                </button>
              ) : (
                <button onClick={onVideoPress}>
                  <BsFillPlayFill className="text-[#ccc] text-2xl lg:text-4xl" />
                </button>
              )}
              {isMuted ? (
                <button onClick={() => setIsMuted(false)}>
                  <HiVolumeOff className="text-[#ccc] text-2xl lg:text-4xl" />
                </button>
              ) : (
                <button onClick={() => setIsMuted(true)}>
                  <HiVolumeUp className="text-[#ccc] text-2xl lg:text-4xl" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default VideoCard;
