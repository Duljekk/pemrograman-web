<template>
<div class="card bg-light pt-1 pb-1" style="width: 18rem;">
    <div class="card-body">
    <label for="" class="card-text">Username</label><br>
    <input type="text" placeholder="Username" class="form-control" aria-describedby="emailHelp" v-model="username">
    <label for="">Password</label><br>
    <input type="password" name="" id="" class="form-control" placeholder="Password" v-model="password">
    <br>
    <button @click="loginSuccess(id)" class="btn btn-primary">Login</button>
    <p>Dont have an account yet? Register <RouterLink to="/about">here</RouterLink></p>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      username: "",
      password: "",
      id: 1
    }
  },
  methods: {
    loginSuccess (id) {
      this.$router.push({ path: `/user/${id}` });
    }
  }
}
</script>


<style>

</style>
