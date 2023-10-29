"use client";

import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useEditUserModal from "@/app/hooks/useEditUser";
import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import { SafeUser } from "@/app/types";

interface EditUserModalProps {
  currentUser?: SafeUser | null | undefined;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ currentUser }) => {
  const editUserModal = useEditUserModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      email: currentUser?.email,
      image: currentUser?.image,
      password: "",
      password2: "",
    },
  });

  const name = watch("name");
  const email = watch("email");
  const image = watch("image");
  const password = watch("password");
  const password2 = watch("password2");

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

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (password === password2) {
      try {
        setIsLoading(true);
        await axios
          .put(`/api/users/${currentUser?.id}`, data)
          .then((response) => {
            console.log(response.data);
            toast.success("User Updated!");
            editUserModal.onClose();
          })
          .catch((error) => {
            console.log(error);
            toast.error("Something went wrong!");
          })
          .finally(() => {
            setIsLoading(false);
          });
      } catch (error) {
        console.error(error);
      }
    } else {
      toast.error("Passwords are not the same!");
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Edit and update chef's details"
        subtitle="Update user info"
      />
      <Input
        id="name"
        label="Name"
        value={name}
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        onClick={() => handleTypeClick("name", name)}
      />
      <Input
        id="email"
        label="Email"
        value={email}
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        onClick={() => handleTypeClick("email", email)}
      />
      <Input
        id="image"
        label="Image"
        value={image}
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        onClick={() => handleTypeClick("image", image)}
      />
      <Input
        id="password"
        label="Password"
        value={password}
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        onClick={() => handleTypeClick("password", password)}
      />
      <Input
        id="password2"
        label="Repeat your Password"
        value={password2}
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        onClick={() => handleTypeClick("password2", password2)}
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={editUserModal.isOpen}
      title="Edit User"
      actionLabel="Continue"
      onClose={editUserModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default EditUserModal;
