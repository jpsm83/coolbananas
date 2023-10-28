import { SafeRecipe, SafeUser } from "@/app/types";
import Image from "next/image";
import React from "react";
import { FiYoutube } from "react-icons/fi";
import RecipeCard from "./RecipeCard";
import YouTube from "../Youtube";
interface RecipeVideoProps {
  currentUser: SafeUser | null | undefined;
  recipe: SafeRecipe;
}

const RecipeVideo: React.FC<RecipeVideoProps> = ({
  recipe,
  currentUser,
}) => {

  const youtubeVideoName = recipe.video
  ? recipe.video.split("watch?v=")[1].split("&")[0]
  : "";

  return (
    <div className="flex flex-col gap-6 md:gap-10">
      {/* advertise */}
      <div className="bg-gray-100 flex md:hidden justify-center p-8 font-bold text-gray-400">
      A D V E R T I S E
      </div>
      <div className="px-4 md:px-0">
      <div
        className="flex flex-row font-bold text-lg items-center gap-2 mb-6 md:mb-10"
        id="video"
      >
        <FiYoutube size={40} color="#f97316" />
        <p>Video</p>
      </div>
      <div className="flex flex-col justify-center items-center overflow-hidden mb-6 md:mb-10">
        {recipe.video ? (
          <YouTube videoId={youtubeVideoName} />
        ) : (
          <Image
            alt="Video not ready yet!"
            src="/images/video_not_ready.png"
            sizes="100vw"
            width={600}
            height={600}
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
            }}
            objectPosition="center"
          />
        )}
      </div>
      </div>
    </div>
  );
};

export default RecipeVideo;
