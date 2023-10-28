import { SafeRecipe } from "@/app/types";
import React from "react";
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

interface RecipeSharingProps {
  recipe: SafeRecipe;
}

const RecipeSharing: React.FC<RecipeSharingProps> = ({ recipe }) => {
  const recipeUrl = window.location.href;

  return (
    <div className="flex flex-row justify-between md:justify-center py-4 border-t-[1px] md:pt-0 px-4 md:px-0 md:flex-col gap-2 md:gap-4">
      <div className="drop-shadow-lg">
        <TelegramShareButton
          url={recipeUrl}
          title="Share this amazing recipe on Telegram"
        >
          <TelegramIcon size={40} round></TelegramIcon>
        </TelegramShareButton>
      </div>
      <div className="drop-shadow-lg">
        <TwitterShareButton
          url={recipeUrl}
          title="Share this amazing recipe on Twitter X"
          // @ts-ignore
          hashtags={["#coolbananas"]}
        >
          <TwitterIcon size={40} round></TwitterIcon>
        </TwitterShareButton>
      </div>
      <div className="drop-shadow-lg">
        <WhatsappShareButton
          url={recipeUrl}
          title="Share this amazing recipe on Whatsapp"
        >
          <WhatsappIcon size={40} round></WhatsappIcon>
        </WhatsappShareButton>
      </div>
      <div className="drop-shadow-lg">
        <FacebookShareButton
          url={recipeUrl}
          quote="Share this amazing recipe on Facebook"
          hashtag="#coolbananas"
        >
          <FacebookIcon size={40} round></FacebookIcon>
        </FacebookShareButton>
      </div>
      <div className="drop-shadow-lg">
        <EmailShareButton
          url={recipeUrl}
          subject="Look this amazing recipe I found at Cool Bananas"
        >
          <EmailIcon size={40} round></EmailIcon>
        </EmailShareButton>
      </div>
    </div>
  );
};

export default RecipeSharing;