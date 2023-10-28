"use client";

import React from "react";
import Link from "next/link";
import useFilters from "@/app/hooks/useFilters";
import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();
  const recipeFilters = useFilters();

  const redirectUrl = () => {
    router.push('/' + recipeFilters.url);
  }

  return (
    <div className="bottom-0 w-full flex flex-row justify-center gap-2 md:gap-6 text-gray-500 text-sm flex-wrap py-4 bg-gray-100">
      <a className="hover:font-bold text-gray-800" onClick={() => redirectUrl()}>
        2023 Cool Bananas
      </a>
      <Link className="hover:font-bold text-gray-800" href="/about">
        About <span className="hidden md:inline">us</span>
      </Link>
      <Link className="hover:font-bold text-gray-800" href="/terms">
        Terms <span className="hidden md:inline">of service</span>
      </Link>
      <Link className="hover:font-bold text-gray-800" href="/policy">
        <span className="hidden md:inline">Privacy</span> Policy
      </Link>
    </div>
  );
};

export default Footer;