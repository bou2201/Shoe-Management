import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box, Button, Divider, Grid, Stack, TextField } from "@mui/material";
import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";

import { getCart, updateCart } from "../../store/features/cartSlice";
import Empty from "../Shared/Empty";
import PageTitle from "../Shared/PageTitle";
import RemovePopover from "./RemovePopover";
import { useFormik } from "formik";
import AlertMessage from "../Shared/AlertMessage";

const formatPrice = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const priceNumber = (price) => parseFloat(price?.replace(/[$,]/g, ""));

const Cart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, totalDue } = useSelector((state) => state.cart);
  const { admin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    dispatch(getCart(admin._id));
  }, [admin._id, dispatch, totalDue]);

  useEffect(() => {
    document.title = `Cart (${cart.length}) - Shoe Management`;
  }, [location, cart.length]);

  const cartItem =
    typeof cart === "object" && Array.isArray(cart)
      ? cart.map((item) => ({
          id: item._id,
          quantity: item.quantity,
        }))
      : [];

  const formik = useFormik({
    initialValues: {
      items: cartItem,
    },
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      try {
        const updatedCart = await dispatch(updateCart(admin._id, values));

        if (updatedCart.success) {
          setAlert({
            type: "success",
            status: "Success",
            message: "Updated cart successfully !",
          });
          setTimeout(() => setAlert(null), 3000);
        }

        console.log(updatedCart);
      } catch (error) {
        console.log(error);
      }
      resetForm({
        values: {
          items: cartItem,
        },
      });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    formik.handleSubmit(e);
  };

  const handleQuantityChange = (event, itemId) => {
    const { value } = event.target;
    const updatedItems = formik.values.items.map((cartItem) => {
      if (cartItem.id === itemId) {
        return {
          ...cartItem,
          quantity: +value,
        };
      }
      return cartItem;
    });
    formik.setValues({
      ...formik.values,
      items: updatedItems,
    });
  };

  return (
    <>
      <AlertMessage info={alert} />
      <PageTitle title="Shopping Cart" />
      <section className="cart-content">
        <h4 className="content-title">All Items: {cart.length}</h4>
        {cart.length === 0 ? (
          <Empty />
        ) : (
          <>
            <Grid container columns={12} sx={{ mb: 2, mt: 3 }}>
              <Grid item md={4} sx={{ paddingLeft: "20px" }}>
                <h4>Product item</h4>
              </Grid>
              <Grid item md={2} sx={{ paddingLeft: "20px" }}>
                <h4>Quantity</h4>
              </Grid>
              <Grid item md={2} sx={{ paddingLeft: "20px" }}>
                <h4>Price</h4>
              </Grid>
              <Grid item md={2} sx={{ paddingLeft: "20px" }}>
                <h4>Subtotal</h4>
              </Grid>
              <Grid item md={2} sx={{ paddingLeft: "20px" }}>
                <h4>Remove</h4>
              </Grid>
            </Grid>
            <Divider />
            <form onSubmit={handleSubmit}>
              <Box sx={{ maxHeight: "550px", overflow: "scroll" }}>
                {typeof cart === "object" &&
                  Array.isArray(cart) &&
                  cart.map((item) => (
                    <Grid container columns={12} sx={{ mt: 4 }} key={item._id}>
                      <Grid item md={4}>
                        <Stack direction="row" gap={3}>
                          <div className="cart-item-image">
                            <img src={item.image} alt="" />
                          </div>
                          <Stack direction="column">
                            <h4 className="cart-item-name">{item.name}</h4>
                            <span className="cart-item-span">
                              Size: <b>{item.size}</b>
                            </span>
                            <span className="cart-item-span">
                              Brand: <b>{item.brand}</b>
                            </span>
                          </Stack>
                        </Stack>
                      </Grid>
                      <Grid item md={2} sx={{ paddingLeft: "20px" }}>
                        <TextField
                          type="number"
                          size="small"
                          sx={{ paddingRight: "30px" }}
                          value={
                            formik.values.items.find(
                              (cartItem) => cartItem.id === item._id
                            )?.quantity
                          }
                          InputLabelProps={{
                            shrink: true,
                          }}
                          inputProps={{
                            step: 1,
                            min: 1,
                            max: item.quantityMax,
                          }}
                          onChange={(event) =>
                            handleQuantityChange(event, item._id)
                          }
                        />
                      </Grid>
                      <Grid item md={2} sx={{ paddingLeft: "20px" }}>
                        <h4>{item.price}</h4>
                      </Grid>
                      <Grid item md={2} sx={{ paddingLeft: "20px" }}>
                        <h4>
                          {formatPrice.format(
                            priceNumber(item.price) * item.quantity
                          )}
                        </h4>
                      </Grid>
                      <Grid item md={1} sx={{ paddingLeft: "20px" }}>
                        <RemovePopover adminId={admin._id} _id={item._id} />
                      </Grid>
                    </Grid>
                  ))}
              </Box>
              <Stack direction="row" justifyContent="center">
                <Button
                  variant="text"
                  startIcon={<ChangeCircleOutlinedIcon />}
                  size="large"
                  type="submit"
                  sx={{ mt: 4 }}
                  disabled={!formik.dirty}
                >
                  Update Cart
                </Button>
              </Stack>
            </form>
            <Divider sx={{ mt: 4, mb: 4 }} />
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack direction="row" alignItems="center" gap={4}>
                <h3>Total Due:</h3>
                <h2>{formatPrice.format(totalDue)}</h2>
              </Stack>
              <Stack direction="row" gap={2}>
                <Button variant="outlined" onClick={() => navigate(-1)}>
                  Go Back
                </Button>
                <Button variant="contained">Checkout</Button>
              </Stack>
            </Stack>
          </>
        )}
      </section>
    </>
  );
};

export default Cart;
