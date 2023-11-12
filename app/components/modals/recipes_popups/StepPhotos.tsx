"use client";

import { useState, ChangeEvent } from "react";
import Image from "next/image";
import { SafeUser } from "@/app/types";
import ImageInput from "../../inputs/ImageInput";
import Heading from "../../Heading";

interface StepPhotosProps {
  currentUser: SafeUser | null | undefined;
  imageSrc: [] | null | undefined;
  imageUrlToDelete?: [] | null | undefined;
  imageFileToAdd: [] | null | undefined;
  setCustomValue: (value: string, imageSrc: File[] | string[] | {}) => void;
}

const StepPhotos: React.FC<StepPhotosProps> = ({
  imageSrc,
  imageFileToAdd,
  imageUrlToDelete,
  currentUser,
  setCustomValue,
}) => {
  const [imagesQty, setImagesQty] = useState<number>(
    (imageFileToAdd ? imageFileToAdd.length : 0) + (imageSrc ? imageSrc.length : 0)
  );

  const handleImageInput = (e: ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files && e.target.files[0];
    if (imageFile) {
        setCustomValue("imageFileToAdd", [...(imageFileToAdd || []), imageFile]);
        setImagesQty(imagesQty + 1);
    }
  };

  const handleDeleteImage = (imagesArray: [], imagesArrayName: string, index: number) => {
    if (!imagesArray || !imagesArray[index]) return;

    // Get the image to delete based on the index
    const deletedImage = imagesArray[index];

    const updateImagesArray = imagesArray.filter(
      (image) => image !== deletedImage
    );

    setCustomValue(imagesArrayName, updateImagesArray);
    if(imagesArrayName === 'imageSrc'){
      setCustomValue("imageUrlToDelete", [
        ...(imageUrlToDelete || []),
        deletedImage,
      ]);
    }
    setImagesQty(imagesQty - 1);
  };

  return (
    <div className="flex flex-col gap-8">
      <Heading
        title={`Make me mouth watering ${currentUser?.name}, before I start cooking.`}
        subtitle="Browse some photos (5 max)"
      />
      <ImageInput disable={imagesQty === 5} onChange={handleImageInput} />
      <div className="flex flex-wrap justify-center gap-4">
        {imageSrc &&
          imageSrc.map((image, index) => (
            <div key={index} className="relative">
              <div className="overflow-hidden">
                <Image
                  alt={`Image ${index + 1}`}
                  src={image as string}
                  quality={75}
                  width={280}
                  height={280}
                  style={{
                    objectFit: "contain",
                  }}
                />
              </div>
              <button
                onClick={() => handleDeleteImage(imageSrc, 'imageSrc', index)}
                className="text-red-600 hover:font-bold w-6 h-6 absolute top-2 right-2 flex items-center justify-center rounded-full bg-white/75 hover:bg-white/100"
              >
                X
              </button>
            </div>
          ))}
        {imageFileToAdd &&
          imageFileToAdd.map((imageObject, index) => (
            <div key={index} className="relative">
              <div className="overflow-hidden">
                <Image
                  alt={`Image ${index + 1}`}
                  src={URL.createObjectURL(imageObject)}
                  quality={75}
                  width={280}
                  height={280}
                  style={{
                    objectFit: "contain",
                  }}
                />
              </div>
              <button
                onClick={() => handleDeleteImage(imageFileToAdd, 'imageFileToAdd', index)}
                className="text-red-600 hover:font-bold w-6 h-6 absolute top-2 right-2 flex items-center justify-center rounded-full bg-white/75 hover:bg-white/100"
              >
                X
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default StepPhotos;
