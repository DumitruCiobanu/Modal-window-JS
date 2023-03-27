let fruits = [
  {
    id: 1,
    title: "Apples",
    price: 20,
    img: "images/apples.jpg",
  },
  {
    id: 2,
    title: "Oranges",
    price: 30,
    img: "images/oranges.jpg",
  },
  {
    id: 3,
    title: "Mangos",
    price: 40,
    img: "images/mangos.jpg",
  },
];



const toHTML = (fruit) => `<div class="col">
<div class="card">
    <img class="card-img-top" style="height: auto;
      display: block;
      margin-left: auto;
      margin-right: auto;
      " src="${fruit.img}" alt="${fruit.title}">
    <div class="card-body">
      <h5 class="card-title">${fruit.title}</h5>
      <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">See Price</a>
      <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Remove</a>
    </div>
  </div>
</div>`;

function render() {
  const html = fruits.map(toHTML).join("");
  document.querySelector("#fruits").innerHTML = html;
}

render();

const priceModal = $.modal({
  title: "Price for product",
  closable: true,
  width: "400px",
  footerButtons: [
    {
      text: "Close",
      type: "primary",
      handler() {
        priceModal.close();
      },
    },
  ],
});

document.addEventListener("click", (event) => {
  event.preventDefault();
  const btnType = event.target.dataset.btn;
  const id = +event.target.dataset.id;
  const fruit = fruits.find((f) => f.id === id);

  if (btnType === "price") {
    priceModal.setContent(`
    <p> Price for ${fruit.title}: <strong>${fruit.price}$</strong></p>`);
    priceModal.open();
  } else if (btnType === "remove") {
    $.confirm({
      title: "Are you sure?",
      content: `<p>You are removing: <strong>${fruit.title}</strong></p>`,
    })
      .then(() => {
        fruits = fruits.filter((f) => f.id !== id);
        render();
      })
      .catch(() => {
        console.log("Cancel");
      });
  }
});
