import { useDispatch, useSelector } from "react-redux";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, ButtonGroup, Grid, IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {
  cartTotal,
  clearCart,
  decreaseCart,
  getCart,
  getCompleteCart,
  increaseCart,
  removeFromCart,
} from "../Store/createSlice";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

export default function CartPages() {
  const products = useSelector(getCart);
  console.log("rowdatafsdfdsfsdf", products);
  const subTotal = useSelector(getCompleteCart);
  useEffect(() => {
    dispatch(cartTotal());
  }, [subTotal]);
  const dispatch = useDispatch();

  const handleCartIncrement = (product) => {
    dispatch(increaseCart(product));
  };
  const handleCartDecrement = (product) => {
    dispatch(decreaseCart(product));
  };
  const handleclearCart = () => {
    dispatch(clearCart());
  };
  return (
    <>
      <h1 className="mainHeading">Shopping Cart</h1>
      {products.length === 0 ? (
        <h3 style={{ textAlign: "center" }}> Your Cart is Empty!</h3>
      ) : (
        <div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <TableContainer component={Paper} style={{ width: "97%" }}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">Item(s)</StyledTableCell>
                    <StyledTableCell align="center">Product(s)</StyledTableCell>
                    <StyledTableCell align="center">Price</StyledTableCell>
                    <StyledTableCell align="center">Quantity</StyledTableCell>
                    <StyledTableCell align="center">Total</StyledTableCell>
                    <StyledTableCell align="center">Action</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((product) => (
                    <StyledTableRow key={product.id}>
                      <StyledTableCell component="th" scope="row">
                        <img height={120} src={product.image} />
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {product.title}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        &#x20b9;{product.price}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <ButtonGroup size="small">
                          {product.cartQuantity === 1 ? (
                            <Button disabled>-</Button>
                          ) : (
                            <Button
                              onClick={() => handleCartDecrement(product)}
                            >
                              -
                            </Button>
                          )}
                          <Button disabled>{product.cartQuantity}</Button>
                          <Button onClick={() => handleCartIncrement(product)}>
                            +
                          </Button>
                        </ButtonGroup>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        &#x20b9;
                        {(product.cartQuantity * product.price).toFixed(2)}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <IconButton
                          onClick={() => dispatch(removeFromCart(product))}
                        >
                          <DeleteOutlineIcon
                            style={{ color: "rgba(232,84,43)" }}
                          />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Grid
              container
              width="95%"
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "4%",
              }}
            >
              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "rgba(232,84,43)",
                  }}
                  onClick={() => handleclearCart()}
                >
                  Clear Cart
                </Button>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                style={{
                  textAlign: "right",
                  maxWidth: "25%",
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h3 style={{ margin: 0, color: "#3B3C36" }}>SubTotal</h3>
                  <h3 style={{ margin: 0, color: "#3B3C36" }}>
                    &#x20b9;{subTotal.cartTotalAmount.toFixed(2)}
                  </h3>
                </div>
                <Button
                  variant="outlined"
                  size="large"
                  style={{
                    color: "rgba(232,84,43)",
                    border: "1px solid rgba(232,84,43)",
                    minWidth: "100%",
                    marginTop: "10px",
                  }}
                >
                  Checkout
                </Button>
                <IconButton style={{ display: "flex", flex: "start" }}>
                  <Link to="/">
                    <KeyboardBackspaceIcon style={{ color: "#3B3C36" }} />
                  </Link>
                </IconButton>
              </Grid>
            </Grid>
          </div>
        </div>
      )}
    </>
  );
}
