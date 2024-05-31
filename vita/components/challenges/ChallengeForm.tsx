'use client';
import { AddPhotoAlternateOutlined } from "@mui/icons-material";
import Image from "next/image";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import React from "react";
import Swal from 'sweetalert2';
import axios from "axios";
import { useRouter } from "next/navigation";

const ChallengeForm = () => {
  const router = useRouter();
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      description: "",
      imageUrl: null,
    },
  });

  const handlePublish: SubmitHandler<FieldValues> = async (data) => {
    try {
      const challengeForm = new FormData();
      challengeForm.append("description", data.description);

      if (data.imageUrl && data.imageUrl[0]) {
        challengeForm.append("imageUrl", data.imageUrl[0]);
      }
      await axios.post("/api/monthlyChallenge", challengeForm);

      router.refresh(); 
      router.push("/home/challenge")

      Swal.fire({
        title: 'Éxito',
        text: 'Se ha subido la respuesta con éxito acuerdate de evaluar 5 compañeros más para ganar más puntos',
        icon: 'success',
        confirmButtonText: 'OK'
      });

    } catch (err) {
      console.log(err);
      Swal.fire({
        title: 'Error',
        text: "Ocurrió un error al subir la respuesta",
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <form className="flex flex-col gap-7 pb-24" onSubmit={handleSubmit(handlePublish)}>
      <label htmlFor="photo" className="flex gap-4 items-center text-black cursor-pointer">
        {watch("imageUrl") ? (
          typeof watch("imageUrl") === "string" ? (
            <Image
              src={watch("imageUrl") || "assets/default-image.jpg"}
              alt="post"
              width={250}
              height={200}
              className="object-cover rounded-lg"
            />
          ) : (
            <Image
              src={URL.createObjectURL(watch("imageUrl")[0])}
              alt="post"
              width={250}
              height={200}
              className="object-cover rounded-lg "
            />
          )
        ) : (
          <AddPhotoAlternateOutlined sx={{ fontSize: "100px", color: "blue" }} />
        )}
        <p>Agregar una Foto</p>
      </label>
      <input
        {...register("imageUrl", {
          validate: (value) => {
            if (
              !value ||
              (Array.isArray(value) && value.length === 0) ||
              value === undefined
            ) {
              return "La fotografía es requerida!";
            }
            return true;
          },
        })}
        id="photo"
        type="file"
        style={{ display: "none" }}
      />

      {errors.imageUrl && (
        <p className="text-red-500">{errors.imageUrl.message}</p>
      )}

      <div>
        <label htmlFor="description" className="text-black">
          Descripción 
        </label>
        <textarea
          {...register("description", {
            required: "La descripción es requerida",
            validate: (value) => {
              if (value.length < 3) {
                return "La descripción debe tener al menos 3 caracteres";
              }
            },
          })}
          rows={3}
          placeholder="¿Qué piensas?"
          className="w-full bg-input-home p-2.5 rounded-lg border-none 
          focus:outline-none mt-3 text-black resize-none text-2xl"
          id="description"
        />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div className="flex lg:justify-center lg:items-center ml-2 mb-6">
        <button
          type="submit"
          className="rounded-full mt-2 text-2xl py-2 bg-button-home w-60 text-white"
        >
          Subir Reto
        </button>
      </div>
    </form>
  );
};

export default ChallengeForm;
