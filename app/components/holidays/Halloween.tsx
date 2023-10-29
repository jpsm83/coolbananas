import ClientOnly from "@/app/components/ClientOnly";
import Container from "../Container";
import Image from "next/image";

// const Halloween = () => {
//   return (
//     <ClientOnly>
//       <Container>
//         <div className="absoute">
//           <div className="relative flex flex-col items-center">
//             <div className="relative flex w-full">
//               <div
//                 className="absolute bg-repeat w-auto"
//                 style={{
//                   backgroundImage: `url("/images/halloween_background.webp")`,
//                   width: "100%",
//                   height: "100%",
//                   backgroundRepeat: "repeat",
//                   backgroundPosition: "center",
//                   backgroundSize: "120px 120px",
//                 }}
//               ></div>
//               <div className="relative z-10 flex flex-col items-center w-full">
//                 <Image
//                   alt="Recipe"
//                   src={"/images/halloween.png"}
//                   width={600}
//                   height={600}
//                   className="abolute top-0 w-auto aspect-[4/2] object-center object-cover overflow-hidden"
//                 />
//                 <p className="absolute top-5 text-3xl text-center text-white/30 w-full font-extrabold">
//                   Happy Spook Halloween
//                 </p>
//               </div>
//               <div
//                 className="absolute bg-repeat w-auto"
//                 style={{
//                   backgroundImage: `url("/images/halloween_background.webp")`,
//                   width: "100%",
//                   height: "100%",
//                   backgroundRepeat: "repeat",
//                   backgroundPosition: "center",
//                   backgroundSize: "120px 120px",
//                 }}
//               ></div>
//             </div>
//             <div className="absolute z-10 -bottom-16 flex flex-col items-center px-4">
//               <div className="drop-shadow-lg flex flex-col justify-center font-bold gap-4 h-50 border-2 border-b-0 py-4 px-2 border-orange-500 text-center text-white bg-white/20">
//                 <p className="drop-shadow-lg">
//                   WELCOME TO YOUR&apos;S RECIPE LIBRARY
//                 </p>
//                 <p className="text-sm drop-shadow-lg">
//                   Read, create, cook, eat, rate, share, review amazing recipes
//                 </p>
//               </div>
//               <div className="w-full drop-shadow-lg font-bold h-16 border-2 border-t-0 p-4 border-orange-500 text-center text-white bg-white">
//                 <p className="text-gray-800 font-bold">
//                   Let&apos;s add some taste to our life{" "}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Container>
//     </ClientOnly>
//   );
// };
// export default Halloween;

const Halloween = () => {
  return (
    <div
      className="relative bg-repeat w-full flex justify-center align-middle items-center"
      style={{
        backgroundImage: `url("/images/halloween_background.webp")`,
        width: "100%",
        height: "280px",
        backgroundRepeat: "repeat",
        backgroundPosition: "center",
        backgroundSize: "200px 200px",
      }}
    >
      <div className=" absolute flex align-middle justify-center">
        <div className="flex flex-col justify-center align-middle drop-shadow-xl gap-4 border-2 p-4 md:px-8 border-orange-500 text-center text-white bg-gray-900/50 m-4">
          <p className="text-xl md:text-3xl font-bold">
            WELCOME TO YOUR&apos;S RECIPE LIBRARY
          </p>
          <p className="md:text-xl">
            Read, create, cook, eat, rate, share, review amazing recipes
          </p>
          <p className="text-2xl">Let&apos;s add some taste to our life </p>
        </div>
      </div>
    </div>
  );
};
export default Halloween;
