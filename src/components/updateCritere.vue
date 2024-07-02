<template>


    <div  id="divPerso" class="FirstDiv" >

      <div id="littleNav">
        <button id="m1" class="menuPerso" @click="styleBtn('m1')"><i class="fa fa-refresh" aria-hidden="true"></i> {{ updateCritere }}</button>
 <button id="m2" class="menuPerso" @click="styleBtn('m2')"><i class="fa fa-plus" aria-hidden="true"></i> {{ insertCritere }}</button>
 
 <button id="m3" class="menuPerso" @click="styleBtn('m3')"><i class="fa fa-refresh" aria-hidden="true"></i> {{ updateGroupelabel }}</button>
 <button id="m4" class="menuPerso" @click="styleBtn('m4')"><i class="fa fa-plus" aria-hidden="true"></i> {{ insertGroupe }}</button>
      </div>

<!-- insert new criteria -->
    <div class="formInput" v-if="critereInsertBtn" >

   <label >{{ criteriaLabel_syslg }}<input class="form-control" type="text" v-model="critere"></label> <br><br>
    <label >{{ groupLabel_syslg }}
      
      <select  class="form-control" v-model="idGroupe" id="serviceSelect">
      <option v-for="i in listGroupe" :key="i.idGroupe" :value="i.idGroupe">
        {{ i.groupeNom }}
      </option>
    </select>
    
    </label><br><br>
   <label >{{ questionLabel_syslg }}<input class="form-control" type="text" v-model="question"></label> <br><br>

<button @click="insertCriteria" class="submitBtn"  type="submit">{{ insertCriteriaBtn_syslg }}</button>

  </div>
  <!-- insert groupe- -->
<div v-if="groupeInsertBtn" class="formInput">
<label >{{ groupLabel_syslg }}<input class="form-control" type="text" v-model="group"></label>

<button @click="insertGroup"  class="submitBtn" type="submit">{{ insertCriteriaBtn_syslg }}</button>
</div>
 

<!-- update critere -->
<div id="updateDiv" v-if="critereUpdateBtn">

  <form class="forms" v-if="formUpdate">

  
 <label>{{ criteriaLabel_syslg }}<input class="form-control" type="text" v-model="critereu"></label>

 <label >{{ groupLabel_syslg }}

  <select  class="form-control" v-model="idGroupeu" id="serviceSelect">
      <option v-for="i in listGroupe" :key="i.idGroupe" :value="i.idGroupe">
        {{ i.groupeNom }}
      </option>
    </select>

</label> 
<label>  {{ questionLabel_syslg }}<input class="form-control" type="text" v-model="questionu"></label>

<button   @click="updateDB();formUpdate=false" class="submitBtn"  type="submit">{{ updateBtn_syslg }}</button>

</form>

<div id="allStaff">

<table>
<caption><i class="fa fa-list" aria-hidden="true"></i> {{ criteriaListCap_syslg }}</caption>
<tr>

<th >
  <i class="fa fa-star" aria-hidden="true"></i>
      {{ criteriaLabel_syslg }}
  </th >

  <th  >
    <i class="fa fa-object-group" aria-hidden="true"></i>
    {{ groupLabel_syslg }}
  </th>

  <th >
    <i class="fa fa-question" aria-hidden="true"></i>
    {{ questionLabel_syslg }}
  </th>
  <th colspan="2"><i class="fa fa-pencil-square" aria-hidden="true"></i> {{ operation_syslg }}</th>

</tr>
 
  <tr v-for="i in filteredListCritere" :key="i.idCritere">

    <td class="matriculeSpan">
                {{i.critere }}
              </td>
              <td class="nomSpan">
                {{i.groupeNom}}
              </td>
               <td class="prenomSpan">
                {{i.question }}
              </td>
            


     <td class="evaluateTd" ><button id="deleteBtn" class="allStaffBtn" @click="deleteCriteria(i)" ><i class="fa fa-trash" aria-hidden="true"></i> </button></td>
     <td class="evaluateTd"><button id="updateBtn" class="allStaffBtn" @click="formUpdate=true;updateCriteria(i)"><i class="fa fa-pencil" aria-hidden="true"></i> </button></td>
  </tr>

