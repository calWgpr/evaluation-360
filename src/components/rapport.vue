<template>


    <div class="FirstDiv" >

<div id="littleNav">
        <button id="m1" class="menuPerso" @click="graphMode=false;noteMode=true;styleBtn('m1')">{{ note }}</button>
 <button id="m2" class="menuPerso" @click="noteMode=false;graphMode=true;styleBtn('m2')">{{ graph }}</button>
      </div>

      <div v-if="noteMode" id="evaluatorAndNote">

       
<form id="form1" @submit.prevent="evaluation=[];fetchEvaluation()">

          <label id="id1">{{ evaluatorLabel_syslg }} 
         

          <select id="sel1" class="form-control"  v-model="evaluatorNbr" >
      <option v-for="i in persoList" :key="i.matriculePerso" :value="i.matriculePerso">
        {{i.nom}} {{ i.prenom }}
      </option>
    </select>
          
          </label>
          

          <label id="id2" >{{ evaluatedLabel_syslg }}
            
            <select id="sel2" class="form-control" v-model="evaluatedNbr" >
      <option v-for="i in persoList" :key="i.matriculePerso" :value="i.matriculePerso">
        {{i.nom}} {{ i.prenom }}
      </option>
    </select>

            </label>

          <button class="submitBtn" id="id3" type="button" @click="evaluation=[];getByEvaluator()"> {{ getByEvaluator_syslg }}</button>
          <button class="submitBtn" id="id4" type="button" @click="evaluation=[];getByEvaluated()">{{ getByEvaluated_syslg}}</button>

          <button id="id5" class="submitBtn" type="submit">{{ getByBoth }}</button>
  <!-- <button class="submitBtn"  @click="ExportToExcel(evaluatedName,tableNameList)">Excel</button> -->

</form>

          <table v-if="evaluationFiltered.length>0" id="tb1" class="custom-table">

<caption>{{ overviewCaption_syslg }}</caption>
            <tr>
              <th><i class="fa fa-user" aria-hidden="true"></i> {{ evaluatorth_syslg }}</th><th><i class="fa fa-user" aria-hidden="true"></i> {{ evaluatedTh_syslg }}</th><th>
                <i class="fa fa-star" aria-hidden="true"></i> {{ critereTh_syslg }}</th><th><i class="fa fa-file-text" aria-hidden="true"></i> {{ marksTh_syslg }}</th><th><i class="fa fa-clock" aria-hidden="true"></i> {{ dateTh_syslg }}</th>
            </tr>
            <tr v-for="i in evaluationFiltered" :key="i.evaluator">

              <td>{{i.matriculeEvaluator}} {{ i.evaluator }} </td><td>{{i.matriculeEvalue}} {{i.evaluated}}</td><td>{{i.critere}}</td><td>{{ i.note }}</td><td>{{i.dateEvaluation}}</td>
            </tr>

          </table>

      </div>

    <!-- get matriculation nbr -->
<div v-if="graphMode" id="graph">
  
    <form id="graphSearch" class="formInput" @submit.prevent="operate">
        <label> {{ evaluatedLabel_syslg }}
          
         

         <select required  class="form-control" v-model="persoByMatr" >
      <option v-for="i in persoList" :key="i.matriculePerso" :value="i.matriculePerso">
        {{i.nom}} {{ i.prenom }}
      </option>
    </select>
        
        </label>    
                  <label> {{periodLabel}}<input required class="form-control" type="number" v-model="period"></label>    

            <button class="submitBtn"  type="submit">{{ searchPersoByMatrBtn }}</button>

            <button class="submitBtn" v-if="perfclick" @click="getChart();hide('arrays')"> {{ getChartBtn_syslg }}</button>
            <button class="submitBtn" v-if="perfclick"  @click="hide('meanChart')"> {{ getArrraysBtn_syslg }}</button>
            <button class="submitBtn" v-if="perfclick"  @click=" generateTableNameList();ExportToExcel(evaluatedName,tableNameList)">Excel</button>

     </form>
<div id="arrays">

 <div v-if="autoEvaluationsFilter.length>0" id="autoEvaluation">

  <p>{{ selfEvaluationSpan_syslg }}</p>

    <table id="autoEvaluationTable" class="custom-table">
      <caption>{{ selfEvaluationMarks_syslg }}</caption>
        <tr>

           <th><i class="fa fa-object-group" aria-hidden="true"></i> {{ criteriaGroups_syslg }}</th> <th>  <i class="fa fa-star" aria-hidden="true"></i> {{ critereTh_syslg }}</th>
           <th><i class="fa fa-file-text" aria-hidden="true"></i> {{ marksTh_syslg }}</th>
        </tr>
        <tr v-for="i in autoEvaluationsFilter" :key="i.idCritere">
           <td>{{ i.groupe }}</td> <td>{{ i.critere }}</td><td>{{ i.note }}</td>
        </tr>
    </table>
    <!-- --------------------------------------- -->

 <table id="autoEvMeanTable" class="custom-table">
  <caption>{{ meanSelfEvaluation_syslg }}</caption>
    <tr>
        <th> <i class="fa fa-object-group" aria-hidden="true"></i> {{ criteriaGroups_syslg }}</th><th><i class="fa fa-file-text" aria-hidden="true"></i> {{ graph }}</th>
    </tr>
    <tr  v-for="i in meanPerGroupFilter" :key="i.groupe">
        <td>{{ i.groupe }}</td><td>{{  i.mean}}</td>
    </tr>
 </table>

