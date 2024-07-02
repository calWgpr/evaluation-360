<template>



    <div id="divPerso" class="FirstDiv">

      <div id="littleNav">
        <button id="m1" class="menuPerso" @click="toggleBtn('m1');styleBtn('m1')"><i class="fa fa-refresh" aria-hidden="true"></i> {{ updatepersoLittleBtn }}</button>
 <button id="m2" class="menuPerso" @click="toggleBtn('m2');styleBtn('m2')"><i class="fa fa-plus" aria-hidden="true"></i> {{ insertNewperso }}</button>
 <button id="m3" class="menuPerso" @click="toggleBtn('m3');styleBtn('m3')"><i class="fa-solid fa-list"></i> {{ serviceList }}</button>
 <button id="m4" class="menuPerso" @click="toggleBtn('m4');styleBtn('m4')"><i class="fa-solid fa-list"></i> {{ sectionlist }}</button>
      </div>

      <div id="serviceList" v-if="btnTable.m3">

        <button  class="submitBtn" @click="insertServiceMode=true;formUpdateService=false">{{ insertionOfNewserviceBtn }}</button>

      <div v-if="insertServiceMode" id="insertService">

  <label  for="seru">{{ serviceNameLabel_syslg }}<input class="form-control" id="seru" type="text" v-model="insertServiceName"></label>

          <button @click="insertService();insertServiceMode=false" class="submitBtn" type="submit" >{{ insertionBtn_syslg }}</button>



      </div>

        <form class="forms" v-if="formUpdateService" >


   <label  for="nameService">{{ serviceNameLabel_syslg }}<input class="form-control" id="nameService" type="text" v-model="nameService"></label>


   <button  @click="updateDBService();formUpdateService=false" class="submitBtn"  type="submit">{{ updateBtn_syslg }}</button>

   </form>
   <div id="allService">
    <table>
                <caption><i class="fa fa-users" aria-hidden="true"></i> {{ serviceList }}</caption>
                <tr>
                  <th><i class="fa fa-id-card" aria-hidden="true"></i> ID</th>
                  <th ><i class="fa fa-user" aria-hidden="true"></i> {{ serviceNameLabel_syslg }}</th>

                  <th colspan="2">{{ operationTh_syslg }}</th>

                </tr>
                <tr v-for="perso in filteredServiceList" :key="perso.idService">


                  <td  class="matriculeSpan">
                    <!-- <i class="fa fa-id-card" aria-hidden="true"></i> -->
                  {{perso.idService }}
                </td>
                <td class="nomSpan">
                  <!-- <i class="fa fa-user" aria-hidden="true"></i> -->
                  {{perso.nomService }}
                </td>


                  <td ><button id="deleteBtn" @click="deleteService(perso.idService)" class="allStaffBtn"><i class="fa fa-trash" aria-hidden="true"></i> </button></td>
                  <td ><button id="updateBtn" @click="updateService(perso);insertServiceMode=false;formUpdateService=true" class="allStaffBtn"><i class="fa fa-pencil" aria-hidden="true"></i> </button></td>


                </tr>
               </table>
   </div>


      </div>

      <div id="sectionList" v-if="btnTable.m4">
        <!-- main section  -->
        <button  class="submitBtn" @click="insertSectionMode=true;formUpdateSection=false">{{ insertionOfNewSectionBTn_syslg }}</button>
<br>
<div v-if="insertSectionMode" id="insertSection">
 
  <label  for="IdserSection">{{ serviceNameLabel_syslg }}
    <select  class="form-control" v-model="IdserSection" id="serviceSelect">
      <option v-for="service in serviceListDB" :key="service.idService" :value="service.idService">
        {{ service.nomService }}
      </option>
    </select>
  
  </label>
<label  for="secu">{{ sectionName_syslg }}<input class="form-control" id="secu" type="text" v-model="insertSectionName"></label>

    <button @click="insertSection();insertSectionMode=false" class="submitBtn" type="submit" >{{ insertionBtn_syslg }}</button>
<br>
<br>

</div>

  <form class="forms" v-if="formUpdateSection" >

  <label  for="idSerSec">{{ serviceNameLabel_syslg }}

    <select  class="form-control" v-model="idServiceOfSection" id="serviceSelect">
      <option v-for="service in serviceListDB" :key="service.idService" :value="service.idService">
        {{ service.nomService }}
      </option>
    </select>

  </label>
<label  for="nameSection">{{ sectionName_syslg }}<input class="form-control" id="nameSection" type="text" v-model="nameSection"></label>


