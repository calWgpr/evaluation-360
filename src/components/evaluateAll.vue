<template>

   
    
        <div id="divAllStaff" class="FirstDiv">
   
    
        <table  v-if="filteredAlternatives.length!=0" id="allStaff">
          <caption><i class="fa fa-users" aria-hidden="true"></i> {{ allstaffListCaption_syslg }}</caption>
          <tr>
            <th><i class="fa fa-id-card" aria-hidden="true"></i> Matricule</th>
            <th><i class="fa fa-user" aria-hidden="true"></i> {{ nameth_syslg }}</th>
            <th><i class="fa fa-user" aria-hidden="true"></i> {{ prenomth_syslg }}</th>
            <th> <i class="fa fa-laptop" aria-hidden="true"></i> {{ serviceTh_syslg }}</th>
            <th><i class="fa fa-area-chart" aria-hidden="true"></i> {{ evaluationTh_syslg }}</th>
          </tr>
               <tr class="allStaffItem" v-for="i in filteredAlternatives" :key="i.matriculePerso">
                
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
                  <button 
                 class="allStaffBtn" @click="elemToFind=i ;$store.commit('setMatriculeEvaluated',i.matriculePerso);allStaff=false;evaluate()" 
                  type="button"><i class="fa fa-bar-chart" aria-hidden="true"></i> {{evaluateBtn}}
                </button>
                </td>
               
             
              </tr>
            </table>
        

         <h1 id="h1" v-if="alternatives.length==0">{{this.infoBull}}</h1>
    </div>
 
    </template>
    
    <script>
    
    import axios from 'axios';
        export default{
            data(){
                return{
                  infoBull:"",
                  filteredAlternatives:[],
                  languageTemp:"",
            divChangeLanguage:false,
                    elemToFind:null,
                   
                    evaluateTeamBtn:'evaluate this person',
                  alternatives:[],
                  evaluatedMatricule:'',
                  allStaff:true,
                  
                  evaluateBtn:"",

                  // language
                  allstaffListCaption_syslg:"",
                  nameth_syslg:"",
                  prenomth_syslg:"",
                  serviceTh_syslg:"",
                  evaluationTh_syslg:"",

       
                }
            },
            computed:{
              filteredAlternatives(){
                const search = this.$store.state.dataSearchInput.toLowerCase();
  return this.alternatives.filter(item => {
    const name = item.nom.toLowerCase();
    const lastName = item.prenom.toLowerCase();
    const nomService=item.nomService.toLowerCase();
    const matriculePerso=item.matriculePerso.toLowerCase();
    return name.includes(search) || lastName.includes(search) || 
    nomService.includes(search) || matriculePerso.includes(search);
  });
              }
            },
            methods:{
              shiftLanguage(){
        if(this.$store.state.languageSys=="french"){

          this.allstaffListCaption_syslg="Liste des personnels"
          this.nameth_syslg="Nom"
          this.prenomth_syslg="Prenom"
          this.serviceTh_syslg="Service"
          this.evaluationTh_syslg="Evaluation"
          this.evaluateBtn="Evaluer"
          this.infoBull="Vous n'avez plus de personnel à evaluer cette année"

        }else if(this.$store.state.languageSys=="english"){

            this.allstaffListCaption_syslg="List of all staff"
            this.nameth_syslg="Name"
            this.prenomth_syslg="Last name"
            this.serviceTh_syslg="Service"
            this.evaluationTh_syslg="Evaluation"
            this.evaluateBtn="Evaluate"
            this.infoBull="You no longer have staffs to evaluate"

        }else{

          this.allstaffListCaption_syslg="Listr'ireo mpiasa rehetra"
          this.nameth_syslg="Anarana"
          this.prenomth_syslg="Anarana fanampiny"
          this.serviceTh_syslg="Servisy"
          this.evaluationTh_syslg="Fanombanana"
          this.evaluateBtn="Hanombana"
           this.infoBull="Tsy manana mpiasa tombanana intsony ianao amin'ity taona ity"

        }
      },
              logout(){
              this.$store.commit("setEvaluateAll",false);
              this.$store.commit("setgMatriculation",true);
          },
    
                evaluate(){
                  this.$store.commit("setEvaluateAll",false);
                      this.$store.commit("setCriteriaComp",true);
                    
                },
                spliceTable(){
                    if(this.elemToFind!=null){
                    this.alternatives.splice(this.alternatives.indexOf(this.elemToFind), 1);
                    this.elemToFind=null;
                    }
                },
                fetchAllStaff(){
                    var formData=new FormData();
                    formData.append('action',"fetchAllStaff");
                    formData.append('matriculeNbr',this.$store.state.matriculeNbr);
    
                    axios
              .post(this.$store.state.fileConfContent, formData)
              .then((response) => {
            this.alternatives= response.data;
            
          
          })
            .catch((err) => {
             console.log(err); 
             
            
          });
                    
                },
                
            },
            mounted(){
                    this.fetchAllStaff();
                    this.shiftLanguage()
                },
               
        }
    </script>
    
    <style >
    #allStaff {
  border-collapse: collapse; /* Collapse table borders */
}

#allStaff th, #allStaff td {
  border: none; /* Remove border for table cells */
  background: transparent;
  padding: 10px;
  border-bottom: 3px outset #3333;
}

    .matriculeSpan,.nomSpan, .prenomSpan,.serviceSpan,.evaluateTd{
      margin-right: 10px;
      height: 5px;
      color: black;
      width: auto;
      background:  #E8E8E8;
      margin-bottom: 10px;
      margin-left: 0;
      border: outset 1px black;
      justify-content: center;
      justify-items: center;
  
    }
    .matriculeSpan:hover,.nomSpan:hover, .prenomSpan:hover,.serviceSpan:hover,.evaluateTd:hover{
      background: transparent;
    }
    

    .nomSpan{
      background:  white;
      color: black;

    }
    .serviceSpan{
      background: white;
    }
 #divAllStaff{
  justify-items: center;
 flex-direction: column; 
    align-items: flex-start;

 }
 table caption {
  font-weight: normal;
  color: black;
  background-color:  #267871; /* Match the theme color */
 /* Text color for contrast */
  font-size: 1.5rem; /* Adjust font size as needed */
  font-weight: bold; /* Add emphasis */
  text-align: center; /* Center the title text */
  padding: 10px; /* Add padding for spacing */
  border-radius: 5px; /* Rounded corners for style */
  color: white;
  caption-side: top;
         
          
}
    .allStaffBtn{
      height: 40px;
      color: white;
     border: none;
      background:  #267871;
      margin-bottom: 10px;
      margin-left: 0;
      width:100% ;
      margin: auto;
      border-radius: 10px;
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
#h1{
    position: absolute;
    width: 100%;
    left: 50px;
    top: 50%;
   
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