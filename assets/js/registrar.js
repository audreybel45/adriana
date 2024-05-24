import {
  subirImagen,
  subirSuscriptor,
  consultarSuscriptor,
  consultarUsuarioDNI,
  subirUsuario, animacionBotonCarga, animacionCursoCarga
} from "./persistencia.js";
import { Usuario } from "./objetos.js";

document.addEventListener("DOMContentLoaded", function () {
  // Funcion que carga la imagen en el elemento img sin necesidad de eviarla al servidor y ya tenerla para luego enviarla
  // si la foto no carga o no se eligue foto se usa la predeterminada
  document.getElementById("registrar-foto-perfil").addEventListener("change", (e) => {
    const elementoImagen = document.getElementById("registrar-foto-actual");
    miMensaje("paraaaaaa ansioooosooo  ya estas suscripto!!! -- Gracias por elegirnos", "Ese DNI ya Existe",3);
    if (e.target.files[0]) {
      // si existe algun archivo regresa true
      const lector = new FileReader();
      lector.onload = function (e) {
        elementoImagen.src = e.target.result;
      };
      lector.readAsDataURL(e.target.files[0]);
    } else {
      elementoImagen.src = "https://i.ibb.co/8MPLpzp/imagen.jpg";
    }
  });

  document.getElementById("registrar-boton-cargar").addEventListener("click", cargarRegistro);

  // Funcion que carga el usuario de no encontrar el mismo dni en la base de datos
  async function cargarRegistro() {
    let terminos = document.getElementById("registrar-formulario-checkbox").checked;
    if (terminos) {  // Si se aceptaron los terminos se cargaran los datos en el servidor
      // Enviamos los elementos que marcaran una animacion para esperar que se complete la carga!!
      animacionBotonCarga("registrar-boton-cargar",true)
      animacionCursoCarga("formulario-de-registro",true)
      // Revisamos si el dni proporcionado ya existe en el servidor
      const dni = document.getElementById("registrar-dni").value;
      const existe = await consultarUsuarioDNI(document.getElementById("registrar-correo").value); // consultamos si existe el DNI en el servidor
      if (existe.dni !== dni) {
        // Si no existe empezamos el proceso de preparar datos para ser enviados al servidor
        // Subimos la imagen!!
        let url = "",
          miniatura = "",
          success = false;
        const inputFile = document.getElementById("registrar-foto-perfil");
        if (inputFile.files.length > 0) {
          // Verificamos que haya un archivo en el input
          [url, miniatura, success] = await subirImagen({
            target: { files: [inputFile.files[0]] },
          }); // Subimos la Imagen
        }
        // Configuramos la fecha para que se guarde con un formato AAAA/MM/DD de lo contrario lo guarda como un entero con los cantidad de dias pasados de la creacion del javascript no entendi eso pero es solo un numero
        const fechaNacimiento = new Date(
          document.getElementById("registrar-fecha-nacimiento").value
        );
        const fechaFormateada = fechaNacimiento.toISOString().split("T")[0];
        const usuario = new Usuario(
          0,
          dni,
          document.getElementById("registrar-correo").value,
          document.getElementById("registrar-nombre").value,
          document.getElementById("registrar-apellido").value,
          fechaFormateada,
          document.getElementById("registrar-nombre-usuario").value,
          document.getElementById("registrar-clave").value,
          url,
          miniatura
        );
        const vResp = await subirUsuario(usuario);
        if (vResp) {
          alert("Se cargo con exito el usuario");
          animacionBotonCarga("registrar-boton-cargar",false)
          animacionCursoCarga("formulario-de-registro",false)
        } else {
          alert("Hubo un error al cargar el usuario");
          animacionBotonCarga("registrar-boton-cargar",false)
          animacionCursoCarga("formulario-de-registro",false)
        }
      } else {
        alert("Ese Usuario ya existe");
        animacionBotonCarga("registrar-boton-cargar",false)
        animacionCursoCarga("formulario-de-registro",false)
      }
    }
  }

  // SECCION DEL SUSCRIBIR CARGA Y CONTROL
  const btSuscrptor = "footer-boton-suscriptor";
  // ESCUCHAMOS AL BOTON SUSCRIBIR Y LLAMAMOS A LA FUNCION DE CARGA
  document.getElementById(btSuscrptor).addEventListener("click", () => cargarSuscriptor());

  // ESCUCHAMOS AL INPUT POR SI ALGUINE PRECIONA ENTER QUE EJECUTE LA FUNCION DE CARGA
  document.getElementById("footer-text-subscribir").addEventListener("keydown", function (event) {
    // Verificar si la tecla presionada es Enter
    if (event.key === "Enter") {
      // Detener la propagación del evento para evitar el envío del formulario
      event.preventDefault();
      cargarSuscriptor();
    }
  });

  // FUNCION DE CARGA DEL CORREO
  async function cargarSuscriptor() {
    let correo = document.getElementById("footer-text-subscribir").value;
    let re = /\S+@\S+\.\S+/; // Explecion regular para validar el correo no se como funciona Todavia XD
    if (re.test(correo)) {
      // regresa true si es correo sino regresa false
      // COMPROBAR QUE EL CORREO NO EXISTE
      let existe = await consultarSuscriptor(correo);
      if (existe) {
        miMensaje("Ese DNI ya Existe","paraaaaaa ansioooosooo  ya estas suscripto!!! -- Gracias por elegirnos",3);
      } else {
        // CARGAMOS EL CORREO AL ENDPOINT
        let respuesta = subirSuscriptor(correo);
        if (respuesta) {
          alert("Gracias por suscribirte!!");
          document.getElementById("footer-text-subscribir").value = "";
        }
      }
    } else {
      alert("Correo no Valido");
      document.getElementById("footer-text-subscribir").select();
    }
  }

  function miMensaje(msg, tit, tiempo) {
    // Creamos los elementos
    const contenedor = document.createElement("div");
    contenedor.classList.add("contenedor-miMensage");
    const titulo = document.createElement("h3");
    titulo.textContent = tit;
    const mensaje = document.createElement("p");
    mensaje.textContent = msg;
    
    // Insertamos los elementos al contenedor
    contenedor.appendChild(titulo);
    contenedor.appendChild(mensaje);
    
    // Seleccionamos el destino de la página (será el body) y agregamos el mensaje
    const hoja = document.querySelector("body");
    hoja.appendChild(contenedor);
    
    // Eliminamos el mensaje después de `tiempo` segundos
    setTimeout(() => {
        hoja.removeChild(contenedor);
    }, tiempo * 1000);
}




}); // FIN DEL DOMContentLoaded