<button  @click="updateDBSection();formUpdateSection=false" class="submitBtn"  type="submit">{{ updateBtn_syslg }}</button>

</form>
<br>
<div id="allSection">
<table>
          <caption><i class="fa fa-users" aria-hidden="true"></i> {{ sectionlist }}</caption>
          <tr>
            <th><i class="fa fa-id-card" aria-hidden="true"></i> {{ idSection_syslg }}</th>
            <th ><i class="fa fa-user" aria-hidden="true"></i> {{ idService_syslg }}</th>
            <th > {{ sectionName_syslg }}</th>
            <th colspan="2">{{ operationTh_syslg  }}</th>

          </tr>
          <tr v-for="perso in filteredSectionList" :key="perso.idSection">


            <td  class="matriculeSpan">
              <!-- <i class="fa fa-id-card" aria-hidden="true"></i> -->
            {{perso.idSection }}
          </td>
          <td class="nomSpan">
            <!-- <i class="fa fa-user" aria-hidden="true"></i> -->
            {{perso.idService}}
          </td>
          <td class="nomSpan">
            <!-- <i class="fa fa-user" aria-hidden="true"></i> -->
            {{perso.nomSection}}
          </td>


            <td ><button id="deleteBtn" @click="deleteSection(perso.idSection)" class="allStaffBtn"><i class="fa fa-trash" aria-hidden="true"></i> </button></td>
            <td ><button id="updateBtn" @click="updateSection(perso);insertSectionMode=false;formUpdateSection=true" class="allStaffBtn"><i class="fa fa-pencil" aria-hidden="true"></i> </button></td>


          </tr>
         </table>
</div>

      </div>
      <!-- insertion of staffs -->
    
<form class="formInput" v-if="btnTable.m2" @submit.prevent="insertPerso">
  <h2>{{ updateNewperso }}</h2>
<label for="matriculationNbr">{{ matriculationLabel}}<input class="form-control"  id="matriculationNbr" type="number" v-model="matriculationNbr"></label><br><br>
<label for="name">{{ nameLabel }}<input class="form-control" id="name" type="text" v-model="name"></label><br><br>

<label for="lastName">{{ lastNameLabel }}<input class="form-control" id="lastName" type="text" v-model="lastName"></label><br><br>

<label for="idService">{{ serviceNameLabel_syslg }}

  <select  class="form-control" v-model="idService" id="serviceSelect">
      <option v-for="service in serviceListDB" :key="service.idService" :value="service.idService">
        {{ service.nomService }}
      </option>
    </select>

</label><br><br>
<!-- v-model="chefMatr" -->
<label for="chef">{{ chefLabel }}

  <select  class="form-control" v-model="chefMatr" >
      <option v-for="i in persoNamesID" :key="i.matriculePerso" :value="i.matriculePerso">
        {{i.nom}} {{ i.prenom }}
      </option>
    </select>

</label><br><br>

<label for="idSection">{{ sectionName_syslg }}

  <select  class="form-control" v-model="idSection" >
      <option v-for="i in sectionListDB" :key="i.idSection" :value="i.idSection">
        {{i.nomSection}} 
      </option>
    </select>

</label>
<!-- v-model="idService" -->
<br><br>
<button class="submitBtn" type="submit" >{{ insertionBtn_syslg }}</button>

<!-- insertion d'acces a evaluation tout le monde -->

<!-- <div id="allPersoapp">
<h2>{{ UpdateNewPErsoAPP }}</h2>

  <label for="apppers">{{ nameLabel }}
   

    <select  class="form-control"  v-model="apppers" >
      <option v-for="i in persoNamesID" :key="i.matriculePerso" :value="i.matriculePerso">
        {{i.nom}} {{ i.prenom }}
      </option>
    </select>
  
  </label><br><br>
  <button type="button"  class="submitBtn" @click="addApppers"  >{{ insertionBtn_syslg }}</button>
<br><br>
  <table v-if="listofStaffAccess.length>0">
    <caption><i class="fa fa-users" aria-hidden="true"> </i> {{ evaluationT }}</caption>
    <tr>
      <th><i class="fa fa-id-card" aria-hidden="true"></i> {{ matriculationLabel }}</th>
      <th><i class="fa fa-user" aria-hidden="true"></i> {{ nameLabel }}</th>
      <th><i class="fa fa-user" aria-hidden="true"></i> {{ lastNameLabel }}</th>
      <th colspan="2">{{ operationTh_syslg }}</th>
    </tr>

    <tr v-for="i in listofStaffAccessFiltered" :key="i.matriculePerso">
      <td  class="matriculeSpan">{{ i.matriculePerso }}</td>
      <td  class="matriculeSpan">{{ i.nom }}</td>
      <td  class="matriculeSpan">{{ i.prenom }}</td>

      <td ><button type="button" id="deleteBtn" @click="deletePersoApp(i.matriculePerso)" class="allStaffBtn"><i class="fa fa-trash" aria-hidden="true"></i> </button></td>
                  

    </tr>
  </table>
