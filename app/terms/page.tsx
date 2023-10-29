import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
    nocache: true,
  },
};

const TermsPage = () => {
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
          <h1 className="text-3xl font-bold text-white">Terms of service</h1>
        </div>
      </div>
      <div className="flex flex-col gap-8 m-5 md:m-10 pb-5 md:pb-10">
        <div className="bg-orange-50 p-5 md:p-10 text-center">
          <p>
            Cool Bananas recipe library appreciates your patronage and
            encourages you to read their Terms of Service before engaging with
            our website. Please read this agreement carefully. This agreement is
            a legal contract between you and Cool Bananas website.
          </p>
        </div>

        <div className="text-center">
          <p>
            This agreement requires users to access and use websites,
            applications, register accounts, and access services through
            authorized links. By doing so, users agree to be bound by the
            agreement and any future amendments, represent their legal age to
            form a binding contract, and have the authority to enter into the
            agreement personally or on behalf of a company or entity.
          </p>
          <p>
            The Services are subject to Supplemental Terms, which are
            incorporated into this Agreement. Certain specialized features and
            tools are provided by third-party companies with their own terms of
            service, governing relationships with these providers.
          </p>
          <p>
            The Company reserves the right to modify this Agreement or its
            policies, and continued use of the Services after any changes
            constitutes your agreement to such changes.
          </p>
        </div>

        <h3 className="font-extrabold text-xl md:text-2xl bg-gray-100 mt-5 md:mt-10 text-center drop-shadow-md">
          1- REGISTRATION
        </h3>

        <div className="text-justify">
          <h3 className="font-bold text-md md:text-lg drop-shadow-md">
            1- Registration data
          </h3>
          <p>
            To register for Services, provide accurate, current, and complete
            Registration Data, and promptly update it if necessary. You cannot
            register if barred or suspended from using the Services. Maintain
            one Account for the same service at a time and be responsible for
            all activities. Do not share your Account or password with anyone
            and notify the Company of any unauthorized use or security breach.
          </p>
        </div>

        <div className="text-justify">
          <h3 className="font-bold text-md md:text-lg drop-shadow-md">
            1.2- Subscriptions
          </h3>
          <p>
            To register for Services, provide accurate, current, and complete
            Registration Data, and promptly update it if necessary. You cannot
            register if barred or suspended from using the Services. Maintain
            one Account for the same service at a time and be responsible for
            all activities. Do not share your Account or password with anyone
            and notify the Company of any unauthorized use or security breach.
          </p>
        </div>

        <div className="text-justify">
          <h3 className="font-bold text-md md:text-lg drop-shadow-md">
            1.3- Sponsored affiliate content
          </h3>
          <p>
            The Services may contain links to third-party websites, for which
            the Company may receive compensation. By clicking on these links,
            you are leaving Company Property and visiting a website not
            controlled by us.
          </p>
        </div>

        <div className="text-justify">
          <h3 className="font-bold text-md md:text-lg drop-shadow-md">
            1.4- Lead generation
          </h3>
          <p>
            The Services may allow third-party suppliers to contact users for
            specific services. By providing contact information, users consent
            to these contacts, and the Services have no responsibility or
            liability for products, work estimates, or third-party services.
          </p>
        </div>

        <div className="text-justify">
          <h3 className="font-bold text-md md:text-lg drop-shadow-md">
            1.5- Removal of accounts
          </h3>
          <p>
            The company reserves the right to remove or reclaim usernames at any
            time, and all rights to your account are owned by the company.
          </p>
        </div>

        <div className="text-justify">
          <h3 className="font-bold text-md md:text-lg drop-shadow-md">
            1.6- Company&apos;s privacy police
          </h3>
          <p>
            The Company&apos;s Privacy Policy outlines its policies regarding
            the privacy of Registration Data and other data provided by the user
            or collected by the Company.
          </p>
        </div>

        <div className="text-justify">
          <h3 className="font-bold text-md md:text-lg drop-shadow-md">
            1.7- Content sharing and promotion
          </h3>
          <p>
            All content shared on Cool Bananas, including but not limited to
            recipes, images, articles, and comments, can be used to promote the
            website without any charge or request for consent from the creators.
            By posting content on our website, you grant us the non-exclusive,
            royalty-free right to use, reproduce, modify, adapt, publish,
            distribute, and display the content for promotional purposes on our
            website and any affiliated platforms for promotional purposes.
          </p>
        </div>

        <h3 className="font-extrabold text-xl md:text-2xl bg-gray-100 mt-5 md:mt-10 text-center drop-shadow-md">
          2- USER CONTENT
        </h3>

        <div className="text-justify">
          <h3 className="font-bold text-md md:text-lg drop-shadow-md">
            2.1- Responsible party for content
          </h3>
          <p>
            User content on the Services is the sole responsibility of the
            originator, including ideas, suggestions, documents, and proposals.
            The Company has no obligation to pre-screen or remove content, and
            users are responsible for using it at their own risk. The Company
            reserves the right to remove content that violates this Agreement or
            is objectionable, and to disclose information to comply with laws,
            regulations, or government requests.
          </p>
        </div>

        <div className="text-justify">
          <h3 className="font-bold text-md md:text-lg drop-shadow-md">
            2.2- Ownership of your content
          </h3>
          <p>
            The Company does not claim ownership of User Content on the
            Services, but users must grant the Company license as stated in
            Section 2.3, and agree not to have any rights to other content.
          </p>
        </div>

        <div className="text-justify">
          <h3 className="font-bold text-md md:text-lg drop-shadow-md">
            2.3- License to your content
          </h3>
          <p>
            When posting or submitting your content on the Services, you grant
            the Company, its agents, and authorized parties a royalty-free,
            irrevocable, non-exclusive, perpetual, worldwide license to use,
            copy, display, publicly perform, transmit, modify, publish,
            distribute, make derivative works of, sublicense, and exploit your
            content for any purpose. This includes exploiting proprietary rights
            and waives any moral rights. You will not receive compensation for
            using your content. Other users may search for, see, use, modify,
            and reproduce your content in public areas of the Services.
          </p>
        </div>

        <div className="text-justify">
          <h3 className="font-bold text-md md:text-lg drop-shadow-md">
            2.4- Ratings and reviews
          </h3>
          <p>
            Users&apos; ratings and reviews on our Services are not endorsed by
            the Company and do not represent its views. The Company does not
            assume liability for ratings or economic loss. Users must base
            ratings on their first-hand experience, avoid providing reviews for
            businesses with economic interests, do not submit reviews in
            exchange for payment, and comply with the terms of the Agreement. If
            deemed to diminish the integrity, the Company may exclude, prohibit,
            or remove user content without notice.
          </p>
        </div>

        <div className="text-justify">
          <h3 className="font-bold text-md md:text-lg drop-shadow-md">
            2.5- Restrictions on user conduct
          </h3>
          <p>
            This agreement states that users must not use the Services for any
            purpose prohibited by law or this Agreement. Users must not use the
            Services for any content that infringes on any rights, is unlawful,
            threatening, abusive, defamatory, invasive of privacy, or violates
            rules. Users are responsible for their own content and consequences.
            This includes not engaging in commercial activities without written
            consent, impersonating others, or violating rules.
          </p>
        </div>

        <h3 className="font-extrabold text-xl md:text-2xl bg-gray-100 mt-5 md:mt-10 text-center drop-shadow-md">
          3- OWNERSHIP OF AND LICENSED TO USE COMPANY SERVICE
        </h3>

        <div className="text-justify">
          <h3 className="font-bold text-md md:text-lg drop-shadow-md">
            3.1- Use of the service
          </h3>
          <p>
            The Company and its suppliers own or license the rights to the
            Services, which are protected by copyright and intellectual property
            laws worldwide. The user is granted a limited license for personal
            non-commercial use, with all rights reserved.
          </p>
        </div>

        <div className="text-justify">
          <h3 className="font-bold text-md md:text-lg drop-shadow-md">
            3.2- Trademarks
          </h3>
          <p>
            The Company&apos;s stylized name, trademarks, graphics, logos,
            service marks, and trade names are its property and may not be used
            without permission with third-party products or services. Users are
            prohibited from removing, altering, or obscuring these rights
            notices.
          </p>
        </div>

        <div className="text-justify">
          <h3 className="font-bold text-md md:text-lg drop-shadow-md">
            3.3- Restrictions on use of service
          </h3>
          <p>
            This agreement outlines the terms and conditions for using the
            Services. It prohibits commercial exploitation of the Services,
            framing techniques to enclose trademarks or logos, using metatags or
            hidden text, modifying, translating, adapting, merging, making
            derivative works or services of any part of the Services, using
            manual or automated software to scrape, harvest, or download data
            from the Services, using data from the Services for software program
            development, accessing the Services to build a similar or
            competitive website, application, or service, copying, reproducing,
            distributed, republished, downloaded, displayed, posted, or
            transmitted in any form or by any means, removing or destroying
            copyright notices or other proprietary markings, using the Services
            in violation of any applicable law, attempting to gain unauthorized
            access to other computer systems through the Services, interfering
            with the proper functioning of the Services, or attempting to harm
            the Services. Any unauthorized use of the Services immediately
            terminates the licenses granted by the Company pursuant to this
            Agreement. The agreement also states that users must not attempt to
            gain unauthorized access to other computer systems through the
            Services, interfere with the proper functioning of the Services, or
            attempt to harm the Services in any way that could interfere with
            any party&apos;s use or enjoyment of the Services.
          </p>
        </div>

        <div className="text-justify">
          <h3 className="font-bold text-md md:text-lg drop-shadow-md">
            3.4- Third party links
          </h3>
          <p>
            The Services may contain links to third-party services, but the
            Company does not control or be responsible for these links. They are
            provided as a convenience and users use them at their own risk,
            without warning or warning about leaving the Services.
          </p>
        </div>

        <div className="text-justify">
          <h3 className="font-bold text-md md:text-lg drop-shadow-md">
            3.5- Embedded video links
          </h3>
          <p>
            The Services offer the functionality to embed videos on other
            websites or blog pages, along with the Player. This is done by
            providing the necessary HTML code to include on the page. The actual
            video stream is served from the company&apos;s servers, but the
            embedded video may be rendered to the visitor. Users must not alter
            the Embedded Video, facilitate access through any other tool, and
            use it for commercial purposes, provided it is not part of a service
            that sells access to video content, used for software program
            development, or contains advertising or promotional messages. Users
            must not block or disable the Player, and all metrics related to
            access and viewing must be credited to the website.
          </p>
        </div>

        <h3 className="font-extrabold text-xl md:text-2xl bg-gray-100 mt-5 md:mt-10 text-center drop-shadow-md">
          4- INDEMNIFICATION AND LIMITATION OF LIABILITY
        </h3>

        <div className="text-justify">
          <h3 className="font-bold text-md md:text-lg drop-shadow-md">
            4.1- Indemnification
          </h3>
          <p>
            You agree to indemnify and hold Company, its parent, subsidiaries,
            affiliates, and their officers, directors, employees, agents,
            representatives, partners, suppliers, and licensors harmless from
            damages, losses, costs, liabilities, and expenses related to claims
            of third-party rights violation, misuse of Services, violation of
            this Agreement, rights of other parties, or violations of laws.
          </p>
        </div>

        <div className="text-justify">
          <h3 className="font-bold text-md md:text-lg drop-shadow-md">
            4.2- Disclaimer of warranties and condictions
          </h3>
          <p>
            The company acknowledges that the use of its services and products
            is at the user&apos;s sole risk and are provided on an &quot;as
            is&quot; and &quot;as available&quot; basis. The company disclaims
            all warranties, representations, and conditions, including those
            regarding availability, accuracy, timeliness, ms-delivery, and
            non-infringement. The company also assumes no responsibility for the
            timely delivery, deletion, ms-delivery, or failure to store any
            content, user communications, or personalization settings. The
            company makes no warranty that the services will meet user
            requirements or that the use will be uninterrupted, timely, secure,
            or error-free. The company and its users are not engaged in
            recommending legal, medical, counseling, or other professional
            services or advice. The company advises users to seek professional
            advice on the evaluation of specific information, options, advice,
            or other content. Certain state laws do not allow limitations on
            implied warranties, and some or all of the aforementioned
            disclaimers, exclusions, and limitations may not apply to the user,
            and they may have additional rights.
          </p>
        </div>

        <div className="text-justify">
          <h3 className="font-bold text-md md:text-lg drop-shadow-md">
            4.3- Disclaimer of certain damages
          </h3>
          <p>
            The company is not liable for any loss of profits, revenue,
            indirect, consequential, special, or consequential damages, or costs
            due to data loss, production, use, or business interruption.
          </p>
        </div>

        <div className="text-justify">
          <h3 className="font-bold text-md md:text-lg drop-shadow-md">
            4.4- Cap on liability
          </h3>
          <p>
            The aggregate liability of company parties to you cannot exceed the
            actual amount paid within a twelve-month period prior to the act or
            event giving rise to such liability, nor does it apply to liability
            for death, property damage, or personal injury.
          </p>
        </div>

        <div className="text-justify">
          <h3 className="font-bold text-md md:text-lg drop-shadow-md">
            4.5- Basis of the bargain
          </h3>
          <p>
            The limitations of damages mentioned are fundamental elements of the
            basis of the agreement between the company and you regarding your
            access to and use of the services.
          </p>
        </div>

        <div className="text-justify">
          <h3 className="font-bold text-md md:text-lg drop-shadow-md">
            4.6- Exclusions
          </h3>
          <p>
            Some states&apos; laws may not allow for the exclusion or limitation
            of certain damages, so the aforementioned warranties, exclusions,
            and limitations may not apply to you.
          </p>
        </div>

        <div className="text-justify">
          <h3 className="font-bold text-md md:text-lg drop-shadow-md">
            4.7- Survival
          </h3>
          <p>
            This section&apos;s provisions will remain in effect even after the
            termination of your Account, this Agreement, or access to the
            Services.
          </p>
        </div>

        <h3 className="font-extrabold text-xl md:text-2xl bg-gray-100 mt-5 md:mt-10 text-center drop-shadow-md">
          5- GENERAL PROVISIONS
        </h3>

        <div className="text-justify">
          <h3 className="font-bold text-md md:text-lg drop-shadow-md">
            5.1- Disclaimer
          </h3>
          <p>
            The Services provide information on an &quot;as is&quot; basis, with
            no guarantees for accuracy or quality. Users are responsible for
            verifying the information for personal use and not for any errors or
            omissions.
          </p>
        </div>

        <div className="text-justify">
          <h3 className="font-bold text-md md:text-lg drop-shadow-md">
            5.2- Termination
          </h3>
          <p>
            The Company reserves the right to modify, suspend, or discontinue
            the Services at its discretion, without notice or liability, and may
            also take legal action, including civil, criminal, or injunctive
            redress.
          </p>
        </div>

        <div className="text-justify">
          <h3 className="font-bold text-md md:text-lg drop-shadow-md">
            5.3- Procedure for making claims of copyright infrigment
          </h3>
          <p>
            If you believe content on the Services infringes your copyright, you
            must provide the Copyright Agent with the following information:
          </p>
          <ol className="list-decimal pl-5 md:pl-10">
            <li>
              an electronic or physical signature of the person authorized to
              act on behalf of the copyright owner;
            </li>
            <li>a description of the infringing work;</li>
            <li>a description of the location of the material;</li>
            <li>your address, telephone number, and email address;</li>
            <li>
              a written statement that you have a good faith belief that the
              disputed use is not authorized by the copyright owner, its agent,
              or the law; and
            </li>
            <li>
              a statement that the information in your notice is accurate and
              you are the copyright owner or authorized to act on the copyright
              owner&apos;s behalf.
            </li>
          </ol>
        </div>

        <div className="text-justify">
          <h3 className="font-bold text-md md:text-lg drop-shadow-md">
            5.4- Eletronic communications
          </h3>
          <p>
            You consent to electronic communications with the Company, including
            visits, emails, and notices. Electronic communications have the same
            legal effect as written ones, and your statutory rights remain
            unaffected. This includes terms and conditions, agreements, and
            documents.
          </p>
        </div>

        <div className="text-justify">
          <h3 className="font-bold text-md md:text-lg drop-shadow-md">
            5.5- Notice
          </h3>
          <p>
            You must provide your current email address for Company to receive
            notices and other purposes. If your last email is invalid or not
            capable of delivering necessary notices, Company&apos;s dispatch of
            the email will be effective. You can send notice to Dotdash Media
            Inc. at their address.
          </p>
        </div>

        <div className="text-justify">
          <h3 className="font-bold text-md md:text-lg drop-shadow-md">
            5.6- Entire agreement
          </h3>
          <p>
            This agreement is the final, complete, and exclusive agreement
            between the parties regarding the subject matter. Any waiver or
            failure to enforce any provision will not be deemed a waiver of any
            other provision. If any portion is invalid or unenforceable, it will
            be interpreted to reflect the original intention of the parties. The
            Company is not liable for delays or failures due to causes outside
            its control, such as acts of God, war, terrorism, or pandemics. The
            Agreement and your rights cannot be assigned, subcontracted,
            delegated, or transferred without Company&apos;s prior written
            consent. Any attempted assignment or transfer will be null and void.
          </p>
        </div>

        <div className="text-justify">
          <h3 className="font-bold text-md md:text-lg drop-shadow-md">
            5.7- Question, complaints, claims and permissions
          </h3>
          <p>
            For any inquiries, complaints, or claims regarding the Services,
            please contact our customer service department. For usage or
            permission requests, email jpsm83@hotmail.com
          </p>
        </div>

        <div className="text-justify">
          <h3 className="font-bold text-md md:text-lg drop-shadow-md">
            5.8- US - California consumer complaints
          </h3>
          <p>
            In accordance with California Civil Code §1789.3, you may report
            complaints to the Complaint Assistance Unit of the Division of
            Consumer Services of the California Department of Consumer Affairs
            by contacting them in writing at 400 R Street, Sacramento, CA 95814,
            or by telephone at (800) 952-5210.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
