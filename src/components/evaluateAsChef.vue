<template>


        
            <div id="divAllStaff" class="FirstDiv" >

           <table v-if="filteredEvaluated.length!=0" id="allStaff">
            <caption><i class="fa fa-users" aria-hidden="true"></i> {{ subordinateListCaption_syslg }}</caption>
            <tr>
            <th> <i class="fa fa-id-card" aria-hidden="true"></i> Matricule</th>
            <th><i class="fa fa-user" aria-hidden="true"></i> {{ nameth_syslg }}</th>
            <th><i class="fa fa-user" aria-hidden="true"></i> {{ prenomth_syslg }}</th>
            <th><i class="fa fa-laptop" aria-hidden="true"></i> {{ serviceTh_syslg }}</th>
            <th><i class="fa fa-area-chart" aria-hidden="true"></i> {{ evaluationTh_syslg }}</th>
          </tr>
          
            <tr v-for="i in filteredEvaluated" :key="i.matriculePerso">

              <td class="matriculeSpan">
                  {{i.matriculePerso }}
                </td>
                <td class="nomSpan">
                  {{i.nom }}
                </td>
                 <td class="prenomSpan">
                  {{i.prenom }}
                </td>
                <td class="serviceSpan">
                  {{i.nomService }}
                </td>

                <td class="evaluateTd">
              <button  class="allStaffBtn" type="button" @click="elemToFind=i ;$store.commit('setMatriculeEvaluated',i.matriculePerso);evaluatePerso()">
                <i class="fa fa-bar-chart" aria-hidden="true"></i>
                {{ btn }}
              
              </button>
            </td>
            </tr>
           </table>
        
            <h1 id="h1" v-if="evaluated.length==0">{{this.infoBull}}</h1>
        </div>
        
        
        </template>
        
        <script>
        import axios from 'axios';
        export default {
         
            data(){
                return{
                  infoBull:'',
                  btn:"",
                  languageTemp:"",
                divChangeLanguage:false,
                
                  evaluated:[],
                  evaluatedChosenMatr:"",
                  criteria:false,
                  evaluateTeamBtn:"evaluate",
                  elemToFind:null,

                  // language
                  subordinateListCaption_syslg:"",
                
                  nameth_syslg:"",
                  prenomth_syslg:"",
                  serviceTh_syslg:"",
                  evaluationTh_syslg:"",
        
             
                }
            },
            mounted(){
                this.displayEvaluated();
                this.shiftLanguage();
            },
            computed:{
              filteredEvaluated(){
                const search = this.$store.state.dataSearchInput.toLowerCase();
  return this.evaluated.filter(item => {
    const name = item.nom.toLowerCase();
    const lastName = item.prenom.toLowerCase();
    const nomService=item.nomService.toLowerCase();
    const matriculePerso=item.matriculePerso.toLowerCase();
    return name.includes(search) || lastName.includes(search) || 
    nomService.includes(search) || matriculePerso.includes(search);
  });    
            },
          },
            methods:{
              shiftLanguage(){
                if(this.$store.state.languageSys=="french"){

                  this.subordinateListCaption_syslg="Liste des subordonnés"
                  this.nameth_syslg="Nom"
                  this.prenomth_syslg="Prenom"
                  this.serviceTh_syslg="Service"
                  this.evaluationTh_syslg="Evaluation"
                  this.btn="Evaluer"   
                  this.infoBull="Vous n'avez plus de personnel à evaluer cette année"               

                }else if(this.$store.state.languageSys=="english"){

                  this.subordinateListCaption_syslg="List of your subordinates"
                  this.nameth_syslg="Name"
            this.prenomth_syslg="Last name"
            this.serviceTh_syslg="Service"
            this.evaluationTh_syslg="Evaluation"
            this.btn="Evaluate"
                        this.infoBull="You no longer have staffs to evaluate"


                }else{

                  this.subordinateListCaption_syslg="Listr'ireo mpiasa ambany-hivo"
                  this.nameth_syslg="Anarana"
          this.prenomth_syslg="Anarana fanampiny"
          this.serviceTh_syslg="Servisy"
          this.evaluationTh_syslg="Fanombanana"
          this.btn="Hanombana"
                     this.infoBull="Tsy manana mpiasa tombanana intsony ianao amin'ity taona ity"

                
                
                }
              },
              
              logout(){
                  this.$store.commit("setEvaluateCauseChosen",false);
                  this.$store.commit("setgMatriculation",true);
              },
                evaluatePerso(){
                  this.$store.commit("setEvaluateAsChef",false);
                  this.$store.commit("setCriteriaComp",true);
                },
                displayEvaluated(){
                    var formData=new FormData();
                        formData.append('action',"fetchEvaluatedByChef");
                        formData.append('matriculeNbr',this.$store.state.matriculeNbr);
        
                        axios
                  .post(this.$store.state.fileConfContent, formData)
                  .then((response) => {
                this.evaluated= response.data;
                
               
              })
                .catch((err) => {
                 console.log(err); 
                 
                
              });
              
                },
        
                spliceTable(){
                        if(this.elemToFind!=null){
                        this.evaluated.splice(this.evaluated.indexOf(this.elemToFind), 1);
                        this.elemToFind=null;
                        }
                    },
            },
        }
        </script>
        
        <style>
        
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
          #h1{
           position: absolute;
           left: 10px;
           top: 50%;
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
          .matriculeSpan,.nomSpan, .prenomSpan,.serviceSpan,.evaluateTd{
      margin-right: 10px;
      height: 100px;
      color: white;
      width: auto;
      background:  #267871;
      margin-bottom: 10px;
      margin-left: 0;
      border: outset 3px #267871;
    }
 #divAllStaff{
  justify-items: center;
 flex-direction: column; 
    align-items: flex-start;

 }
    .allStaffBtn{
      height: 50px;
      color: white;
     
      background:  #267871;
      margin-bottom: 10px;
      margin-left: 0;
      width:100% ;
      
    }
    #allStaff{
      justify-items: center;
 flex-direction: column; 
    align-items: flex-start;
      width: 100%;
      list-style-type: none;
     margin-top:20px ;
     margin-left: 0;
 
    }
.allStaffItem{
  margin-left: 0;
  padding-left: 0;
 
}
        </style>