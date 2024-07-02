<template >
    
   

  </template>
    
  <script>
import axios, { Axios } from 'axios';
  export default {
   


    

  
    
    mounted() {
     
     
      this.selfEvaluate();
    },

    methods: {
    
        
      
      selfEvaluate(){
          this.$store.commit("setMatriculeEvaluated",this.$store.state.matriculeNbr);
          this.$store.commit("setAutoEvaluation",false);
          this.$store.commit("setCriteriaComp",true);
      },    
    },
  };
  </script>
  
  <style >

 
  </style>
  