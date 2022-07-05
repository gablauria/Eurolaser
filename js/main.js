
const productos = [
    { id:1 , nombre: "Arroz" ,precio:125,descr: "arroz descripcion arroz descripcion arroz descripcion arroz descripcion ",img: "../images/card1.jpg"},
    { id:1 , nombre: "Fideos", precio:50, descr: "Fideos Descripcion Fideos Descripcion Fideos Descripcion Fideos ", img: "../images/card2.jpg"},
    { id:1 , nombre: "Pan" ,precio:50, descr:" Pan Descripcion Pan Descripcion Pan Descripcion Pan Descripcion ",img: "../images/card3.jpg" },
    { id:1 , nombre: "Flan", precio:75, descr:"Flan Descripcion Flan Descripcion Flan Descripcion Flan Descripcion ",img: "../images/card1.jpg"}
];

for (const producto of productos) {

        let contenedor = document.createElement("div");
        contenedor.classList.add("col-sm-6");
        contenedor.classList.add("card")

        contenedor.innerHTML = `<img src="${producto.img}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">${producto.nombre}</h5>
                                    <p class="card-text">${producto.descr}</p>
                                    <a href="#" class="btn btn-primary">$${producto.precio}</a>
                                </div>`;

document.getElementById("main").append(contenedor);
}
