const express = require("express");
const router = express.Router();

import { getAuth,  signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import express from 'express';
import cors from 'cors';
import { db } from '../conf/db.js'
import { auth } from '../conf/config.js'

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

app.post("/user/register", (req, res)=>{
    const users = db.collection("userInfo")
    let email = req.body.email
    let password = req.body.password
    try {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential)=>{
            const user = userCredential.user
            const uid = user.uid
            res.send(uid)
        })
        // users.add({
        //     email: req.body.email,
        //     password: req.body.password
        // })
        // res.send({
        //     status: true,
        //     message: "Succesfully created user"
        // })
    }
    catch (e) {
        console.log(e)
    }
})

app.post("/user/login", (req, res)=>{
    const users = db.collection("userInfo")
    let email = req.body.email
    let password = req.body.password
    try {
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            const uid = user.uid
            console.log(uid)
            res.send(uid)
          })
        // let userData = []
        // users.get().then((querySnapshot)=>{
        //     querySnapshot.forEach((doc) => {
        //         let id = doc.id
        //         userData.push({ id, ...doc.data()})
        //     })
        //     res.send(userData)
        // })   
    }
    catch (e){
        console.log(e)
    }
})

module.exports = router;
