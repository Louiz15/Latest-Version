let productName = document.querySelector("#productName");


function toggleSizes() {
  const productType = document.getElementById("productType").value;
  const sizeOptions = document.getElementById("sizeOptions");
  
  if (productType === "tshirt") {
    sizeOptions.style.display = "block";
  } else {
    sizeOptions.style.display = "none";
  }
}

document.getElementById("addItemForm").addEventListener("submit", function(event) {
  event.preventDefault();
  
  const productData = {
    image: document.getElementById("productImage").files[0],
    name: document.getElementById("productName").value,
    stock: document.getElementById("stock").value,
    type: document.getElementById("productType").value,
    sizes: Array.from(document.querySelectorAll("#sizeOptions input[type=checkbox]:checked"))
                 .map(checkbox => checkbox.value),
    price: document.getElementById("price").value
  };

  console.log("Product Data:", productData);

  // Add your API call or database logic here
});
