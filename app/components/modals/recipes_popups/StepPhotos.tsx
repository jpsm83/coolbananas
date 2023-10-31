"use client";

import React, { useState, ChangeEvent } from "react";
import Image from "next/image";
import { SafeUser } from "@/app/types";
import ImageInput from "../../inputs/ImageInput";
import Heading from "../../Heading";

interface StepPhotosProps {
  currentUser: SafeUser | null | undefined;
  imageSrc: string[] | null | undefined;
  imageUrlToDelete?: (string | { imageUrl: string; imageName: string })[] | null | undefined;
  imageFileToAdd: File[] | null | undefined;
  setCustomValue: (value: string, imageSrc: File[] | string[] | {}) => void;
}

const StepPhotos: React.FC<StepPhotosProps> = ({
  imageSrc,
  imageFileToAdd,
  imageUrlToDelete,
  currentUser,
  setCustomValue,
}) => {
  const [viewImages, setViewImages] = useState<(string | { imageUrl: string; imageName: string })[] | null | undefined>(
    imageSrc
  );
  const [imagesQty, setImagesQty] = useState<number>(viewImages ? viewImages.length : 0);

  const handleImageInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const imageFile = e.target.files && e.target.files[0];
    if (imageFile) {
      setCustomValue("imageFileToAdd", [...(imageFileToAdd || []), imageFile]);

      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const imageUrl = event.target?.result as string;

        // Create an object with the image URL and name
        const imageObject: { imageUrl: string; imageName: string } = {
          imageUrl,
          imageName: imageFile.name,
        };

        setViewImages([...(viewImages || []), imageObject]);
        setImagesQty(imagesQty + 1);
      };

      reader.readAsDataURL(imageFile);
    }
  };

  const handleDeleteImage = (index: number) => {
    if (!viewImages || !viewImages[index]) return;

    // Get the image to delete based on the index
    const deletedImage = viewImages[index];

    // Filter the viewImages array to remove the deleted image
    const updatedViewImages = viewImages.filter((_, i) => i !== index);
    setViewImages(updatedViewImages);
    const updatedImageSrc: string[] = (imageSrc || []).filter((image) => image !== deletedImage);
    setCustomValue("imageSrc", updatedImageSrc);
    if (typeof deletedImage === 'object' && deletedImage.hasOwnProperty('imageName')) {
      setCustomValue("imageUrlToDelete", [...(imageUrlToDelete || []), deletedImage]);
    }
    
    const updatedImageFileToAdd = (imageFileToAdd || []).filter((image) => {
      if (typeof deletedImage === 'object' && deletedImage.hasOwnProperty('imageName')) {
        return image.name !== deletedImage.imageName;
      }return true; // Keep all items not matching the object structure
    });
    setCustomValue("imageFileToAdd", updatedImageFileToAdd);

    setImagesQty(imagesQty - 1);
  };

  return (
    <div className="flex flex-col gap-8">
      <Heading
        title={`Make me mouth watering ${currentUser?.name}, before I start cooking.`}
        subtitle="Browse some photos (5 max)"
      />
      <ImageInput
        disable={imagesQty === 5}
        onChange={handleImageInput}
      />
      <div className="flex flex-wrap justify-center gap-4">
        {viewImages &&
          viewImages.map((image, index) => (
            <div key={index} className="relative">
              <div className="overflow-hidden">
                {typeof image === "object" && image.hasOwnProperty("imageUrl") ? (
                  <Image
                    alt={`Image ${index + 1}`}
                    src={image.imageUrl}
                    quality={75}
                    width={280}
                    height={280}
                    style={{
                      objectFit: "contain",
                    }}
                  />
                ) : (
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
                )}
              </div>
              <button
                onClick={() => handleDeleteImage(index)}
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

