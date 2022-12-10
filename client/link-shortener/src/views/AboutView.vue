<template>
  <body>
    <main>
      <div class="position-absolute top-50 start-50 translate-middle">
        <div class="card bg-light pt-1 pb-1 p-1 shadow-lg" style="width: 18rem;">
          <div class="card-body">
          <label for="" class="card-text">Email</label><br>
          <input type="email" placeholder="Email" class="form-control" aria-describedby="emailHelp" v-model="email" v-bind:required="email">
          <label for="">Password</label><br>
          <input type="password" name="" id="" class="form-control" placeholder="Password" v-model="password" v-bind:required="password">
          <div v-show="credMissing">
            <p>Please enter the valid credentials.</p>
          </div>
          <div v-show="emailTaken">
            <p>Email is already in use</p>
          </div>
          <div class="pt-3 left">
            <button @click="register()" class="btn btn-primary">Register</button>
          </div>
          <div class="formSubmitted" v-show="isComplete">
            <br>
            <p>Login </p> <router-link to="/about">here.</router-link>
          </div>
        </div>
      </div>
      </div>
    </main>
  </body>
</template>

<script>
// import { initializeApp } from "firebase/app"
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import axios from 'axios'

// const firebaseConfig = {
//   apiKey: "AIzaSyBQ6TioiC86BAcKfleP6QTL0WUiWRRQUGg",
//   authDomain: "express-crud1.firebaseapp.com",
//   projectId: "express-crud1",
//   storageBucket: "express-crud1.appspot.com",
//   messagingSenderId: "450407551559",
//   appId: "1:450407551559:web:68a374be04324096a4d762"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

export default {
data() {
  return {
    email : "",
    password : "",
    isComplete: false,
    credMissing: false,
    emailTaken: false
    }
  },
  methods: {
    async register() {
    try {
        const res = await axios.post("http://localhost:8000/user/register", {
          email: this.email,
          password: this.password
        }).then((response)=>{
          console.log(response.data)
          if(response.data.code != null){
            this.$router.push("/")
            this.credMissing = true
          }
          else if(response.data.code == 'auth/email-already-in-use'){
            this.emailTaken = true
          }
          // else if(response.data.code == 'auth/email-already-exists'){
          //   this.$router.push("/about")
          //   this.emailExist = true
          // }
          else {
            console.log(response)
              // Signed in 
              const uid = response.data
              console.log(uid)
              if(this.email !== null && this.password !== null){
              this.isComplete = true
              }
              else if (this.email === "" && this.password === ""){
                console.log('tes')
                this.emailMissing = true
                this.passwordMissing = true
              }
            console.log(response)
          }
          }
        )}
        catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
        // ..
      }
    },
    getDetails() {
      console.log('Successfully added')
    }
  }
}
</script>
