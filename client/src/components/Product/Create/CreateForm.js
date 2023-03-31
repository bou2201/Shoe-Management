import { useNavigate } from "react-router-dom";
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Stack,
  TextField,
} from "@mui/material";
import UploadImages from "./UploadImages";
import { brands } from "../../../constants";

const CreateForm = (props) => {
  const navigate = useNavigate();

  const handleBack = () => navigate(-1);

  return (
    <form
      className="create-product-form"
      onSubmit={props.handleSubmit}
      encType="multipart/form-data"
    >
      <Grid container spacing={2} columns={12}>
        <Grid item xs={12}>
          <h4 className="content-title">Basic Information</h4>
        </Grid>
        {/* Name */}
        <Grid item md={4} xs={12}>
          <TextField
            label="Name"
            name="name"
            value={props.name}
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
            value={props.brand}
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
              type="number"
              name="price"
              onChange={props.handleOnChangePrice}
              value={props.price}
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
        <Grid item md={5} xs={12}>
          <TextField
            id="outlined-multiline-flexible"
            value={props.description}
            onChange={props.handleOnChange}
            error={props.errorDesc}
            helperText={props.textDesc}
            name="description"
            label="Description"
            multiline
            minRows={1}
            maxRows={4}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: 3 }}>
          <h4 className="content-title">Size & Quantity</h4>
        </Grid>
        {/* Variants */}
        {props.variants.map((variant, i) => (
          <Grid item md={2} xs={4} key={i}>
            <TextField
              label={variant.size}
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
          <h4 className="content-title">Upload Images</h4>
        </Grid>
        {/* Images */}
        <Grid item lg={5} md={8} xs={12}>
          <UploadImages
            image={props.image}
            setFieldValue={props.setFieldValue}
          />
        </Grid>
      </Grid>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        mt={5}
        gap="20px"
      >
        <Button
          variant="outlined"
          size="large"
          sx={{ textTransform: "capitalize" }}
          onClick={handleBack}
        >
          Go Back
        </Button>
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{ textTransform: "capitalize" }}
        >
          Create
        </Button>
      </Stack>
    </form>
  );
};

export default CreateForm;