</div>


<div v-if="pairEvaluationFilter.length>0" id="pairEvaluation">
<p>{{ oppNbrSpan_syslg }}</p>
   
    <table id="counterParttable" class="custom-table">
      <caption>{{ oppNbrCap_syslg }}</caption>
        <tr>
           <th> <i class="fa fa-object-group" aria-hidden="true"></i> {{ criteriaGroups_syslg }}</th> <th> <i class="fa fa-star" aria-hidden="true"></i>  {{ critereTh_syslg }}</th><th><i class="fa fa-file-text" aria-hidden="true"></i> {{marksTh_syslg}}</th>
        </tr>
        <tr v-for="i in pairEvaluationFilter" :key="i.idCritere">
           <td>{{ i.groupe }}</td> <td>{{ i.critere }}</td><td>{{ i.note }}</td>
        </tr>
    </table>

 <table id="counterpartMeanTable" class="custom-table">
  <caption>{{ meanOfoppnbr_syslg  }}</caption>
 
    <tr>
        <th> <i class="fa fa-object-group" aria-hidden="true"></i> {{ criteriaGroups_syslg }}</th><th><i class="fa fa-file-text" aria-hidden="true"></i> {{ graph }}</th>
    </tr>
    <tr  v-for="i in meanPerGroupPairFilter" :key="i.groupe">
        <td>{{ i.groupe }}</td><td>{{  i.mean}}</td>
    </tr>
 </table>

</div>


<div v-if="collabEvaluationFilter.length>0" id="collabEvaluation">

    <p>{{counterPartEvaluationSpan_syslg  }}</p>
    <table id="oppnbrTable" class="custom-table">
      <caption>{{ counterPartEvaluationMarks_syslg  }}</caption>

        <tr>
           <th> <i class="fa fa-object-group" aria-hidden="true"></i> {{ criteriaGroups_syslg }}</th> <th> <i class="fa fa-star" aria-hidden="true"></i>  {{ critereTh_syslg }}</th><th><i class="fa fa-file-text" aria-hidden="true"></i> {{ marksTh_syslg }}</th>
        </tr>
        <tr v-for="i in collabEvaluationFilter" :key="i.idCritere">
           <td>{{ i.groupe }}</td> <td>{{ i.critere }}</td><td>{{ i.note }}</td>
        </tr>
    </table>
 <table id="oppnbrMeanTable" class="custom-table">
   <caption>{{ meanOfcounterPartEvaluation_syslg }}</caption>
    <tr>
        <th> <i class="fa fa-object-group" aria-hidden="true"></i> {{ criteriaGroups_syslg }}</th><th><i class="fa fa-file-text" aria-hidden="true"></i> {{ graph }}</th>
    </tr>
    <tr  v-for="i in meanPerGroupCollabFilter" :key="i.groupe">
 
        <td>{{i.groupe }}</td><td>{{i.mean}}</td>
    </tr>
 </table>


</div>

<div v-if="chefEvaluationFilter.length>0" id="chefEvaluation">
    <p>{{ chefEvaluationSpan_syslg }}</p>
    <table id="chefEvTable" class="custom-table">
      <caption>{{ chefEvaluationCaption_syslg }}</caption>
        <tr>
           <th> <i class="fa fa-object-group" aria-hidden="true"></i> {{ criteriaGroups_syslg }}</th> <th> <i class="fa fa-star" aria-hidden="true"></i>  {{ critereTh_syslg }}</th><th><i class="fa fa-file-text" aria-hidden="true"></i> {{ marksTh_syslg }}</th>
        </tr>
        <tr v-for="i in chefEvaluationFilter" :key="i.idCritere">
           <td>{{ i.groupe }}</td> <td>{{ i.critere }}</td><td>{{ i.note }}</td>
        </tr>
    </table>
 <table id="chefMeanTable" class="custom-table">
   <caption>{{ meanByChefCap_syslg }}</caption>
    <tr>
        <th> <i class="fa fa-object-group" aria-hidden="true"></i> {{ criteriaGroups_syslg }}</th><th><i class="fa fa-file-text" aria-hidden="true"></i> {{ graph }}</th>
    </tr>
    <tr  v-for="i in meanPerGroupChefFilter" :key="i.groupe">
        <td>{{ i.groupe }}</td><td>{{  i.mean}}</td>
    </tr>
 </table>
</div>

<div id="totalMeanEvaluation">
    <button class="submitBtn" v-if="perfclick"  type="button" @click.once="getTotalMeanEvaluation">Total</button>
    
 <table id="overallMeanTable" class="custom-table">
  <caption>{{ overallMeanTotal_syslg }}</caption>
    <tr>
        <th> <i class="fa fa-object-group" aria-hidden="true"></i> {{ criteriaGroups_syslg }}</th><th><i class="fa fa-file-text" aria-hidden="true"></i> {{ graph }}</th>
    </tr>
    <tr  v-for="i in totalMean" :key="i.groupe">
        <td>{{ i.groupe }}</td><td>{{i.mean}}</td>
    </tr>
 </table>
 
</div>

</div>
    

<canvas id="meanChart"></canvas>
</div>
</div>


</template>

<script>
import { Chart, LinearScale, CategoryScale } from 'chart.js/auto';

