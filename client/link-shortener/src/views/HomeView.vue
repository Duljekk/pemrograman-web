<script>
</script>

<template>

  <div class="jumbotron" style="margin-top: 25px; margin-left: 50px; margin-right: 50px;">
  <h1 class="display-5">Hello, World!</h1>

  <router-link to="/login">
  <button type="button" class="btn btn-primary">Log Out</button> 
  </router-link>

  <hr class="my-4">

  <div class="card" style="width: 30rem;">
    <div class="card-body">
      <h5 class="card-title">Shorten URL</h5>
      <form>
        <div class="form-row align-items-center">
          <div class="col-auto">
            <label class="sr-only" for="inlineFormInput">Enter URL here</label>
            <input type="text" class="form-control mb-2" id="inlineFormInput" placeholder="my.its.ac.id">
          </div>
          <div class="col-auto">
            <label class="sr-only" for="inlineFormInputGroup">Enter Short Link</label>
            <div class="input-group mb-2">
              <input type="text" class="form-control" id="inlineFormInputGroup" placeholder="myITS">
            </div>
          </div>
          <div class="col-auto">
          </div>
          <div class="col-auto">
            <button type="submit" class="btn btn-primary mb-2">Shorten</button>
          </div>
        </div>  
      </form>
    </div>
  </div>

  <br>

    <div class="d-grid gap-3">
    <div class="card d-grid gap-3 p-2" v-for="(links) in shortLink" :key="links.id" style="width: 30rem;">
      <div class="card-body">
      <h5 class="card-title">List of Shortened Link</h5>
        <h5 class="card-text">{{links.shortLink}}</h5>
        <p class="card-text">{{links.clickCount}}</p>
        <a href="#" class="btn btn-danger">Delete</a>
      </div>
    </div>
    </div>
  

  </div>

</template>

<script>

export default {
  data() {
    return {
      shortLink: [
        {id: 1, link: "test-link.com", shortLink: "l.id/123", clickCount: "46"},
        {id: 2, link: "test-link2.com", shortLink: "l.id/456", clickCount: "29"},
        {id: 3, link: "test-link3.com", shortLink: "l.id/789", clickCount: "12"}
      ]
    }
  }
}
</script>
