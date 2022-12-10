<template>
  <body>
    <div class="position-absolute top-50 start-50 translate-middle">
      <div class="card bg-light pt-1 pb-1 p-1 shadow" style="width: 18rem;">
        <div class="card-body">
        <label for="" class="card-text">Email</label><br>
        <input type="email" placeholder="Email" class="form-control" aria-describedby="emailHelp" v-model="email">
        <div v-show="invEmail">
          <p>
            Please input valid email.
          </p>
        </div>
        <p v-show="emailExist">
          This email is already taken! Anda yang jomblo
        </p>
        <label for="">Password</label><br>
        <input type="password" name="" id="" class="form-control" placeholder="Password" v-model="password">
        <div v-show="invPassword">
          <p>Please input valid password</p>
        </div>
        <div v-show="wrongPassword">
          <p>Your password is wrong</p>
        </div>
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

const firebaseConfig = {
  apiKey: "AIzaSyBQ6TioiC86BAcKfleP6QTL0WUiWRRQUGg",
  authDomain: "express-crud1.firebaseapp.com",
  projectId: "express-crud1",
  storageBucket: "express-crud1.appspot.com",
  messagingSenderId: "450407551559",
  appId: "1:450407551559:web:68a374be04324096a4d762"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default {
  data () {
    return {
      email: "",
      password: "",
      id: 1,
      invEmail: false,
      invPassword: false,
      wrongPassword: false,
      emailExist: false    
    }
  },
  methods: {
    async loginSuccess(email, password){
      try {
        const res = await axios.post("http://localhost:8000/user/login", {
          email: this.email,
          password: this.password,
        }).then((response)=>{
          if(response.data.code == 'auth/invalid-email'){
            this.$router.push("/about")
            this.invEmail = true
          }
          else if(response.data.code == 'auth/invalid-password'){
            this.$router.push("/about")
            this.invPassword = true
          }
          else if(response.data.code == 'auth/internal-error'){
            this.$router.push("/about")
            this.invPassword = true
          }
          else if(response.data.code == 'auth/user-not-found'){
            this.$router.push("/about")
            this.invEmail = true
          }
          else if(response.data.code == 'auth/wrong-password'){
            this.$router.push("/about")
            this.wrongPassword = true
          }
          else if(response.data.code == 'auth/email-already-exists'){
            this.$router.push("/about")
            this.emailExist = true
          }
          else if(response.data.code == 'auth/too-many-requests'){
            this.$router.push("/about")
            this.wrongPassword = true
          }
          else {
            console.log(response)
            // Signed in 
            // const user = userCredential.user;
            const uid = response.data
            console.log(uid)
            localStorage.setItem('uid', uid)
            this.$router.push({ path: `/user/${uid}` });
            // ...
          console.log(response)
          }
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
