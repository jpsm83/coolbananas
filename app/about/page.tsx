import { Metadata } from "next";
import Image from "next/image";
import {
  GrFacebook,
  GrInstagram,
  GrPinterest,
  GrYoutube,
} from "react-icons/gr";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
    nocache: true,
  },
};

const AboutPage = () => {
  return (
    <div>
      <div className="flex justify-center items-center">
        <Image
          alt="Recipe"
          src={"/images/bananas.png"}
          width={600}
          height={600}
          style={{
            width: "100%",
            height: "160px",
            objectFit: "cover",
          }}
        />
        <div className="absolute">
          <h1 className="text-3xl font-bold text-white">About us</h1>
        </div>
      </div>
      <div className="flex flex-col gap-8 m-5 md:m-10">
        <div className="bg-orange-50 p-5 md:p-10 text-justify">
          <p>
            Welcome to Cool Bananas recipes library, your go-to source for
            delicious and diverse recipes from around the world. We are
            passionate about cooking and sharing culinary experiences that bring
            people together. This is your global culinary platform for food
            enthusiasts, connecting and sharing recipes from diverse cultures
            around the globe. It serves as a digital kitchen for global culinary
            exploration.
          </p>
        </div>

        <div className="text-justify">
          <h3 className="font-bold text-lg drop-shadow-md">Our mission</h3>
          <p>
            Our mission is to inspire home cooks of all levels to explore new
            flavors, try exciting recipes, and create memorable meals for family
            and friends. Whether you&apos;re a seasoned chef or just getting
            started in the kitchen, we have something for everyone. We aims to
            foster a virtual culinary paradise, fostering cultural exchange and
            appreciation for the diverse global cuisine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-12">
          <p className="bg-gray-100 p-5 md:p-10 text-center font-bold drop-shadow-md">
            Cool Bananas recipe lybrary allows users to discover and share
            authentic recipes from various countries, fostering culinary
            creativity and sharing traditional or modern dishes.
          </p>

          <p className="bg-gray-100 p-5 md:p-10 text-center font-bold drop-shadow-md">
            Join a community of foodies who offer feedback, tips, and insights
            on your culinary creations, share experiences, ask questions, and
            learn from each other.
          </p>

          <p className="bg-gray-100 p-5 md:p-10 text-center font-bold drop-shadow-md">
            Discover valuable cooking tips and techniques for both experienced
            and novice chefs to enhance culinary skills and explore new flavors.
          </p>

          <p className="bg-gray-100 p-5 md:p-10 text-center font-bold drop-shadow-md">
            Discover an endless source of culinary inspiration, from delicious
            street food to gourmet meals, to satisfy your taste buds.
          </p>
        </div>

        <div className="bg-orange-50 p-5 md:p-10 text-justify">
          <h3 className="font-bold text-lg drop-shadow-md">
            Join our culinary journey now
          </h3>
          <p>
            Explore our shared collection of recipes, cooking tips, and culinary
            adventures. Join our community, share your own recipes, and
            let&apos;s embark on a journey to discover the joy of cooking. This
            is an adventure platform for home cooks, professional chefs, and
            food enthusiasts. It celebrates shared human experiences through
            food, allowing users to share recipes and explore the world one dish
            at a time.
          </p>
        </div>

        <div className="px-5 md:px-10 text-center">
          <h3 className="font-bold text-lg"> Contact us</h3>
          <p>
            Cool Bananas welcomes its community members to share ideas,
            questions, and feedback. Their passion for improving the platform is
            evident, and their contact information is provided for easy
            communication. Fell free to connect with us on our social media
            platforms for the latest updates or send us a message trought our
            email.
          </p>

          <div className="py-8 font-bold">
            <a
              href="mailto:jpsm83@hotmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              jpsm83@hotmail.com
            </a>
          </div>

          <div className="flex flex-row justify-center gap-8 md:gap-12">
            <a href="https:/www.facebook.com" target="_blank">
              <GrFacebook size={30} />
            </a>
            <a href="https:/www.instagram.com" target="_blank">
              <GrInstagram size={30} />
            </a>
            <a href="https:/www.pinterest.com" target="_blank">
              <GrPinterest size={30} />
            </a>
            <a href="https:/www.youtube.com" target="_blank">
              <GrYoutube size={30} />
            </a>
          </div>
        </div>

        <div className="text-justify mt-5 md:mt-10">
          <h3 className="font-bold text-lg drop-shadow-md">
            Third parts acknowledgments and credits
          </h3>
          <p>
            The Cool Bananas Recipy Library utilizes external resources and
            expresses gratitude for their services on our journey.
          </p>
          <ul className="list-disc pl-5 md:pl-10">
            <li>
              Gencraft - AI images provider -{" "}
              <a
                href="https://www.gencraft.com"
                target="_blank"
                className="underline"
              >
                Learn more
              </a>
            </li>
            <li>
              Openart - AI images provider -{" "}
              <a
                href="https://openart.ai/"
                target="_blank"
                className="underline"
              >
                Learn more
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
