const express = require("express");
const router = express.Router();

const app = require("../firebase/fb_connect");
const { getDatabase, ref, child, get } = require("firebase/database");
const dbRef = ref(getDatabase(app));

router.get("/:code", (req, res) => {
  get(child(dbRef, `url/${req.params.code}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log("redirecting");
        const longURL = snapshot.val().longURL;
        return res.redirect(longURL);
      } else {
        return res
          .status(404)
          .json({ success: false, message: "URL doesn't exist" });
      }
    })
    .catch((error) => {
      return res.status(500).json({ success: false, message: error });
    });
});

module.exports = router;