</div> -->

</form>

<div id="updateDiv" v-if="btnTable.m1">

  <form class="forms" v-if="formUpdate" >


   <label  for="nameu">{{ nameLabel }}<input class="form-control" id="nameu" type="text" v-model="nameu"></label>
   <label for="lastNameu">{{ lastNameLabel }}<input class="form-control" id="lastNameu" type="text" v-model="lastNameu"></label>

   <label for="idServiceu">{{ serviceNameLabel_syslg }}
   
   
    <select  class="form-control" v-model="idServiceu" id="serviceSelect">
      <option v-for="service in serviceListDB" :key="service.idService" :value="service.idService">
        {{ service.nomService }}
      </option>
    </select>
  
  </label>

  

   <!-- v-model="chefMatru" -->
   
   <label for="chefu">{{ chefLabel }}

    <select  class="form-control" v-model="chefMatru" >
      <option v-for="i in persoNamesID" :key="i.matriculePerso" :value="i.matriculePerso">
        {{i.nom}} {{ i.prenom }}
      </option>
    </select>
  
  </label>


  <!-- v-model="idSectionu" -->
   <label for="idSectionu">{{ sectionName_syslg }}

    <select  class="form-control" v-model="idSectionu" >
      <option v-for="i in sectionListDB" :key="i.idSection" :value="i.idSection">
        {{i.nomSection}} 
      </option>
    </select>
  
  </label>
     <label for="ps">{{ pswdLabel_syslg }}<input class="form-control" id="ps" type="text" v-model="pswdDB"></label>

   <button  @click="updateDB();formUpdate=false" class="submitBtn"  type="submit">{{ updateBtn_syslg }}</button>
 

   </form>


   <div id="allStaff">

          <table>
                <caption><i class="fa fa-users" aria-hidden="true"></i>{{ listOfstaff_syslg }}</caption>
                <tr>
                  <th><i class="fa fa-id-card" aria-hidden="true"></i> Matricule</th>
                  <th ><i class="fa fa-user" aria-hidden="true"></i> {{ nameLabel }}</th>
                  <th ><i class="fa fa-user" aria-hidden="true"></i> {{ lastNameLabel }}</th>
                  <th ><i class="fa fa-laptop" aria-hidden="true"></i>  {{ serviceNameLabel_syslg }}</th>
                  <th ><i class="fa fa-male" aria-hidden="true"></i> {{ ChefName_syslg }}</th>
                  <th colspan="2">{{ operationTh_syslg }}</th>

                </tr>
                <tr v-for="perso in filteredPersonnel" :key="perso.matriculePerso">


                  <td class="matriculeSpan">
                    <!-- <i class="fa fa-id-card" aria-hidden="true"></i> -->
                  {{perso.matriculePerso }}
                </td>
                <td class="nomSpan">
                  <!-- <i class="fa fa-user" aria-hidden="true"></i> -->
                  {{perso.nom }}
                </td>
                 <td class="prenomSpan">
                  <!-- <i class="fa fa-user" aria-hidden="true"></i> -->
                  {{perso.prenom }}
                </td>
                <td class="serviceSpan">
                  <!-- <i class="fa fa-laptop" aria-hidden="true"></i> -->

                  {{perso.nomService }}
                </td>
                <td class="ChefSpan">
                  <!-- <i class="fa fa-male" aria-hidden="true"></i> -->
                  {{perso.chefNom }}
                </td>

                  <td ><button id="deleteBtn" @click="deletePerso(perso.matriculePerso)" class="allStaffBtn"><i class="fa fa-trash" aria-hidden="true"></i> </button></td>
                  <td ><button id="updateBtn" @click="updatePerso(perso);formUpdate=true" class="allStaffBtn"><i class="fa fa-pencil" aria-hidden="true"></i> </button></td>


                </tr>
               </table>

            </div>
</div>

</div>





</template>

