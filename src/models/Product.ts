import * as Yup from "yup";

export type ProductCreate = {
  title: string;
  description: string;
  price: number;
  count: number;
};

export type Product = ProductCreate & {
  id: string;
};

export const ProductSchema = Yup.object()
  .shape({
    title: Yup.string().required(),
    description: Yup.string().required(),
    price: Yup.number().required(),
    count: Yup.number().required(),
  })
  .required();
