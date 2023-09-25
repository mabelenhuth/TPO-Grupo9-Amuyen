document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get("product");

    const numeroWhatsApp = "+5492926456331"; // Número de WhatsApp
    const productos = {
        "almendras": {
            nombre: "Almendras Enteras x 1 kg",
            precio: "$7.000,00",
            descripcion: "Deliciosas almendras enteras para disfrutar como snack o agregar a tus recetas.",
            imagen: "images/products/almendras.jpg"
        },
        "nueces": {
            nombre: "Nuez Mariposa Blanca x 1 kg",
            precio: "$5.500,00",
            descripcion: "Nueces de alta calidad, perfectas para aperitivos y postres.",
            imagen: "images/products/nueces.jpg"
        },
        "pasas-uva": {
            nombre: "Pasas de Uva x 1 kg",
            precio: "$1.500,00",
            descripcion: "Deliciosas pasas de uva para disfrutar solas o en tus recetas favoritas.",
            imagen: "images/products/pasas.jpg"
        },
        "mani-tostado": {
            nombre: "Mani Tostado x 1 kg",
            precio: "$1.500,00",
            descripcion: "Maní tostado y salado, ideal como snack o complemento en ensaladas.",
            imagen: "images/products/mani-tostado.jpg",
        },
        "coco-rallado": {
            nombre: "Coco rallado High Fat x 1 kg",
            precio: "$4.300,00",
            descripcion: "Coco rallado de alta calidad, perfecto para repostería y postres.",
            imagen: "images/products/coco-rallado.jpg",
        },
        "mix-amuyen": {
            nombre: "Mix Amuyén",
            precio: "$3.500,00",
            descripcion: "Una opción saludable para picar: maní tostado, almendras, nueces, maní japonés, maíz tostado, banana deshidratada.",
            imagen: "images/products/mix1.jpg",
        },
        "almohaditas": {
            nombre: "Almohaditas rellenas sabor Chocolate x 1 kg",
            precio: "$3.200,00",
            descripcion: "Almohaditas rellenas de chocolate, el snack perfecto para los amantes del chocolate.",
            imagen: "images/products/almohaditas.jpg",
        },
        "castanas-caju": {
            nombre: "Castañas de Cajú x 1 kg",
            precio: "$15.200,00",
            descripcion: "Castañas de cajú de alta calidad, ideales para aperitivos y platos gourmet.",
            imagen: "images/products/castanas.jpg",
        },
        "cereales-frutales": {
            nombre: "Cereales frutales x 1 kg",
            precio: "$2.000,00",
            descripcion: "Mezcla de cereales y frutas deshidratadas para un desayuno saludable.",
            imagen: "images/products/cereales-fruta.jpg",
        },
        "azucar-mascabo": {
            nombre: "Azucar Mascabo x 1 kg",
            precio: "$1.800,00",
            descripcion: "Azúcar mascabo natural, perfecta para endulzar tus bebidas y postres.",
            imagen: "images/products/azucar-mascabo.jpg",
        },
        "rebozador": {
            nombre: "Rebozador para horneados y frituras libre de gluten x 500 g",
            precio: "$1.100,00",
            descripcion: "Rebozador sin gluten para preparar deliciosos platos horneados y fritos.",
            imagen: "images/products/premezclas.jpg",
        },
        "premezclas": {
            nombre: "Premezcla universal para panadería y repostería libre de gluten x 500 g",
            precio: "$1.100,00",
            descripcion: "Premezcla sin gluten ideal para la preparación de panes y repostería.",
            imagen: "images/products/premezclas.jpg",
        }
    };

    const product = productos[productName];

    if (product) {
        const productInfo = document.getElementById("product-info");
        const productHTML = `
        <section class="product-grid">
            <div class="product-image">
                <img src="${product.imagen}" alt="${product.nombre}">
            </div>
            <div class="product-details">
                <h2>${product.nombre}</h2>
                <br><br>
                <p>Precio: ${product.precio}</p>
                <br><br>
                <a href="https://wa.me/${numeroWhatsApp}/?text=¡Hola+Amuyén!+Quisiera+hacer+un+pedido." class="btn-whatsapp">Contactar por WhatsApp</a>
            </div>
        </section>

        <section class="product-description">
            <br><br>
            <h3>Descripción</h3>
            <br>
            <p>${product.descripcion}</p>
        </section>
        `;
        productInfo.innerHTML = productHTML;
    } else {
        // Si el producto no se encuentra, muestra un mensaje de error
        const productInfo = document.getElementById("product-info");
        productInfo.innerHTML = "<p>Producto no encontrado</p>";
    }
});
