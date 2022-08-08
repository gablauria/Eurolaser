const contenedorProductos = document.getElementById("contenedor-productos");
const contenedorCarrito = document.getElementById("carrito-contenedor");
const botonVaciar = document.getElementById("vaciar-carrito");
const contadorCarrito = document.getElementById("contadorCarrito");
const cantidad = document.getElementById("cantidad");
const precioTotal = document.getElementById("precioTotal");
const cantidadTotal = document.getElementById("cantidadTotal");

let carrito = [];

document.addEventListener("DOMContentLoaded", () => {
if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    actualizarCarrito();
}
});

botonVaciar.addEventListener("click", () => {
carrito.length = 0;
actualizarCarrito();
});

const mostrarProductos = async () => {
try {
    const response = await fetch("../js/data.json");
    const data = await response.json();
    console.log(data);
    data.forEach((producto) => {
let contenedor = document.createElement("div");
    contenedor.classList.add("col-sm-6");
    contenedor.classList.add("card");

    contenedor.innerHTML = `<img src="${producto.img}" class="card-img-top" alt="...">
                                        <div class="card-body">
                                            <h5 class="card-title">${producto.nombre}</h5>
                                            <p class="card-text">${producto.descr}</p>
                                            <p class="card-text">Precio: $${producto.precio}</p>
                                            <button id="agregar${producto.id}" class="boton-agregar botonClick">Agregar <i class="fas fa-shopping-cart"></i></button>
                                        </div>`;
    document.getElementById("contenedor-productos").append(contenedor);

    const boton = document.getElementById(`agregar${producto.id}`);

    boton.addEventListener("click", () => {
        agregarAlCarrito(producto.id);
        Toastify({
            text: "Producto Agregado Al Carrito",
            duration: 1500,
            gravity: "bottom",
            style: {
            background: "#e8c39e",
            color: "black",
            },
            position: "left",
        }).showToast();
        });
    });
    } catch (error) {
    console.log("error: ", error);
    }
};

mostrarProductos();

const agregarAlCarrito = async (prodId) => {
try {
    const response = await fetch("../js/data.json");
    const data = await response.json();
    const existe = carrito.some((prod) => prod.id === prodId);

    if (existe) {
        const prod = carrito.map((prod) => {
        if (prod.id === prodId) {
        prod.cantidad++;
        }
    });
    } else {
        const item = data.find((prod) => prod.id === prodId);
        carrito.push(item);
    }
    actualizarCarrito();
    } catch (error) {
    console.log("error: ", error);
    }
};

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId);

    const indice = carrito.indexOf(item);

    carrito.splice(indice, 1);
    actualizarCarrito();
    console.log(carrito);
};

const actualizarCarrito = () => {
    let cantidadTotal = 0;
    debugger;
    contenedorCarrito.innerHTML = "";
    carrito.forEach((prod) => {
    const div = document.createElement("div");
    div.className = "productoEnCarrito";
    div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar "><i class="btn-close"></i></button>
        `;

    contenedorCarrito.appendChild(div);

    localStorage.setItem("carrito", JSON.stringify(carrito));
    cantidadTotal += prod.cantidad;
    });
    contadorCarrito.innerText = cantidadTotal;
    console.log(carrito);
    precioTotal.innerText = carrito.reduce(
    (acc, prod) => acc + prod.cantidad * prod.precio,
    0
    );
};

const contenedorModal = document.getElementsByClassName("modal-contenedor")[0];
const botonAbrir = document.getElementById("boton-carrito");
const botonCerrar = document.getElementById("carritoCerrar");
const modalCarrito = document.getElementsByClassName("modal-carrito")[0];

botonAbrir.addEventListener("click", () => {
    contenedorModal.classList.toggle("modal-active");
});
botonCerrar.addEventListener("click", () => {
    contenedorModal.classList.toggle("modal-active");
});

contenedorModal.addEventListener("click", (event) => {
    contenedorModal.classList.toggle("modal-active");
});
modalCarrito.addEventListener("click", (event) => {
    event.stopPropagation();
});
