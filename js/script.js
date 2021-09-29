const API =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

class List {
  constructor(url, container, list = list2) {
    this.container = container;
    this.list = list;
    this.url = url;
    this.goods = [];
    this.allProducts = [];
    this._init();
  }

  getJson(url) {
    return fetch(url ? url : `${API + this.url}`)
      .then(result => result.json())
      .catch(error => {
        console.log(error);
      });
  }

  handleData(data) {
    this.goods = [...data];
    this.render();
  }

  calcSum() {
    return this.allProducts.reduce((accum, item) => (accum += item.price), 0);
  }

  render() {
    const block = document.querySelector(this.container);
    for (let product of this.goods) {
      const productObj = new this.list[this.constructor.name](product);
      // console.log(productObj);
      this.allProducts.push(productObj);
      block.insertAdjacentHTML("beforeend", productObj.render());
    }
  }

  _init() {
    return false;
  }
}

class Item {
  constructor(
    el,
    img = "https://www.taemana.com/wp-content/uploads/2017/09/team-placeholder.png"
  ) {
    this.product_name = el.product_name;
    this.price = el.price;
    this.id_product = el.id_product;
    this.img = img;
  }

  render() {
    return `<div class="product-item" data-id ="${this.id_product}">
                <img class="goods_img" src="${this.img}">
                    <h3>${this.product_name}</h3>
                    <p class="cost">Цена: ${this.price}&#8381;</p>
                    <button class="buy-btn"
                    data-id="${this.id_product}"
                    data-name="${this.product_name}"
                    data-price="${this.price}">Купить</button>
            </div>`;
  }
}

class ProductsList extends List {
  constructor(cart, container = ".products", url = "/catalogData.json") {
    super(url, container);
    this.cart = cart;
    this.getJson().then(data => this.handleData(data));
  }

  _init() {
    document.querySelector(this.container).addEventListener("click", e => {
      if (e.target.classList.contains("buy-btn")) {
        this.cart.addProduct(e.target);
      }
    });
  }
}

class ProductItem extends Item {}

class Cart extends List {
  constructor(container = ".cart-block", url = "/getBasket.json") {
    super(url, container);
    this.getJson().then(data => {
      this.handleData(data.contents);
    });
  }

  addProduct(element) {
    const emptyContent = document.querySelector(".cart-epmty-content");
    this.getJson(`${API}/addToBasket.json`).then(data => {
      if (data.result === 1) {
        let productId = +element.dataset["id"];
        let find = this.allProducts.find(
          product => product.id_product === productId
        );
        if (find) {
          find.quantity++;
          this._updateCart(find);
        } else {
          let product = {
            id_product: productId,
            price: +element.dataset["price"],
            product_name: element.dataset["name"],
            quantity: 1
          };
          this.goods = [product];
          this.render();
        }
        emptyContent.classList.add("hidden");
      } else {
        alert("Error");
      }
    });
  }
  removeProduct(element) {
    this.getJson(`${API}/deleteFromBasket.json`).then(data => {
      if (data.result === 1) {
        const productId = +element.dataset["id"];
        const find = this.allProducts.find(
          product => product.id_product === productId
        );
        if (find.quantity > 1) {
          find.quantity--;
          this._updateCart(find);
        } else {
          this.allProducts.splice(this.allProducts.indexOf(find), 1);
          document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
        }
        const isEmpty = document.querySelector(".cart-block");
        const isEmptyContent = document.querySelector(".cart-epmty-content");
        console.dir(isEmpty.childNodes);
        if (isEmpty.childNodes.length == 0) {
          isEmptyContent.classList.remove("hidden");
        }
      } else {
        alert("Error");
      }
    });
  }

  _updateCart(product) {
    let block = document.querySelector(
      `.cart-item[data-id="${product.id_product}"]`
    );
    block.querySelector(
      ".product-quantity"
    ).textContent = `Количество: ${product.quantity}`;
    block.querySelector(".product-price").textContent = `${
      product.quantity * product.price
    }руб.`;
  }

  _init() {
    document.querySelector(".card_btn").addEventListener("click", () => {
      document.querySelector(this.container).classList.toggle("invisible");
      document.querySelector(".modal__content").classList.toggle("invisible");
      const isEmpty = document.querySelector(".cart-block");
      const isEmptyContent = document.querySelector(".cart-epmty-content");
      console.dir(isEmpty.childNodes);
      if (isEmpty.childNodes.length !== 0) {
        isEmptyContent.classList.add("hidden");
      }
    });
    document.querySelector(this.container).addEventListener("click", e => {
      if (e.target.classList.contains("del-btn")) {
        this.removeProduct(e.target);
      }
    });
  }
}

class CartItem extends Item {
  constructor(el, img) {
    super(el, img);
    this.quantity = el.quantity;
  }

  render() {
    return `<div class="cart-item" data-id="${this.id_product}">
                <div class="product-bio">
                <img class="main-cart-img" src="${this.img}" alt="Some img">
                <div class="product-desc">
                <p class="product-title">${this.product_name}</p>
                <p class="product-quantity">Количество : ${this.quantity}</p>
        <p class="product-single-price">Цена: ${this.price}руб.</p>
        </div>
        </div>
        <div class="right-block">
            <p class="product-price">${this.quantity * this.price}руб.</p>
            <button class="del-btn" data-id="${
              this.id_product
            }">&times;</button>
        </div>
        </div>`;
  }
}

const list2 = {
  ProductsList: ProductItem,
  Cart: CartItem
};

let cart = new Cart();
let products = new ProductsList(cart);