<script>
 import axios from 'axios';
 export default{
    data(){
        return{
          apppers:"",
          nameServicelabel:"service name",
          nameService: "",
          insertNewperso:"",
          itemDB:"",
       insertionMode:false,
       updateperso:"update perso",
          personnel:[],
          updateMode:true,
            languageTemp:"",
        divChangeLanguage:false,
            updatePersoBtn:"updatePerso",
            searchPersoByMatrBtn:'search',
            persoByMatr:'',
            persoData: [] ,
            deletePersoBtn:'delete Perso',
            formUpdate:false,
          formUpdateService:false,
           serviceIdU:"",
            nameLabelu: 'nom',
            nameu: '',
            infoBullId:"",
            pswdLabel_syslg:'',
            lastNameu:'',
            lastNameLabelu:'lastName',
            idServiceu:"",
            idServiceLabelu:'idService',
            chefMatru:"",
            chefLabelu:'',
            idSectionu:"",
            idSectionLabelu:'idSection',
            serviceListDB:[],
            serviceList:"",
            sectionlist:"",
            sendBtn:'Send',
            nameLabel: '',
            name: '',
            matriculationLabel:'Matricule',
            matriculationNbr:"",
            lastName:'',
            lastNameLabel:'',
            idService:"",
            idServiceLabel:'idService',
            chefMatr:"",
            chefLabel:'',
            idSection:"",
            idSectionLabel:'idSection',
            insertServiceMode:false,
            insertServiceName:"",
            insertSectionMode:false,
            formUpdateSection:false,
            insertSectionName:"",
            sectionListDB:[],
            idServiceOfSection:"",
            idSectionDB:"",
            nameSection:"",
            IdserSection:"",
            pswdDB:"",

            showTooltip: false,

            // language
            updatepersoLittleBtn:"",
            insertionOfNewserviceBtn:"",
            serviceNameLabel_syslg:"",
            insertionBtn_syslg:"",
            updateBtn_syslg:"",
            operationTh_syslg:"",
            insertionOfNewSectionBTn_syslg:"",
            idService_syslg:"",
            sectionName_syslg:"",
            idSection_syslg:"",
            listOfstaff_syslg:"",
            ChefName_syslg:'',
            insertData_lgsys:"",
            empty_syslg:"",
            updatedData_syslg:"",
            deletedData_syslg:"",
            insrtionConf_syslg:"",
            updateConf_syslg:"",
            deleteDataConf_syslg:"",
            evaluationT:"",
            listofStaffAccess:[],
            updateNewperso:"",
            UpdateNewPErsoAPP:"",
            persoNamesID:[],



            btnTable: {
        m1: true,
        m2: false,
        m3: false,
        m4: false
      },
        }
    },
    mounted(){
      this.fetchAllPersonnel()
      this.fetchServiceList()
      this.fetchAllSection()
      this.shiftLanguage()
      this.fetchPersoApp()
      this.fetchPersonnelNames()
     
    },

    computed:{
      listofStaffAccessFiltered(){
        
        const search = this.$store.state.dataSearchInput.toLowerCase();
  return this.listofStaffAccess.filter(item => {

    const matriculePerso = item.matriculePerso.toLowerCase();
    const nom = item.nom.toLowerCase();
    const prenom = item.prenom.toLowerCase();

    return nom.includes(search) || prenom.includes(search) ||
  matriculePerso.includes(search)

    
  });

      },
      filteredPersonnel(){

        const search = this.$store.state.dataSearchInput.toLowerCase();
  return this.personnel.filter(item => {
    const name = item.nom.toLowerCase();
    const lastName = item.prenom.toLowerCase();
    const nomService=item.nomService.toLowerCase();
    const matriculePerso=item.matriculePerso.toLowerCase();
    const chefNom=item.chefNom.toLowerCase();
    return name.includes(search) || lastName.includes(search) ||
    nomService.includes(search) || matriculePerso.includes(search)
    || chefNom.includes(search);
  });

            },
            filteredServiceList(){
              const search = this.$store.state.dataSearchInput.toLowerCase();
  return this.serviceListDB.filter(item => {
    const idService = item.idService.toLowerCase();
    const nomService = item.nomService.toLowerCase();

    return idService.includes(search) || nomService.includes(search)

  });
            },
            filteredSectionList(){
              const search = this.$store.state.dataSearchInput.toLowerCase();
  return this.sectionListDB.filter(item => {
    const idService = item.idService.toLowerCase();
    const nomSection = item.nomSection.toLowerCase();
   const idSection= item.idSection.toLowerCase()
    return idService.includes(search) || nomSection.includes(search)  ||
    idSection.includes(search)

  });

            },
          },
    methods:{
      fetchPersonnelNames(){
        var formData=new FormData();
  formData.append('action',"fetchPersonnelNames");


  axios
  .post(this.$store.state.fileConfContent, formData)
  .then((response) => {
     this.persoNamesID=response.data
     
  })
.catch((err) => {
  console.log("failed to fetch all persoAPp")

});
      },
//       fetchAllserviceEx(){
//         var formData=new FormData();
//   formData.append('action',"fetchAllserviceEx");


//   axios
//   .post(this.$store.state.fileConfContent, formData)
//   .then((response) => {
//      this.listofStaffAccess=response.data
     
//   })
// .catch((err) => {
//   console.log("failed to fetch all persoAPp")

// });
//       },
      deletePersoApp(i){
        if(confirm(this.deleteDataConf_syslg)){
          var formData=new FormData();
  formData.append('action',"deletePersoApp");
formData.append('pers',i);

  axios
  .post(this.$store.state.fileConfContent, formData)
  .then((response) => {
     this.cAlert(this.deletedData_syslg)
     this.refreshComponentView()
     
  })
.catch((err) => {
  console.log("failed to fetch all persoAPp")

});
        }

      },
      fetchPersoApp(){
        var formData=new FormData();
  formData.append('action',"fetchPersoApp");


  axios
  .post(this.$store.state.fileConfContent, formData)
  .then((response) => {
     this.listofStaffAccess=response.data
     
  })
.catch((err) => {
  console.log("failed to fetch all persoAPp")

});
      },
      addApppers(){
        if (this.apppers!=0) {
          if(confirm(this.insrtionConf_syslg)){

var formData=new FormData();
  formData.append('action',"addApppers");
  formData.append('pers',this.apppers);

  axios
  .post(this.$store.state.fileConfContent, formData)
  .then((response) => {
      this.cAlert(this.updatedData_syslg);
      this.refreshComponentView()
     
  })
.catch((err) => {
 console.log(err);

});
}
        }else this.cAlert(this.empty_syslg)
       
      },
      shiftLanguage(){
        if(this.$store.state.languageSys=="french"){
          this.evaluationT="Liste de ceux qui ont accès à l'évaluation de tout le monde"

          this.updatepersoLittleBtn="Mise à jour des personnels"
          this.insertNewperso="Insertion de nouveau personnel"
          this.serviceList="Liste des services"
          this.sectionlist="Liste des sections"
          this.insertionOfNewserviceBtn="Insertion d'un nouveau service"
          this.serviceNameLabel_syslg="Nom du service"
          this.insertionBtn_syslg="Insérer"
          this.updateBtn_syslg="Mettre à jour"
          this.operationTh_syslg="Operations"
          this.insertionOfNewSectionBTn_syslg="Insertion d'une nouvelle section"
          this.idService_syslg="Id service"
          this.sectionName_syslg="Nom de la section"
          this.idSection_syslg="Id section"
          this.nameLabel="Nom"
          this.lastNameLabel="Prenom"
          this.chefLabel="chef hiérarchique"
          this.listOfstaff_syslg="Liste des personnels"
          this.ChefName_syslg="Nom du chef hiérarchique"
          this.insertData_lgsys="Inséré"
          this.empty_syslg="Veuillez completer les cases vides"
          this.updatedData_syslg="Mise à jour réussi"
          this.deletedData_syslg="Suppression réussi"
          this.insrtionConf_syslg="Voulez-vous confirmer l'insertion ?"
          this.updateConf_syslg="Voulez-vous confirmer la mise à jour ?"
          this.deleteDataConf_syslg="Voulez-vous confirmer la suppression ?"
          this.pswdLabel_syslg="Mot de passe"
          this.infoBullId="ID existant seulement "
          this.UpdateNewPErsoAPP="Mise à jour des personnels qui ont droit à evaluer tout le monde"
          this.updateNewperso="Insertion d'un nouveau personnel"

        }else if(this.$store.state.languageSys=="english"){
          this.evaluationT="List of those who can access the evaluation of all staff feature"

          this.updatepersoLittleBtn="Staff update"
          this.insertNewperso="Insertion of a new staff"
          this.serviceList="Service list"
          this.sectionlist="Section list"
          this.insertionOfNewserviceBtn="Insertion of a new service"
          this.serviceNameLabel_syslg="Service name"
          this.insertionBtn_syslg="Insert"
          this.updateBtn_syslg="Update"
          this.operationTh_syslg="Operations"
          this.insertionOfNewSectionBTn_syslg="Insertion of a new section"
          this.idService_syslg="Id service"
          this.sectionName_syslg="Section name"
          this.idSection_syslg="Id section"
          this.nameLabel="Name"
          this.lastNameLabel="Last name"
          this.chefLabel="Hierarchical leader"
          this.listOfstaff_syslg="List of all staffs"
          this.ChefName_syslg="Hierarchical leader's name"
          this.insertData_lgsys="Inserted"
          this.empty_syslg="Blank fields"
          this.updatedData_syslg="Updated"
          this.deletedData_syslg="Deleted"
          this.insrtionConf_syslg="Do you want to proceed with the insertion ?"
          this.updateConf_syslg="Do you want to proceed with the update ?"
          this.deleteDataConf_syslg="Do you want to delete the data ?"
          this.pswdLabel_syslg="Password"
          this.infoBullId="Existing ID only"
          this.UpdateNewPErsoAPP="Update of all staffs who has the right to evaluate everyone"
          this.updateNewperso="Insertion of a new staff"

        }else{

          this.updatepersoLittleBtn="Fanavaozana ny listry mpiasa"
          this.insertNewperso="Hampiditra mpiasa vaovao"
          this.serviceList="Listry ny servisy"
          this.sectionlist="Listry ny fizarana-servisy"
          this.insertionOfNewserviceBtn="Fampidirana servisy vaovao"
          this.serviceNameLabel_syslg="Anaran'ny servisy"
          this.insertionBtn_syslg="Hampiditra"
          this.updateBtn_syslg="Hanavao"
          this.operationTh_syslg="Hetsika"
          this.insertionOfNewSectionBTn_syslg="Fampidirana fizarana-servisy vaovao"
          this.idService_syslg="Id servisy"
          this.sectionName_syslg="Anaran'ny fizarana-servisy"
          this.idSection_syslg="Id fizarana-servisy"
          this.nameLabel="Anarana"
          this.lastNameLabel="Anarana Fanampiny"
          this.chefLabel="Lehibe"
          this.listOfstaff_syslg="Listry ny mpiasa rehetra"
          this.ChefName_syslg="Anaran'ny lehibe"
          this.insertData_lgsys="Tafiditra"
          this.empty_syslg="Fenoy ny banga"
          this.updatedData_syslg="Tanteraka ny fanavaozana"
          this.deletedData_syslg="Voafafa"
          this.insrtionConf_syslg="Tanterahina ve ny fampidirana ?"
          this.updateConf_syslg="Tanterahina ve ny fanavaozana ?"
          this.deleteDataConf_syslg="Tanterahina ve ny famafana ?"
          this.pswdLabel_syslg="Teny miafina"
          this.infoBullId="ID efa misy ihany"
          this.evaluationT="Listr'ireo afaka manombana ny mpiasa rehetra"
          this.UpdateNewPErsoAPP="Fanavaozana ireo olona afaka manombana ny mpiasa rehetra"
          this.updateNewperso="Fampidirana mpiasa vaovao"

        }

      },
      insertSection(){

        if(this.insertSectionName!=="" && this.IdserSection!=""){

          if(confirm(this.insrtionConf_syslg)){

            var formData=new FormData();
              formData.append('action',"insertSection");

              formData.append("secname",this.insertSectionName);
              formData.append("idser",this.IdserSection);


              axios
              .post(this.$store.state.fileConfContent, formData)
              .then((response) => {
                  console.log(response);
                this.cAlert(this.insertData_lgsys);
                this.refreshComponentView()
              })
            .catch((err) => {
             console.log(err);
            

          });
          }

        }else this.cAlert(this.empty_syslg)
      },
      updateDBSection(){
        if(this.nameSection!=="" && this.idSectionDB!=="" &&
         this.idServiceOfSection!==""){

          if(confirm(this.updateConf_syslg)){

var formData=new FormData();
formData.append('action',"updateDBSection");

formData.append('id',this.idSectionDB);


formData.append("idSer",this.idServiceOfSection);
formData.append("name",this.nameSection);


axios
.post(this.$store.state.fileConfContent, formData)
.then((response) => {
  console.log(response);
  this.cAlert(this.updatedData_syslg);
  this.refreshComponentView()

})
.catch((err) => {
console.log(err);

});

          }

}else this.cAlert(this.empty_syslg);
      },
      updateSection(i){
        this.idServiceOfSection=i.idService
        this.nameSection=i.nomSection
            this.idSectionDB=i.idSection
      },
      deleteSection(i){
        if(confirm(this.deleteDataConf_syslg)){
          var formData=new FormData();
            formData.append('action',"deleteSection");
            formData.append('secId',i);

            axios
            .post(this.$store.state.fileConfContent, formData)
            .then((response) => {
                console.log(response);
                this.cAlert(this.deletedData_syslg);
                this.refreshComponentView()
            })
          .catch((err) => {
           console.log(err);
          
        });
        }

      },
      toggleBtn(i){
        for (const button in this.btnTable) {
        this.btnTable[button] = button === i;
      }
      },
       styleBtn(i) {
  var btn1 = document.getElementById("m1");
  var btn2 = document.getElementById("m2");
  var btn3 = document.getElementById("m3");
  var btn4 = document.getElementById("m4");

  // Remove the border from all buttons
  btn1.style.border = "none";
  btn2.style.border = "none";
  btn3.style.border = "none";
  btn4.style.border = "none";

  // Set the border to the clicked button
  if (i == "m1") {
    btn1.style.borderBottom = "1px solid black";
  } else if (i == "m2") {
    btn2.style.borderBottom = "1px solid black";
  } else if (i == "m3") {
    btn3.style.borderBottom = "1px solid black";
  } else if (i == "m4") {
    btn4.style.borderBottom = "1px solid black";
  }
},
fetchAllSection(){
  var formData=new FormData();
                formData.append('action',"fetchAllSection");


                axios
          .post(this.$store.state.fileConfContent, formData)
          .then((response) => {
            this.sectionListDB=response.data;



      })
        .catch((err) => {
         console.log(err);


      });
},
      fetchAllPersonnel(){
        var formData=new FormData();
                formData.append('action',"fetchAllPersonnel");


                axios
          .post(this.$store.state.fileConfContent, formData)
          .then((response) => {
            this.personnel=response.data;



      })
        .catch((err) => {
         console.log(err);


      });
      },
        
        logout(){
          this.$store.commit("setUpdatePerso",false);
          this.$store.commit("setgMatriculation",true);
      },
      updateDB(){
        if(this.nameu!=="" && this.lastNameu!=="" && this.idServiceu!=="" &&
            this.chefMatru!=="" && this.idSectionu!=="" &&  this.pswdDB!==""){

if(confirm(this.updateConf_syslg)){
  var formData=new FormData();
            formData.append('action',"updatePerso");
            formData.append('matriculeNbr',this.itemDB);


            formData.append("name",this.nameu);
            formData.append("lastName",this.lastNameu);
            formData.append("idService",this.idServiceu);
            formData.append("chefMatr",this.chefMatru);
            formData.append("idSection",this.idSectionu);
            formData.append("pswdDB",this.pswdDB);

            axios
            .post(this.$store.state.fileConfContent, formData)
            .then((response) => {
                console.log(response);
                this.cAlert(this.updatedData_syslg);
                this.refreshComponentView()

            })
          .catch((err) => {
           console.log(err);
            
        });
}


            }else this.cAlert(this.empty_syslg);
      },
      updateDBService(){
        if(this.nameService!=="" && this.serviceIdU!==""){

if(confirm(this.updateConf_syslg)){
          var formData=new FormData();
            formData.append('action',"updateDBService");
            formData.append('id',this.serviceIdU);


            formData.append("name",this.nameService);


            axios
            .post(this.$store.state.fileConfContent, formData)
            .then((response) => {
                console.log(response);
                this.cAlert(this.updatedData_syslg);
                this.refreshComponentView()

            })
          .catch((err) => {
           console.log(err);
            
        });
}


            }else this.cAlert(this.empty_syslg);
      },
        updatePerso(item){

          this.nameu=item.nom
this.lastNameu=item.prenom
this.idServiceu=item.idService
this.chefMatru=item.matriculeChef
this.idSectionu=item.idSection
this.itemDB=item.matriculePerso
this.pswdDB=item.password


        },
        updateService(i){
            this.serviceIdU=i.idService
            this.nameService=i.nomService
        },

        deletePerso(item){
          if(confirm(this.deleteDataConf_syslg)){
            var formData=new FormData();
            formData.append('action',"deletePerso");
            formData.append('matriculeNbr',item);

            axios
            .post(this.$store.state.fileConfContent, formData)
            .then((response) => {
                console.log(response);
                this.cAlert(this.deletedData_syslg);
                this.refreshComponentView()

            })
          .catch((err) => {
           console.log(err);
           
        });
          }

        },
        fetchServiceList(){
          var formData=new FormData();
                formData.append('action',"fetchServiceList");


                axios
          .post(this.$store.state.fileConfContent, formData)
          .then((response) => {
            this.serviceListDB=response.data;



      })
        .catch((err) => {
         console.log(err);


      });
        },
        deleteService(i){

       if(confirm(this.deleteDataConf_syslg)){

          var formData=new FormData();
            formData.append('action',"deleteService");
            formData.append('id',i);

            axios
            .post(this.$store.state.fileConfContent, formData)
            .then((response) => {
                console.log(response);
                this.cAlert(this.deletedData_syslg);
                this.refreshComponentView()

            })
          .catch((err) => {
           console.log(err);
           
        });
       }
        },
        // searchPersoByMatr(){
        //     var formData=new FormData();
        //     formData.append('action',"searchPersoByMatr");
        //     formData.append('matriculeNbr',this.persoByMatr);

        //     axios
        //     .post(this.$store.state.fileConfContent, formData)
        //     .then((response) => {
        //         console.log(response);
        //         if(response.data.length==0)this.cAlert("no perso found");
        //         else this.persoData=response.data;

        //     })
        //   .catch((err) => {
        //    console.log(err);
         

        // });
        // },
        insertPerso(){
          if(this.name!=="" && this.lastName!=="" && this.idService!=="" &&
            this.chefMatr!=="" && this.idSection!==""){

if(confirm(this.insrtionConf_syslg)){
   var formData=new FormData();
            formData.append('action',"insertPerso");

            formData.append("matriculationNbr",this.matriculationNbr);
            formData.append("name",this.name);
            formData.append("lastName",this.lastName);
            formData.append("idService",this.idService);
            formData.append("chefMatr",this.chefMatr);
            formData.append("idSection",this.idSection);

            axios
            .post(this.$store.state.fileConfContent, formData)
            .then((response) => {
                console.log(response);
              this.cAlert(this.insertData_lgsys);
              
              this.refreshComponentView()
            })
          .catch((err) => {
           console.log(err);
        

        });
}

      }else this.cAlert(this.empty_syslg)
        },
        insertService(){

          if(this.insertServiceName!=="" ){
              if (confirm(this.insrtionConf_syslg)) {
                   var formData=new FormData();
            formData.append('action',"insertService");

            formData.append("sername",this.insertServiceName);
                 

            axios
            .post(this.$store.state.fileConfContent, formData)
            .then((response) => {
                console.log(response);
              this.cAlert(this.insertData_lgsys);
              this.refreshComponentView()
            })
          .catch((err) => {
           console.log(err);
           

        });
              }

      }else this.cAlert(this.empty_syslg)
        },

 },
}
</script>

