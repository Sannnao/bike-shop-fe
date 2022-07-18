const API_BASE = "https://neuu59cj74.execute-api.eu-west-1.amazonaws.com";

export const getProducts = async () => {
  const productsData = await fetch(`${API_BASE}/products`);

  return productsData.json();
};

export const getProductById = async (productId: string) => {
  const productData = await fetch(`${API_BASE}/products/${productId}`);

  return productData.json();
};

export const addProduct = async () => {
  await fetch(`${API_BASE}/products`, {
    method: "POST",
    body: JSON.stringify({
      title: "ALPINE TRAIL XR",
      description: "Wheel Size: 29, Full Suspension | Aluminum",
      price: 3999,
    }),
  });
};
