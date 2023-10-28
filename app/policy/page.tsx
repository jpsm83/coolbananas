import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
    nocache: true,
  },
};

const About = () => {
  return (
    <div>
      <div className="flex justify-center items-center">
        <Image
          alt="Recipe"
          src={"/images/bananas.png"}
          sizes="100vw"
          width={600}
          height={600}
          style={{
            width: "100%",
            height: "160px",
            objectFit: "cover",
          }}
          objectPosition="center"
        />
        <div className="absolute">
          <h1 className="text-3xl font-bold text-white">Privacy police</h1>
        </div>
      </div>
      <div className="flex flex-col gap-8 m-5 md:m-10 pb-5 md:pb-10">
        <h3 className="font-extrabold text-xl md:text-2xl bg-gray-100 mt-5 md:mt-10 text-center drop-shadow-md">
          1- INTRODUCTION
        </h3>
        <div className="text-justify">
          <p>
            Cool Bananas Recipy Library values your privacy and is committed to
            protecting your personal information. By using the website, you
            consent to these practices.
          </p>
        </div>

        <h3 className="font-extrabold text-xl md:text-2xl bg-gray-100 mt-5 md:mt-10 text-center drop-shadow-md">
          2- INFORMATION WE COLLECT
        </h3>
        <div className="text-justify">
          <ol className="list-decimal pl-5 md:pl-10">
            <li>
              {" "}
              Personal Information: When you create an account on our website
              collecting the following personal information:
              <ul className="list-disc pl-5 md:pl-10">
                {" "}
                <li>Full name</li> <li>Email address</li>{" "}
                <li>Profile picture</li>
              </ul>
            </li>
            <li>
              {" "}
              User-generated content, such as recipes, images, and comments, is
              stored and linked to your account on our website.
            </li>
            <li>
              {" "}
              Our website automatically collects certain information when you
              access it, including::
              <ul className="list-disc pl-5 md:pl-10">
                {" "}
                <li>
                  {" "}
                  Device information (e.g., device type, operating system){" "}
                </li>{" "}
                <li>Browser information (e.g., browser type, version)</li>{" "}
                <li>IP address</li> <li>Pages visited on our website</li>
              </ul>
            </li>
          </ol>
        </div>

        <h3 className="font-extrabold text-xl md:text-2xl bg-gray-100 mt-5 md:mt-10 text-center drop-shadow-md">
          3- HOW WE USE YOUR INFORMATION
        </h3>
        <div className="text-justify">
          <p>We use the information we collect for the following purposes:</p>
          <ul className="list-disc pl-5 md:pl-10">
            <li>
              {" "}
              Our account management process utilizes your personal information
              to manage your account, offer customer support, and ensure the
              smooth operation of our website.
            </li>
            <li>
              {" "}
              Our website allows users to share recipes and comments, promoting
              engagement and sharing of user-generated content.
            </li>
            <li>
              {" "}
              Email addresses may be used for communication purposes, including
              notifications about account updates and website updates, with the
              option to opt out of promotional emails.
            </li>
          </ul>
        </div>

        <h3 className="font-extrabold text-xl md:text-2xl bg-gray-100 mt-5 md:mt-10 text-center drop-shadow-md">
          4- DATA SHARING
        </h3>
        <div className="text-justify">
          <ul className="list-disc pl-5 md:pl-10">
            <li>
              {" "}
              Your user-generated content, including recipes and comments, may
              be visible to other users of Cool Bananas Recipy Library.
            </li>
            <li>
              {" "}
              Third-party services may be used for analytics, advertising, and
              website functionality, and may collect and process data in
              accordance with their own privacy policies.
            </li>
          </ul>
        </div>

        <h3 className="font-extrabold text-xl md:text-2xl bg-gray-100 mt-5 md:mt-10 text-center drop-shadow-md">
          5- COOKIES AND TRACKING TECHNOLOGIES
        </h3>
        <div className="text-justify">
          <p>
            Cookies and tracking technologies are utilized to improve user
            experience, personalize content, and gather analytics data, with
            browser settings allowing control or blocking of cookies.
          </p>
        </div>

        <h3 className="font-extrabold text-xl md:text-2xl bg-gray-100 mt-5 md:mt-10 text-center drop-shadow-md">
          6- DATA SECURITY
        </h3>
        <div className="text-justify">
          <p>
            We are dedicated to protecting your personal information through
            robust security measures, but cannot guarantee absolute security.
            Please use strong, unique passwords and take responsibility for your
            account.
          </p>
        </div>

        <h3 className="font-extrabold text-xl md:text-2xl bg-gray-100 mt-5 md:mt-10 text-center drop-shadow-md">
          7- CHILDREN&apos;S PRIVACY
        </h3>
        <div className="text-justify">
          <p>
            Your Recipe Sharing Website is not designed for users under 13, and
            we do not knowingly collect child-related information. If you
            suspect unintentional collection, please contact us.
          </p>
        </div>

        <h3 className="font-extrabold text-xl md:text-2xl bg-gray-100 mt-5 md:mt-10 text-center drop-shadow-md">
          8- CHANGES TO THIS PRIVACY POLICY
        </h3>
        <div className="text-justify">
          <p>
            This Privacy Policy may be updated to reflect changes in data
            handling practices and legal requirements, and we encourage regular
            review.
          </p>
        </div>

        <h3 className="font-extrabold text-xl md:text-2xl bg-gray-100 mt-5 md:mt-10 text-center drop-shadow-md">
          9- CONTACT US
        </h3>
        <div className="text-justify">
          <p>
            If you have any questions or concerns about our Privacy Policy,
            please contact us at jpsm83@hotmail.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
