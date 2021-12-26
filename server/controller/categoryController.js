const Category = require("../model/category");
const { handleDbErrors } = require("../helper/handelErrors");
exports.addCategory = async (req, res) => {
  try {
    const category = await new Category(req.body);
    const data = await category.save();
    res.status(200).json(data);
  } catch (error) {
    if (error.code == 11000) {
      const err = {
        error: "Category should be unique",
      };
      res.json(err);
    } else {
      res.json(error);
    }
  }
};

exports.getCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const data = await Category.findById(categoryId);
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(401).json("no data");
    }
  } catch (error) {
    res.status(401).json(error);
  }
};
exports.deleteCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const data = await Category.findOneAndDelete({ _id: categoryId });
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(401).json("no data to delete");
    }
  } catch (error) {
    res.status(401).json(error);
  }
};
exports.updateCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const category = await Category.findOneAndUpdate(
      { _id: categoryId },
      req.body,
      {
        new: true,
      }
    );
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(401).json("no data");
    }
  } catch (error) {
    res.status(401).json(error);
  }
};
exports.listCategory = async (req, res) => {
  try {
    const category = await Category.find({});
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(401).json("no data");
    }
  } catch (error) {
    res.status(401).json(error);
  }
};
