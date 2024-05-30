fetch("http://localhost:8080/api/carts")
  .then((r) => r.json())
  .then((data) => {
    const { payload: carts } = data;

    const fragment = document.createDocumentFragment();
    carts.forEach((carts) => {
      const div = document.createElement("div");

      const priceParagraph = document.createElement("p");
      priceParagraph.innerHTML = `Total de la orden: ${carts.totalPrice}`;

      const statusParagraph = document.createElement("p");
      statusParagraph.innerHTML = `Estado: ${carts.status}`;

      const numberParagraph = document.createElement("p");
      numberParagraph.innerHTML = `Orden número ${carts.number}`;

      div.appendChild(numberParagraph);
      div.appendChild(priceParagraph);
      div.appendChild(statusParagraph);

      fragment.append(div);
    });

    const container = document.getElementById("carts");
    container.appendChild(fragment);
  })
  .catch(console.error);
