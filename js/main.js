const productos = [
    { id:1 , nombre: "Arroz" ,precio:125,descr: "arroz descripcion arroz descripcion arroz descripcion arroz descripcion  "},
    { id:1 , nombre: "Fideos", precio:50, descr: "Fideos Descripcion Fideos Descripcion Fideos Descripcion Fideos "},
    { id:1 , nombre: "Pan" ,precio:50, descr:" Pan Descripcion Pan Descripcion Pan Descripcion Pan Descripcion " },
    { id:1 , nombre: "Flan", precio:75, descr:"Flan Descripcion Flan Descripcion Flan Descripcion Flan Descripcion "}
];

for (const producto of productos) {

        let contenedor = document.createElement("div");

        contenedor.innerHTML = `<div class="card col-sm-6">
                                    <img src="..." class="card-img-top" alt="...">
                                    <div class="card-body">
                                        <h5 class="card-title">${producto.nombre}</h5>
                                        <p class="card-text">${producto.descr}</p>
                                        <a href="#" class="btn btn-primary">$${producto.precio}</a>
                                    </div>
                                </div>`;

document.body.append(contenedor);
}
