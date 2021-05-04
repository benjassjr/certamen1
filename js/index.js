
tinymce.init({
  selector: '#detalle-txt',
  height: 200,
  menubar: false,
  plugins: [
    'advlist autolink lists link image charmap print preview anchor',
    'searchreplace visualblocks code fullscreen',
    'insertdatetime media table paste code help wordcount'
  ],
  toolbar: 'undo redo | formatselect | ' +
    'bold italic backcolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'removeformat | help',
  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
});


//Ciudades
let array = ["Viña del Mar","Quilpué","Santiago","Otro"];
function cargarCiudades(){
  for(let i in array){
    document.getElementById("ciudad-select").innerHTML += "<option value='"+array[i]+"'>"+array[i]+"</option>";
  }
}

cargarCiudades();


const reos = [];
const cargarTabla = () => {


  let tbody = document.querySelector("#tbody-tabla");

  tbody.innerHTML = "";
  for (let i = 0; i < reos.length; ++i) {
    let p = reos[i];

    let tr = document.createElement("tr");

    let tdNombre = document.createElement("td");
    let tdDetalle = document.createElement("td");
    let tdCiudad = document.createElement("td");
    let tdGravedad = document.createElement("td");


    tdNombre.innerText = p.nombre + " " + p.apellido;

    let gravedad = document.createElement("i");

    if (p.cantidad <= 3) {

      gravedad.classList.add("fas", "fa-angry", "text-warning", "fa-3x");

    } else if (p.cantidad >= 4 && p.cantidad <= 6) {

      gravedad.classList.add("fas", "fa-ambulance", "text-danger", "fa-3x");

    } else if (p.cantidad >= 7 && p.cantidad <= 15) {

      gravedad.classList.add("fas", "fa-skull-crossbones", "text-secondary", "fa-3x");

    } else {
      gravedad.classList.add("fas", "fa-book-dead", "text-dark", "fa-3x");
    }


    tdGravedad.classList.add("text-center");
    tdGravedad.appendChild(gravedad);


    tdCiudad.innerText = p.ciudad;
    tdDetalle.innerHTML = p.detalle;

    tr.appendChild(tdNombre);
    tr.appendChild(tdDetalle);
    tr.appendChild(tdCiudad);
    tr.appendChild(tdGravedad);

    tbody.appendChild(tr);
  }

};

document.querySelector("#registrar-btn").addEventListener("click", () => {
  let nombre = document.querySelector("#nombre-txt").value;
  let apellido = document.querySelector("#apellido-txt").value;
  let detalle = tinymce.get("detalle-txt").getContent();
  let ciudad = document.querySelector("#ciudad-select").value;
  let cantidad = document.querySelector("#cantidad-txt").value;



  let reo = {};

  reo.nombre = nombre;
  reo.apellido = apellido;
  reo.detalle = detalle;
  reo.ciudad = ciudad;
  reo.cantidad = cantidad;

  reos.push(reo);
  cargarTabla();
  Swal.fire("Registro de Criminal Realizado", "Operacion éxitosa!", "info");

});