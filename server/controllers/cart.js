import Cart from "../models/Cart.js";

export const getCart = async (req, res) => {
  const { adminId } = req.params;

  try {
    const cart = await Cart.findOne({ admin: adminId });

    if (!cart) {
      res.status(200).json({ success: true, items: [], total: 0 });
    } else {
      res
        .status(200)
        .json({ success: true, items: cart.items, total: cart.totalPrice });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(`Server error: ${error.message}`);
  }
};

export const addToCart = async (req, res) => {
  const { adminId } = req.params;
  const { shoeId, name, brand, size, price, quantity, image } = req.body;

  try {
    let cart = await Cart.findOne({ admin: adminId });

    if (!cart) {
      // Create new if not existing
      cart = new Cart({
        admin: adminId,
        items: [{ shoeId, name, brand, size, price, quantity, image }],
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
        cart.items.push({ shoeId, brand, name, size, price, quantity, image });
      }

      cart.total += price * quantity;
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
  const { adminId, id  } = req.params;

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
