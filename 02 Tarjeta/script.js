// Obtener elementos del DOM
const verDetallesButton = document.getElementById("verDetalles"); // obtener una referencia al botón verDetalles
const volverButton = document.getElementById("volver"); // obtener una referencia al botón volver
const tarjeta = document.querySelector(".tarjeta"); // obteber una referencia a la tarjeta

// Función para voltear la tarjeta
verDetallesButton.addEventListener("click", () => {
  tarjeta.children[0].style.transform = "rotateY(180deg)"; // rotar la cara frontal
  tarjeta.children[1].style.transform = "rotateY(360deg)"; // rotar la cara posterior de manera invertida
  setTimeout(() => {
    // resetear las tranformaciones para ambas caras después de 4 segundos
    tarjeta.children[0].style.transform = "";
    tarjeta.children[1].style.transform = "";
  }, 4000);
  // tarjeta.style.transform = "rotateY(180deg)"; // Voltear la tarjeta
});

// Función para volver a la cara frontal
volverButton.addEventListener("click", () => {
  tarjeta.children[0].style.transform = "rotateY(0deg)"; // rotar la cara frontal a su posición original
  tarjeta.children[1].style.transform = "rotateY(180deg)"; // rotar la cara posterior a su posición original
  setTimeout(() => {
    // resetear las tranformaciones para ambas caras después de 4 segundos
    tarjeta.children[0].style.transform = "";
    tarjeta.children[1].style.transform = "";
  }, 4000);
  // tarjeta.style.transform = "rotateY(0deg)"; // Volver a la cara inicial
});
