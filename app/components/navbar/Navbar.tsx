"use client";

import Logo from "./Logo";
import UserMenu from "./UserMenu";
import { SafeUser } from "@/app/types";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className="">
      <div className="py-4 px-4 md:px-10">
          <div className="flex flex-row items-center justify-between">
            <Logo />
            <UserMenu currentUser={currentUser} />
          </div>
      </div>
      <hr />
    </div>
  );
};

export default Navbar;
