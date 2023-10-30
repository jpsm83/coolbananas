"use client";

import Heading from "../../Heading";
import { SafeUser } from "@/app/types";
import ImageInput from "../../inputs/ImageInput";
import Image from "next/image";
import { useState } from "react";

interface StepPhotosProps {
  currentUser: SafeUser | null | undefined;
  imageSrc: string[] | null | undefined;
  imageUrlToDelete?: string[] | null | undefined;
  imageFileToAdd: File[] | null | undefined;
  setCustomValue: (value: string, imageSrc: File[]) => void;
}

const StepPhotos: React.FC<StepPhotosProps> = ({
  imageSrc,
  imageFileToAdd,
  imageUrlToDelete,
  currentUser,
  setCustomValue,
}) => {
  const [viewImages, setViewImages] = useState<(string[] | { imageUrl: string, imageName: string })[] | null | undefined>(imageSrc);
  const [imagesQty, setImagesQty] = useState<number>(viewImages.length);

  const handleImageInput = (e: any) => {
    e.preventDefault();
    const imageFile = e.target.files[0];
    if (imageFile) {
      setCustomValue("imageFileToAdd", [...imageFileToAdd, imageFile]);

      const reader = new FileReader();
      reader.onload = (event: any) => {
        const imageUrl = event.target.result;

        // Create an object with the image URL and name
        const imageObject: { imageUrl: string, imageName: string } = {
          imageUrl,
          imageName: imageFile.name,
        };

        setViewImages([...viewImages, imageObject]);
      };

      reader.readAsDataURL(imageFile);
      setImagesQty(imagesQty + 1);
    }
  };

  const handleDeleteImage = (index: number) => {
    // Get the image to delete based on the index
    const deletedImage: ({} | string) = viewImages[index];

    // Filter the viewImages array to remove the deleted image
    const updatedViewImages = viewImages.filter((_, i) => i !== index);
    setViewImages(updatedViewImages);

    const updatedImageSrc: string[] = imageSrc.filter((image) => image !== deletedImage);
    setCustomValue("imageSrc", updatedImageSrc);
    if(!deletedImage.imageName){
      setCustomValue('imageUrlToDelete', [...imageUrlToDelete, deletedImage]);
    }

    const updatedImageFileToAdd = imageFileToAdd.filter(
      (image) => deletedImage.imageName && image.name !== deletedImage.imageName
    );
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
        onChange={(e) => handleImageInput(e)}
      />
      <div className="flex flex-wrap justify-center gap-4">
        {viewImages.map((image, index) => (
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
                  src={image}
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
