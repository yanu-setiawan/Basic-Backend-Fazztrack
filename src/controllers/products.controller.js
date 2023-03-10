const productsModel = require("../models/products.model");

const getProducts = async (req, res) => {
  try {
    const { query } = req;
    const result = await productsModel.getProducts(query);
    if (result.rows.length === 0) {
      res.status(404).json({
        data: result.rows,
        msg: "Product not found",
      });
      return;
    }
    const meta = await productsModel.getMetaProducts(query);
    res.status(200).json({
      data: result.rows,
      meta,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

// params => query (search, filter, sort, paginasi) & path (get detail)
const getProductDetail = async (req, res) => {
  try {
    const { params } = req;
    const result = await productsModel.getProductDetail(params);
    if (result.rows.length === 0) {
      res.status(404).json({
        data: result.rows,
        msg: "Product not found",
      });
      return;
    }
    res.status(200).json({
      data: result.rows,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const insertProducts = async (req, res) => {
  const fileLink = `/images/${req.file.filename}`;
  try {
    const { body } = req;
    const result = await productsModel.insertProducts(body, fileLink);
    res.status(201).json({
      data: result.rows[0],
      msg: "Insert Success",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

// const updateProducts = async (req, res) => {
//   if (req.file === undefined) {
//     fileLink = req.body.image;
//   } else {
//     fileLink = `/images/${req.file.filename}`;
//   }
//   const fileLink = `/images/${req.file.filename}`;
//   try {
//     const { params, body } = req;
//     const result = await productsModel.updateProducts(params, body, fileLink);
//     res.status(201).json({
//       data: result.rows,
//       msg: "Update Product Success",
//     });
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).json({
//       msg: "Internal Server Error cuy",
//     });
//   }
// };
const updateProducts = async (req, res) => {
  try {
    let fileLink = req.body.image;
    if (req.file !== undefined) {
      fileLink = `/images/${req.file.filename}`;
    }
    const { params, body } = req;
    const result = await productsModel.updateProducts(params, body, fileLink);
    res.status(200).json({
      data: result.rows,
      msg: "Product updated successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const deleteProducts = async (req, res) => {
  try {
    const { params } = req;
    // eslint-disable-next-line no-unused-vars
    const result = await productsModel.deleteProducts(params);
    return res.status(200).json({
      data: result.rows,
      msg: "Product Deleted",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const patchImageProducts = async (req, res) => {
  const fileLink = `/images/${req.file.filename}`;
  console.log(fileLink);
  try {
    const result = await productsModel.updateImageProducts(
      fileLink,
      req.params.id
    );
    res.status(200).json({
      data: result.rows,
      msg: "Success Updating Image",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

module.exports = {
  getProducts,
  insertProducts,
  getProductDetail,
  updateProducts,
  deleteProducts,
  patchImageProducts,
};
