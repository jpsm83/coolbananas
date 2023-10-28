import { useState } from "react";
import { ArrowBigLeft, ArrowBigRight, Circle, CircleDot } from "lucide-react";
import Image from "next/image";

interface ImageSliderProps {
  recipeImages: string[];
}

export function ImageSlider({ recipeImages }: ImageSliderProps) {
  const [imageIndex, setImageIndex] = useState(0);

  function showNextImage() {
    setImageIndex((index) => {
      if (index === recipeImages.length - 1) return 0;
      return index + 1;
    });
  }

  function showPrevImage() {
    setImageIndex((index) => {
      if (index === 0) return recipeImages.length - 1;
      return index - 1;
    });
  }

  return (
    <div className="relative">
      <div className="flex overflow-hidden">
        {recipeImages.map((imageSrc, index) => (
          <div
            key={index}
            className={`${
              imageIndex === index ? "opacity-100" : "opacity-0"
            } flex justify-center object-cover items-center w-full max-h-400 flex-shrink-0 flex-grow-0 transition-transform ease-in-out duration-300`}
            style={{
              transform: `translateX(-${100 * imageIndex}%)`,
            }}
          >
            <Image
              alt="Recipe"
              src={imageSrc}
              width={600}
              height={600}
              className="h-full w-full aspect-[4/3]"
              objectPosition="center"
              style={{
                objectFit: "cover",
              }}
    
            />
          </div>
        ))}
      </div>
      <button
        onClick={showPrevImage}
        className="hover:bg-gray-600/30 block absolute top-0 bottom-0 p-1 cursor-pointer left-0 transition"
      >
        <ArrowBigLeft className="stroke-white fill-gray-600" />
      </button>
      <button
        onClick={showNextImage}
        className="hover:bg-gray-600/30 block absolute top-0 bottom-0 p-1 cursor-pointer right-0 transition"
      >
        <ArrowBigRight className="stroke-white fill-gray-600" />
      </button>
      <div className="absolute flex justify-center w-full bottom-0 gap-1 pb-2">
        {recipeImages.map((_, index) => (
          <button
            key={index}
            className="cursor-pointer"
            onClick={() => setImageIndex(index)}
          >
            {index === imageIndex ? (
              <CircleDot className="stroke-white fill-orange-500 hover:scale-125 transition h-4" />
            ) : (
              <Circle className="stroke-white fill-gray-600 hover:scale-125 transition h-4" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
