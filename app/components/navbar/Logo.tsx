"use client";

import useFilters from "@/app/hooks/useFilters";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();
  const recipeFilters = useFilters();

  const redirectUrl = () => {
    router.push("/" + recipeFilters.url);
  };

  return (
      <Image
        onClick={() => redirectUrl()}
        alt="Logo"
        className="cursor-pointer"
        style={{
          objectFit: "cover",
        }}
        width={220}
        height={220}
        src="/images/logo.png"
      />
  );
};

export default Logo;
