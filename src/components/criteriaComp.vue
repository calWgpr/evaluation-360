<template>


    <div class="FirstDiv" >   

<h1>
  {{ evaluateSbInfo_syslg }} {{evaluatedName.prenom}}
</h1>

  <form id="formx" @submit.prevent="evaluateThisPerson() ">

<div id="critereDataList" v-for="i in critereData" :key="i.idCritere">

<label class=" questionWritings" :for="'slider' + i.idCritere">{{ i.question }}</label>

<div class="star-rating">
 
  <input class="radioWritings" type="radio" :id="'star1-' + i.idCritere" name="rating-{{ i.idCritere }}" value="1" v-model="sliderValue[i.idCritere]" />
  <input class="radioWritings" type="radio" :id="'star2-' + i.idCritere" name="rating-{{ i.idCritere }}" value="2" v-model="sliderValue[i.idCritere]" />
  <input class="radioWritings" type="radio" :id="'star3-' + i.idCritere" name="rating-{{ i.idCritere }}" value="3" v-model="sliderValue[i.idCritere]" />
  <input class="radioWritings" type="radio" :id="'star4-' + i.idCritere" name="rating-{{ i.idCritere }}" value="4" v-model="sliderValue[i.idCritere]" />
  <input class="radioWritings" type="radio" :id="'star5-' + i.idCritere" name="rating-{{ i.idCritere }}" value="5" v-model="sliderValue[i.idCritere]" />

  <label  class="radioStyle" @click="style" id="l1" :for="'star1-' + i.idCritere" title="Poor">★</label>
  <label class="radioStyle" @click="style" id="l2" :for="'star2-' + i.idCritere" title="Fair">★</label>
  <label class="radioStyle" @click="style" id="l3" :for="'star3-' + i.idCritere" title="Good">★</label>
  <label class="radioStyle" @click="style" id="l4" :for="'star4-' + i.idCritere" title="Very Good">★</label>
  <label class="radioStyle" @click="style" id="l5" :for="'star5-' + i.idCritere" title="Excellent">★</label>

</div>

</div>
<button class="btn btn-warning" id="btnEvaluate" type="submit"><i class="fa fa-bar-chart" aria-hidden="true"></i> {{ evaluateThisPersonBtn}}</button>



</form>

<div id="yearDisplay">
  
<label class="form-label" id="labelSelect" for="yearSelect">{{ selectLabel_syslg }}


  <select class="form-select" id="yearSelect">

</select>
</label>



</div>

</div>

       
</template>

<script>


const currentYear = new Date().getFullYear();

