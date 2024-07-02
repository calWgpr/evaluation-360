<template>

  <div  class="overlay">
   
      
      
      <section class='login' id='login'>
  <div class='head'>
  <h1 class='company'>{{ matriculeLogsLabel }}</h1>
  </div>
  <p class='msg'>{{ matriculeMsg }} <br>(Ampidiro ny N°Matricule)</p>

  <div class='form'>
    
    <form  @submit.prevent="verifyPersoPswd">

  <input @input="blockNegativeNumbers" :autofocus="$store.state.gMatriculation" v-model="matriculationNbr" type="number" placeholder='Matricule' class='text' id='username' required><br>
  
 

  <a @click="verifyPersoPswd" type="submit"  class='btn-login' id='do-login'>{{ loginBtn }}</a>




    </form>

 
  </div>
</section>

  
    
  </div>

  
</template>

<script>
import axios from 'axios';


export default {

  mounted(){
    this.readFile()
  this.setFocus()
  },
  
  data(){
      return{
        pswdState:"",
        matriculationNbr:"",
         matriculeLabel:"Matricule",
         matriculeSendButton:"Envoyer",
        
        //  lang
        matriculeLogsLabel:"Evaluation 360",
        matriculeMsg:"Veuillez entrez votre matricule ",
        loginBtn:"Envoyer (Alefa)"
      }
  },

  computed: {
    
  },


  methods: {
     readFile() {
  const filePath = 'configurationEv360App.txt';

  fetch(filePath)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(content => {
      // Split content by line breaks and get the first line
      const lines = content.split('\n');
      const firstLine = lines[0]; // First line of the content
  var i=0, realAddress=[]

while (firstLine[i]!='/') {
    i++;   
}
for (let k = i; k < firstLine.length; k++) {
  realAddress.push(firstLine[k]);
}

// Construct the real address by joining the address array and prepending 'http:/'
 realAddress = 'http:/' + realAddress.join('');
      // Update the store with the first line content
     
      // Alert or use the first line content as needed
      
       this.$store.commit("setFileConfContent", realAddress);
       

    })
    .catch(error => {
      console.error('There was a problem with the configuration file path:', error);
    });
},

    setFocus(){
      document.getElementById("username").autofocus=true;
    },
     blockNegativeNumbers(event) {
      // Check if the entered value is negative
      if (event.target.value < 0) {
        // If it's negative, set the input value to 0
         this.matriculationNbr= "";
      }
    },
    
     
      verifyPersoPswd(){
        
        if(this.matriculationNbr!=""){
          var formData = new FormData();
          formData.append("action", "verifyPswd");
          formData.append("matriculeNbr",this.matriculationNbr);
          

          axios
          .post(this.$store.state.fileConfContent, formData)
          
          .then((response) => {
        this.pswdState = response.data.password;
        this.$store.commit("setMatriculeNbr",this.matriculationNbr);
       
       
        //password verification
        if(this.pswdState ==-1){
          document.getElementById("username").autofocus=false;
          //user doesnt have an account yet
            this.$store.commit("setInitAccount",true);
            this.$store.commit("setgMatriculation",false);
           
           
        }else{
          //user already has an account
          document.getElementById("username").autofocus=false;
          this.$store.commit("setSignIn",true);
          this.$store.commit("setgMatriculation",false);
          this.$store.commit("setLanguageSys",response.data.language);
         
        }
       
      })
        .catch((err) => {
         console.log("ok"); 
         
      });
    }
      
      },
  },
};
</script>

<style >



.forgot, .btn-login {
  cursor: pointer; /* Set the cursor style to pointer for both elements */
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

.matricule-popup {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}

body {
  background: white;
  font-family: Assistant, sans-serif;
  display: flex;
  min-height: 90vh;
}
.login {
  color: white;
 background:  #267871 ;
  /* background: 
    -webkit-linear-gradient(to right, #267871, #136a8a);
  background: 
    linear-gradient(to right, #267871, #136a8a); */
   
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
.login .form input[type=number].text {
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
.login .form input[type=text].password {
  border: none;
  background: none;
  box-shadow: 0px 2px 0px 0px white;
  width: 100%;
  color: white;
  font-size: 1em;
  outline: none;
  margin-bottom: 20px;
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
</style>
