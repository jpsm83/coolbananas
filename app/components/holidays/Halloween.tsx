"user client";

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
