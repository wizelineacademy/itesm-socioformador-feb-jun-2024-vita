'use client';
import { AddPhotoAlternateOutlined } from "@mui/icons-material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm,  SubmitHandler, FieldValues,} from "react-hook-form";
import React from "react";
import Swal from 'sweetalert2';
import axios from  "axios"

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

  const router = useRouter();

  const handlePublish: SubmitHandler<FieldValues> = async (data) => {
    try {
      const postForm = new FormData();

      postForm.append("creatorId", data.creatorId);
      postForm.append("caption", data.caption);
      postForm.append("tag", data.tag);

      if (typeof data.postPhoto !== "string") {
        postForm.append("postPhoto", data.postPhoto[0]);
      } else {
        postForm.append("postPhoto", data.postPhoto);
      }
      
      const response = await axios.post("/api/post/new", data);

      Swal.fire({
          title: 'Éxito',
          text: 'Se han creado una publicación ',
          icon: 'success',
          confirmButtonText: 'OK'
      });
      router.push("/social");
      router.refresh();

    } catch (err) {
      console.log(err);
      Swal.fire({
        title: 'Error',
        text: "Ocurrió un error al guardar los datos",
        icon: 'error',
        confirmButtonText: 'OK'
    });
    }
  };

  return (
    <>
      <div className="pt-6">
        <form className="flex flex-col gap-7 pb-24"
         onSubmit={handleSubmit(handlePublish)}
         >
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
           {errors.postPhoto && (
              <p className="text-red-500">{errors.postPhoto.message}</p>
            )}

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
          {errors.caption && (
          <p className="text-red-500">{errors.caption.message}</p>
        )}
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

        {errors.tag && <p className="text-red-500">{errors.tag.message}</p>}
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
