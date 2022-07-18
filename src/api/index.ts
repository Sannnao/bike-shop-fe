const API_BASE = "https://neuu59cj74.execute-api.eu-west-1.amazonaws.com";

export const getProducts = async () => {
  const productsData = await fetch(`${API_BASE}/products`);

  return productsData.json();
};

export const getProductById = async (productId: string) => {
  const productData = await fetch(`${API_BASE}/products/${productId}`);

  return productData.json();
};

export const addProduct = async (body: {
  title: string;
  description: string;
  price: number;
  count: number;
}) => {
  const result = await fetch(`${API_BASE}/products`, {
    method: "POST",
    body: JSON.stringify(body),
  });

  return result.json();
};

export const updateProduct = async (
  productId: string,
  body: {
    title?: string;
    description?: string;
    price?: number;
    count?: number;
  }
) => {
  console.log(body);
  const result = await fetch(`${API_BASE}/products/${productId}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });

  return result.json();
};
