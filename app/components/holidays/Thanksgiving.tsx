"user client";

const Thanksgiving = () => {
  return (
    <div className="flex justify-center align-middle items-center h-auto md:h-[280px] w-full">
      <div className="relative w-full h-full">
        <div
          className="absolute w-full h-full"
          style={{
            backgroundImage: `url("/images/thanksgiving.jpg")`,
            backgroundRepeat: "repeat",
            backgroundPosition: "center",
            backgroundSize: "240px 240px",
          }}
        ></div>
        <div
          className="absolute w-full h-full"
          style={{
            background: "linear-gradient(to right, transparent 20%, black)",
          }}
        ></div>
      </div>
      <video
        autoPlay
        muted
        loop
        className="w-full h-auto md:w-auto md:h-[280px] object-cover"
      >
        <source src="/videos/Video_Intro.mp4" type="video/mp4" />
      </video>
      <div className="relative w-full h-full">
        <div
          className="absolute w-full h-full"
          style={{
            backgroundImage: `url("/images/thanksgiving.jpg")`,
            backgroundRepeat: "repeat",
            backgroundPosition: "center",
            backgroundSize: "240px 240px",
          }}
        ></div>
        <div
          className="absolute w-full h-full"
          style={{
            background: "linear-gradient(to left, transparent 20%, black)",
          }}
        ></div>
      </div>
    </div>
  );
};
export default Thanksgiving;
