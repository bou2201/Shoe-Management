import { Button, Divider, Grid, Stack, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getCart } from "../../store/features/cartSlice";
import Empty from "../Shared/Empty";
import PageTitle from "../Shared/PageTitle";
import RemovePopover from "./RemovePopover";

const formatPrice = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const Cart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, totalDue } = useSelector((state) => state.cart);
  const { admin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const priceNumber = (price) => parseFloat(price?.replace(/[$,]/g, ""));

  useEffect(() => {
    dispatch(getCart(admin._id));
    // eslint-disable-next-line
  }, [cart]);

  useEffect(() => {
    document.title = "Cart - Shoe Management";
  }, [location]);

  return (
    <>
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
            {cart &&
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
                      id="outlined-number"
                      type="number"
                      size="small"
                      value={item.quantity}
                      min={1}
                      sx={{ paddingRight: "30px" }}
                      InputLabelProps={{
                        shrink: true,
                      }}
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
