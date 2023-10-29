"use client";

import Heading from "../../Heading";
import { SafeUser } from "@/app/types";
import ImageUpload from "../../inputs/ImageUpload";
import Image from "next/image";

interface StepPhotosProps {
  currentUser: SafeUser | null | undefined;
  imageSrc: string[];
  setCustomValue: (value: string, imageSrc: string[]) => void;
}

const StepPhotos: React.FC<StepPhotosProps> = ({
  imageSrc,
  currentUser,
  setCustomValue,
}) => {

  const handleImageUpload = (e: any) => {
    e.preventDefault();
    const image = e.target.files[0];
    setCustomValue("imageSrc", [...imageSrc, image]);

  //   let reader = new FileReader();
  //   reader.readAsDataURL(e.target.files[0]);
  //   reader.onload = () => {
  //     // @ts-ignore
  //     setCustomValue("imageSrc", [...imageSrc, reader.result]);
  //   };
  //   reader.onerror = (error) => {
  //     console.log(error);
  //   };
  };

  const handleDeleteImage = (index: number) => {
    setCustomValue(
      "imageSrc",
      imageSrc.filter((_: any, i: number) => i !== index)
    );
  };

  return (
    <div className="flex flex-col gap-8">
      <Heading
        title={`Make me mouth watering ${currentUser?.name}, before I start cooking.`}
        subtitle="Browser some photo. (4 max)"
      />
      <ImageUpload
        id="photos"
        // @ts-ignore
        onChange={(e) => handleImageUpload(e)}
      />

      {/* <div className="flex flex-wrap justify-center gap-4">
        {imageSrc.map((image: any, index: number) => (
          <div key={index} className="relative">
            <div className="rounded-md overflow-hidden">
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
            </div>
            <button
              onClick={() => handleDeleteImage(index)}
              className="text-red-600 hover:font-bold w-6 h-6 absolute top-2 right-2 flex items-center justify-center rounded-full bg-white/75 hover:bg-white/100"
            >
              X
            </button>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default StepPhotos;
