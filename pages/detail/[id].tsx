import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { GoVerified } from "react-icons/go";
import Image from "next/image";
import Link from "next/link";
import { BsFillPlayFill } from "react-icons/bs";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { FcUndo } from "react-icons/fc";

// import Comments from '../../components/Comments';
// import { BASE_URL } from '../../utils';
// import LikeButton from '../../components/LikeButton';

import useAuthStore from "../../store/authStore";
import { Video } from "../../types";
import axios from "axios";
import LikeButton from "../../components/LikeButton";
import Comments from "../../components/Comments";
import { BASE_URL } from "../../utils";
import Head from "next/head";

// next line 118
interface Props {
  videoDetails: Video;
}
const Detail = ({ videoDetails }: Props) => {
  const [post, setPost] = useState(videoDetails);
  const [playing, setPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState<Boolean>(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPostingComment, setIsPostingComment] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const { userProfile }: any = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (post) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted, post]);

  const onVideoClick = () => {
    if (playing && post) {
      videoRef.current?.pause();
      setPlaying(false);
    } else if (!playing) {
      videoRef.current?.play();
      setPlaying(true);
    }
  };

  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const res = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like,
      });
      setPost({ ...post, likes: res.data.likes });
    }
  };

  const addComment = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (userProfile) {
      if (comment) {
        setIsPostingComment(true);
        const res = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
          userId: userProfile._id,
          comment,
        });

        setPost({ ...post, comments: res.data.comments });
        setComment("");
        setIsPostingComment(false);
      }
    }
  };

  if (!post) return;

  return (
    <div className="absolute w-full top-0 left-0 bg-[#111] h-full flex flex-wrap lg:flex-nowrap">
      <Head>
        <title>{post.caption} Profile</title>
      </Head>
      <div className="relative  flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-[#333]">
        <div className="opacity-100 absolute top-6 left-2 lg:left-6 z-50">
          <p className="cursor-pointer " onClick={() => router.back()}>
            <FcUndo className="text-[35px] hover:opacity-90 hover:scale-110 transition-all" />
          </p>
        </div>
        <div className="relative">
          <div className="lg:h-[100vh] h-[60vh]">
            <video
              ref={videoRef}
              onClick={onVideoClick}
              loop
              src={post?.video?.asset.url}
              className=" h-full cursor-pointer"
            ></video>
          </div>
        </div>
        {playing ? null : (
          <div
            onClick={onVideoClick}
            className="text-white absolute h-full w-full flex justify-center items-center bg-[rgba(0,0,0,0.50)] cursor-pointer backdrop-blur-[4px] transition-all "
          >
            <BsFillPlayFill className="text-9xl" />
          </div>
        )}

        <div className="absolute bottom-5 lg:bottom-10 right-5 lg:right-10  cursor-pointer">
          {isVideoMuted ? (
            <button onClick={() => setIsVideoMuted(false)}>
              <HiVolumeOff className="text-white text-3xl lg:text-4xl" />
            </button>
          ) : (
            <button onClick={() => setIsVideoMuted(true)}>
              <HiVolumeUp className="text-white text-3xl lg:text-4xl" />
            </button>
          )}
        </div>
      </div>
      <div className="relative  w-[1000px] md:w-full lg:w-[700px]">
        <div className="lg:mt-20 mt-10">
          <Link href={`/profile/${post.postedBy._id}`}>
            <div className="flex gap-4 mb-4  w-full pl-10 cursor-pointer">
              <Image
                width={60}
                height={60}
                alt="user-profile"
                className="rounded-full"
                src={post.postedBy.image}
              />
              <div>
                <div className="text-xl font-bold lowercase tracking-wider flex gap-2 items-center justify-center text-[#ccc]">
                  {post.postedBy.userName.replace(/\s+/g, "")}{" "}
                  <GoVerified className="text-blue-400 text-xl" />
                </div>
                <p className="text-md text-[#aaa]"> {post.postedBy.userName}</p>
              </div>
            </div>
          </Link>
          <div className="px-10">
            <p className=" text-md text-[#5CFF5C]">❝ {post.caption} ❞</p>
          </div>

          <div className="mt-10 px-10">
            {userProfile && (
              <LikeButton
                likes={post.likes}
                flex="flex"
                handleLike={() => handleLike(true)}
                handleDislike={() => handleLike(false)}
              />
            )}
          </div>
          <Comments
            comment={comment}
            setComment={setComment}
            addComment={addComment}
            comments={post.comments}
            isPostingComment={isPostingComment}
          />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`);
  return {
    props: {
      videoDetails: data,
    },
  };
};

export default Detail;
