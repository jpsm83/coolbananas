"use client";

import { SafeRecipe, SafeReport, SafeUser } from "@/app/types";
import RatingRadio from "../RatingRadio";
import { BiErrorCircle } from "react-icons/bi";
import useReportModal from "@/app/hooks/useReportModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useCallback } from "react";

interface RecipeRatingsProps {
  reports: SafeReport[] | null | undefined;
  recipe: SafeRecipe;
  currentUser?: SafeUser | null;
}
const RecipeRatings: React.FC<RecipeRatingsProps> = ({
  reports,
  recipe,
  currentUser,
}) => {
  const reportModal = useReportModal();
  const loginModal = useLoginModal();

  // Check if the user has already reported this recipe
  const hasUserReported = reports?.some(
    (report) => report.authorId === currentUser?.id
  );

  const report = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    reportModal.onOpen();
  }, [currentUser, loginModal, reportModal]);

  return (
    <div>
      <div className="bg-gray-100 flex md:hidden justify-center p-8 font-bold text-gray-400">
      A D V E R T I S E
      </div>
      <div className="flex flex-col gap-6 md:gap-10 cursor-default px-4 md:px-0 mt-6 md:mt-0">
      <div className="font-bold text-orange-500 text-2xl md:text-4xl text-center">
        Read, cook, eat, <span className="text-4xl md:text-6xl drop-shadow-lg font-extrabold align-middle">RATE</span> it...
      </div>
      <div className="text-gray-500 font-semibold text-center">
        Rate this creation and let us know what you thing about this recipe on the reviews bellow. Write your toughs in what could de done do to improve it or just leave yours complements for the chef.
      </div>
      <div className="bg-orange-50 flex flex-row justify-center p-6">
        <RatingRadio size={50} recipe={recipe} currentUser={currentUser} viewOnly={recipe.authorId === currentUser?.id} />
      </div>
      <div className="flex justify-end">
        {hasUserReported ? (
          <p className="font-bold text-xs text-red-500">
            You have reported this recipe!
          </p>
        ) : (
          <button
            className="font-bold flex flex-row underline-offset-2 text-xs text-gray-500 hover:text-red-500 items-center gap-1"
            onClick={() => report()}
          >
            Something wrong (report)
            <span>
              <BiErrorCircle size={20} />
            </span>
          </button>
        )}
      </div>
      </div>
    </div>
  );
};

export default RecipeRatings;
