'use client';
import { AddPhotoAlternateOutlined } from "@mui/icons-material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import React from "react";
const CreatePost = () => {
  
  const postData = {
    creatorId: "",
    caption: "",
    tag: "",
    postPhoto: null,
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: postData,
  });

  return (
    <>
      <div className="pt-6">
        <form className="flex flex-col gap-7 pb-24">
          <label
            htmlFor="photo"
            className="flex gap-4 items-center text-light-1 cursor-pointer"
          > 
            {watch("postPhoto") ? (
              typeof watch("postPhoto") === "string" ? (
                <Image
                  src={watch("postPhoto") || "assets/default-image.jpg"}
                  alt="post"
                  width={250}
                  height={200}
                  className="object-cover rounded-lg"
                />
              ) : (
                <Image
                  src={URL.createObjectURL(watch("postPhoto")[0])}
                  alt="post"
                  width={250}
                  height={200}
                  className="object-cover rounded-lg"
                />
              )
            ) : (
              <AddPhotoAlternateOutlined
                sx={{ fontSize: "100px", color: "white" }}
              />
            )}
           
            <p> Agregar una Foto </p>
          </label>
          <input 
          {...register("postPhoto", {
            validate: (value) => {
              if (
                typeof value === null ||
                (Array.isArray(value) && (value as any[]).length === 0) ||
                value === undefined
              ) {
                return "La fotografía es requerida !";
              }
              return true;
            },
          })}
           id="photo"  type="file" style={{display:"none"}}/>

        <div>
          <label htmlFor="caption" className="text-light-1">
            Tema
          </label>
          <textarea
            {...register("caption", {
              required: "El temas es requerido ",
              validate: (value) => {
                if (value.length < 3) {
                  return "El tema debe tener al menos 2 caracteres";
                }
              },
            })}
           
            rows={3}
            placeholder="¿Qué piensas?"
            className="w-full bg-dark-1 p-2.5 rounded-lg border-none focus:outline-none mt-3 text-light-1"
            id="caption"
          />
        </div>

        <div>
        <label htmlFor="tag" className="text-light-1">
          Tag
        </label>
        <input
          {...register("tag", { required: "Etiqueta es requerida" })}
          type="text"
          placeholder="#etiqueta"
          className="w-full bg-dark-1 p-2.5 rounded-lg border-none focus:outline-none mt-3 text-light-1"
        />

      </div>

      <button
        type="submit"
        className="py-2.5 rounded-lg mt-10 bg-purple-1 hover:bg-pink-1 text-light-1"
      >
        Publicar
      </button>

        </form> 
      </div>
    </>
  );
};

export default CreatePost;
