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