</table>

</div>
</div>
  <!-- update groupe -->
  <div id="updateDiv" v-if="groupeUpdateBtn">

      <form class="forms" v-if="formUpdate1" >

  
 <label> {{ groupLabel_syslg }}<input class="form-control" type="text" v-model="groupUp"></label>  
   
<button  class="submitBtn" @click="formUpdate1=false;updateGroupe()"  type="submit">{{ updateBtn_syslg }}</button>

  </form>

  <div id="allStaff">
               
           
               <table>
                <caption><i class="fa fa-list" aria-hidden="true"></i> {{ listGroup_syslg }}</caption>
                <tr>
                 
                 <th >  <i class="fa fa-object-group" aria-hidden="true"></i> {{ idAndGroup_syslg }}</th>
                 <th colspan="2"><i class="fa fa-pencil-square" aria-hidden="true"></i> {{ operation_syslg }}</th>
                </tr>

                <tr v-for="perso in filteredGroupe" :key="perso.idGroupe">


                  <td class="matriculeSpan">
                    {{ perso.idGroupe }}
                  {{perso.groupeNom }}
                </td>
               

                  <td  ><button id="deleteGrp"  @click="deleteGroupe(perso.idGroupe)" class="allStaffBtn"><i class="fa fa-trash" aria-hidden="true"></i></button></td>
                  <td  ><button id="updateGrp" @click="getGroupe(perso);formUpdate1=true" class="allStaffBtn"><i class="fa fa-pencil" aria-hidden="true"></i> </button></td>
                
                
                </tr>
               </table>
               
            </div>

<!--   
  <form  @submit.prevent="deleteGroupe">
groupId<input type="number" v-model="groupDelete">
    
<button type="submit">delete</button>

  </form> -->

  </div>
 





</div>
</template>

