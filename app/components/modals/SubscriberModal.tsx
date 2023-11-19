"use client";

import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import Heading from "../Heading";
import useSubscriberModal from "@/app/hooks/useSubscriberModal";
import axios from "axios";
import Input from "../inputs/Input";

const SubscriberModal = () => {
  const subscriberModal = useSubscriberModal();

  const { register, handleSubmit, setValue, watch } = useForm<FieldValues>({
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
      const response = await axios.post("/api/subscribers", formData);
      toast.success("Email subscribed");
      subscriberModal.onClose();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Join our community."
        subtitle="Subscribe your email to get up to date on the world of flavors."
      />
      <Input
        id="email"
        type="text"
        label="Email"
        value={email}
        register={register}
        onClick={() => handleTypeClick("email", email)}
      />
    </div>
  );

  return (
    <Modal
      isOpen={subscriberModal.isOpen}
      title="Subscribe"
      actionLabel="Join NOW"
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel="Cancel"
      secondaryAction={subscriberModal.onClose}
      onClose={subscriberModal.onClose}
      body={bodyContent}
    />
  );
};

export default SubscriberModal;
