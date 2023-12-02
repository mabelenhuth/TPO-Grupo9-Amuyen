const URL = "http://127.0.0.1:5000/";
fetch(URL + 'productoss')
    .then(function (response) {
        if (response.ok) { return response.json(); }
    })
    .then(function (data) {
        let contenedor = document.getElementsByClassName('product');
        for (let prod of data) {
            let cont = document.createElement('div');
            cont.classList.add('product-item');
            cont.classList.add('product-details')
            cont.innerHTML = '<a href="prod-ind.html?codigo='+prod.codigo+'"><img src=/static/imagenes/' + prod.imagen_url + ' alt="Imagen del producto" ></a>'
                           + '<a href="prod-ind.html?codigo='+prod.codigo+'"><h2>'+ prod.nombre +'</h2></a>'
                           + '<p> $ ' + prod.precio + '</p>'
                           + '<a href="prod-ind.html?codigo='+prod.codigo+'" class="btn-more">Ver info</a>';         
            contenedor[0].appendChild(cont);
            console.log(prod.imagen_url);
        
        }
    })
    .catch(function (error) {
        alert('Error al obtener los productos.');
    });
