
const productList = document.getElementById("productList");
const statusMessage = document.getElementById("statusMessage");
const reloadButton = document.getElementById("reloadButton");
const searchInput = document.getElementById("searchInput");

let products = [];

async function fetchProducts() {
    statusMessage.textContent = "Loading data produk...";
    productList.replaceChildren();
    reloadButton.disabled = true;

    try {
        const response = await fetch("https://dummyjson.com/products");

        if (!response.ok) {
            throw new Error("Gagal mengambil data produk.");
        }

        const data = await response.json();
        products = data.products;

        displayProducts(products);
    } catch (error) {
        statusMessage.textContent =
            "Data gagal dimuat. Periksa koneksi internet lalu coba lagi.";

        console.error(error);
    } finally {
        reloadButton.disabled = false;
    }
}

function displayProducts(productData) {
    productList.replaceChildren();

    if (productData.length === 0) {
        statusMessage.textContent = "Produk tidak ditemukan.";
        return;
    }

    statusMessage.textContent =
        `Berhasil menampilkan ${productData.length} produk.`;

    productData.forEach((product) => {
        const card = document.createElement("article");
        card.className = "product-card";

        const image = document.createElement("img");
        image.src = product.thumbnail;
        image.alt = product.title;
        image.loading = "lazy";

        const category = document.createElement("p");
        category.className = "product-category";
        category.textContent = product.category;

        const name = document.createElement("h3");
        name.textContent = product.title;

        const price = document.createElement("p");
        price.className = "product-price";
        price.textContent = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "USD"
        }).format(product.price);

        card.append(image, category, name, price);
        productList.appendChild(card);
    });
}

searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.trim().toLowerCase();

    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(keyword)
    );

    displayProducts(filteredProducts);
});

reloadButton.addEventListener("click", fetchProducts);

fetchProducts();
