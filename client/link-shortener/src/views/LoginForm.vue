<template>
  <body>
    <div class="position-absolute top-50 start-50 translate-middle">
      <div class="card bg-light pt-1 pb-1 p-1 shadow" style="width: 18rem;">
        <div class="card-body">
        <label for="" class="card-text">Email</label><br>
        <input type="email" placeholder="Email" class="form-control" aria-describedby="emailHelp" v-model="email">
        <label for="">Password</label><br>
        <input type="password" name="" id="" class="form-control" placeholder="Password" v-model="password">
        <br>
        <button @click="loginSuccess(email, password)" class="btn btn-primary">Login</button>
        <div class="card-text">
          <p>Dont have an account yet? Register <RouterLink to="/">here</RouterLink></p>
        </div>
      </div>
    </div>
    </div>    
  </body>
</template>

<script>
import { initializeApp } from "firebase/app"
import { getAuth,  signInWithEmailAndPassword } from "firebase/auth";
import axios from 'axios'

// const firebaseConfig = {
//   apiKey: "AIzaSyBQ6TioiC86BAcKfleP6QTL0WUiWRRQUGg",
//   authDomain: "express-crud1.firebaseapp.com",
//   projectId: "express-crud1",
//   storageBucket: "express-crud1.appspot.com",
//   messagingSenderId: "450407551559",
//   appId: "1:450407551559:web:68a374be04324096a4d762"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default {
  data () {
    return {
      email: "",
      password: "",
      id: 1
    }
  },
  methods: {
    async loginSuccess(email, password){
      try {
        const res = await axios.post("http://localhost:8000/user/login", {
          email: this.email,
          password: this.password,
        }).then((response)=>{
            console.log(response)
            // Signed in 
            // const user = userCredential.user;
            const uid = response.data
            console.log(uid)
            localStorage.setItem('uid', uid)
            this.$router.push({ path: `/user/${uid}` });
            // ...
          console.log(response)
        })
        } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
        // ..
      }
    }
  }
}
</script>

<style>

</style>
