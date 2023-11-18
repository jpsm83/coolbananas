import ClientOnly from "./components/ClientOnly";
import ToasterProvider from "@/app/providers/ToasterProvider";
import RegisterModal from "./components/modals/RegisterModal";
import Navbar from "./components/navbar/Navbar";
import "./globals.css";
import LoginModal from "./components/modals/LoginModal";
import EditUserModal from "./components/modals/EditUserModal";
import getCurrentUser from "./actions/getCurrentUser";
import RecipeModalCreate from "./components/modals/RecipeModalCreate";
import { Metadata } from "next";
import DeleteModal from "./components/modals/DeleteModal";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("http://https://coolbananas.org/"),
  title: {
    default: "Cool Bananas",
    template: `%s | Cool Bananas`,
  },
  description: "Cool Bananas Recipes Library",
  verification: {
    google: "google-site-verification-yourVerificationId",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en" className="!scroll-smooth">
      <meta name="p:domain_verify" content="634a90b6542f23249ac6bc2fc46348d2" />
      <body>
        <ClientOnly>
          <ToasterProvider />
          <RecipeModalCreate currentUser={currentUser} />
          <LoginModal />
          <RegisterModal />
          <DeleteModal currentUser={currentUser} />
          <EditUserModal currentUser={currentUser} />
          <div className="fixed top-0 bg-white w-full z-30">
            <Navbar currentUser={currentUser} />
          </div>
          <div className="flex flex-col justify-between w-full min-h-full pt-[82px] md:pt-[77px]">
            {children}
            <Footer />
          </div>
        </ClientOnly>
      </body>
    </html>
  );
}