import axios, { Axios } from 'axios';
import { nextTick } from 'vue';
import * as XLSX from 'xlsx';

export default{
    data(){
        return{
          tableNameList:[],
          evaluatedName:'',
          noteMode:true,
          graphMode:false,
          graph:"",
          note:"",
          languageTemp:"",
        divChangeLanguage:false,
        meanPerGroupChef:[],
        chefEvaluation:[],
            collabEvaluation:[],
            meanPerGroupCollab:[],
           persoData:[],
           searchPersoByMatrBtn:"",
           persoByMatr:"",
           autoEvaluations:[],
           meanPerGroup:[],
           pairEvaluation:[],
           meanPerGroupPair:[],
           totalMean:[],
           chart:null,
           debounceTimeout: null,
           evaluation:[],
           evaluatorNbr:"",
           evaluatedNbr:"",
           bool:false,
           periodLabel:"",
              //  language
          
          emptytablej:"",
          evaluatorLabel_syslg:"",
          evaluatedLabel_syslg:"",
          getByEvaluator_syslg:"",
          getByEvaluated_syslg:"",
          getByBoth:"",
          overviewCaption_syslg:"",
          evaluatorth_syslg:"",
          evaluatedTh_syslg:"",
          critereTh_syslg:"",
          marksTh_syslg:"",
          dateTh_syslg:"",
          getChartBtn_syslg:"",
          getArrraysBtn_syslg:"",
          selfEvaluationSpan_syslg:"",
          selfEvaluationMarks_syslg:"",
          criteriaGroups_syslg:"",
          meanSelfEvaluation_syslg:"",
          counterPartEvaluationSpan_syslg:"",
          meanOfcounterPartEvaluation_syslg:"",
          oppNbrSpan_syslg:"",
          oppNbrCap_syslg:"",
          meanOfoppnbr_syslg:"",
          chefEvaluationSpan_syslg:"",
          chefEvaluationCaption_syslg:"",
          meanByChefCap_syslg:"",
          overallMeanTotal_syslg:"",
          nopersoFoundAlt:"",
          enterMatrAlt:"",
          period:"",
          labelChart:"",
          perfclick:false,
          persoList:"",
          idTable:['autoEvaluationTable','autoEvMeanTable'],

        }
    },
    mounted(){
      this.shiftLanguage()
      this.fetchPerso()
},
    computed: {
      autoEvaluationsFilter(){
        if(this.autoEvaluations!=[]){
          
const search = this.$store.state.dataSearchInput.toLowerCase();

return this.autoEvaluations.filter(item => {

const groupe = item.groupe.toLowerCase();
const critere=item.critere.toLowerCase();
const note=item.note

return critere.includes(search) || note.includes(search)  || groupe.includes(search);

});

}else{
return this.autoEvaluations
}
      },
      pairEvaluationFilter(){
        if(this.pairEvaluation!=[]){

const search = this.$store.state.dataSearchInput.toLowerCase();
return this.pairEvaluation.filter(item => {

const groupe = item.groupe.toLowerCase();
const critere=item.critere.toLowerCase();
const note=item.note

return critere.includes(search) || note.includes(search)  || groupe.includes(search);
});  
}else{
return this.pairEvaluation
}
      },
      chefEvaluationFilter(){
        if(this.chefEvaluation!=[]){

const search = this.$store.state.dataSearchInput.toLowerCase();
return this.chefEvaluation.filter(item => {

const groupe = item.groupe.toLowerCase();
const critere=item.critere.toLowerCase();
const note=item.note

return critere.includes(search) || note.includes(search)  || groupe.includes(search);
});  
}else{
return this.chefEvaluation
}
      },
      collabEvaluationFilter(){
        if(this.collabEvaluation!=[]){

const search = this.$store.state.dataSearchInput.toLowerCase();

return this.collabEvaluation.filter(item => {

const groupe = item.groupe.toLowerCase();
const critere=item.critere.toLowerCase();
const note=item.note

return critere.includes(search) || note.includes(search)  || groupe.includes(search);
});  
}else{
return this.collabEvaluation
}
      },
//       totalMeanFilter(){
//         if(this.totalMean!=[]){

// const search = this.$store.state.dataSearchInput.toLowerCase();
// return this.totalMean.filter(item => {
  

// const groupe = item.groupe.toLowerCase();
// const mean=parseFloat(item.mean)

// return mean.includes(search)  || groupe.includes(search);
// });  
// }else{
// return this.totalMean
// }
//       },
      meanPerGroupFilter(){
        if(this.meanPerGroup!=[]){

const search = this.$store.state.dataSearchInput.toLowerCase();
return this.meanPerGroup.filter(item => {

const groupe = item.groupe.toLowerCase();
const mean=item.mean

return mean.includes(search)  || groupe.includes(search);
});  
}else{
return this.meanPerGroup
}
      },
      meanPerGroupChefFilter(){
        if(this.meanPerGroupChef!=[]){

const search = this.$store.state.dataSearchInput.toLowerCase();
return this.meanPerGroupChef.filter(item => {

const groupe = item.groupe.toLowerCase();
const mean=item.mean

return mean.includes(search)  || groupe.includes(search);
});  
}else{
return this.meanPerGroupChef
}
      },
      meanPerGroupPairFilter(){
        if(this.meanPerGroupPair!=[]){

const search = this.$store.state.dataSearchInput.toLowerCase();
return this.meanPerGroupPair.filter(item => {

const groupe = item.groupe.toLowerCase();
const mean=item.mean

return mean.includes(search)  || groupe.includes(search);
});  
}else{
return this.meanPerGroupPair
}
      },
      meanPerGroupCollabFilter(){
        if(this.meanPerGroupCollab!=[]){

const search = this.$store.state.dataSearchInput.toLowerCase();
return this.meanPerGroupCollab.filter(item => {

const groupe = item.groupe.toLowerCase();
const mean=item.mean

return mean.includes(search)  || groupe.includes(search);
});  
}else{
return this.meanPerGroupCollab
}
      },

      evaluationFiltered(){

       if(this.evaluation!=[]){

        const search = this.$store.state.dataSearchInput.toLowerCase();
  return this.evaluation.filter(item => {
    const evaluator = item.evaluator.toLowerCase();
    const evaluated = item.evaluated.toLowerCase();
    const critere=item.critere.toLowerCase();
    const note=item.note
    const dateEvaluation=item.dateEvaluation.toLowerCase();

    return evaluator.includes(search) || evaluated.includes(search) || 
    critere.includes(search) || note.includes(search)  || dateEvaluation.includes(search);
  });  
       }else{
        return this.evaluation
       }
  
 
 }
},

   
    methods:{
      fetchPerso(){
        var formData=new FormData();
            formData.append('action',"fetchPersonnelNames"); 
           
            
            axios
            .post(this.$store.state.fileConfContent, formData)
            .then((response) => {
                console.log(response);
              this.persoList=response.data
            })
          .catch((err) => {
           console.log(err); 
         
           
        });
      },
      shiftLanguage(){
        if(this.$store.state.languageSys=="french"){

          this.note="Notes en général"
          this.graph="Moyennes des notes"
          this.evaluatorLabel_syslg="Evaluateur"
          this.evaluatedLabel_syslg="Evalué"
          this.getByEvaluator_syslg="Chercher par matricule de l'evaluateur"
          this.getByEvaluated_syslg="Chercher par matricule de l'evalué"
          this.getByBoth="Chercher par matricule de l'evaluateur et celui de l'evalué"
          this.overviewCaption_syslg="Aperçu"
          this.evaluatorth_syslg="Evaluateur"
          this.evaluatedTh_syslg="Evaluaé"
          this.critereTh_syslg="Critère"
          this.marksTh_syslg="Note"
          this.dateTh_syslg="Date"
          this.searchPersoByMatrBtn="Calculer la moyenne de cette personne"
          this.getChartBtn_syslg="Afficher le diagramme"
          this.getArrraysBtn_syslg="Afficher les tableaux"
          this.selfEvaluationSpan_syslg="Auto-evaluation"
          this.selfEvaluationMarks_syslg="Note d'auto-evaluation"
          this.criteriaGroups_syslg="Groupe de critère"
          this.meanSelfEvaluation_syslg="Moyenne de l'auto-evaluation"
          this.counterPartEvaluationSpan_syslg="Evaluation par les collaborateurs"
          this.counterPartEvaluationMarks_syslg="Note d'evaluation par les collaborateurs"
          this.meanOfcounterPartEvaluation_syslg="Moyenne de l'evaluation par les collaborateurs"
          this.oppNbrSpan_syslg="Evaluation par les pairs"
          this.oppNbrCap_syslg="Note d'evaluation par les pairs"
          this.meanOfoppnbr_syslg="Moyenne de l'evaluation des pairs"
          this.chefEvaluationSpan_syslg="Evaluation par le chef hiérarchique"
          this.chefEvaluationCaption_syslg="Note d'evaluation par le chef hiérarchique"
          this.meanByChefCap_syslg="Moyenne de l'evaluation par le chef hiérarchique"
          this.overallMeanTotal_syslg="Moyenne totale"
          this.nopersoFoundAlt="Aucun personnel trouvé"
          this.enterMatrAlt="Veuillez completer tout les champs"
          this.emptytablej="Aucune évaluation trouvé" 
          this.periodLabel="Période"
          this.labelChart="Moyenne totale de l'évaluation"

        }else if(this.$store.state.languageSys=="english"){

          this.note="Global marks"
          this.graph="Overall means"
          this.evaluatorLabel_syslg="Evaluator"
          this.evaluatedLabel_syslg="Evaluated"
          this.getByEvaluator_syslg="Search by evaluator's Id"
          this.getByEvaluated_syslg="Search by evaluated's Id"
          this.getByBoth="Search by both the evaluated's and evaluator's Id"
          this.overviewCaption_syslg="Overview"
          this.evaluatorth_syslg="Evaluator"
          this.evaluatedTh_syslg="Evaluated"
          this.critereTh_syslg="Criteria"
          this.marksTh_syslg="Mark"
          this.dateTh_syslg="Date"
          this.searchPersoByMatrBtn="Compute the mean mark of this person"
          this.getChartBtn_syslg="Display chart"
          this.getArrraysBtn_syslg="Display arrays"
          this.selfEvaluationSpan_syslg="Self-evaluation"
          this.selfEvaluationMarks_syslg="Self-evaluation marks"
          this.criteriaGroups_syslg="Criteria groups"
          this.meanSelfEvaluation_syslg="Mean of self-evaluation"
          this.counterPartEvaluationSpan_syslg="Counterpart's evaluations"
          this.counterPartEvaluationMarks_syslg="Marks by counterpart's evaluation "
          this.meanOfcounterPartEvaluation_syslg="Mean of counterpart's evaluations"
          this.oppNbrSpan_syslg="Opposite number's evaluations"
          this.oppNbrCap_syslg="Marks by opposite number's evaluations "
          this.meanOfoppnbr_syslg="Mean of opposite number's evaluations"
          this.chefEvaluationSpan_syslg="Hierarchical leader's evaluation"
          this.chefEvaluationCaption_syslg="Marks by the hierarchical leader's evaluation"
          this.meanByChefCap_syslg="Mean of the hierarchical leader's evaluation"
          this.overallMeanTotal_syslg="Total overall means"
          this.nopersoFoundAlt="No Staff found"
          this.enterMatrAlt="Fill out all the fields"
          this.emptytablej="No data found"
          this.periodLabel="Period"
          this.labelChart="Mean of the evaluation"

        }else{

          this.note="Fafan'ny noty"
          this.graph="Noty ankapobeny"
          this.evaluatorLabel_syslg="Mpanombana"
          this.evaluatedLabel_syslg="Voatombana"
          this.getByEvaluator_syslg="Hitady amin'ny alalan'ny mpanombana"
          this.getByEvaluated_syslg="Hitady amin'ny alalan'ny voatombana"
          this.getByBoth="Hitady amin'ny alalan'ny mpanombana sy ny voatombana"
          this.overviewCaption_syslg="Topimaso"
          this.evaluatorth_syslg="Mpanombana"
          this.evaluatedTh_syslg="Voatombana"
          this.critereTh_syslg="Mason-tsivana"
          this.marksTh_syslg="Noty"
          this.dateTh_syslg="Fotoana"
          this.searchPersoByMatrBtn="Hikajy ny noty"
          this.getChartBtn_syslg="Aneho ny kisary"
          this.getArrraysBtn_syslg="Aneho ny fafana"
          this.selfEvaluationSpan_syslg="Tomban-tena"
          this.selfEvaluationMarks_syslg="Noty'ny tomban-tena"
          this.criteriaGroups_syslg="Vondro-mason-tsivana"
          this.meanSelfEvaluation_syslg="Tomban-tena ankapobeny"
          this.counterPartEvaluationSpan_syslg="Tomban'ny ekipa"
          this.counterPartEvaluationMarks_syslg="Noty notombanan'ny ekipa"
          this.meanOfcounterPartEvaluation_syslg="Tomban'ny ekipa ankapobeny"
          this.oppNbrSpan_syslg="Tomban'ny servisy hafa"
          this.oppNbrCap_syslg="Noty notombanan'ny servisy hafa"
          this.meanOfoppnbr_syslg="Tomban'ny servisy hafa ankapobeny" 
          this.chefEvaluationSpan_syslg="Tomban'ny lehibe"
          this.chefEvaluationCaption_syslg="Noty notombanan'ny lehibe"
          this.meanByChefCap_syslg="Tomban'ny lehibe ankapobeny"
          this.overallMeanTotal_syslg="Totalin'ny noty ankapobeny"
          this.nopersoFoundAlt="Tsy hita ny olona tadiavinao"
          this.enterMatrAlt="Fenoy ny banga"
          this.emptytablej="Tsy hita ny karoka natao"
          this.periodLabel="Taona"
          this.labelChart="Noty totaly ankapobeny"

        }
      },

      hide(i){
      
  if(i=="arrays"){
    document.getElementById(i).style.display='none'
    document.getElementById("meanChart").style.display="block"
  }else{
       document.getElementById(i).style.display='none'
    document.getElementById("arrays").style.display="block"
  }
      },
       styleBtn(i){
          var btn1=document.getElementById("m1"),
          btn2=document.getElementById("m2")
if(i=="m1"){
  btn1.style.borderBottom="1px solid black"
  btn2.style.border="none"
}else{
  
  btn2.style.borderBottom="1px solid black"
  btn1.style.border="none"

}

      },
      
      getByEvaluated(){
        var formData=new FormData();
            formData.append('action',"getByEvaluated"); 
            formData.append('matriculeNbr',this.evaluatedNbr);
            
            axios
            .post(this.$store.state.fileConfContent, formData)
            .then((response) => {
                console.log(response);
                if(response.data==null)this.evaluation=[];
                else this.evaluation=response.data;
                if(this.evaluation==false || this.evaluation.length==0)this.cAlert(this.emptytablej)
            })
          .catch((err) => {
           console.log(err); 
         
           
        });
      },

      getByEvaluator(){
        var formData=new FormData();
            formData.append('action',"getByEvaluator"); 
            formData.append('matriculeNbr',this.evaluatorNbr);
            
            axios
            .post(this.$store.state.fileConfContent, formData)
            .then((response) => {
                console.log(response);
                if(response.data==null)this.evaluation=[];
                else this.evaluation=response.data;
   if(this.evaluation==false || this.evaluation.length==0)this.cAlert(this.emptytablej)
            })
          .catch((err) => {
           console.log(err); 
        
           
        });
      },
      
    ExportToExcel(fileNameP,tableNames) {
            if(confirm("Exporter en Excel ?")){
                     const wb = XLSX.utils.book_new();
    

        tableNames.forEach(tableId => {
const elt = document.getElementById(tableId);

//   const wb = XLSX.utils.table_to_book(elt, { sheet: 'Sheet '+tableId });
const ws = XLSX.utils.table_to_sheet(elt);

//   // Add a caption (title) at the top of the sheet
//   const caption = Table ${tableId} Caption (Excel);
//     ws[A1] = { t: 's', v: caption, s: { font: { bold: true } } };
//     ws['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 2 } }]; // Merge cells for the title
// const rowsLength = XLSX.utils.decode_range(ws['!ref']).e.r + 1;
// ws['A2'].s.border = { top: { style: 'thin' }, bottom: { style: 'thin' }, left: { style: 'thin' }, right: { style: 'thin' } };
var sheetname;
if(tableId=='autoEvaluationTable')sheetname='Auto-evaluation'
if(tableId=='autoEvMeanTable')sheetname="Moyenne de l'auto-Evaluation"
if(tableId=='counterParttable')sheetname='Par les collaborateurs'
if(tableId=='counterpartMeanTable')sheetname="Moyenne par les collaborateurs"
if(tableId=='oppnbrTable')sheetname="Par d'autres services"
if(tableId=='oppnbrMeanTable')sheetname="Moyenne par d'autres services"
if(tableId=="chefEvTable")sheetname="Evaluation par le chef"
if(tableId=='chefMeanTable')sheetname="Moyenne par le chef"
if(tableId=="overallMeanTable")sheetname="Moyenne totale"
XLSX.utils.book_append_sheet(wb, ws,sheetname);

});
// Modify the filename for each table
const filename = fileNameP+'.xlsx';

// Export each table

     
      XLSX.writeFile(wb, filename);


            }


        },





      fetchEvaluation(){

        var formData=new FormData();
            formData.append('action',"fetchEvaluation"); 
            formData.append('matriculeNbrEvaluateur',this.evaluatorNbr);
            formData.append('matriculeNbrEvaluated',this.evaluatedNbr);
            
            axios
            .post(this.$store.state.fileConfContent, formData)
            .then((response) => {
                console.log(response);
                if(response.data==null)this.evaluation=[];
                else this.evaluation=response.data;
   if(this.evaluation==false || this.evaluation.length==0)this.cAlert(this.emptytablej)
            })
          .catch((err) => {
           console.log(err); 
         
           
        });
      },

      init(){
          this.collabEvaluation=[];
          this.meanPerGroupCollab=[];
          this.pairEvaluation=[];
          this.meanPerGroupPair=[]; 
          this.chefEvaluation=[];
          this.meanPerGroupChef=[];
          this.meanPerGroup=[];
          this.autoEvaluations=[];
          this.totalMean=[]
        
     
         
      },
    
      logout(){
          this.$store.commit("setRapport",false);
          this.$store.commit("setgMatriculation",true);
      },
        getChart(){
          this.getTotalMeanEvaluation()
            const canvas = document.getElementById('meanChart');
        const ctx = canvas.getContext('2d');
        clearTimeout(this.debounceTimeout);
        if (this.chart) {
    this.chart.destroy();
  }
        const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.totalMean.map(item => item.groupe), // X-axis labels
        datasets: [
          {
            label: this.labelChart,
            data: this.totalMean.map(item => item.mean), // Y-axis data
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Bar color
            borderColor: 'rgba(75, 192, 192, 1)', // Border color
            borderWidth: 1, // Border width
          },
        ],
      },
      options: {
        scales: {
          y: {
            type: 'linear',
             max: 5, // Définit la valeur maximale de l'axe y à 5
        min: 0,
          },
        },
      },
      
    });
    this.chart = chart;
        },
        debouncedGetChart() {
    // Debounce the getChart method to avoid rapid clicks causing issues
    clearTimeout(this.debounceTimeout);
    this.debounceTimeout = setTimeout(this.getChart, 3000); // Adjust the debounce delay as needed
  },
        getTotalMeanEvaluation(){


this.totalMean = [];
var topNbr;
if(this.meanPerGroup.length>0)topNbr = this.meanPerGroup.length
else if(this.meanPerGroupCollab.length>0)topNbr = this.meanPerGroupCollab.length
else if(this.meanPerGroupChef.length>0)topNbr = this.meanPerGroupChef.length
else if(this.meanPerGroupPair.length>0)topNbr = this.meanPerGroupPair.length

for (let i = 0; i < topNbr; i++) {

  let k=0, sum = 0;
  let groupe = ''; 

  if (this.meanPerGroupPair[i]) {k++;
    sum += parseFloat(this.meanPerGroupPair[i].mean) ;

    groupe = this.meanPerGroupPair[i].groupe || groupe;
  }

  if (this.meanPerGroupCollab[i]) {k++;
    sum += parseFloat(this.meanPerGroupCollab[i].mean) ;

    groupe = this.meanPerGroupCollab[i].groupe || groupe;
  }

  if (this.meanPerGroupChef[i]) {k++;
    sum += parseFloat(this.meanPerGroupChef[i].mean) ;

    groupe = this.meanPerGroupChef[i].groupe || groupe;
  }

  if (this.meanPerGroup[i]) {k++;
    sum += parseFloat(this.meanPerGroup[i].mean) ;

    groupe = this.meanPerGroup[i].groupe || groupe;
  }

  this.totalMean.push({
    groupe: groupe,
    mean: sum/k,
  });
}


  
    
  },
        
        getMeanPerGroupChef(){
            var formData=new FormData();
            formData.append('action',"getMeanPerGroupChef"); 
            formData.append('matriculeNbr',this.persoData.matriculePerso);
             formData.append('period',this.period);
            axios
            .post(this.$store.state.fileConfContent, formData)
            .then((response) => {
                console.log(response);
                if(response.data.length==0)console.log("no chef evaluation yet");
                else this.meanPerGroupChef=response.data;
                
                
            })
          .catch((err) => {
           console.log(err); 
           
           
        });
        },
        getChefEvaluation(){
          if(this.bool){
            var formData=new FormData();
            formData.append('action',"getChefEvaluation"); 
            formData.append('matriculeNbr',this.persoData.matriculePerso);
             formData.append('period',this.period);
            axios
            .post(this.$store.state.fileConfContent, formData)
            .then((response) => {
                console.log(response);
                if(response.data.length==0)console.log("no  chef evaluation yet");
                else this.chefEvaluation=response.data;
                this.getMeanPerGroupChef();
            })
          .catch((err) => {
           console.log(err); 
      
           
        });
      }
      this.bool=false;
      if(this.meanPerGroup.length!=0 || this.meanPerGroupChef!=0 
             || this.meanPerGroupCollab!=0 || this.meanPerGroupPair!=0) this.perfclick=true;
        },
        getMeanPerGroupCollab(){
            var formData=new FormData();
            formData.append('action',"getMeanPerGroupCollab"); 
            formData.append('matriculeNbr',this.persoData.matriculePerso);
             formData.append('period',this.period);
            axios
            .post(this.$store.state.fileConfContent, formData)
            .then((response) => {
                console.log(response);
                if(response.data.length==0)console.log("no collab evaluation yet");
                else this.meanPerGroupCollab=response.data;

            })
          .catch((err) => {
           console.log(err); 
         
        });
        },
        getCollabEvaluation(){
          if(this.bool){
            var formData=new FormData();
            formData.append('action',"getCollabEvaluation"); 
            formData.append('matriculeNbr',this.persoData.matriculePerso);
            formData.append('period',this.period);
            axios
            .post(this.$store.state.fileConfContent, formData)
            .then((response) => {
                console.log(response);
                if(response.data.length==0)console.log("no  collab evaluation yet");
                else this.collabEvaluation=response.data;
                this.getMeanPerGroupCollab();
            })
          .catch((err) => {
           console.log(err); 
      
           
        });
      }
     
        },
        getMeanPerGroupPair(){
            var formData=new FormData();
            formData.append('action',"getMeanPerGroupPair"); 
            formData.append('matriculeNbr',this.persoData.matriculePerso);
            formData.append('period',this.period);
            axios
            .post(this.$store.state.fileConfContent, formData)
            .then((response) => {
                console.log(response);
                if(response.data.length==0)console.log("no pair evaluation yet");
                else this.meanPerGroupPair=response.data;

            })
          .catch((err) => {
           console.log(err); 
         
           
        });
        },
        getPairEvaluation(){
          if(this.bool){
            var formData=new FormData();
            formData.append('action',"getPairEvaluation"); 
            formData.append('matriculeNbr',this.persoData.matriculePerso);
             formData.append('period',this.period);
            axios
            .post(this.$store.state.fileConfContent, formData)
            .then((response) => {
                console.log(response);
                if(response.data.length==0)console.log("no pair evaluation yet");
                else {this.pairEvaluation=response.data;
               
                }
                this.getMeanPerGroupPair();
            })
          .catch((err) => {
           console.log(err); 
       
           
        });
      }
    
        },
        getMeanPerGroup(){
            var formData=new FormData();
            formData.append('action',"getMeanPerGroup"); 
            formData.append('matriculeNbr',this.persoData.matriculePerso);
            formData.append('period',this.period)
            axios
            .post(this.$store.state.fileConfContent, formData)
            .then((response) => {
                console.log(response);
                if(response.data.length==0)console.log("no autoevaluation yet");
                else this.meanPerGroup=response.data;

            })
          .catch((err) => {
           console.log(err); 
          
           
        });
        },
        operate(){
          
          this.init();
          this.searchPersoByMatr();
           const selectedPerson = this.persoList.find(person => person.matriculePerso === this.persoByMatr);
        this.evaluatedName=selectedPerson.prenom;

      
         
        },

         generateTableNameList() {
          this.tableNameList=[];
     const tableData =  {
autoEvaluationTable:this.autoEvaluations,
autoEvMeanTable:this.meanPerGroup,
counterParttable:this.pairEvaluation,
counterpartMeanTable:this.meanPerGroupPair,
oppnbrTable:this.collabEvaluation,
oppnbrMeanTable:this.meanPerGroupCollab,
chefEvTable:this.chefEvaluation,
chefMeanTable:this.meanPerGroupChef,
overallMeanTable:this.totalMean,
    }
   
   

      Object.entries(tableData).forEach(([tableID, data]) => {
      // Check if the data for the table is not empty (you can define your condition here)
      if (data && data.length > 0) {
        this.tableNameList.push(tableID); // Add the non-empty table ID to the list
      }
    });
    
  },
        getAutoEvaluation(){
          if(this.bool){
            var formData=new FormData();
            formData.append('action',"getAutoEvaluation"); 
      
            formData.append('matriculeNbr',this.persoData.matriculePerso);
             formData.append('period',this.period);
        
            axios
            .post(this.$store.state.fileConfContent, formData)
            .then((response) => {
                console.log(response);
                if(response.data.length==0)console.log("no autoevaluation yet");
                else this.autoEvaluations=response.data;
                this.getMeanPerGroup();
              
            })
          .catch((err) => {
           console.log(err); 
          
           
        });
          }
            
        },
        searchPersoByMatr(){
          

          if(this.persoByMatr!="" && this.period!=""){
            var formData=new FormData();
            formData.append('action',"searchPersoByMatr"); 
            formData.append('matriculeNbr',this.persoByMatr);
        
            axios
            .post(this.$store.state.fileConfContent, formData)
            .then((response) => {  
                console.log(response);
              
                if(response.data.length==0 || response.data==undefined || response.data==null)
                
                {this.cAlert(this.nopersoFoundAlt);
                  this.perfclick=false;
                }
                else {
                  this.persoData=response.data;
                  this.bool=true
                   this.getAutoEvaluation();
          this.getPairEvaluation();
         this.getCollabEvaluation();
          this.getChefEvaluation()
          this.$nextTick(() => {
        // This callback will be called after the next DOM update
      
            
    });
          
    this.perfclick=true;
                }
         
              
            })
          .catch((err) => {
           console.log(err); 
          
            
        });
            
      
            
          }else{
            this.cAlert(this.enterMatrAlt)
            this.perfclick=false
          }
         
     if(this.totalMean.length==0) this.perfclick=false;
        },
       
    },
   
}
</script>

