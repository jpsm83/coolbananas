'use client';

import { SafeRecipe } from "@/app/types";
import {
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookShareButton,
  EmailShareButton,
} from "react-share";
import {
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
  FacebookIcon,
  EmailIcon,
} from "react-share";

const RecipeSharing = () => {
  const recipeUrl = window.location.href;

  return (
    <div className="flex flex-row justify-between md:justify-center py-4 md:pt-0 px-4 md:px-0 md:flex-col gap-2 md:gap-4">
      <div className="drop-shadow-lg">
        <TelegramShareButton
          url={recipeUrl}
          title="Share this amazing recipe on Telegram"
        >
          <TelegramIcon size={40} round />
        </TelegramShareButton>
      </div>
      <div className="drop-shadow-lg">
        <TwitterShareButton
          url={recipeUrl}
          title="Share this amazing recipe on Twitter X"
          // @ts-ignore
          hashtags={["#coolbananas"]}
        >
          <TwitterIcon size={40} round />
        </TwitterShareButton>
      </div>
      <div className="drop-shadow-lg">
        <WhatsappShareButton
          url={recipeUrl}
          title="Share this amazing recipe on Whatsapp"
        >
          <WhatsappIcon size={40} round />
        </WhatsappShareButton>
      </div>
      <div className="drop-shadow-lg">
        <FacebookShareButton
          url={recipeUrl}
          quote="Share this amazing recipe on Facebook"
          hashtag="#coolbananas"
        >
          <FacebookIcon size={40} round />
        </FacebookShareButton>
      </div>
      <div className="drop-shadow-lg">
        <EmailShareButton
          url={recipeUrl}
          subject="Look this amazing recipe I found at Cool Bananas"
        >
          <EmailIcon size={40} round />
        </EmailShareButton>
      </div>
    </div>
  );
};

export default RecipeSharing;
