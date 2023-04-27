import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, getCart } from "../Store/createSlice";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useEffect } from "react";
import { STATUSES, fetchProducts } from "../Store/productSlice";

export default function MediaCard() {
  const dispatch = useDispatch();

  const { data: products, status } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  if (status === STATUSES.LOADING) {
    return <h2>Loading....</h2>;
  }

  if (status === STATUSES.ERROR) {
    return <h2>Something went wrong!</h2>;
  }

  return (
    <React.Fragment>
      <Grid
        container
        alignItems="center"
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 12, sm: 12, md: 12 }}
        sx={{
          padding: "10px 60px",
          marginLeft: "24px",
          marginRight: "24px",
          marginTop: "20px",
        }}
      >
        {products.map((product) => {
          return (
            <Grid item xs={12} sm={12} md={3} key={product.id}>
              <Card sx={{ maxWidth: 235 }}>
                <CardMedia
                  component="img"
                  height="130"
                  image={product.image}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="p" component="div">
                    {product.title}
                  </Typography>
                  <Typography variant="bold" color="text.secondary">
                    {product.category.toUpperCase()}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => dispatch(addToCart(product))}
                  >
                    Add to cart
                  </Button>
                  <Button size="small">
                    <CurrencyRupeeIcon />
                    {product.price}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </React.Fragment>
  );
}