<style scoped>
.tooltip {
  position: absolute;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 4px;
  margin-top: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: inline-block;
  top: 500px;
  z-index: 50000;
}

#updateBtn{
 background: green;
}
#deleteBtn{
  background: red;
}
#allService td , #allService th, #allSection th, #allSection td,#allPersoapp td , #allPersoapp th {
  border: none; /* Remove border for table cells */
  background: transparent;
  padding: 10px;
  border-bottom: 3px outset #3333;
}
#apppers{
  width: 200px;
}
.formInput{
  position: absolute;
  top: 60px;
left: 10px;
  width: max-content;
justify-content: center;
align-items: center;

}
#allPersoapp{
  position: absolute;
  top: 0;
  left: 700px;
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
  border: 3px solid #267871;
}


 #divAllStaff{
  justify-items: center;
 flex-direction: column;
    align-items: flex-start;

 }
 .menuPerso{
  margin-right: 10px;
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
    .matriculeSpan,.nomSpan,.prenomSpan,.serviceSpan,.ChefSpan{
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

    .nomSpan{
      background:  white;
      color: black;

    }
    .serviceSpan{
      background: white;
    }

    .matriculeSpan:hover,.nomSpan:hover, .prenomSpan:hover,.serviceSpan:hover,.evaluateTd:hover{
      background: transparent;
    }
 #insertSection,#insertService{
  margin-left: 5px;
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
    #allStaff,#allService{
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
#updateDiv,#serviceList,#sectionList{
  position: absolute;

  top: 60px;
  width: 100%;
}
#m2,#m3,#m4{
  border: none;
  height: 50px;

}
#m1{

  border:none;
  border-bottom: 1px solid black;
  margin-right: 10px;
  height: 50px;
}
#divPerso{
  justify-items: center;
 flex-direction: column;
    align-items: flex-start;
}
table{
  width: 100%;
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
  h2{
   text-decoration: underline;
  }

  /* Style for the Menu Content */
  .menu-container ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .menu-container ul li {
    padding: 10px;
    border-bottom: 5px solid #555;
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