<script>
import axios from 'axios';

  export default {
      data(){
        return{
          formUpdate1:false,
          formUpdate:false,
          insertGroupe:"",
          insertCritere:"",
          updateCritere:"",
          updateGroupelabel:"",
          listCritere:[],
          groupDelete:"",
          groupIdUp:"",
          groupUp:"",
          group:"",
          critereDelete:"",
            critere:"",
            idGroupe:"",
            question:"",
          critereId:"",
            critereu:"",
            idGroupeu:"",
            questionu:"",
            idCritere2:"",
            listGroupe:[],
            critereUpdateBtn:true,
            critereInsertBtn:false,
            groupeInsertBtn:false,
            groupeUpdateBtn:false,

            // language
            infoBullId:'',
            criteriaLabel_syslg:"",
            idGroupeLabel:"",
            questionLabel_syslg:"",
            insertCriteriaBtn_syslg:"",
            groupLabel_syslg:"",
            updateBtn_syslg:"",
            criteriaListCap_syslg:"",
            operation_syslg:"",
            listGroup_syslg:"",
            idAndGroup_syslg:"",
            deletedAlt_syslg:"",
            updated_syslg:"",
            insertedDataAlt_syslg:"",
            updateCriteriaConf_syslg:"",
            deleteConf_syslg:"",
            insertionDataConf_syslg:"",
            emptyAlet_syslg:""
        }
      },
      mounted(){
        this.fetchCritereList();
        this.fetchAllGroupe();
        this.shiftLanguage()
      },
      computed:{
        filteredGroupe(){
                      
      const search = this.$store.state.dataSearchInput.toLowerCase();
  return this.listGroupe.filter(item => {
    const idGroupe=item.idGroupe;
    const groupeNom = item.groupeNom.toLowerCase();
  

    return groupeNom.includes(search) || idGroupe.includes(search) ;
  });
          
        },
        filteredListCritere(){
            
      const search = this.$store.state.dataSearchInput.toLowerCase();
  return this.listCritere.filter(item => {
    const critere = item.critere.toLowerCase();
    const groupeNom=item.groupeNom.toLowerCase();
    const question = item.question.toLowerCase();

    return critere.includes(search) || question.includes(search) || groupeNom.includes(search);
  });
            
            },
          },
      methods:{
        shiftLanguage(){
          if(this.$store.state.languageSys=="french"){

            this.updateCritere="Mise à jour des critères"
            this.insertCritere="Nouveau critère"
            this.updateGroupelabel="Mise à jour des groupes de critère"
            this.insertGroupe="Nouveau groupe de critères"
            this.criteriaLabel_syslg="Critère"
            this.idGroupeLabel="ID du groupe de critères"
            this.questionLabel_syslg="Questionnaire"
            this.insertCriteriaBtn_syslg="Inserer"
            this.groupLabel_syslg="Groupe de critères"
            this.updateBtn_syslg="Mettre à jour"
            this.criteriaListCap_syslg="Liste des critères"
            this.operation_syslg="Operation"
            this.listGroup_syslg="Liste des groupes de critères"
            this.idAndGroup_syslg="Id et groupe de critères"
            this.deletedAlt_syslg="Supprimé"
            this.updated_syslg="Mis à jour"
            this.insertedDataAlt_syslg="Inséré"
            this.updateCriteriaConf_syslg="Voulez-vous confirmer la mise à jour ?" 
            this.deleteConf_syslg="Voulez-vous confirmer la suppression ?"
            this.insertionDataConf_syslg="Voulez-vous confirmer l'insertion ?"
            this.emptyAlet_syslg="Veuillez completer les cases vides"
            this.infoBullId="ID existant seulement "

          }else if(this.$store.state.languageSys=="english"){

            this.updateCritere="Criteria update"
            this.insertCritere="New criteria"
            this.updateGroupelabel="Groups of criteria update"
            this.insertGroupe="New group of criterias"
            this.criteriaLabel_syslg="Criteria"
            this.idGroupeLabel="ID of the group of criterias"
            this.questionLabel_syslg="Questionnaire"
            this.insertCriteriaBtn_syslg="Insert"
            this.groupLabel_syslg="Group of criterias"
            this.updateBtn_syslg="Update"
            this.criteriaListCap_syslg="Criteria list"
            this.operation_syslg="Operation"
            this.listGroup_syslg="Criteria group list"
            this.idAndGroup_syslg="Id and Group of criterias"
            this.deletedAlt_syslg="Deleted"
            this.updated_syslg="Updated"
            this.insertedDataAlt_syslg="Inserted"
            this.updateCriteriaConf_syslg="Do you confirm this update ?"
            this.deleteConf_syslg="Do you want to delete this data ?"
            this.insertionDataConf_syslg="Are you sure you want to insert this data ?"
            this.emptyAlet_syslg="Blank fields"
             this.infoBullId="Existing ID only"

          }else{

            this.updateCritere="Hanavao ny mason-tsivana"
            this.insertCritere="Mason-tsivana vaovao"
            this.updateGroupelabel="Hanavao ny vondro-mason-tsivana"
            this.insertGroupe="Vondro-mason-tsivana vaovao"
            this.criteriaLabel_syslg="Mason-tsivana"
            this.idGroupeLabel="ID an'ny vondro-mason-tsivana"
            this.questionLabel_syslg="Fanontaniana"
            this.insertCriteriaBtn_syslg="Hampiditra"
            this.groupLabel_syslg="Vondro-mason-tsivana"
            this.updateBtn_syslg="Hanavao"
            this.criteriaListCap_syslg="Listry ny mason-tsivana"
            this.operation_syslg="Hetsika"
            this.listGroup_syslg="Listry ny vondro-mason-tsivana"
            this.idAndGroup_syslg="ID sy vondro-mason-tsivana"
            this.deletedAlt_syslg="Voafafa"
            this.updated_syslg="Voarakitra ny fiovana"
            this.insertedDataAlt_syslg="Tafiditra"
            this.updateCriteriaConf_syslg="Tanterahina ve ny fanavaozana ?"
            this.deleteConf_syslg="Tanterahina ve ny fanesorana ?"
            this.insertionDataConf_syslg="Tanterahina ve ny fampidirana ?"
            this.emptyAlet_syslg="Fenoy ny banga"
            this.infoBullId="ID efa misy ihany"


          }
        },

        getGroupe(item){
            this.groupUp=item.groupeNom
            this.groupIdUp=item.idGroupe
            
        },
        fetchAllGroupe(){
          var formData= new FormData();
          formData.append('action',"fetchAllGroupe");
          
         
          axios
            .post(this.$store.state.fileConfContent, formData)
            .then((response) => {
                
              this.listGroupe=response.data
            
            })
          .catch((err) => {
          
           
        });
        },
        styleBtn(i) {
          var btn1=document.getElementById("m1"),
          btn2=document.getElementById("m2"),
          btn3=document.getElementById("m3"),
          btn4=document.getElementById("m4")

    if (i === 'm1') {
      this.critereUpdateBtn = true;
      this.critereInsertBtn = false;
      this.groupeInsertBtn = false;
      this.groupeUpdateBtn = false;

      btn1.style.borderBottom="1px solid black"
      btn2.style.borderBottom=btn3.style.borderBottom=btn4.style.borderBottom="none"

    } else if (i === 'm2') {
      btn2.style.borderBottom="1px solid black"
      btn1.style.borderBottom=btn3.style.borderBottom=btn4.style.borderBottom="none"

      this.critereUpdateBtn = false;
      this.critereInsertBtn = true;
      this.groupeInsertBtn = false;
      this.groupeUpdateBtn = false;
    } else if (i === 'm3') {
      btn3.style.borderBottom="1px solid black"
      btn1.style.borderBottom=btn2.style.borderBottom=btn4.style.borderBottom="none"

      this.critereUpdateBtn = false;
      this.critereInsertBtn = false;
      this.groupeInsertBtn = false;
      this.groupeUpdateBtn = true;
    } else {
      btn4.style.borderBottom="1px solid black"
      btn2.style.borderBottom=btn3.style.borderBottom=btn1.style.borderBottom="none"

      this.critereUpdateBtn = false;
      this.critereInsertBtn = false;
      this.groupeInsertBtn = true;
      this.groupeUpdateBtn = false;
    }
  },
        fetchCritereList(){
          var formData= new FormData();
          formData.append('action',"fetchCritereList");
          
         
          axios
            .post(this.$store.state.fileConfContent, formData)
            .then((response) => {
                
              this.listCritere=response.data
            
            })
          .catch((err) => {
       
           
        });
        },
        deleteGroupe(item){
          if(confirm(this.deleteConf_syslg)){
              var formData= new FormData();
          formData.append('action',"deleteGroupe");
          formData.append("groupeId",item);
          
         
          axios
            .post(this.$store.state.fileConfContent, formData)
            .then((response) => {
                console.log("success");
                this.cAlert(this.deletedAlt_syslg);
                this.refreshComponentView()
                
            })
          .catch((err) => {
          
           
        });
          }
        },
        updateGroupe(){ 
        if(this.groupIdUp!="" && this.groupUp!="" ){
          if(confirm(this.updateCriteriaConf_syslg)){
                var formData= new FormData();
          formData.append('action',"updateGroupe");
          formData.append("groupId",this.groupIdUp);
          formData.append("groupe",this.groupUp);
         
         
          axios
            .post(this.$store.state.fileConfContent, formData)
            .then((response) => {
                console.log("success");
                this.cAlert(this.updated_syslg);
                this.refreshComponentView()
                
            })
          .catch((err) => {
       
           
        });
          }
        }else this.cAlert(this.emptyAlet_syslg)
     
        },
        insertGroup(){
          if(this.group!=""){
            if(confirm(this.insertionDataConf_syslg)){
             var formData= new FormData();
          formData.append('action',"insertGroup");
         
          
          formData.append("groupe",this.group);
        
         
         
          axios
            .post(this.$store.state.fileConfContent, formData)
            .then((response) => {
                console.log("success");
                this.cAlert(this.insertedDataAlt_syslg);
                this.refreshComponentView()
                
            })
          .catch((err) => {
     
           
        });
          }
        
          }else this.cAlert(this.emptyAlet_syslg)
        },
                deleteCriteria(item){

                 if (confirm(this.deleteConf_syslg)){

                          var formData= new FormData();
          formData.append('action',"deleteCriteria");
          formData.append("critereId",item.idCritere);
          
         
          axios
            .post(this.$store.state.fileConfContent, formData)
            .then((response) => {
         
                this.cAlert(this.deletedAlt_syslg);
                this.refreshComponentView()
                
            })
          .catch((err) => {
           
           
        });
                  }
      
        },
        updateDB(){
          if(this.idCritere2!="" && this.critereu!="" && this.idGroupeu!="" && this.questionu!=""){
            
            if(confirm(this.updateCriteriaConf_syslg)){
            var formData= new FormData();
          formData.append('action',"updateCriteria");
          formData.append("critereId",this.idCritere2);
         
          formData.append("critere",this.critereu);
          formData.append("idGroupe",this.idGroupeu);
          formData.append("question",this.questionu);
         
         
          axios
            .post(this.$store.state.fileConfContent, formData)
            .then((response) => {
              
                this.cAlert(this.updated_syslg);
                this.refreshComponentView()
                
            })
          .catch((err) => {
          
           
        });
      }
          }else this.cAlert(this.emptyAlet_syslg)
     
        },
        updateCriteria(item){

          this.critereu=item.critere;
          this.idGroupeu=item.idGroupe;
          this.questionu=item.question;
        this.idCritere2=item.idCritere;
          
         
        },
        logout(){
          this.$store.commit("setUpdateCritere",false);
          this.$store.commit("setgMatriculation",true);
      },
      insertCriteria(){
        if(this.critere!="" && this.idGroupe!="" && this.question!=""){

          if(confirm(this.insertionDataConf_syslg)){
         var formData= new FormData();
          formData.append('action',"insertCriteria");
         
          formData.append("critere",this.critere);
          formData.append("idGroupe",this.idGroupe);
          formData.append("question",this.question);
         
         
          axios
            .post(this.$store.state.fileConfContent, formData)
            .then((response) => {
                console.log("success");
                this.cAlert(this.insertedDataAlt_syslg);
                this.refreshComponentView()
                
            })
          .catch((err) => {
        
           
        });
       }
        }else this.cAlert(this.emptyAlet_syslg)
  
      },
      },

  }
