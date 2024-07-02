<template>
    
       <matriculeLogs v-if="$store.state.gMatriculation"></matriculeLogs>
    <paswdAndLanguage v-if="$store.state.initAccount"></paswdAndLanguage>
    <signIn v-if="$store.state.signIn"></signIn>  

     <mainScreen v-if="$store.state.mainScreen"></mainScreen> 

    <autoEvaluation v-if="$store.state.autoEvaluation"></autoEvaluation> 
    <choice v-if="$store.state.choice"></choice>
    <evaluateTeam v-if="$store.state.evaluateTeam"></evaluateTeam>
    <evaluateCauseChosen v-if="$store.state.evaluateCauseChosen"></evaluateCauseChosen>
    <rh v-if="$store.state.rh"></rh>
    <updatePerso v-if="$store.state.updatePerso"></updatePerso>
    <updateCritere v-if="$store.state.updateCritere"></updateCritere>
    <rapport v-if="$store.state.rapport"></rapport>
    <evaluateAsChef v-if="$store.state.evaluateAsChef"></evaluateAsChef>
    <chooseServices v-if="$store.state.chooseServices"></chooseServices>
    <criteriaComp v-if="$store.state.criteriaComp"></criteriaComp>
    <popupWindow v-if="$store.state.popupWindow"></popupWindow>
    <evaluateAll v-if="$store.state.evaluateAll"></evaluateAll>

 </template>
 
 <script>
 
 import axios from 'axios';
 import matriculeLogs from './components/matriculeLogs';
 import paswdAndLanguage from './components/paswdAndLanguage';
 import signIn from './components/signIn';
 import mainScreen from './components/mainScreen';
 import autoEvaluation from './components/autoEvaluation';
 import choice from './components/choice';
 import evaluateTeam from './components/evaluateTeam';
 import evaluateCauseChosen from './components/evaluateCauseChosen.vue';
 import rh from './components/rh';
 import updatePerso from './components/updatePerso.vue';
 import updateCritere from './components/updateCritere.vue';
 import rapport from './components/rapport.vue';
 import evaluateAsChef from './components/evaluateAsChef.vue';
 import chooseServices from './components/chooseServices.vue';
 import criteriaComp from './components/criteriaComp.vue';
 import popupWindow from './components/popupWindow.vue';
 import evaluateAll from './components/evaluateAll.vue'


     export default{
         data(){
             return{
                
             }
         },
 created(){
  

},
         mounted(){
               
         },
 
         methods:{
           
         },
 
         components:{
             matriculeLogs,
             paswdAndLanguage,
             signIn,
             mainScreen,
             autoEvaluation,
             choice,
             evaluateTeam,
             evaluateCauseChosen,
             rh,
             updatePerso,
             updateCritere,
             rapport,
             evaluateAsChef,
             chooseServices,
             criteriaComp,
             popupWindow,
             evaluateAll,
        
         },
     };
 </script>
 
 <style>
   .FirstDiv{
    
display: flex;
      position: absolute;
  width: 83%;
  top: 60px;
  left: 17%;
  height: 100%;
   

   }
   body{
    justify-content: center;
   }
 </style>