const express = require("express");
const router = express.Router();

const valid_url = require("valid-url");
const shortid = require("shortid");

const app = require("../firebase/fb_connect");
const { getDatabase, ref, set } = require("firebase/database");

const database = getDatabase(app);

const Shorten = async (req, res) => {
  const { longURL } = req.body;
  const baseURL = "http://localhost:5000";

  // Check base URL
  if (!valid_url.isUri(baseURL)) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid base URL" });
  }
  const urlCode = shortid.generate();

  // Check long URL
  if (valid_url.isUri(longURL)) {
    const shortURL = `${baseURL}/${urlCode}`;
    const ofirebase = async () => {
      await set(ref(database, "url/" + urlCode), {
        longURL,
        shortURL,
        urlCode,
      });
      res
        .status(200)
        .json({
          success: true,
          message: "Inserted Successfully ",
          url: shortURL,
        });
    };
    ofirebase();
  } else {
    res.status(401).json({ success: false, message: "Invalid longURL" });
  }
};

router.post("/shorten", Shorten);

module.exports = router;