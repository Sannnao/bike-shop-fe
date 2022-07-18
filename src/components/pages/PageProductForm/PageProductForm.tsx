import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Product, ProductSchema } from "models/Product";
import { Formik, Field, FormikProps, FormikValues } from "formik";
import { TextField } from "formik-material-ui";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import PaperLayout from "components/PaperLayout/PaperLayout";
import Typography from "@material-ui/core/Typography";
import API_PATHS from "constants/apiPaths";
import { addProduct, getProductById, updateProduct } from "api";
import ProductsTable from "../admin/PageProductImport/components/ProductsTable";

const Form = (props: FormikProps<FormikValues>) => {
  const {
    // values,
    // touched,
    // errors,
    dirty,
    isSubmitting,
    isValid,
    // handleChange,
    // handleBlur,
    handleSubmit,
    // handleReset,
    // setFieldValue,
    // isEditMode,
    // onCancel,
    // isButtonContact,
    // setTouched,
    // isButtonAddAndRedirect,
    // setShouldRedirect,
    // submitForm,
    // onGetCitizen,
    // shouldConfirmLeave,
  } = props;

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Field
            component={TextField}
            name="title"
            label="Title"
            fullWidth
            autoComplete="off"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            component={TextField}
            name="description"
            label="Description"
            fullWidth
            autoComplete="off"
            multiline
            required
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Field
            component={TextField}
            name="price"
            label="Price ($)"
            fullWidth
            autoComplete="off"
            required
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Field
            component={TextField}
            name="count"
            label="Count"
            fullWidth
            autoComplete="off"
            required
          />
        </Grid>
        <Grid item container xs={12} justify="space-between">
          <Button color="primary">Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!dirty || isSubmitting || !isValid}
          >
            Save Product
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

const emptyValues: any = ProductSchema.cast();

export default function PageProductForm() {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const onSubmit = (values: FormikValues) => {
    const formattedValues = ProductSchema.cast(values);

    if (product) {
      const handleUpdate = async () => {
        const { title, description, price, count } = formattedValues;
        const updatedValues = {
          ...(title !== product.title && { title }),
          ...(description !== product.description && { description }),
          ...(price !== product.price && { price }),
          ...(count !== product.count && { count }),
        };

        const updateResult = await updateProduct(id, updatedValues);
        setProduct(updateResult);
      };

      handleUpdate();
    } else {
      addProduct(formattedValues).then(() => history.push("/admin/products"));
    }
  };

  useEffect(() => {
    if (id) {
      const handleGetProduct = async () => {
        const product = await getProductById(id);

        setProduct(product);
        setIsLoading(false);
      };

      handleGetProduct();
    } else {
      setIsLoading(false);
    }
  }, [id]);

  if (isLoading) return <p>loading...</p>;

  return (
    <PaperLayout>
      <Typography component="h1" variant="h4" align="center">
        {id ? "Edit product" : "Create new product"}
      </Typography>
      <Formik
        initialValues={product || emptyValues}
        validationSchema={ProductSchema}
        onSubmit={onSubmit}
      >
        {(props: FormikProps<FormikValues>) => <Form {...props} />}
      </Formik>
    </PaperLayout>
  );
}
