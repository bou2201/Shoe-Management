import Cart from "../models/Cart.js";

export const getCart = async (req, res) => {
  const { adminId } = req.params;

  try {
    const cart = await Cart.findOne({ admin: adminId });

    if (!cart) {
      res.status(200).json({ success: true, items: [] });
    } else {
      res.status(200).json({ success: true, items: cart.items });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(`Server error: ${error.message}`);
  }
};

export const addToCart = async (req, res) => {
  const { adminId } = req.params;
  const { shoeId, name, brand, size, price, quantity, quantityMax, image } =
    req.body;

  try {
    let cart = await Cart.findOne({ admin: adminId });

    if (!cart) {
      // Create new if not existing
      cart = new Cart({
        admin: adminId,
        items: [
          { shoeId, name, brand, size, price, quantity, quantityMax, image },
        ],
      });
    } else {
      let existItem = false;

      for (let i = 0; i < cart.items.length; i++) {
        const item = cart.items[i];
        if (item.shoeId.toString() === shoeId && item.size === size) {
          item.quantity += quantity;
          existItem = true;
          break;
        }
      }

      if (!existItem) {
        cart.items.push({
          shoeId,
          brand,
          name,
          size,
          price,
          quantity,
          quantityMax,
          image,
        });
      }
    }
    
    await cart.save();

    res
      .status(200)
      .json({ success: true, message: "Cart saved successfully", cart });
  } catch (error) {
    console.log(error);
    res.status(500).json(`Server error: ${error.message}`);
  }
};

export const removeCartItem = async (req, res) => {
  const { adminId, id } = req.params;

  try {
    const cart = await Cart.findOne({ admin: adminId });

    if (!cart) {
      res.status(404).json({ message: "Cart not found" });
      return;
    }

    const itemIndex = cart.items.map((item) => item._id.toString()).indexOf(id);
    if (itemIndex === -1) {
      // Item not found in cart
      res.status(404).json({ message: "Item not found in cart" });
      return;
    }
    cart.items.splice(itemIndex, 1);

    await cart.save();

    res
      .status(200)
      .json({ success: true, message: "Removing Cart Success", cart });
  } catch (error) {
    console.log(error);
    res.status(500).json(`Server error: ${error.message}`);
  }
};

export const updateCart = async (req, res) => {
  const { adminId } = req.params;
  const { items } = req.body;

  try {
    const cart = await Cart.findOne({ admin: adminId });

    if (!cart) {
      res.status(404).json({ message: "Cart not found" });
      return;
    }

    for (let i = 0; i < items.length; i++) {
      const { id, quantity } = items[i];
      const itemIndex = cart.items.findIndex(
        (item) => item._id.toString() === id
      );

      if (itemIndex === -1) {
        res
          .status(404)
          .json({ message: `Item with id ${id} not found in cart` });
        return;
      }

      cart.items[itemIndex].quantity = quantity;
    }

    await cart.save();

    res.status(200).json({ success: true, message: "Cart updated", cart });
  } catch (error) {
    console.log(error);
    res.status(500).json(`Server error: ${error.message}`);
  }
};
