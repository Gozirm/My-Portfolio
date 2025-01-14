import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const PreLoading = () => {
  return (
    <>
      <div className="w-screen h-screen">
        <DotLottieReact
          src="https://lottie.host/97bc92f7-e148-4906-a670-3d5382710245/SstgyPMUtK.lottie"
          loop
          autoplay
        />
      </div>
    </>
  );
};

export default PreLoading;
