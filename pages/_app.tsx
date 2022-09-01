import "../styles/globals.css";
import type { AppProps } from "next/app";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useState, useEffect } from "react";

// Import Internal Components
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
function MyApp({ Component, pageProps }: AppProps) {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return;

  return (
    <GoogleOAuthProvider
      clientId={`${process.env.NEXT_PUBLIC_GOOGLE_OAUTH_TOKEN}`}
    >
      <div className="bg-[#111]">
        <Navbar />
        <div className="flex gap-6 md:gap-20 lg:w-[1200px] m-auto overflow-auto ">
          <div className="h-[92vh] overflow-hidden xl:overflow-auto">
            <SideBar />
          </div>
          <div className="mt-4 h-[88vh] flex flex-col gap-10 overflow-auto flex-1 videos">
            <Component {...pageProps} />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default MyApp;
