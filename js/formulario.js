
document.getElementById("cafe-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const telefono = document.getElementById("telefono").value;
  const correo = document.getElementById("correo").value;
  const direccion = document.getElementById("direccion").value;
  const productos = document.getElementById("productosSeleccionados").value;
  const pago = document.getElementById("pago").value;
  const monto = document.getElementById("monto").value;

  const datosHTML = `
    <p><strong>Nombre:</strong> ${nombre} ${apellido}</p>
    <p><strong>Teléfono:</strong> ${telefono}</p>
    <p><strong>Correo:</strong> ${correo}</p>
    <p><strong>Dirección:</strong> ${direccion}</p>
    <p><strong>Productos:</strong> ${productos}</p>
    <p><strong>Forma de pago:</strong> ${pago}</p>
    <p><strong>Monto total:</strong> $${monto}</p>
  `;

  document.getElementById("registro").innerHTML = datosHTML;
});

