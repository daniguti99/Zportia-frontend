import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPostSchema, type CreatePostForm } from "../schemas/createPostSchema";
import Swal from "sweetalert2";
import "../css/createPost/CreatePost.css";
import { createPost } from "../services/PostServices";
import { getAllSports } from "../services/SportsService";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {

  const navigate = useNavigate();
  const [sports, setSports] = useState<string[]>([]);

  useEffect(() => {
    async function loadSports() {
      try {
        const data = await getAllSports();
        console.log("SPORTS RESPONSE:", data);

        // data.sports = [{id, name}, ...]
        setSports(data.sports.map((s: any) => s.name));

      } catch (err) {
        console.error("Error cargando deportes:", err);
      }
    }
    loadSports();
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<CreatePostForm>({
    resolver: zodResolver(createPostSchema)
  });

  const file = watch("file");

  const onSubmit: SubmitHandler<CreatePostForm> = async (data) => {
    try {
      const fileToSend = data.file as File;

      await createPost(
        data.content || null,
        fileToSend,
        data.location || null,
        data.sport
      );

      Swal.fire({
        title: "Publicación creada",
        text: "Tu post se ha publicado correctamente",
        icon: "success",
        background: "#111",
        color: "#fff",
        confirmButtonColor: "#0099ff",
        customClass: { popup: "zportia-alert" }
      });

      navigate("/home");

    } catch (err: any) {
      Swal.fire({
        title: "Error",
        text: err.message,
        icon: "error",
        background: "#111",
        color: "#fff",
        confirmButtonColor: "#ff006e",
        customClass: { popup: "zportia-alert" }
      });
    }
  };

  return (
    <div className="create-post-page">

      <div className="create-post-container">

        <h2 className="create-post-title">Crear publicación</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="create-post-form">

          {/* CONTENIDO */}
          <div className="form-group">
            <label>Contenido</label>
            <textarea
              {...register("content")}
              maxLength={500}
              placeholder="Escribe algo..."
            />
            {errors.content && <span className="error">{errors.content.message}</span>}
          </div>

          {/* UBICACIÓN */}
          <div className="form-group">
            <label>Ubicación</label>
            <input
              type="text"
              {...register("location")}
              placeholder="Ej: Madrid, España"
            />
            {errors.location && <span className="error">{errors.location.message}</span>}
          </div>

          {/* DEPORTE */}
          <div className="form-group">
            <label>Deporte</label>

            <div className="sport-wrapper">
              {sports.length === 0 ? (
                <div className="sport-loading">Cargando deportes...</div>
              ) : (
                <>
                  <select className="sport-select" {...register("sport")}>
                    <option value="">Selecciona un deporte</option>
                    {sports.map((sport) => (
                      <option key={sport} value={sport}>
                        {sport}
                      </option>
                    ))}
                  </select>

                  {/* ICONO DEL DROPDOWN */}
                  <span className="sport-icon">⌄</span>
                </>
              )}
            </div>

            {errors.sport && <span className="error">{errors.sport.message}</span>}
          </div>


          {/* ARCHIVO */}
          <div className="form-group">
            <label>Imagen o video (obligatorio)</label>
            <input
              type="file"
              accept="image/*,video/mp4"
              {...register("file")}
            />
            {errors.file && <span className="error">{String(errors.file.message)}</span>}
          </div>

          {/* PREVIEW */}
          {file instanceof File && file.type.startsWith("image/") && (
            <img
              src={URL.createObjectURL(file)}
              className="preview-image"
            />
          )}

          <button type="submit" className="btn-primary">
            Publicar
          </button>

        </form>
      </div>
    </div>
  );
}
