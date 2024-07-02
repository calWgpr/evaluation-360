<template>
<div class="menu-container">
        
        <ul>
         
          <li> <button type="button" @click=" divChangeLanguage=true">Change Language</button></li> 
          <li><button type="button" @click="$store.commit('setChoice',false);$store.commit('setMainScreen',true)">main screen</button></li>
        </ul>

    </div>

    <div :style="{ marginLeft: '250px' }">

    <p>{{ choiceLabel }}</p>
    <form @submit.prevent="choose">
        
        <!-- display bloc of each existing services in the company(except the service of oneself ) -->
        <ul id="S1">
           <li v-for="i in alternatives" :key="i.matriculePerso"><button  class="btnSer"  :class="{ selected: perso.includes(i.matriculePerso)}" @click="select(i.matriculePerso);" v-if="i.idService==7" type="button">{{i.nom }} {{ i.prenom }}</button></li>
        </ul>
       
        <ul id="S2">
           <li v-for="i in alternatives" :key="i.matriculePerso"><button  class="btnSer"  :class="{ selected: perso.includes(i.matriculePerso)}" @click="select(i.matriculePerso)" v-if="i.idService==5666" type="button">{{i.nom }} {{ i.prenom }}</button></li>
        </ul>
       
        <ul id="S3">
           <li v-for="i in alternatives" :key="i.matriculePerso"><button class="btnSer" :class="{ selected: perso.includes(i.matriculePerso)}" @click="select(i.matriculePerso)" v-if="i.idService==4561" type="button">{{i.nom }} {{ i.prenom }}</button></li>
        </ul>
       

        <ul id="S4">
           <li v-for="i in alternatives" :key="i.matriculePerso"><button  class="btnSer" :class="{ selected: perso.includes(i.matriculePerso)}" @click="select(i.matriculePerso)" v-if="i.idService==0" type="button">{{i.nom }} {{ i.prenom }}</button></li>
        </ul>

        <button  class="btnSer"  type="submit">{{ submitChoiceBtn }}</button>

    </form>
    </div>

    <div  class="overlay" v-if="divChangeLanguage" id="changeLanguage">
          
          <button
            class="languageBtn"
            :class="{ 'selected': languageTemp === 'french'  }"
            type="button"
            @click="languageTemp='french';$store.commit('setLanguageSys','french');changeLanguage();divChangeLanguage=false"
          >
            Français
          </button>
          <button
            class="languageBtn"
            :class="{ 'selected':languageTemp  === 'english' }"
            type="button"
            @click="languageTemp='english';$store.commit('setLanguageSys','english');changeLanguage();divChangeLanguage=false"
          >
            English
          </button>
          <button
            class="languageBtn"
            :class="{ 'selected': languageTemp  === 'malagasy' }"
            type="button"
            @click="languageTemp='malagasy';$store.commit('setLanguageSys','malagasy');changeLanguage();divChangeLanguage=false"
          >
            Malagasy
          </button>
          
        </div>
</template>

<script>
import axios from 'axios';
    export default{
        data(){
            return{
              languageTemp:"",
        divChangeLanguage:false,
              perso:[],
                choiceLabel:"",
                submitChoiceBtn:"choose",
                alternatives:[],
            }

               
            },
        

        mounted(){
          this.listPerso();
                
           
        },

    methods:{
      changeLanguage(){
        
        var formData=new FormData();
                formData.append('action',"changeLanguage");
                formData.append('matriculeNbr',this.$store.state.matriculeNbr);
                formData.append("languageSys",this.$store.state.languageSys);

                axios
          .post(this.$store.state.fileConfContent, formData)
          .then((response) => {
            console.log("inserted new language");
            alert("inserted new language");
            
        
       
      })
        .catch((err) => {
         console.log(err); 
         alert("failure");
        
      });
      },
      logout(){
          this.$store.commit("setChoice",false);
          this.$store.commit("setgMatriculation",true);
      },
        listPerso(){
            var formData=new FormData();
                formData.append("action", "listPerso");

                formData.append("matriculeNbr", this.$store.state.matriculeNbr);
                
                axios
          .post(this.$store.state.fileConfContent, formData)
          .then((response) => {
        this.alternatives= response.data;
        
       
      })
        .catch((err) => {
         console.log(err); 
         alert("failure");
        
      });
        },

        choose(){
            if(this.perso.length<2)
                alert("Choisissez au moins 2 personnes");
              else{
            
            var formData=new FormData();
                formData.append("action", "choose");

                formData.append("matriculeNbr", this.$store.state.matriculeNbr);
                formData.append("perso1",this.perso[0]);
                formData.append("perso2",this.perso[1]);
                if(this.perso.length==3) formData.append("perso3",this.perso[2]);
                else formData.append("perso3","");
                
                axios
          .post(this.$store.state.fileConfContent, formData)
          .then((response) => {
       
        console.log(response);
        this.$store.commit("setChoice",false);

        this.$store.commit("setMainScreen",true);
        

        
       
      })
        .catch((err) => {
         console.log(err); 
         alert("failure");
        
      });
    }
        },
        select(item) {
          
            if(this.perso.length<3){
      if (this.perso.includes(item)) {
        this.perso = this.perso.filter((k) => k !== item);
      } else {
        this.perso.push(item);
      }
     } else {
            if (this.perso.includes(item)) {
        this.perso = this.perso.filter((k) => k !== item);
      } else {
        alert("no more alternative");
      }
      }
    },
       
    },
}
</script>

<style>
 .btnSer{
      height: 50px;
      color: white;
      width: auto;
      background:  #267871;
    }
    .selected {
        background-color: #007bff; 
    color: white;
    border-color: #007bff;
    height: 50px;
}

  /* Style for the Menu Window */
  .menu-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 250px;
    height: 100%;
    background-color: #333;
    overflow-x: hidden;
    z-index: 1000;
    transform: translateX(0); /* Start with the menu open */
  }
  
  /* Style for the Menu Content */
  .menu-container ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  
  .menu-container ul li {
    padding: 10px;
    border-bottom: 1px solid #555;
  }
  
  .menu-container ul li a {
    color: #fff;
    text-decoration: none;
    display: block;
  }
  
  /* Style for the Close Button */
  .close-button {
    background-color: #555;
    color: #fff;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    width: 100%;
    text-align: left;
  }
  
  .close-button:hover {
    background-color: #777;
  }
  
  /* Vue Transition Animation */
  .menu-slide-enter-active,
  .menu-slide-leave-active {
    transition: transform 1s;
  }
  
  .menu-slide-enter-to,
  .menu-slide-leave {
    transform: translateX(-250px);
  }
  
  .menu-slide-leave-to,
  .menu-slide-enter {
    transform: translateX(0);
  }
  .selected {
    background-color: #007bff; 
    color: white;
    border-color: #007bff;
    
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
</style>