const User = require("../models/userModel");
const Recipe = require('../models/recipeModel')
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const path = require("path");
const fs = require("fs/promises");
const jimp = require("jimp");
const { SECRET_KEY } = process.env;

const { ctrlWrapper } = require("../helpers/index");
const { HttpError } = require("../helpers");
const storeImage = path.resolve("public", "avatars");
const { uploadImage, updateLoadedImage } = require("../helpers/cloudinary");

const userRegistration = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: "Email is already in use",
      data: "Conflict",
    });
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatar = await gravatar.url(email, { s: "200" });
  try {
    const newUser = await User.create({
      ...req.body,
      avatarURL: avatar,
      password: hashPassword,

    });
    const { id } = newUser;
    const payload = { id: newUser._id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(id, { token });

    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        message: "Registration successful",
        email: newUser.email,
        avatarURL: newUser.avatarURL,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

const userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401);
  }

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    throw HttpError(401);
  }
  const { id } = user;
  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(id, { token });
  res.json({
    token,
  });
};

const userLogout = async (req, res, next) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({
    message: "Logout success",
  });
};

const userCurrent = async (req, res, next) => {
  const { id } = req.user;
  const currentUser = await User.findById(id, {name: 1, email: 1, avatarURL: 1, token: 1, ownRecipes: 1, shoppingList: 1}).populate({
    path: "ownRecipes",
    populate: { path: "_id", model: Recipe },
  });
  res.json(currentUser);
};

const userUpdateAvatar = async (req, res, next) => {
  const { id } = req.user;
  const user = await User.findById(id);
  const { name } = req.body;
  const updName = name.trim() === "" ? user.name : name
  let result = {};
  if (req.file) {
    const { path: temporaryName } = req.file;
    try {
      if (user.avatar) {
        const { public_id } = user.avatar;

        result = await updateLoadedImage(temporaryName, public_id);
      } else {
        result = await uploadImage(temporaryName);
      }

      fs.unlink(temporaryName);
    } catch (error) {
      fs.unlink(temporaryName);
      next(error);
    }
  }

  await User.findByIdAndUpdate(id, {
    name: updName,
    avatarURL: result.hasOwnProperty('url') ? result.url : user.avatarURL,
    avatar: result.hasOwnProperty('url') ? result : user.avatar,
  });

  res.status(200);
  res.json({message: `Avatar url is: ${result.hasOwnProperty('url') ? result.url : user.avatarURL}, username is ${updName}`});
};

module.exports = {
  userRegistration: ctrlWrapper(userRegistration),
  userLogin: ctrlWrapper(userLogin),
  userLogout: ctrlWrapper(userLogout),
  userCurrent: ctrlWrapper(userCurrent),
  userUpdateAvatar: ctrlWrapper(userUpdateAvatar),
};
