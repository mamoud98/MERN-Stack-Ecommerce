const { handleDbErrors } = require("../helper/handelErrors");
const Product = require("../model/Product");
const sharp = require("sharp");

exports.CreateProduct = async (req, res) => {
  try {
    const img = await sharp(req.file.buffer)
      .resize({
        width: 308,
        height: 308,
      })
      .toBuffer();

    const product = await new Product({
      ...req.body,
      photo: img,
      contentType: req.file.mimetype,
    });
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    const err = handleDbErrors("Product validation failed", error);
    res.status(401).json(err);
  }
};

exports.productList = async (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  try {
    const product = await Product.find({})
      .select("-photo -contentType")
      .populate("category", "name")
      .sort([[sortBy, order]])
      .limit(limit);

    res.status(201).json(product);
  } catch (error) {
    res.status(401).json(error);
  }
};
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.find({ _id: req.params.ProductId })
      .select("-photo -contentType")
      .populate("category", "name");

    res.status(201).json(product);
  } catch (error) {
    res.status(401).json(error);
  }
};
exports.UpdateProduct = async (req, res) => {
  const img = await sharp(req.file.buffer)
    .resize({
      width: 308,
      height: 308,
    })
    .toBuffer();
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.ProductId },
      { ...req.body, photo: img, contentType: req.file.mimetype },
      {
        new: true,
      }
    );
    if (product) {
      res.status(201).json(product);
    } else {
      res.status(401).json("err");
    }
  } catch (error) {
    res.status(401).json(error);
  }
};
exports.DeleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.ProductId,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(401).json(error);
  }
};

exports.getImageProduct = async (req, res) => {
  try {
    const product = await Product.find({ _id: req.params.ProductId }).select(
      "photo contentType"
    );

    res.set("Content-type", product[0].contentType);
    res.status(201).send(product[0].photo);
  } catch (error) {
    res.status(401).json("error");
  }
};

exports.getProductByCategory = async (req, res) => {
  const { ProductId } = req.params;
  try {
    const product = await Product.findById(ProductId);

    const products = await Product.find({
      _id: { $ne: product._id },
      category: product.category,
    })
      .populate("category", "name")
      .select("-photo -contentType");

    if (products) {
      res.status(201).json(products);
    } else {
      res.status(401).json("no data");
    }
  } catch (error) {
    res.status(401).json(error);
  }
};
exports.listBySearch = (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};
  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        // gte -  greater than price [0-10]
        // lte - less than
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }
  try {
    Product.find(findArgs)
      .select("-photo -contentType")
      .populate("category")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, data) => {
        if (err) {
          return res.status(400).json({
            error: "Products not found",
          });
        }
        res.json({
          size: data.length,
          data,
        });
      });
  } catch (error) {
    res.status(401).json(error);
    console.log(error);
  }
};
exports.listSearch = async (req, res) => {
  const query = {};
  console.log(req.query);
  if (req.query.search) {
    query.name = { $regex: req.query.search, $options: "i" };
  }
  if (req.query.category && req.query.category !== "All") {
    query.category = req.query.category;
  }

  const product = await Product.find(query).select("-photo");
  try {
    res.json(product);
  } catch (error) {
    res.json(error);
  }
};
exports.decreaseQuantity = async (req, res, next) => {
  let bulkOps = req.body.order.products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item._id },
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  await Product.bulkWrite(bulkOps);
  try {
    next();
  } catch (error) {
    return res.json({
      error: "Could not update product",
    });
  }
};
