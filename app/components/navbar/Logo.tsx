"use client";

import useFilters from "@/app/hooks/useFilters";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();
  const recipeFilters = useFilters();

  const redirectUrl = () => {
      router.push('/' + recipeFilters.url);
    }

  return (
    <div className="fill-current px-4">
      <Image
        onClick={() => redirectUrl()}
        alt="Logo"
        className="cursor-pointer"
        object-fit="cover"
        width={220}
        height={100}
        src="/images/logo.png"
      />
    </div>
  );
};

export default Logo;
