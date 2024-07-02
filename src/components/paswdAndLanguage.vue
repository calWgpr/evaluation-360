<template>

    <div class="overlay">
     
        
        <section class='login' id='login'>
  <div class='head'>
  <h1 class='company'>{{ logsLabel }}</h1>
  </div>
  <p class='msg'>{{ pswdMsg }} <br> Mr(s) {{ nameUser }}</p>

  <div class='form'>
    
    <form  @submit.prevent="SendRegistration">

  <input  v-model="pswd" type="password" placeholder='Mot de passe (Teny miafina)' class='text' id='username' required><br>
  
  <input v-model="pswdConf" type="password" placeholder='Confirmation (Fameranana)' class='text' id='username' required><br>

  <button
              class="languageBtn"
              :class="{ 'selected': $store.state.languageSys  === 'french' }"
              type="button"
              @click="setLanguage('french')"
            >
              Français
            </button>
            <button
              class="languageBtn"
              :class="{ 'selected':$store.state.languageSys  === 'english' }"
              type="button"
              @click="setLanguage('english')"
            >
              English
            </button>
            <button
              class="languageBtn"
              :class="{ 'selected': $store.state.languageSys  === 'malagasy' }"
              type="button"
              @click="setLanguage('malagasy')"
            >
              Malagasy
            </button><br><br>

  <a @click="SendRegistration" v-if="$store.state.languageSys!='none' && pswd!='' && pswdConf!=''" type="submit"   id="signBtn" >{{ loginBtn }}</a>
<a @click="logoutx()" id="retournBTn" class="btn-login" >
            Retourner (Hiala)
          </a>
    </form>
   
  </div>
</section>
      </div>
  
  </template>
  
  <script>

import axios from 'axios';
     

  export default {
   
    mounted(){
      this.fetchNameUser();
     
    },
    data(){
        return{
          loginBtn:"S'inscrire (Hiditra)",
          logsLabel:"Evaluation 360",
          pswdMsg:"Initialisez votre mot de passe et votre langue (Mampidira teny miafina sy fiteny)",
         nameUser:"",
          pswd:"",
          pswdConf:"",
           passwordConfLabel:"Confirmation (Famerenana)",
           passwordLabel:"Mot de passe (Teny miafina)",
           pswdSendBtn:"Envoyer (Alefa)",
            languageEm:"",
        }
    },

    computed: {
      
    },


    methods: {
      logoutx(){
      location.reload()
    },
      fetchNameUser(){
        var formData = new FormData();
            formData.append("action", "fetchNameUser");
            formData.append("matriculeNbr",this.$store.state.matriculeNbr);
           
            axios
            .post(this.$store.state.fileConfContent, formData)
            .then((response) => {
                     
            this.nameUser=response.data.prenom;
            })
          .catch((err) => {
           console.log(err); 
      
        });
        
      },
      
     SendRegistration(){
        if(this.$store.state.languageSys!='none' && this.pswd!='' && this.pswdConf!=''){
            if(this.pswd!=this.pswdConf)this.cAlert("Votre mot de passe ne correspond pas au confirmation (Tsy mitovy ny teny miafina sy ny famerenana)")
            else {
                //Storing password and preferred language in the database
                var formData=new FormData();
                formData.append('action',"insertPswdAndLanguage");
                formData.append('pswd',this.pswd);
                formData.append('language',this.$store.state.languageSys);
                formData.append("matriculeNbr",this.$store.state.matriculeNbr)
                
                axios
          .post(this.$store.state.fileConfContent, formData)
          .then((response) => {
             this.cAlert("Compte sauvegardé (Voatahiry ny kaonty)");
              console.log(response);
              this.$store.commit("setInitAccount",false);
              this.$store.commit("setMainScreen",true);
          })
         .catch((err) => {
          
         console.log(err);
        
      });
            }
        }else this.cAlert("Veuillez completer les cases vide ou tapez une langue (Fenoy ny banga na mampidira fiteny)")
     },
  
      setLanguage(language) {
        this.$store.commit('setLanguageSys',language) 
        this.languageAspect();
     
      },
      languageAspect() {
       
        if (this.$store.state.languageSys == 'malagasy') {
          this.passwordConfLabel="Avereno eto ny teny miafina",
          this.passwordLabel= "Teny miafina";
          this.pswdSendBtn = "Alefa";
          this.languageEm = "Ho lasa amin'ny teny malagasy ny kaontinao";

        } else if (this.$store.state.languageSys == 'english') {
          this.passwordConfLabel="Confirm Password",
          this.passwordLabel= "Password";
          this.pswdSendBtn = "Send";
          this.languageEm = " Your account will be configured in English";

        } else {
          this.passwordConfLabel="Confirmer le mot de passe",
          this.passwordLabel= "Mot de passe";
          this.pswdSendBtn = "Envoyer";
          this.languageEm = "Votre compte sera configuré en français";
        }
      },
    },
  };
  </script>
  
  <style scoped>
 #signBtn{
  border: 3 px solid white; 
  font-size: large;
 }
 #signBtn:hover{
  background: transparent;
  color: #6d9773;
  transition: 0.5s;
 }
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
  
  .pswdInit-popup {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  }
  
  .languageBtn {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
    cursor: pointer;
    margin: 5px;
  }
  
  .selected {
    background-color:#6d9773; 
    color: white;
    border-color:#6d9773;
    
  }
  
body {
  background: #ABCDEF;
  font-family: Assistant, sans-serif;
  display: flex;
  min-height: 90vh;
}
.login {
  color: white;
  background: #267871 ;
  margin: auto;
  box-shadow: 
    0px 2px 10px rgba(0,0,0,0.2), 
    0px 10px 20px rgba(0,0,0,0.3), 
    0px 30px 60px 1px rgba(0,0,0,0.5);
  border-radius: 8px;
  padding: 50px;
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
.login .form input[type=password].text {
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
  color: #D3D3D3;
}
.login .form input[type=password].password {
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
  color: #D3D3D3;
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
  color: #B22222;
  font-size: 1.5em
}
.btn-login{
  margin-top: 200px;
}
#retournBTn{
  margin-left: 30px;
}
  </style>
  