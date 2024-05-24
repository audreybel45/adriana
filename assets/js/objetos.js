//Clase punto que se usa en el INDEX para cada una de las consultas del 
// es necesario modificarla para que regrese la Estructura HTML a insertar y que el que llamo la inserte en dode quiera

export class Punto {
  constructor(id, nombre, provincia, pais, descripcion, fotourl, miniaturaurl, hospedajes, transporte, formas_llegar) {
    this.id = id
    this.nombre = nombre
    this.provincia = provincia
    this.pais = pais
    this.descripcion = descripcion
    this.fotourl = fotourl
    this.miniaturaurl = miniaturaurl
    this.hospedajes = hospedajes
    this.transporte = transporte
    this.formas_llegar = formas_llegar
  }

  // metodo para agregar un punto a la pagina
  agregarPunto(contenedor) {
    // creamos el html para ser agregado al contenedor
    const contenedorPunto = document.createElement("div");
    contenedorPunto.classList.add("index-punto");

    const elementoTitulo = document.createElement("h3");
    elementoTitulo.textContent = this.nombre;

    const elementoDescripcion = document.createElement("p");
    elementoDescripcion.textContent = this.descripcion;

    const elementoUbicacion = document.createElement("p");
    elementoUbicacion.textContent = this.pais + " " + this.provincia;

    const elementoTransporte = document.createElement("p");
    elementoTransporte.textContent = "Transportes: " + this.transporte + "; Formas de llegar: " + this.formas_llegar;

    const elementoHospedajes = document.createElement("p");
    elementoHospedajes.textContent = "Hospedajes: " + this.hospedajes;

    const elementoImagen = document.createElement("img");
    elementoImagen.src = this.miniaturaurl;
    // console.log("ruta a la miniatura", this.miniaturaurl)
    
    // agregamos al div los elemento
    contenedorPunto.appendChild(elementoImagen);
    contenedorPunto.appendChild(elementoTitulo);
    contenedorPunto.appendChild(elementoDescripcion);
    contenedorPunto.appendChild(elementoUbicacion);
    contenedorPunto.appendChild(elementoTransporte);
    contenedorPunto.appendChild(elementoHospedajes);
    // Agregamos el el div a la pagina
    contenedor.appendChild(contenedorPunto);
  }
}

// Usuario de la pagina y sus metodos
/**
* @id Numerico
* @nombre 
* @apellido
* @fechaNacimiento  campo fecha
* @usuario 
* @clave
* @foto
* @fotoMiniatura
* 
* estructura de la clase Usuario
*/
export class Usuario {
  constructor (id,dni,correo,nombre,apellido,fechaNacimiento,usuario,clave,foto,fotoMiniatura){
    this.id = id
    this.dni = dni
    this.correo = correo
    this.nombre = nombre
    this.apellido = apellido
    this.fechaNacimiento = fechaNacimiento
    this.usuario = usuario
    this.clave = clave
    this.foto = foto
    this.fotoMiniatura = fotoMiniatura
  }

  usuarioEdad(){
    const fechaNacimiento = new Date(this.fechaNacimiento);
    const fechaActual = new Date();
    let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
    // Verificar si el cumpleaños ya pasó este año
    const mesActual = fechaActual.getMonth();
    const mesNacimiento = fechaNacimiento.getMonth();
    if (mesActual < mesNacimiento || (mesActual === mesNacimiento && fechaActual.getDate() < fechaNacimiento.getDate())) {
      edad--;
    }
    return edad;
  }
}
