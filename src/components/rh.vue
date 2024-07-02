<template>
 
  
    <div class="FirstDiv" >



   

   <!-- choose 1 of the 3 evaluators -->
<ul><!--  persoName -->
  <span  v-if="perso.length!=0" class="spanInfo" v-html="listOfStaffWhoChose"></span>
    <li v-for="i in persoFiltered" :key="i.matriculePerso"><button @click="init();matrPerso=i.matriculePerso;fetchChoices(i.matriculePerso);info=i.prenom" type="button" >{{ i.nom }} {{ i.prenom }}</button></li>
</ul>
<!-- list of choices -->

<ul v-if="choice1.length!=0">
  <span class="spanInfo">{{ listOfServiceChosen_syslg }} <span id="spanx">{{ info }}</span></span>
    <li><button @click="fetchAllMember(choice1.idService);info2=choice1.nomService" type="button">{{ choice1.nomService }}</button></li>
    <li><button  @click="fetchAllMember(choice2.idService);info2=choice2.nomService" type="button">{{ choice2.nomService }}</button></li>
    <li><button v-if="choice3.length!=0" @click="fetchAllMember(choice3.idService);info2=choice3.nomService" type="button">{{ choice3.nomService }}</button></li>
</ul>

<ul>
  <span v-if="members.length!=0" class="spanInfo">{{ memberOfspan_syslg }} <span id="spany">{{info2}}</span></span>
<li v-for="i in membersFiltered" :key="i.matriculePerso"><button @click="selectPerso(i)" type="button">{{ i.nom }} {{ i.prenom }} </button></li>
</ul>


<table id="table" v-if="evaluatorTableFiltered.length!=0" class="custom-table">
  <caption>{{EvaluatedThisYear}}</caption>
  <tr>
    <th><i class="fa fa-user" aria-hidden="true"></i> {{evaluatorlabel}}</th><th><i class="fa fa-user" aria-hidden="true"></i> {{evaluatedLabel}}</th>
  </tr>
  <tr v-for="i in evaluatorTableFiltered" :key="i.matriculePerso" >
    <td>{{i.chosenEvaluatorName}}</td><td>{{i.prenom}}</td>
  </tr>
</table>

<h1 id="h1" v-if="perso.length==0 && evaluatorTable.length==0">{{this.infoBull}}</h1>
</div>

</template>

