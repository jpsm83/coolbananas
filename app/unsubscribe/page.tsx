"use client";

import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useSubscriberModal from "@/app/hooks/useSubscriberModal";
import axios from "axios";
import Input from "../components/inputs/Input";
import Image from "next/image";
import Button from "../components/Button";

const UnsubscribePage = () => {
  const subscriberModal = useSubscriberModal();

  const { register, setValue, handleSubmit, watch } = useForm<FieldValues>({
    defaultValues: {
      email: "",
    },
  });

  const email = watch("email");

  const setCustomValue = (field: string, value: any) => {
    setValue(field, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const handleTypeClick = (field: string, value: string) => {
    setCustomValue(field, [value]);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    const email = formData.email; // Access the email field from form data
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // @ts-ignore
    if (!emailRegex.test(email)) {
      toast.error("Invalid email address");
      return;
    }
    try {
      await axios.delete("/api/subscribers", { data: formData });
      toast.success("Email deleted");
      subscriberModal.onClose();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };
  
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
          <h1 className="text-3xl font-bold text-white">
            🥄 Don&apos;t Say Goodbye! Let&apos;s Keep It Tasty! 🌮
          </h1>
        </div>
      </div>
      <div className="flex flex-col gap-8 m-5 md:m-10">
        <div className="bg-orange-50 p-5 md:p-10 text-center">
          <p>
            Rumor has it you&apos;re considering an &quot;unsubscribe&quot;
            button breakup. 😢 Don&apos;t worry; we won&apos;t stage a foodie
            intervention. But hear us out before you take the leap!
          </p>
        </div>
      </div>

      <div className="px-5 md:px-10 text-center">
        <h3 className="font-bold text-lg">
          🌮 Tacos that tell a joke? We&apos;ve got &apos;em.
        </h3>
        <h3 className="font-bold text-lg pb-5 md:pb-10">
          🍦 Ice cream with attitude? Yup, that too!
        </h3>
        <p className="pb-5 md:pb-10">
          Unsubscribing is like leaving the party before the dessert table. 🎉
          But hey, life&apos;s a potluck, and we&apos;re just thrilled you
          brought your flavor!
        </p>
        <p className="pb-10 md:pb-20">
          If you ever crave a second helping of our culinary craziness,
          we&apos;ll leave the porch light on for you. 🚀 Come back whenever
          you&apos;re hungry for more laughs, recipes, and foodie shenanigans!
        </p>
        <div className="flex md:flex-row flex-col gap-5 w-50">
        <Input
          id="email"
          type="text"
          label="Email"
          value={email}
          register={register}
          onClick={() => handleTypeClick("email", email)}
        />
        <Button label="Unsubscribe" onClick={handleSubmit(onSubmit)} />
        </div>
      </div>
    </div>
  );
};

export default UnsubscribePage;
