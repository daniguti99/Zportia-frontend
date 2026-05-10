import Swal from "sweetalert2";
import { sendReport } from "../services/UserServices";

export async function openReportModal(
  targetId: number,
  type: "POST" | "COMMENT"
) {
  const { value: message } = await Swal.fire({
    title: "Reportar contenido",
    input: "textarea",
    inputLabel: "Describe el problema",
    inputPlaceholder: "Escribe aquí el motivo del reporte...",
    inputAttributes: {
      "aria-label": "Motivo del reporte"
    },
    background: "#0d0d0d",
    color: "#fff",
    confirmButtonColor: "#ff006e",
    cancelButtonColor: "#333",
    showCancelButton: true,
    confirmButtonText: "Enviar reporte",
    cancelButtonText: "Cancelar",
  });

  if (!message) return;

  try {
    await sendReport({ targetId, type, message });

    await Swal.fire({
      title: "Reporte enviado",
      text: "El administrador revisará este contenido.",
      icon: "success",
      background: "#0d0d0d",
      color: "#fff",
      confirmButtonColor: "#ff006e",
    });

  } catch (err: any) {
    Swal.fire({
      title: "Error",
      text: err.message || "No se pudo enviar el reporte",
      icon: "error",
      background: "#0d0d0d",
      color: "#fff",
      confirmButtonColor: "#ff006e",
    });
  }
}
