

// const stockProductos = [
//     { id:1 , nombre: "Medusa" ,cantidad: 1 ,precio:125,descr: "Medusa🐍Cuadro MDF negro 3mm ,Contamos con varias medidas: 70cm - 60cm - 45cm - 30cm ",img: "../images/producto_1.jpg"},
//     { id:2 , nombre: "Cebra", cantidad: 1, precio:50, descr: "Cuadro Tríptico Cebra🦓,Ideal living, habitación o cualquier otro espacio que necesites decorar.", img: "../images/producto_2.jpg"},
//     { id:3 , nombre: "Hojas Caladas" , cantidad: 1,precio:50, descr:"Cuadro Hojas Caladas🍃 Decora y personaliza tus espacios de una manera simple y elegante. Ideal para espacios amplios por su tamaño de 110x70cm. Consulta otras medidas.",img: "../images/producto_3.jpg" },
//     { id:4 , nombre: "Harry Potter",cantidad: 1, precio:75, descr:"Cuadro Harry Potter⚡,Cuadros 3D personalizados, envianos tu propuesta! Nosotros lo hacemos posible",img: "../images/producto_4.jpg"},
//     { id:5 , nombre: "Red Hot",cantidad: 1, precio:75, descr:"Cuadro Logo Red Hot Chili Peppers💥Medidas: 45cm de diametro, Material: Fibrofacil y Fibroplus",img: "../images/producto_5.jpg"},
//     { id:6 , nombre: "Iron-Man",cantidad: 1, precio:75, descr:"Cuadro Logo Iron Man ,Medidas📐45cm de diámetro",img: "../images/producto_6.jpg"},
//     { id:7 , nombre: "Mujer Maravilla",cantidad: 1, precio:75, descr:"Cuadro Logo Mujer Maravilla🌟 Medidas 📐45cm de diametro. Y contiene 3 capas de mdf",img: "../images/producto_7.jpg"},
//     { id:7 , nombre: "Batman",cantidad: 1, precio:75, descr:"Cuadro Logo Batman🦇 Medidas: 📐45cm de diámetro. Ideal para tu pieza.",img: "../images/producto_8.jpg"},
//     { id:8 , nombre: "Nube",cantidad: 1, precio:75, descr:"Velador nube☁️ ,💥Polyfan & FibroFacil,📐Medidas: 20x30",img: "../images/producto_9.jpg"}
// ];

fetch("../js/data.json")
        .then( (response) => response.json())
        .then( (data) => {
            mostrarProductos(data);
        })

const contenedorProductos = document.getElementById('contenedor-productos')
const contenedorCarrito = document.getElementById('carrito-contenedor')
const botonVaciar = document.getElementById('vaciar-carrito')
const contadorCarrito = document.getElementById('contadorCarrito')
const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')

let carrito = []

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
})

const mostrarProductos = (data) => {
    data.forEach(post => {
        let contenedor = document.createElement("div");
        contenedor.classList.add("col-sm-6");
        contenedor.classList.add("card")

        contenedor.innerHTML = `<img src="${data.img}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">${data.nombre}</h5>
                                    <p class="card-text">${data.descr}</p>
                                    <p class="card-text">Precio: $${data.precio}</p>
                                    <button id="agregar${data.id}" class="boton-agregar botonClick">Agregar <i class="fas fa-shopping-cart"></i></button>
                                </div>`;
document.getElementById("contenedor-productos").append(contenedor);
const boton = document.getElementById(`agregar${data.id}`)

boton.addEventListener('click', () => {
    agregarAlCarrito(data.id)
        Toastify({
            text: "Producto Agregado Al Carrito",
            duration: 3000,
            gravity:"bottom",
            style:{
                background: "#e8c39e",
                color:"black",
            },
            position:"right"
        }).showToast();
    })})}
// const boton = document.getElementById(`agregar${data.id}`)

// boton.addEventListener('click', () => {
//     agregarAlCarrito(data.id)
//         Toastify({
//             text: "Producto Agregado Al Carrito",
//             duration: 3000,
//             gravity:"bottom",
//             style:{
//                 background: "#e8c39e",
//                 color:"black",
//             },
//             position:"right"
//         }).showToast();
    
// stockProductos.forEach((data) => {

//         let contenedor = document.createElement("div");
//         contenedor.classList.add("col-sm-6");
//         contenedor.classList.add("card")

//         contenedor.innerHTML = `<img src="${data.img}" class="card-img-top" alt="...">
//                                 <div class="card-body">
//                                     <h5 class="card-title">${data.nombre}</h5>
//                                     <p class="card-text">${data.descr}</p>
//                                     <p class="card-text">Precio: $${data.precio}</p>
//                                     <button id="agregar${data.id}" class="boton-agregar botonClick">Agregar <i class="fas fa-shopping-cart"></i></button>
//                                 </div>`;
// document.getElementById("contenedor-productos").append(contenedor);


// const boton = document.getElementById(`agregar${data.id}`)

// boton.addEventListener('click', () => {
//     agregarAlCarrito(data.id)
//         Toastify({
//             text: "Producto Agregado Al Carrito",
//             duration: 3000,
//             gravity:"bottom",
//             style:{
//                 background: "#e8c39e",
//                 color:"black",
//             },
//             position:"right"
//         }).showToast();
    
// })
// })

const agregarAlCarrito = (prodId) => {

    const existe = carrito.some (prod => prod.id === prodId) 

    if (existe){ 
        const prod = carrito.map (prod => { 
            if (prod.id === prodId){
                prod.cantidad++
            }
        })
    } else { 
        const item = stockProductos.find((prod) => prod.id === prodId)
        carrito.push(item)
    }
    actualizarCarrito() 
}

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)

    const indice = carrito.indexOf(item) 

    carrito.splice(indice, 1) 
    actualizarCarrito()
    console.log(carrito)
}

const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = "" 
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar "><i class="btn-close"></i></button>
        `

        contenedorCarrito.appendChild(div)
        
        localStorage.setItem('carrito', JSON.stringify(carrito))

    })
        contadorCarrito.innerText = carrito.length 
        console.log(carrito)
        precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
    
    }

const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]
const botonAbrir = document.getElementById('boton-carrito')
const botonCerrar = document.getElementById('carritoCerrar')
const modalCarrito = document.getElementsByClassName('modal-carrito')[0]


botonAbrir.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
})
botonCerrar.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
})

contenedorModal.addEventListener('click', (event) =>{
    contenedorModal.classList.toggle('modal-active')

})
modalCarrito.addEventListener('click', (event) => {
    event.stopPropagation()
})
