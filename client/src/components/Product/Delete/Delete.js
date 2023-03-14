// import { Button, Grid, Stack, TextField } from "@mui/material";
// import React, { useContext, useEffect, useRef } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// import { ProductContext } from "../../../contexts/ProductContext";
// import PageTitle from "../../PageTitle";
// import DialogAlert from "./DialogAlert";

// const Delete = () => {
//   const navigate = useNavigate();
//   const handleBack = () => navigate(-1);
//   const { id } = useParams();
//   const productRef = useRef(null);
//   const {
//     productState: { product },
//     detailsProduct,
//     deleteProduct,
//   } = useContext(ProductContext);

//   useEffect(() => {
//     if (id !== productRef.current) {
//       detailsProduct(id);
//       productRef.current = id;
//     }
//   }, [id, detailsProduct]);

//   useEffect(() => {
//     document.title = `${product?.name}`;
//   }, [product?.name]);

//   console.log(product?.variants);

//   return (
//     <>
//       <PageTitle title="Delete Product" />
//       <section className="product-delete">
//         <Grid container spacing={2} columns={12}>
//           <Grid item xs={12}>
//             <h4 className="content-title">Basic Information</h4>
//           </Grid>
//           {/* Name */}
//           <Grid item md={4} xs={12}>
//             <TextField
//               label="Name"
//               name="name"
//               value={product?.name}
//               id="outlined-start-adornment"
//               placeholder="Name Product ..."
//               fullWidth
//               autoFocus
//               disabled
//             />
//           </Grid>
//           {/* Brand */}
//           <Grid item md={4} xs={12}>
//             <TextField
//               id="outlined-select-brand"
//               name="brand"
//               value={product?.brand}
//               label="Brand"
//               fullWidth
//               autoFocus
//               disabled
//             />
//           </Grid>
//           {/* Price */}
//           <Grid item md={4} xs={12}>
//             <TextField
//               id="outlined-select-brand"
//               name="brand"
//               value={product?.price}
//               label="Price"
//               fullWidth
//               autoFocus
//               disabled
//             />
//           </Grid>
//           {/* Description */}
//           <Grid item md={6} xs={12}>
//             <TextField
//               id="outlined-multiline-flexible"
//               value={product?.description}
//               name="description"
//               label="Description"
//               multiline
//               maxRows={5}
//               fullWidth
//               autoFocus
//               disabled
//             />
//           </Grid>
//           <Grid item md={3} xs={12}>
//             <TextField
//               label="Status"
//               name="status"
//               value={product?.status}
//               id="outlined-start-adornment"
//               fullWidth
//               disabled
//               autoFocus
//             />
//           </Grid>
//           <Grid item md={3} xs={12}>
//             <TextField
//               label="Code"
//               name="code"
//               value={product?.code}
//               id="outlined-start-adornment"
//               fullWidth
//               disabled
//               autoFocus
//             />
//           </Grid>
//           <Grid item xs={12} sx={{ mt: 3 }}>
//             <h4 className="content-title">Size & Quantity</h4>
//           </Grid>
//           {/* Variants */}
//           {product?.variants.map((variant, i) => (
//             <Grid item md={2} xs={4} key={i}>
//               <TextField
//                 label={variant.size || null}
//                 name={`variants.${i}.quantity`}
//                 type="number"
//                 value={variant.quantity || ""}
//                 id="outlined-start-adornment"
//                 fullWidth
//                 disabled
//               />
//             </Grid>
//           ))}
//         </Grid>

//         <Stack
//           direction="row"
//           alignItems="center"
//           justifyContent="center"
//           mt={5}
//           gap="20px"
//         >
//           <DialogAlert deleteProduct={deleteProduct} _id={product?._id} />
//           <Button
//             variant="contained"
//             sx={{ textTransform: "capitalize" }}
//             onClick={handleBack}
//           >
//             Go Back
//           </Button>
//         </Stack>
//       </section>
//     </>
//   );
// };

// export default Delete;
