<template>
  <div class="overlay">
    <section class="login" id="login">
      <div class="head">
        <h1 class="company">{{ logsLabel }}</h1>
      </div>
      <p class="msg">{{ pswdMsg }}<br> Mr(s) {{ nameUser }}</p>

      <div class="form">
        <form @submit.prevent="signIn">
          <input  v-model="signInInput" type="password" placeholder="Mot de passe (teny miafina)" class="text" id="username" required /><br />

          <a @click="signIn" type="submit" class="btn-login" id="do-login">{{
            loginBtn
          }}</a>
<a @click="logoutx()" id="retournBTn" class="btn-login" >
            Retourner (Hiala)
          </a>
         
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
// const nodemailer = require('nodemailer');

export default {
  mounted() {
    this.applyLanguage();
    this.fetchNameUser();
    
  },

  data() {
    return {
      nameUser: "",
      signInInput: "",
      signInBtn: "",
      signInLabel: "",
      sortirBtn:"",

      //lang
      logsLabel: "Evaluation 360",
      pswdMsg: "Entrez votre mot de passe (Ampidiro ny teny miafina)",
      loginBtn: "Se connecter (Hiditra)",
    };
  },

  computed: {},

  methods: {
    logoutx(){
      location.reload()
    },
    //       forgottenPswd(){

    //         const transporter = nodemailer.createTransport({
    //     host: 'smtp.ethereal.email',
    //     port: 587,
    //     auth: {
    //         user: 'jose.schuster44@ethereal.email',
    //         pass: 'ArSDPS2Vcb3uxPwcew'
    //     }
    // });

    // const mailOptions = {
    //   from: 'calwg28@gmail.com',
    //   to: 'calwgpr@gmail.com', // Recipient's email address
    //   subject: 'Password Reset Code',
    //   text: 'Your password reset code is: ABC123', // Your generated code here
    // };

    // transporter.sendMail(mailOptions, (error, info) => {
    //   if (error) {
    //     alert('Error sending email:', error);
    //   } else {
    //     alert('Email sent:', info.response);

    //     // Ethereal provides a URL to view the sent email details
    //     console.log('View the email details at:', nodemailer.getTestMessageUrl(info));
    //   }
    // });

    // },
    fetchNameUser() {
      var formData = new FormData();
      formData.append("action", "fetchNameUser");
      formData.append("matriculeNbr", this.$store.state.matriculeNbr);

      axios
        .post(this.$store.state.fileConfContent, formData)
        .then((response) => {
          this.nameUser = response.data.prenom;
        })
        .catch((err) => {
          console.log(err);
          
        });
    },

    applyLanguage() {
      if (this.$store.state.languageSys == "english") {
        this.signInLabel = "Password";
        this.signInBtn = "Log in";
      } else if (this.$store.state.languageSys == "french") {
        this.signInLabel = "Mot de passe";
        this.signInBtn = "Connexion";
      } else {
       
        this.signInLabel = "Teny miafina";
        this.signInBtn = "Hiditra";
      }
    },

    signIn() {
      var formData = new FormData();
      formData.append("action", "signIn");
      formData.append("matriculeNbr", this.$store.state.matriculeNbr);

      axios
        .post(this.$store.state.fileConfContent, formData)
        .then((response) => {
          //fetching password(if it matches the entered password) and applying the language choice to the current component
          const passwordFromServer = response.data.password;

          // Check if the entered password matches the server's password
          if (passwordFromServer === this.signInInput) {
         
            this.$store.commit("setSignIn", false);
            this.$store.commit("setMainScreen", true);
          } else {
           this.cAlert("Mot de passe incorrect (Diso ny teny miafina)");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.signIn-popup {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}

.forgot,
.btn-login {
  cursor: pointer;
  /* Set the cursor style to pointer for both elements */
}

body {
  background: #abcdef;
  font-family: Assistant, sans-serif;
  display: flex;
  min-height: 90vh;
}

.login {
  color: white;
  background:  #267871 ;
  margin: auto;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2), 0px 10px 20px rgba(0, 0, 0, 0.3),
    0px 30px 60px 1px rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  padding: 50px;
}
#retournBTn{
  margin-left: 10px;
  padding: 8px;
}
.login .head {
  display: flex;
  align-items: center;
  justify-content: center;
}

.login .head .company {
  font-size: 2.2em;
}

.login .msg {
  text-align: center;
}

.login .form input[type="password"].text {
  border: none;
  background: none;
  box-shadow: 0px 2px 0px 0px white;
  width: 100%;
  color: white;
  font-size: 1em;
  outline: none;
  margin-bottom: 25px;
}

.login .form .text::placeholder {
  color: #d3d3d3;
}

.login .form input[type="password"].password {
  border: none;
  background: none;
  box-shadow: 0px 2px 0px 0px white;
  width: 100%;
  color: white;
  font-size: 1em;
  outline: none;
  margin-bottom: 25px;
  margin-top: 20px;
}

.login .form .password::placeholder {
  color: #d3d3d3;
}

.login .form .btn-login {
  background: none;
  text-decoration: none;
  color: white;
  box-shadow: 0px 0px 0px 2px white;
  border-radius: 3px;
  padding: 5px 2em;
  transition: 0.5s;
 
}

.login .form .btn-login:hover {
  background: white;
  color: dimgray;
  transition: 0.5s;
}

.login .forgot {
  text-decoration: none;
  color: white;
  float: right;
}

footer {
  position: absolute;
  color: #136a8a;
  bottom: 10px;
  padding-left: 20px;
}

footer p {
  display: inline;
}

footer a {
  color: green;
  text-decoration: none;
}

footer a:hover {
  text-decoration: underline;
}

footer .heart {
  color: #b22222;
  font-size: 1.5em;
}</style>