<style scoped >
  @font-face {
  font-family: 'openSansFont';
  src: url('fontFamily/openSansRegular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}
#sel1,#id1{
  position: absolute;
  left: 0px;
  width: auto;
}
#sel2{
  position: absolute;

  width: auto;
}
#id2{
  position: absolute;
  left: 520px;
}
#autoEvaluation{
 position: absolute;
  top: 100px;
left:0;
  width: max-content;
justify-content: center;
align-items: center;
margin-left: 50px;

}
#pairEvaluation{
 position: absolute;
  top: 100px;
left:500px;
  width: max-content;
justify-content: center;
align-items: center;
margin-left: 50px;
}
#collabEvaluation{
 position: absolute;
  top: 100px;
left:1000px;
  width: max-content;
justify-content: center;
align-items: center;
margin-left: 50px;
}
#chefEvaluation{
 position: absolute;
  top: 100px;
left:1500px;
  width: max-content;
justify-content: center;
align-items: center;
margin-left: 50px;
}
#totalMeanEvaluation{
 position: absolute;
  top:100px;
left:2000px;
  width: max-content;
justify-content: center;
align-items: center;
margin-left: 50px;
}
#meanChart{
  position: absolute;
  top: 100px;
  width: 0;
  height: 100px;
  
}

.custom-table {
  width:25%; /* Make the table take the full width of its container */
  border-collapse: collapse; /* Remove space between table cells */
  margin-top: 20px; /* Add some top margin */

  margin-right: 10%;
  margin-left: 20px;
}
#form1{
  position: absolute;
  width: 100%;
  top: 0;
  left: 20%;

}
/* #id1{
  position: absolute;
  left: 10px;
  top: 0;
  margin-right: 100px;
} */
#id3{
  position: absolute;
  top: 70px;
  left:10px;
}
/* #id2{
  position: absolute;
  left: 420px;
  top:0;
} */
#id4{
  position: absolute;
 top: 70px;
  left: 420px;
}
#id5{
  position: absolute;
  left: 150px;
  top: 120px;
}
#tb1{
  position: absolute;
  top: 200px;
  left: 500px;
  width: max-content;
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
p{
 font-family: 'openSansFont';
 font-weight: bold;
 text-decoration:underline;
 font-size: 25px;

}
caption 
{
            caption-side: top;
            text-align: center;
            background:#267871  ;
}
#graphSearch{
     position: absolute;
  top: 0;
left: 20%;
  width: max-content;
justify-content: center;
align-items: center;

}
#graph{
   position: absolute;
  top: 60px;
left: 10px;
  width: 100%;
  height: max-content;
justify-content: center;
align-items: center;

}
.formInput{
  position: absolute;
  top: 60px;
left: 10px;
  width: max-content;
justify-content: center;
align-items: center;

}
.forms{
  width: max-content;
  margin: auto;
justify-content: center;
align-items: center;

}
label{
  margin-right: 10px;
}
.submitBtn{
  background:  #267871 ;
  width: max-content;
  height: 40px;
  color: white;
  background: 1px solid #267871;
}
th{
  text-align: center;
}
 .matriculeSpan,.nomSpan, .prenomSpan,.serviceSpan,.evaluateTd,.ChefSpan{
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
#littleNav{
  position: absolute;
  top: 0;
  left: 50%;
height: 60px;
}
#updateDiv{
  position: absolute;

  top: 60px;
  width: 100%;
}
#m2{
  border: none;
}
#m1{
  border:none;
  border-bottom: 1px solid black;
  margin-right: 10px;
}
#evaluatorAndNote{

  position: absolute;
  top: 60px;
  width: 100%;
  height: max-content;
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