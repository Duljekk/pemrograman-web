<template>
  <div class="card bg-light pt-1 pb-1" style="width: 18rem;">
    <div class="card-body">
    <label for="" class="card-text">Username</label><br>
    <input type="text" v-model="newUser.username" placeholder="Username" class="form-control" aria-describedby="emailHelp">
    <label for="">Password</label><br>
    <input type="password" v-model="newUser.password" name="" id="" class="form-control" placeholder="Password">
    <br>
    <button @click="getDetails()" class="btn btn-primary">Register</button>
    <div class="formSubmitted" v-show="isComplete">
      <br>
      <p>Login </p> <router-link to="/login">here.</router-link>
    </div>
  </div>
</div>
</template>

<script>
import { collection, addDoc } from "firebase/firestore"; 

export default {
data() {
  return {
    isComplete: false,
    newUser: {
      username: "",
      password: "",
    }
    }
  },
  methods: {
    async getDetails () {
      const docRef = await addDoc(collection(db, "user"), this.newUser);
      console.log("Document written with ID: ", docRef.id);
      this.isComplete = true
    }
  }
}
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