import axios, { Axios } from 'axios';
  export default {
    data() {
        return {
          divChangeLanguage:false,
            critereData:[],
            evaluateThisPersonBtn:"",
            sliderValue:{},
            evaluationYear:parseInt(currentYear),
            evaluatedName:"",
            
            //language
            evaluationInsertedAlt_syslg:'',
            evaluateSbInfo_syslg:"",
            selectLabel_syslg:'',
            confOfEvaluation_syslg:'',
            ifEvaluated:"",
            updateQst:"",

        }
    },

    methods:{
      shiftLanguage(){
        if(this.$store.state.languageSys=="french"){

          this.evaluateSbInfo_syslg="Evaluation de Mr(s)"
          this.evaluateThisPersonBtn="Evaluer"
          this.selectLabel_syslg="Période "
          this.evaluationInsertedAlt_syslg="Evaluation sauvegardé avec succès"
          this.confOfEvaluation_syslg="Voulez-vous enregistrer cette evaluation de Mr(s) "
  this.updateQst="Vous avez déja evalué cette personne sur cette periode, voulez-vous modifier l'evaluation ?"
        }else if(this.$store.state.languageSys=="english"){

          this.evaluateSbInfo_syslg="Evaluating Mr(s)"
          this.evaluateThisPersonBtn="Evaluate"
          this.selectLabel_syslg="Period "
          this.evaluationInsertedAlt_syslg="Evaluation successfully inserted"
          this.confOfEvaluation_syslg="Do you want to save this evaluation of Mr(s) "
this.updateQst="You have already evaluated this person in the specified period, do you want to change the record ?"
        }else{

          this.evaluateSbInfo_syslg="Fanombanana an'i"
          this.evaluateThisPersonBtn="Alefa ny tombana"
          this.selectLabel_syslg="Taona "
          this.evaluationInsertedAlt_syslg="Voarakitra ny tombana"
          this.confOfEvaluation_syslg="Horaketina ve ny tombana an'i "
          this.updateQst="Efa nanombana an'io olona io ianao tamin'io taona io, hovaina ve ny tombana ?"

        }

      },

      fetchEvaluatedName(){
                var formData=new FormData();
                formData.append('action',"fetchEvaluatedName");
                formData.append('matriculeNbr',this.$store.state.matriculeEvaluated);
                

                axios
          .post(this.$store.state.fileConfContent, formData)
          .then((response) => {
            this.evaluatedName=response.data
            console.log("success");
         
            
        
       
      })
        .catch((err) => {
         console.log(err); 
         
        
      });
      },
    
      style(e){
      let prevSibling = e.currentTarget.previousElementSibling;
let nextSibling = e.currentTarget.nextElementSibling;


e.currentTarget.style.color="#ffba00"

while (prevSibling && prevSibling.nodeName === 'LABEL') {

  prevSibling.style.color="#ffba00"
  prevSibling = prevSibling.previousElementSibling;
}

while (nextSibling && nextSibling.nodeName.toLowerCase() === 'label') {

  nextSibling.style.color="grey"
  nextSibling = nextSibling.nextElementSibling;
}

      },
     
 getYearPeriodEvaluation(){
  const vm = this;
  const yearSelect = document.getElementById("yearSelect");
const currentYear = new Date().getFullYear();
const startYear = 2023;

for (let year = startYear; year <= currentYear; year++) {
  const option = document.createElement("option");
  option.value = year;
  option.text = year;
  yearSelect.appendChild(option);
}
yearSelect.value = currentYear;
yearSelect.addEventListener("change", function () {
  
  vm.evaluationYear=parseInt(yearSelect.value);

});


 },
        
        evaluateThisPerson(){

            var formData= new FormData();
          formData.append('action',"fetchIfEvaluated");
          formData.append('matriculeNbr',this.$store.state.matriculeNbr);
            formData.append("evaluatedMtr",this.$store.state.matriculeEvaluated);
            formData.append("evaluationYear",this.evaluationYear)

          
          
         
          axios
            .post(this.$store.state.fileConfContent, formData)
            .then((response) => {
                this.ifEvaluated=response.data
                if(this.ifEvaluated.length==0){
 if(confirm(this.confOfEvaluation_syslg+this.evaluatedName.prenom )){


              var formData= new FormData();
          formData.append('action',"evaluateThisPerson");
          formData.append('matriculeNbr',this.$store.state.matriculeNbr);
            formData.append("evaluatedMtr",this.$store.state.matriculeEvaluated);
          formData.append('sliderValue', JSON.stringify(this.sliderValue));
       
          formData.append("evaluationYear",this.evaluationYear)

         
          axios
            .post(this.$store.state.fileConfContent, formData)
            .then((response) => {
                console.log("success");
                this.cAlert(this.evaluationInsertedAlt_syslg);
              this.$store.commit('setCriteriaComp',false);
 this.$store.commit('setMainScreenView',true);
 this.refreshComponentView()
            })
          .catch((err) => {
           console.log("error"); 
           
        });
          }
                }else{
                      if(confirm(this.updateQst)){
                         var formData= new FormData();
          formData.append('action',"updateEvaluationPerso");
          formData.append('matriculeNbr',this.$store.state.matriculeNbr);
            formData.append("evaluatedMtr",this.$store.state.matriculeEvaluated);
          formData.append('sliderValue', JSON.stringify(this.sliderValue));
       
          formData.append("evaluationYear",this.evaluationYear)

         
          axios
            .post(this.$store.state.fileConfContent, formData)
            .then((response) => {
                console.log("success");
                this.cAlert(this.evaluationInsertedAlt_syslg);
              this.$store.commit('setCriteriaComp',false);
 this.$store.commit('setMainScreenView',true);
 this.refreshComponentView()
            })
          .catch((err) => {
           console.log("error"); 
           
        });
                      }
                }
            })
          .catch((err) => {
          console.log(err)
           
        });
        

         
        },

        fetchCritereData(){
            var formData=new FormData();
                formData.append('action',"fetchCritereData");
        
           
              

                axios
          .post(this.$store.state.fileConfContent, formData)
          .then((response) => {
           this.critereData=response.data;
        
           
            this.critereData.forEach((critere) => {
        this.sliderValue[critere.idCritere] = 1;})
      })

        .catch((err) => {
         console.log(err); 
       
        
      });
        },
    },

    mounted(){
        this.fetchCritereData();
        this.getYearPeriodEvaluation();
        this.fetchEvaluatedName();
        this.shiftLanguage()
    },
  }
</script>

<style  scoped>

@font-face {
  font-family: 'openSansFont';
  src: url('fontFamily/openSansRegular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}
h1{
   font-family: "openSansFont";
  display:flex;
  justify-content: center;
  justify-items: center;
  align-content: center;
  align-content: center;


  display: block;
 
position: absolute;
left:0;
margin-left: 0;
text-decoration: underline;
}
#labelSelect{
  font-family: "openSansFont";
  display:flex;
  justify-content: center;
  justify-items: center;
  align-content: center;
  align-content: center;
  position: absolute;
  top: 5px;

}
#yearDisplay{
  position: absolute;
  top: 0;
  width: 500px;
 left: 80%;
}
.rt{
 width: 100%;
}
#critereDataList{
  display: flex;
  justify-content:center;
  align-items:center;
  height: 150px; 
  width: 50vw;
  margin: auto;
 position: relative;
left: 50%;
}

#l1{
  color: #ffba00;
}


.star-rating{

width: auto;
display: flex;
align-items: center;
height: 50px;
position: absolute;
left: 20%;

top: 50px;
z-index: 3;
border: outset 1px white;
}
#formx{
height: max-content;
position: absolute;
top: 60px;
width: 50%;

}
.questionWritings{
  font-family: 'openSansFont';
  display: block;
 
position: absolute;
left:20%;
font-size: 20px;

top: 10px;

width: max-content;
margin-left: 0;



}

select{
  
  width: 100px;
}
.star-rating input[type="radio"] {
  display:none;
}

.star-rating input{
  display: block;
 
}
.star-rating label {
  font-size: 24px;
  padding: 5px;
font-size: 50px;
  cursor: pointer;
  color: grey;


}
th{
  color: #ffba00;
  font-size: 24px;
  border:solid 2px black;
}
table{
  border-collapse: collapse; /* Set table border-collapse */
  width: 100%;

}

td{
 border:solid 2px black; /* Apply a border to table cells */
  padding: 8px; /* Optional: Add padding for cell content */
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
#btnEvaluate{
  border: 2px outset #ffba00;
  border-radius: 30px;
  background: #ffba00;
  position: relative;
  width: 250px;
left: 75%;
}
#btnEvaluate:active{
border:2px inset #ffba00 ;

}


</style>
