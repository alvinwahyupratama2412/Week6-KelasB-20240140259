
const captionForm = document.getElementById("captionForm");
const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const productCategory = document.getElementById("productCategory");
const productDescription = document.getElementById("productDescription");

const formMessage = document.getElementById("formMessage");
const resultSection = document.getElementById("resultSection");
const captionResult = document.getElementById("captionResult");
const copyButton = document.getElementById("copyButton");
const copyMessage = document.getElementById("copyMessage");

captionForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = productName.value.trim();
    const price = Number(productPrice.value);
    const category = productCategory.value;
    const description = productDescription.value.trim();

    if (!name || !category || !description) {
        showError("Semua kolom wajib diisi.");
        return;
    }

    if (!Number.isFinite(price) || price <= 0 || !Number.isInteger(price)) {
        showError("Harga harus berupa bilangan bulat lebih dari 0.");
        return;
    }

    const formattedPrice = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(price);

    const caption =
        `✨ ${name} ✨\n\n` +
        `${description}\n\n` +
        `📂 Kategori: ${category}\n` +
        `💰 Harga: ${formattedPrice}\n\n` +
        `Yuk, dapatkan produk ini sekarang! 🛍️`;

    captionResult.textContent = caption;
    resultSection.hidden = false;
    formMessage.textContent = "Caption berhasil dibuat!";
    copyMessage.textContent = "";

    resultSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});

function showError(message) {
    formMessage.textContent = message;
    resultSection.hidden = true;
}

copyButton.addEventListener("click", async function () {
    const caption = captionResult.textContent;

    try {
        await navigator.clipboard.writeText(caption);
        copyMessage.textContent = "Caption berhasil disalin!";
    } catch (error) {
        copyMessage.textContent =
            "Gagal menyalin. Silakan salin teks caption secara manual.";
    }
});

productName.addEventListener("input", function () {
    formMessage.textContent = "";
});

productPrice.addEventListener("input", function () {
    formMessage.textContent = "";
});

productCategory.addEventListener("change", function () {
    formMessage.textContent = "";
});

productDescription.addEventListener("input", function () {
    formMessage.textContent = "";
});