</script>

<style scoped>
.menuPerso{
  margin-right: 10px;
  height: 50px;
}

.formInput{
  position: absolute;
  top: 60px;
left: 10px;
  width: max-content;
justify-content: center;
align-items: center;

}
#deleteBtn,#deleteGrp{
  background: red;
}
#updateBtn,#updateGrp{
background: green;
}
#deleteGrp,#updateGrp{
  width: 100px;
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
  border: 1px solid #267871;
}
th{
  text-align: center;
}
 .matriculeSpan,.nomSpan, .prenomSpan{
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
    .matriculeSpan:hover,.nomSpan:hover, .prenomSpan:hover{
      background: transparent;
    }
    .nomSpan{
      background: white;
      color:black;
    }
 #divAllStaff{
  justify-items: center;
 flex-direction: column; 
    align-items: flex-start;

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
  left: 20%;
height: 60px;
}
#insertionDiv,#updateDiv{
  position: absolute;

  top: 60px;
  width: 100%;
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
#m2,#m3,#m4{
  border: none;
}
#m1{
  border:none;
  border-bottom: 1px solid black;
  margin-right: 10px;
}
#divPerso{
  justify-items: center;
 flex-direction: column; 
    align-items: flex-start;
}
table{
width: 100%;
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

  
  /* Style for the Close Button */
 
  
  
</style>