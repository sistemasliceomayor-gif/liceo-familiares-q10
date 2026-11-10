/**
 * Configuración del aplicativo de actualización de familiares — I.E. Liceo Mayor de Soledad
 * -----------------------------------------------------------------------------------------
 * Este es el ÚNICO archivo que se edita al publicar: pegue entre las comillas
 * la dirección de la aplicación web de Apps Script (termina en /exec).
 */
const API_URL = "https://script.google.com/macros/s/AKfycbzNz--R9DeHwn-zb-qBC6ILojnvh6ulyjNji5T4m1Wa2YU0s3MVCMKEeqLr_yE9N8vWUA/exec";

/** Llama al backend. Devuelve la respuesta o lanza un error con un mensaje claro. */
async function api(action, datos) {
  if (!/^https:\/\/script\.google\.com\/macros\/s\/.+\/exec$/.test(API_URL)) {
    const e = new Error("El aplicativo aún no está conectado. Comuníquese con la institución.");
    e.servidor = true; throw e;
  }
  let r;
  try {
    // text/plain evita la verificación previa (CORS) que Apps Script no responde.
    const resp = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(Object.assign({ action: action }, datos || {}))
    });
    r = await resp.json();
  } catch (err) {
    throw new Error("No se pudo conectar con el servidor. Revise su conexión a internet e intente de nuevo.");
  }
  if (!r || r.ok !== true) {
    const e = new Error(r && r.error ? r.error : "No se pudo completar la operación. Intente de nuevo.");
    e.servidor = true; throw e;
  }
  return r;
}

/** Escapa texto antes de insertarlo en HTML. */
function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
