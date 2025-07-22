const firebaseConfig = {
  apiKey: "AIzaSyDxDHN9tfOWWNxtjRoUukbquVRYMvCAURo",
  authDomain: "cafeteria-dcbc4.firebaseapp.com",
  projectId: "cafeteria-dcbc4",
  storageBucket: "cafeteria-dcbc4.appspot.com",
  messagingSenderId: "206863080372",
  appId: "1:206863080372:web:036b44df9337f73768b0e1"
};

// Iniciar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const agregarProducto = async (nombre, precio) => {
  try {
    await db.collection("carrito").add({ nombre, precio });
    await cargarCarrito();
  } catch (error) {
    console.error("No se puede agregar producto", error);
  }
};

const cargarCarrito = async () => {
  const lista = document.getElementById("carrito");
  lista.innerHTML = "";

  let total = 0;

  const productos = await db.collection("carrito").get();
  productos.forEach(pro => {
    const elemento = pro.data();
    total += elemento.precio;

    const li = document.createElement("li");
    li.textContent = `${elemento.nombre} *** ${elemento.precio.toFixed(2)}`;

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.addEventListener('click', async () => {
      try {
        await db.collection("carrito").doc(pro.id).delete();
        await cargarCarrito();
      } catch (error) {
        console.error("Error al eliminar el producto", error);
      }
    });
    li.appendChild(btnEliminar);
    lista.appendChild(li);
  });

  const totalCompra = document.getElementById("totalCompra");
  totalCompra.textContent = `Total: $${total.toFixed(2)}`;
};

window.addEventListener("DOMContentLoaded", () => {
  cargarCarrito();

  const botonTortilla = document.getElementById("botonTortilla");
  const botonHuevo = document.getElementById("botonHuevo");
  const botonArepa = document.getElementById("botonArepa");
  const botonMontubio = document.getElementById("botonMontubio");

  botonTortilla.addEventListener('click', () => {
    agregarProducto('Tortilla de verde', 6.20);
  });

  botonHuevo.addEventListener('click', () => {
    agregarProducto('Huevos Benidictinos', 10.00);
  });

  botonArepa.addEventListener('click', () => {
    agregarProducto('Arepas', 13.85);
  });

  botonMontubio.addEventListener('click', () => {
    agregarProducto('El Montubio', 11.30);
  });
});
