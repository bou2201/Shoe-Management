import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  MenuItem,
  styled,
  Badge,
  FormHelperText,
} from "@mui/material";

const brands = [
  {
    value: "Nike",
    label: "Nike",
  },
  {
    value: "MLB",
    label: "MLB",
  },
  {
    value: "Vans",
    label: "Vans",
  },
  {
    value: "Unknown",
    label: "Unknown",
  },
];

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 25,
    top: 25,
    padding: "0 6px",
    backgroundColor: theme.palette.mainColor.purple,
    color: " #fff",
  },
}));

const UpdateForm = (props) => {
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

  return (
    <form onSubmit={props.handleSubmit}>
      <Grid container spacing={2} columns={12}>
        <Grid item xs={12}>
          <h4 className="content-title">Basic Information</h4>
        </Grid>
        {/* Name */}
        <Grid item md={4} xs={12}>
          <TextField
            label="Name"
            name="name"
            value={props.name || ""}
            onChange={props.handleOnChange}
            error={props.errorName}
            helperText={props.textName}
            id="outlined-start-adornment"
            placeholder="Name Product ..."
            fullWidth
          />
        </Grid>
        {/* Brand */}
        <Grid item md={4} xs={12}>
          <TextField
            id="outlined-select-brand"
            name="brand"
            value={props.brand || ""}
            onChange={props.handleOnChange}
            helperText={props.textBrand}
            error={props.errorBrand}
            select
            label="Brand"
            fullWidth
          >
            {brands.map((brand, i) => (
              <MenuItem key={i} value={brand.value}>
                {brand.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        {/* Price */}
        <Grid item md={4} xs={12}>
          <FormControl fullWidth>
            <InputLabel
              htmlFor="outlined-adornment-amount"
              error={props.errorPrice}
            >
              Price
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              label="Price"
              // type="number"
              name="price"
              onChange={props.handleOnChange}
              value={props.price || ""}
              error={props.errorPrice}
            />
            {props.textPrice && (
              <FormHelperText error={props.errorPrice}>
                {props.textPrice}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        {/* Description */}
        <Grid item md={6} xs={12}>
          <TextField
            id="outlined-multiline-flexible"
            value={props.description || ""}
            onChange={props.handleOnChange}
            helperText={props.textDesc}
            error={props.errorDesc}
            name="description"
            label="Description"
            multiline
            maxRows={5}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: 3 }}>
          <h4 className="content-title">Others Information</h4>
        </Grid>
        <Grid item md={4} xs={12}>
          <TextField
            label="Created At"
            name="createdAt"
            value={props.createdAt || ""}
            id="outlined-start-adornment"
            maxRows={2}
            fullWidth
            disabled
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <TextField
            label="Updated At"
            name="updateAt"
            value={props.updateAt || "No update !"}
            id="outlined-start-adornment"
            fullWidth
            disabled
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <TextField
            label="Code"
            name="code"
            value={props.code || ""}
            id="outlined-start-adornment"
            fullWidth
            disabled
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <TextField
            label="Status"
            name="status"
            value={props.status || ""}
            id="outlined-start-adornment"
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: 3 }}>
          <h4 className="content-title">Size & Quantity</h4>
        </Grid>
        {/* Variants */}
        {props.variants === Object &&
          props?.variants.map((variant, i) => (
            <Grid item md={2} xs={4} key={i}>
              <TextField
                label={variant.size || null}
                name={`variants.${i}.quantity`}
                type="number"
                onChange={props.handleOnChange}
                value={
                  variant.quantity === ""
                    ? (variant.quantity = 0)
                    : variant.quantity
                }
                id="outlined-start-adornment"
                fullWidth
                inputProps={{ min: 0, max: 99 }}
              />
            </Grid>
          ))}
        <Grid item xs={12} sx={{ mt: 3 }}>
          <h4 className="content-title">Images</h4>
        </Grid>
        {/* Images */}
        {props.image &&
          props?.image.map((img, i) => (
            <Grid item md={3} xs={6} key={i}>
              <StyledBadge badgeContent={i + 1}>
                <img src={img} alt="" className="image-update" />
              </StyledBadge>
            </Grid>
          ))}
      </Grid>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        mt={5}
        gap="20px"
      >
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{ textTransform: "capitalize" }}
        >
          Update
        </Button>
        <Button
          variant="contained"
          size="large"
          sx={{ textTransform: "capitalize" }}
          onClick={handleBack}
        >
          Go Back
        </Button>
      </Stack>
    </form>
  );
};

export default UpdateForm;
