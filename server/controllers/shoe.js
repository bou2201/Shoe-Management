import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
import moment from "moment";
import Shoe from "../models/Shoe.js";

const formatPrice = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const getShoes = async (req, res) => {
  try {
    const allShoes = await Shoe.find({});

    res.status(200).json({ success: true, count: allShoes.length, allShoes });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: `Server error: ${err.message}` });
  }
};

export const getShoesByQuery = async (req, res) => {
  const { name, brand } = req.query;
  
  try {
    const filter = {};
    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }
    if (brand) {
      filter.brand = { $regex: brand, $options: "i" };
    }
    
    const searchResult = await Shoe.find(filter);

    res
      .status(200)
      .json({ success: true, count: searchResult.length, searchResult });
  } catch (error) {
    console.log(error);
    ress
      .status(500)
      .json({ success: false, message: `Server error: ${err.message}` });
  }
};

export const getShoeDetails = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: `ID ${id} is invalid ...` });
  }

  try {
    const details = await Shoe.findOne({ _id: id });

    res.status(200).json({ success: true, details });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: `Server error: ${err.message}` });
  }
};

export const createShoe = async (req, res) => {
  const { name, description, brand, price, variants } = req.body;

  const newShoe = new Shoe({
    name,
    description,
    brand,
    price: formatPrice.format(price),
    variants: JSON.parse(variants),
  });

  const imageURIs = [];
  const fileName = [];
  const files = req.files;

  for (const file of files) {
    imageURIs.push(file.path);
    fileName.push(file.filename);
  }

  const errorInput = !name || !description || !brand || !price || !variants;

  try {
    if (errorInput) {
      if (files) {
        cloudinary.api
          .delete_resources(fileName, { type: "upload" })
          .then((result) => console.log(result));
      }

      return res.status(400).json({
        message: "Failed to create new product...",
        fileName,
        imageURIs,
      });
    }

    if (files) {
      if (imageURIs.length == 0) {
        return res.status(400).json({ message: "Please select images ..." });
      }

      newShoe["image"] = imageURIs;
      await newShoe.save();

      return res
        .status(201)
        .json({ success: true, message: "Created successfully !", newShoe });
    }

    return res.status(400).json({ message: "Please select a file ..." });
  } catch (err) {
    console.log(err);
    res.status(500).json(`Server error: ${err.message}`);

    if (files) {
      cloudinary.api
        .delete_resources(fileName, { type: "upload" })
        .then((result) => console.log(result));
    }

    return res.status(400).json({
      message: "Failed to create new product...",
      fileName,
      imageURIs,
    });
  }
};

export const updateShoe = async (req, res) => {
  const { name, description, brand, price, variants } = req.body;
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: `ID ${id} is invalid ...` });
  }

  try {
    const updatedShoe = await Shoe.findByIdAndUpdate(
      id,
      {
        name,
        description: description || "",
        brand,
        price: formatPrice.format(price),
        variants: JSON.parse(variants),
        updateAt: new moment().format("LLLL"),
      },
      { new: true }
    );

    if (!updatedShoe) {
      return res.status(404).json({ message: "Shoe not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Updated Successfully !", updatedShoe });
  } catch (error) {
    console.log(error);
    res.status(500).json(`Server error: ${error.message}`);
  }
};

export const deleteShoe = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: `ID ${id} is invalid ...` });
  }

  try {
    const deletedShoe = await Shoe.findOneAndDelete({ _id: id });

    res
      .status(200)
      .json({ success: true, message: "Deleted Successfully !", deletedShoe });
  } catch (error) {
    console.log(error);
    res.status(500).json(`Server error: ${error.message}`);
  }
};