<script>
import axios from 'axios';
export default{
    data(){
        return{
          infoBull:"",
              
          EvaluatedThisYear:"",
          evaluatorTable:[],
          evaluatorlabel:'',
          evaluatedLabel:'',
          info2:"",
          info:"",
          members:[],
          languageTemp:"",
        divChangeLanguage:false,
            perso:[],
            choice1:[],
            choice2:[],
            choice3:[],
            matrPerso:"",
            defaultTable:[],

            sendBtn:'Send',
            nameLabel: 'nom',
            name: '',
            matriculationLabel:'matriculation',
            matriculationNbr:null,
            lastName:'',
            lastNameLabel:'lastName',
            idService:null,
            idServiceLabel:'idService',
            chefMatr:null,
            chefLabel:'chef matriculation',
            idSection:null,
            idSectionLabel:'idSection',

            // language
            listOfStaffWhoChose:"",
            listOfServiceChosen_syslg:"",
            memberOfspan_syslg:"",
            evaluatorInsertedAlt:"",
            youSure_alt:"",
        }

           
        
    },
     computed:{
      evaluatorTableFiltered(){
           const search = this.$store.state.dataSearchInput.toLowerCase();
  return this.evaluatorTable.filter(item => {
    const prenom=item.prenom.toLowerCase();
    const chosenEvaluatorName = item.chosenEvaluatorName.toLowerCase();
  

    return prenom.includes(search) || chosenEvaluatorName.includes(search) ;
  });
      },
        persoFiltered(){
           const search = this.$store.state.dataSearchInput.toLowerCase();
  return this.perso.filter(item => {
    const nom=item.nom.toLowerCase();
    const prenom = item.prenom.toLowerCase();
  

    return nom.includes(search) || prenom.includes(search) ;
  });
        },
        membersFiltered(){
                   const search = this.$store.state.dataSearchInput.toLowerCase();
  return this.members.filter(item => {
    const nom=item.nom.toLowerCase();
    const prenom = item.prenom.toLowerCase();
  

    return nom.includes(search) || prenom.includes(search) ;
  });
        },
     },
    methods:{
      fetchDataEvaluatorEvaluated(){
           var formData=new FormData();
                formData.append('action',"fetchDataEvaluatorEvaluated");
                formData.append("matr",this.$store.state.matriculeNbr);


                axios
          .post(this.$store.state.fileConfContent, formData)
          .then((response) => {
       this.evaluatorTable=response.data;
        
       
      })
        .catch((err) => {
         console.log(err); 
        
        
      });
      },
      shiftLanguage(){
        if(this.$store.state.languageSys=="french"){

          this.listOfStaffWhoChose="Énumération des subordonnés ayant sélectionné <br> les services devant procéder à leur évaluation "
          this.listOfServiceChosen_syslg="Liste des services choisis par"
          this.memberOfspan_syslg="Membre du service"
          this.evaluatorInsertedAlt="Evaluateur de "+this.info+" sauvegardé"
          this.youSure_alt=", pour cette année, est l'évaluateur de "
          this.evaluatedLabel="Evalué"
          this.evaluatorlabel="Evaluateur"
          this.EvaluatedThisYear="Liste des subordonnés qui ont déja un evaluateur"
          this.infoBull="Il n'existe pas encore de subordonné qui a choisi des services evaluateur"

       
        }else if(this.$store.state.languageSys=="english"){

          this.listOfStaffWhoChose="Enumeration of subordinates who have selected <br> the services to undergo their evaluation"
          this.listOfServiceChosen_syslg="List of services chosen by"
          this.memberOfspan_syslg="Member of the branch"
          this.evaluatorInsertedAlt=this.info+"'s evaluator inserted"
          this.youSure_alt=", this year, is the evaluator of "
          this.evaluatedLabel="Evaluated"
          this.evaluatorlabel="Evaluator"
          this.EvaluatedThisYear="List of subordinates who already have an evaluator"
          this.infoBull="There is no subordinates who chose some evaluator services yet"
       
        }else{

          this.listOfStaffWhoChose="Listr'ireo mpiasa ambany-hivo <br> nisafidy ny service hanombana azy"
          this.listOfServiceChosen_syslg="Listr'ireo servisy nosafidin'i"
          this.memberOfspan_syslg="Listrin'ny mpikambana ao amin'ny"
          this.evaluatorInsertedAlt="Tafiditra ny mpanombana an'i "+this.info
          this.youSure_alt=", amin'ny taona ity, no mpanombana an'i "
          this.evaluatedLabel="Hotombanana"
          this.evaluatorlabel="Mpanombana"
          this.EvaluatedThisYear="Listr'ireo mpiasa ambany-hivo efa manana mpanombana"
          this.infoBull="Tsy mbola nisy mpiasa ambany-hivo nisafidy servisy hanombana azy hatreto"

        }
      },

      init(){
        this.members=[];
        this.choice1=[];
        this.choice2=[];
        this.choice3=[];
        
      },
      fetchAllMember(item){
        var formData=new FormData();
                formData.append('action',"fetchAllMember");
                formData.append("idService",item);


                axios
          .post(this.$store.state.fileConfContent, formData)
          .then((response) => {
       this.members=response.data;
        
       
      })
        .catch((err) => {
         console.log(err); 
        
        
      });
      },
     
      logout(){
          this.$store.commit("setRh",false);
          this.$store.commit("setgMatriculation",true);
      },
        selectPerso(item){
     if(confirm(item.prenom+this.youSure_alt +this.info+" ?" )){
             var formData=new FormData();
                formData.append('action',"insertChosenEvaluator");
                formData.append("matriculeEvaluator",item.matriculePerso);
                formData.append('matriculeEvaluated',this.matrPerso)


                axios
          .post(this.$store.state.fileConfContent, formData)
          .then((response) => {
      console.log("evaluator inserted");
      this.cAlert(this.evaluatorInsertedAlt);
        this.refreshComponentView()
       
      })
        .catch((err) => {
         console.log(err); 
      
        
      });
     }
        },

        fetchChoices(item){
            var formData=new FormData();
                formData.append('action',"fetchChoiceName1");
                formData.append("matriculeNbr",item);


                axios
          .post(this.$store.state.fileConfContent, formData)
          .then((response) => {
       this.choice1=response.data;
        
       
      })
        .catch((err) => {
         console.log(err); 
        
        
      });

      var formData=new FormData();
                formData.append('action',"fetchChoiceName2");
                formData.append("matriculeNbr",item);


                axios
          .post(this.$store.state.fileConfContent, formData)
          .then((response) => {
            this.choice2=response.data;
        
       
      })
        .catch((err) => {
         console.log(err); 
        
        
      });
      var formData=new FormData();
                formData.append('action',"fetchChoiceName3");
                formData.append("matriculeNbr",item);


                axios
          .post(this.$store.state.fileConfContent, formData)
          .then((response) => {
            if (response.data == null) {
             
      this.choice3 =this.defaultTable;
    } else {
      
      this.choice3 = response.data;
    }
        
       
      })
        .catch((err) => {
         console.log(err); 
         
        
      });
        },

        displayPerso(){
            var formData=new FormData();
                formData.append('action',"displayPerso");
                formData.append("matriculeNbr",this.$store.state.matriculeNbr);

                axios
          .post(this.$store.state.fileConfContent, formData)
          .then((response) => {
        this.perso= response.data;
        
       
      })
        .catch((err) => {
         console.log(err); 
        
        
      });
        },


       
    },

    mounted() {
        this.displayPerso();
        this.fetchDataEvaluatorEvaluated()
        this.shiftLanguage()
       },
}
</script>

<style scoped>
@font-face {
  font-family: 'openSansFont';
  src: url('fontFamily/openSansBold.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}
span{
  font-family:'openSansFont' ;
}
button{
  height: 50px;
      color: white;
     margin-bottom: 5px;
      background:  #267871;
}
 /* Style for the Menu Window */
 ul{
  list-style-type: none;
 }
 #table{
  display: inline-block;
 }
 #h1{
    position: absolute;
    width: 100%;
    left: 50px;
    top: 50%;
   
  }
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
  
.custom-table {
  width:25%; /* Make the table take the full width of its container */
  border-collapse: collapse; /* Remove space between table cells */
  margin-top: 20px; /* Add some top margin */
height: max-content;
  margin-right: 10%;
  margin-left: 20px;
}

.custom-table th {
  background-color: #333; /* Header background color */
  color: #fff; /* Header text color */
  padding: 10px; /* Header cell padding */
text-align: center;

}

.custom-table td {
  border: 1px solid #ccc; /* Cell border */
  padding: 10px; /* Cell padding */
 text-align: left;

}

.custom-table tr:nth-child(even) {
  background-color: #f2f2f2; /* Alternate row background color */
}
.custom-table tr{
  width: 100px;

}

.custom-table tr:hover {
  background-color:white; /* Hovered row background color */
  cursor: pointer; /* Change cursor on hover */
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
  #spany, #spanx{
    color: blue;
    text-decoration: underline;
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