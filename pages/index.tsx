import React from "react";
import type { NextPage } from "next";
import axios from "axios";
import VideoCard from "../components/VideoCard";
import NoResults from "../components/NoResults";
import { BASE_URL } from "../utils";

import { Video } from "../types";
import Head from "next/head";
interface Props {
  videos: Video[];
}

const Home: NextPage<Props> = ({ videos }: Props) => {
  console.log(videos);
  return (
    <div className="flex flex-col h-full gap-10">
      <Head>
        <title>IReels</title>
      </Head>
      {videos.length ? (
        videos.map((video: Video) => {
          return <VideoCard post={video} key={video._id} />;
        })
      ) : (
        <NoResults text="No Videos" />
      )}
    </div>
  );
};

export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  let response = await axios.get(`${BASE_URL}/api/post`);

  if (topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  }

  return {
    props: { videos: response.data },
  };
};
export default Home;
