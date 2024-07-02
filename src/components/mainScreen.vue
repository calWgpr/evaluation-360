<template>

 
 
      <div v-if="true" id="menu" class="menu-container">
        
            <ul>
              <div class="menu-buttons">
               
             <li  class="menuBtn" id="serviceLogo"><span>
              <i class="fa-solid fa-desktop"></i><br>
              {{ serviceName }}</span> </li>
             <br>
          
            <li class="menuBtn"  id="userName"><i class="fa fa-user" aria-hidden="true"> </i> <span>{{$store.state.userName }}</span></li>
            
            <br>
               <li> <button class="menuBtn" id="changeLangBtn" type="button" @click=" divChangeLanguage=true"><i class="fa fa-language"></i>{{ changeLanguageBtn_SysLg }}</button></li>   
              
               <li ><button class="menuBtn" type="button" @click="showChangePswd" id="changePswdBtn"><i class="fa fa-key"></i> {{ changePswdBtn }}</button></li>
              
               <!-- only for rh qnd dg -->
               <li v-if="chefList.length>0"> 
        <button  class="menuBtn" id="rapportBtn" v-if="true" @click="setComponentView('setRapport')">
          <i class="fa fa-flag" aria-hidden="true"> </i> {{ rapportBtn }}
        </button></li>

        <li ><button class="menuBtn" id="mainviewBtnMenu" type="button" @click="setComponentView('setMainScreenView');this.refreshComponentView()">
          <i class="fa fa-eye" aria-hidden="true"></i>
        {{ mainView }}
       </button></li>
             <li><button class="menuBtn" @click="toggleSearchBtn" type="button" id="searchLabel" ><i class="fa fa-search" aria-hidden="true"></i> {{ searchBtn_sysLg }}</button></li>
           
             
             <div id="searchAStaff">

 <input v-if="boolSearch" class="form-control" type="text" v-model="searchDataInput">
  <li><a id="down" target="_blank" class="menuBtn" href="manuelEv.pdf"><i class="fa fa-question-circle" aria-hidden="true"></i> 
  {{downPdfLabel}}</a></li>
           

 <li  ><button class="menuBtn" id="logoutBtn" type="button" @click="logout"><i class="fa fa-sign-out"></i> {{ logoutBtn_syslg }}</button></li>

</div>  


              </div>
            </ul>
            
        </div>
     
          
      
      <div id="divMain" v-if="$store.state.mainScreenView" class="FirstDiv">

       
       

        <table   v-if="filteredName1.length!=0" id="t1" class="custom-table" >
          <caption><i class="fa fa-users" aria-hidden="true"></i> {{ counterpartNotEvaluatedCaption }}</caption>
          <tr>
            <th><i class="fa fa-user" aria-hidden="true"></i> {{ nomTh_syslg }}</th>
            <th><i class="fa fa-user" aria-hidden="true"></i> {{ prenom_syslg }}</th>
          </tr>
          <tr v-for="i in filteredName1" :key="i.matriculePerso">
            <td>{{ i.nom }}</td><td>{{ i.prenom }}</td>
          </tr>
        </table>
   
        <table v-if=" filteredName2.length!=0" id="t2" class="custom-table">
          <caption><i class="fa fa-users" aria-hidden="true"></i> {{ otherServiceNotEvaluated }}</caption>
          <tr>
            <th><i class="fa fa-user" aria-hidden="true"></i> {{ nomTh_syslg }}</th><th><i class="fa fa-user" aria-hidden="true"></i> {{ prenom_syslg }}</th>
          </tr>
          <tr v-for="i in filteredName2" :key="i.matriculePerso">
            <td>{{ i.nom }}</td><td>{{ i.prenom }}</td>
          </tr>

         
        </table>

        <table v-if=" filteredName3.length!=0"  id="t3" class="custom-table">
          <caption><i class="fa fa-users" aria-hidden="true"></i> {{ chefEvaluation }}</caption>
          <tr>
            <th><i class="fa fa-user" aria-hidden="true"></i> {{ nomTh_syslg }}</th><th><i class="fa fa-user" aria-hidden="true"></i>  {{ prenom_syslg }}</th>
          </tr>
          <tr v-for="i in filteredName3" :key="i.matriculePerso">
            <td>{{ i.nom }}</td><td>{{ i.prenom }}</td>
          </tr>

         
        </table>

  <table  id="tx" class="custom-table">
      
      <caption><i class="fa-solid fa-desktop"></i> {{ serviceOfYouThisYear }}</caption>
      <tr>
        <th><i class="fa-solid fa-desktop"></i> {{ service1Name }}</th>
        <th><i class="fa-solid fa-desktop"></i> {{ service2Name }}</th>
        <th><i class="fa-solid fa-desktop"></i> {{ service3Name }}</th>
        <th><i class="fa fa-user" aria-hidden="true"></i> {{ chosenEvaluatorName }}</th>
      </tr>
      <tr v-for="i in serviceThisYearList" :key="i.service1">
        <td>{{ i.service1 }}</td><td>{{ i.service2 }}</td><td>{{ i.service3 }}</td><td>{{i.matr}} {{i.chosenEv}}</td>
      </tr>
    </table>
       
    <table v-if=" filteredName4.length!=0" id="t4" class="custom-table">
      
      <caption><i class="fa fa-users" aria-hidden="true"></i> {{ hasBeenListTable }}</caption>
      <tr>
        <th><i class="fa fa-user" aria-hidden="true"></i> {{ nomTh_syslg }}</th>
        <th><i class="fa fa-user" aria-hidden="true"></i> {{ prenom_syslg }}</th>
        <th><i class="fa fa-calendar" aria-hidden="true"></i> {{ periodOfEvaluation_syslg }}</th>
      </tr>
      <tr v-for="i in filteredName4" :key="i.matriculePerso">
        <td>{{ i.nom }}</td><td>{{ i.prenom }}</td><td>{{ i.anneeEvaluation }}</td>
      </tr>
    </table>

  </div>

 


 


      <!-- --------------------------------------------------------------- -->

      

      <!-- ---------- -->
      <!-- pswd popup -->
      <div  :style="{ marginLeft: '250px'  }">
        <div v-if="pswdShowed" id="pswdChangeOverlay">

<div id="pswdChangepopup">

  <div  id="changePswd"> 

<form @submit.prevent="changePswd(); showChangePswd()">
<label >{{ pswdLabel_syslg }}  <input type="password" v-model="pswd" ></label>
<label >{{ pswdConfLabel_syslg }} <input type="password" v-model="confirmation" ></label>
<button id="chBtn" type="submit">{{ changePswdBtn_syslg }}</button>
<button id="chbtn" @click="pswdShowed=false">{{cancelBtn_syslg}}</button>
</form>

</div>


</div>
</div>
      </div>
   
   <!-- ---------------- -->
   <div class="navWrapper" :style="{ marginLeft: '250px' }">
          
<nav id="nav" class=" nav" >
 <!-- v-if="persoAppI.length>0" for the below if we want to set those who can access the evaluateAll -->
 <button  @mouseover="handleMouseOver('u1')" @mouseleave="handleMouseLeave('u1')" id="u1" class="navBtn"  @click="navBtnStyle();setComponentView('setEvaluateAll')">
    <i class="fas fa-users"  aria-hidden="true"></i> {{ evaluateAll }}
       </button>

          <button @mouseover="handleMouseOver('u2')" @mouseleave="handleMouseLeave('u2')" id="u2" v-if="chefList.length>0" class="navBtn"  @click="navBtnStyle();setComponentView('setEvaluateAsChef')">
        <i class="fa-solid fa-person"></i>
        {{ evaluateAsChef }}
       </button>

       
       <button @mouseover="handleMouseOver('u3')" @mouseleave="handleMouseLeave('u3')" id="u3" class="navBtn" @click="navBtnStyle();setComponentView('setAutoEvaluation')">
     
        <i class="fa-solid fa-star"></i>
{{ autoEvaluate }}
       </button>

         <button @mouseover="handleMouseOver('u4')" @mouseleave="handleMouseLeave('u4')" id="u4" class="navBtn" @click="navBtnStyle();setComponentView('setEvaluateTeam') ">
        <i class="fa-solid fa-user-group"></i>
         {{ evaluateTeamBtn }}
       </button>
       
          <!-- v-if="evaluated.length>0" -->
       <button @mouseover="handleMouseOver('u5')" @mouseleave="handleMouseLeave('u5')" id="u5" class="navBtn"  @click="navBtnStyle();setComponentView('setEvaluateCauseChosen')">
        <i class="fa-solid fa-code-branch"></i>
{{ evaluateCauseChosenBtn }}
       </button>

 <button @mouseover="handleMouseOver('u6')" @mouseleave="handleMouseLeave('u6')" id="u6" class="navBtn"  @click="navBtnStyle();setComponentView('setChooseServices') ">
        <i class="fas fa-cogs" aria-hidden="true"></i> {{ chooseServicesBtn }}
       </button>

       
       <!-- <button  @click="$store.commit('setChoice', true); $store.commit('setMainScreen', false)">
         {{ choiceBtn }}
       </button> -->

  

    
     
       
       <button  @mouseover="handleMouseOver('u7')" @mouseleave="handleMouseLeave('u7')"  id="u7" v-if="chefList.length>0" class="navBtn"  @click="navBtnStyle();setComponentView('setRh')">
        <i class="fa-solid fa-hand-point-down"></i>
         {{ rhBtn }}
       </button>
 <!-- pour les si -->
       <button @mouseover="handleMouseOver('u8')" @mouseleave="handleMouseLeave('u8')" id="u8" v-if="$store.state.idService==15" class="navBtn"  @click="navBtnStyle();setComponentView('setUpdatePerso') ">
        <i class="fa fa-refresh" aria-hidden="true"></i>

 {{ persoUpdateBtn }}
       </button>
    <!-- pour les si -->
       <button @mouseover="handleMouseOver('u9')" @mouseleave="handleMouseLeave('u9')" id="u9" v-if="$store.state.idService==15" class="navBtn"  @click="navBtnStyle();setComponentView('setUpdateCritere') ">
        <i class="fa fa-refresh" aria-hidden="true"></i>
        {{ critereoUpdateBtn }}
       </button>
       
      

    

       <!-- <button class="navBtn"  @click="navBtnStyle();setComponentView('setMainScreenView');this.refreshComponentView()">
        {{ mainView }}
       </button> -->

      
</nav>

  </div>
   <!-- -------------- -->
      <div  class="overlay" v-if="divChangeLanguage" id="changeLanguage">

        <div id="cover">
           
          <button
              class="languageBtn"
              :class="{ 'selected': languageTemp === 'french'  }"
              type="button"
              @click="languageTemp='french';$store.commit('setLanguageSys','french');changeLanguage();divChangeLanguage=false;shiftLanguage();this.refreshComponentView()"
            >
              Français
            </button>
            <button
              class="languageBtn"
              :class="{ 'selected':languageTemp  === 'english' }"
              type="button"
              @click="languageTemp='english';$store.commit('setLanguageSys','english');changeLanguage();divChangeLanguage=false;shiftLanguage();this.refreshComponentView()"
            >
              English
            </button>
            <button
              class="languageBtn"
              :class="{ 'selected': languageTemp  === 'malagasy' }"
              type="button"
              @click="languageTemp='malagasy';$store.commit('setLanguageSys','malagasy');changeLanguage();divChangeLanguage=false;shiftLanguage();this.refreshComponentView()"
            >
              Malagasy
            </button>
            <button @click="divChangeLanguage=false" type="button" id="cancel"> {{ cancelBtn_syslg }}</button>
        </div>
            
          
          </div>

        

  </template>
  
  <script>

  import axios from 'axios';

  export default {
     
    data() {
      return {  
// languages
changeLanguageBtn_SysLg:"",
changePswdBtn:"",
rapportBtn: "",
searchBtn_sysLg:"",
logoutBtn_syslg:"",
counterpartNotEvaluatedCaption:"",
nomTh_syslg:"",
prenom_syslg:"",
otherServiceNotEvaluated:"",
chefEvaluation:"",
periodOfEvaluation_syslg:"",
changePswdBtn_syslg:"",
pswdConfLabel_syslg:"",
pswdLabel_syslg:"",
cancelBtn_syslg:"",
changePswdQuest_syslg:"",
insertedPswdQuest_syslg:"",
insertedlgAlt_syslg:"",
pswdAndConfNotMatchingAlt:"",
moreStafforServiceToBeOperated_syslg:"",

persoAppI:[],
        serviceName:"",
        searchDataInput:"",
        evaluateAll:"",
        hasBeenListTable:"",
        hasBeenListDb:[],
        pswdShowed:false,
        evaluateAsChef:"",
        chefNotEvaluated:[],
        otherServiceNonEvaluated:[],
        counterPartNonEvaluated:[],
        languageTemp:"",
        divChangeLanguage:false,
        boolSearch:false,
        pswd:"",
        confirmation:"",
        // LanguageAlt
        mainView:"",
        currentYearData:"",
        HasBeenListTable:"Mark assigned",
      
      
      
        
        persoUpdateBtn:"",
        critereoUpdateBtn:'update critere',
        rhBtn:"",
        evaluateCauseChosenBtn:'',
        autoEvaluate: "",
        choiceBtn: "Choose evaluators",
        evaluateTeamBtn: "",
        isMenuOpen: false, // Initially hidden
        evaluated:[],
      
        chosenServices:[],
        chooseServicesBtn:"",
        chefList:[],
     serviceThisYearList:[],
serviceOfYouThisYear:"",

service1Name:"",
service2Name:"",
service3Name:"",
chosenEvaluatorName:"",   
serviceTableContent:true,
downPdfLabel:"",

        
      }
     
  
      
        
    
    },
    watch:{
      searchDataInput(value){
          this.$store.commit("setDataSearchInput",value);
         
      },
 
    },
    mounted() {
     this.setYear();
      this.$store.commit("setMainScreenView",true)
      // Automatically open the menu when the component is mounted
      var a=false
this.fetchServiceName();
      this.searchEvaluated();
      this.getIdServiceFetch();
      this.fetchLanguage();
      this.fetchNonEvaluatedCounter();
      this.fetchNonEvaluatedService(); 
      this.fetchNotEvaluatedChef() ;
      this.fetchChosenServices();
      this.fetchChef();
      this.fetchListOfHasBeen();
      this.toggleMenuDisplay();
    this.fetchUserName();
    this.styleMainScreenReponse();
      this.shiftLanguage()
      this.personAppropriateAssignment()
      this.serviceThisYearListFetch()
    },
  
    computed: {
      
    filteredName1() {
      const search = this.searchDataInput.toLowerCase();
  return this.counterPartNonEvaluated.filter(item => {
    const name = item.nom.toLowerCase();
    const lastName = item.prenom.toLowerCase();
    return name.includes(search) || lastName.includes(search);
  });
    
    },
    filteredName2() {
      const search = this.searchDataInput.toLowerCase();
   
     
    
     return this.otherServiceNonEvaluated.filter(item => {
    const name = item.nom.toLowerCase();
    const lastName = item.prenom.toLowerCase();
    return name.includes(search) || lastName.includes(search);
  });
    },
    filteredName3() {
      const search = this.searchDataInput.toLowerCase();
     
      
     return this.chefNotEvaluated.filter(item => {
    const name = item.nom.toLowerCase();
    const lastName = item.prenom.toLowerCase();
    return name.includes(search) || lastName.includes(search);

  });
    
    },
    filteredName4() {
      const search = this.searchDataInput.toLowerCase();
     
     
      return this.hasBeenListDb.filter(item => {
    const name = item.nom.toLowerCase();
    const lastName = item.prenom.toLowerCase();
    const period=item.anneeEvaluation.toLowerCase();
    return name.includes(search) || lastName.includes(search) || period.includes(search) ;

  });
  },
},
created(){
  window.addEventListener('resize', this.styleMainScreenReponse)
},
    methods: {
    
      serviceThisYearListFetch(){

         var formData=new FormData();
                formData.append('action',"serviceThisYearListFetch");
                formData.append('matriculeNbr',this.$store.state.matriculeNbr);
              

                axios
          .post(this.$store.state.fileConfContent, formData)
          .then((response) => {
           this.serviceThisYearList =response.data;
          
       
       
      })
        .catch((err) => {
         console.log(err); 
     
        
      });

      },
      setYear(){
        var formData=new FormData();
                formData.append('action',"setYear");
                
              

                axios
          .post(this.$store.state.fileConfContent, formData)
          .then((response) => {
           
          this.currentYearData=response.data

           if(this.currentYearData!=""){
if( this.currentYearData.currentYearColumn!=new Date().getFullYear()){
            
             var formData=new FormData();
                formData.append('action',"updateYear");
                
              

                axios
          .post(this.$store.state.fileConfContent, formData)
          .then((response) => {
           console.log("year is set to current Year and db is updated")
          
           
       
       
      })
        .catch((err) => {
         console.log(err); 
       
        
      });
      }
      }
           
       
       
      })
        .catch((err) => {
         console.log(err); 
       
        
      });
     
     
      
      },

        shiftLanguage(){
  
          if(this.$store.state.languageSys=="french"){

          this.changeLanguageBtn_SysLg=" Changer de langue"
          this.changePswdBtn="Changer mon mot de passe"
          this.rapportBtn="Rapport"
          this.searchBtn_sysLg="Rechercher"
          this.logoutBtn_syslg="Déconnexion"
          this.counterpartNotEvaluatedCaption="Collaborateurs non evalués"
          this.prenom_syslg="Prenom"
          this.nomTh_syslg="Nom"
          this.otherServiceNotEvaluated="Personnels d'autre service non evalués"
          this.chefEvaluation="Subordonnés non evalués"
          this.hasBeenListTable="Personnels evalués"
          this.periodOfEvaluation_syslg="Periode d'evaluation"
          this.pswdLabel_syslg="Nouveau mot de passe"
          this.pswdConfLabel_syslg="Confirmation"
          this.changePswdBtn_syslg="Changer"
          this.evaluateAll="Evaluer tout le monde"
          this.chooseServicesBtn="Choisir des services"
          this.autoEvaluate="Auto-evaluation"
          this.evaluateTeamBtn="Evaluer mes collaborateurs"
          this.evaluateCauseChosenBtn="Evaluation d'autre services"
          this.rhBtn="Choisir un evaluateur"
          this.persoUpdateBtn="Mise à jour des personnels"
          this.critereoUpdateBtn="Mise à jour des critères"
          this.evaluateAsChef="Evaluation de subordonnées"
          this.mainView="Ecran principal"
          this.cancelBtn_syslg="Annuler"
          this.changePswdQuest_syslg="Voulez-vous changer votre mot de passe ?"
          this.insertedPswdQuest_syslg="Nouveau mot de passe sauvegardé"
          this.insertedlgAlt_syslg="Nouveau langue sauvegardé"
          this.pswdAndConfNotMatchingAlt="Votre mot de passe ne correspond pas au confirmation ou case vide"
           this.moreStafforServiceToBeOperated_syslg="Il vous reste des personnels à evaluer cette année ou Choisissez des services"
          this.serviceOfYouThisYear="Liste des services que vous avez choisi cette année"
          this.service1Name="Service 1"
          this.service2Name="Service 2"
          this.service3Name="Service 3"
          this.chosenEvaluatorName="Votre évaluateur cette année"
          this.downPdfLabel="Aide"
          

        }else if(this.$store.state.languageSys=="english"){

          this.changeLanguageBtn_SysLg=" Change language"
          this.changePswdBtn="Change password"
          this.rapportBtn="Report"
          this.searchBtn_sysLg="Search"
          this.logoutBtn_syslg="Log out"
          this.counterpartNotEvaluatedCaption="Counterparts not evaluated"
          this.prenom_syslg="Last name"
          this.nomTh_syslg="First Name"
          this.otherServiceNotEvaluated="Remaining not evaluated opposite branches"
          this.chefEvaluation="Subordinates not evaluated"
          this.hasBeenListTable="Staffs evaluated"
          this.periodOfEvaluation_syslg="Evaluation period"
          this.pswdLabel_syslg="New Password"
          this.pswdConfLabel_syslg="New Password Confirmation"
          this.changePswdBtn_syslg="Change"
          this.evaluateAll="Evaluate all staffs"
          this.chooseServicesBtn="Choose services"
          this.autoEvaluate="Self-evaluation"
          this.evaluateTeamBtn="Evaluate team"
          this.evaluateCauseChosenBtn="Evaluation of other branches"
          this.rhBtn="Pick one evaluator"
          this.persoUpdateBtn="Update staffs"
          this.critereoUpdateBtn="Update criterias"
          this.evaluateAsChef="Evaluate subordinates"
          this.mainView="Main view"
          this.cancelBtn_syslg="Cancel"
          this.changePswdQuest_syslg="Do you really want to change your password ?"
          this.insertedPswdQuest_syslg="New Password inserted"
          this.insertedlgAlt_syslg="New language inserted"
          this.pswdAndConfNotMatchingAlt="Password and confirmation doesn't match or blank field"
          this.moreStafforServiceToBeOperated_syslg="You have more staff left to evaluate this year or choose a service"
          this.serviceOfYouThisYear="List of the services you chose this year"

           this.service1Name="Service 1"
          this.service2Name="Service 2"
          this.service3Name="Service 3"
          this.chosenEvaluatorName="Your evaluator this year"
          this.downPdfLabel="Help"

        }else{

          this.changeLanguageBtn_SysLg=" Hanova fiteny"
          this.changePswdBtn="Hanova teny miafina"
          this.rapportBtn="Tatitra"
          this.searchBtn_sysLg="Hitady"
          this.logoutBtn_syslg="Hiala"
          this.counterpartNotEvaluatedCaption="Ekipa tsy mbola voahombana"
          this.prenom_syslg="Fanampin'anarana"
          this.nomTh_syslg="Anarana"
          this.otherServiceNotEvaluated="Servisy hafa mbola tsy voahombana"
          this.chefEvaluation="Mpiasa ambany-hivo mbola tsy voahombana"
          this.hasBeenListTable="Mpiara miasa efa voahombana"
          this.periodOfEvaluation_syslg="Taona"
          this.pswdLabel_syslg="Teny miafina vaovao"
          this.pswdConfLabel_syslg="Famerenana ny teny miafina"
          this.changePswdBtn_syslg="Hanova"
          this.evaluateAll="Hanombana ny mpiasa rehetra"
          this.chooseServicesBtn="Hisafidy servisy"
          this.autoEvaluate="Hanomban-tena"
          this.evaluateTeamBtn="Hanombana ny ekipa"
          this.evaluateCauseChosenBtn="Hanombana ny servisy hafa"
          this.rhBtn="Hisafidy ny mpanombana"
          this.persoUpdateBtn="Hanova ny momba ny mpiasa"
          this.critereoUpdateBtn="Hanova ny mason-tsivana"
          this.evaluateAsChef="Hanombana ny mpiasa ambany-hivo"
          this.mainView="Fahitana voalohany"
          this.cancelBtn_syslg="Hiverina"
          this.changePswdQuest_syslg="Tena ovaina ny ve teny miafina ?"
          this.insertedPswdQuest_syslg="Voahova ny teny miafina"
          this.insertedlgAlt_syslg="Voahova ny fiteny"
          this.pswdAndConfNotMatchingAlt="Tsy mitovy ny teny miafina sy ny famerenana na tsy feno ny banga"
          this.moreStafforServiceToBeOperated_syslg="Mbola misy mpiasa tsy voatombana na misafidiana servisy"
          this.serviceOfYouThisYear="Listr'ireo servisy nosafidinao tamin'ity taona ity"

           this.service1Name="Servisy 1"
          this.service2Name="Servisy 2"
          this.service3Name="Servisy 3"
          this.chosenEvaluatorName="Mpanombana anao amin'ity taona ity"
          this.downPdfLabel="Fanampiana"

        }
//  this.$nextTick(() => {
//     // Any code that relies on the updated DOM can go here
//     // For example, you might trigger other methods or update some variables
//     console.log("Component updated after language shift");
//   });
      },
      personAppropriateAssignment(){
        var formData=new FormData();
                formData.append('action',"personAppropriateAssignment");
                formData.append('matriculeNbr',this.$store.state.matriculeNbr);
              

                axios
          .post(this.$store.state.fileConfContent, formData)
          .then((response) => {
           this. persoAppI=response.data;
       
       
      })
        .catch((err) => {
         console.log(err); 
     
        
      });
      },
      handleMouseOver(i) {
     

        const nav = document.querySelector('#nav');
      // Update the width to 50px when mouseover occurs
      document.getElementById(i).style.width = '20%';
     
      document.getElementById(i).style.transition = 'width 0.5s';
     nav.style.overflow="hidden"
    },
    handleMouseLeave(i){
      const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  var navWidth = windowWidth - windowWidth*0.17 + 'px';
      document.getElementById(i).style.width = parseInt(navWidth)/12+"px";
    },
   styleMainScreenReponse() {
    
 

  
        const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;


  const nav = document.querySelector('#nav');


  const menu = document.querySelector('#menu');
  const navBtn = document.querySelectorAll('.navBtn');
  const menuBtn=document.querySelectorAll(".menuBtn")
const serviceLogo=document.querySelector("#serviceLogo")

 if(this.$store.state.mainScreenView){

const divMain=document.querySelector("#divMain")
divMain.style.width=windowWidth-  windowWidth*0.17+ 'px';
divMain.style.position="absolute"
divMain.style.height=windowHeight-60+"px"
divMain.style.top="60px";
 divMain.style.left = windowWidth*0.17 + 'px';


 }
serviceLogo.style.width=windowWidth / 10 + 'px';

serviceLogo.style.height=windowWidth / 10 + 'px';

  menu.style.width = windowWidth*0.17 + 'px';
  nav.style.left = windowWidth*0.17 + 'px';

  var navWidth = windowWidth - windowWidth*0.17 + 'px';

  nav.style.width = navWidth; // Set the width of the nav element

  navBtn.forEach((btn) => {
   
    btn.style.width = parseInt(navWidth)/12+"px";
   btn.addEventListener("mouseover",function(){
  




    // Check if the 'overflow' CSS property is set to 'hidden'
    
      // Text is hidden or truncated, you can apply styles or execute code here

      btn.style.width = '20%';
     
      btn.style.transition = 'width 0.5s';
      nav.style.overflow="hidden"
   
   })
    btn.addEventListener("mouseleave",function(){
      
    btn.style.width = parseInt(navWidth)/12+"px";
   })
  });
   
// for (let i = 1; i <=9; i++) {
//   document.getElementById("u"+i).style.width = '20%';
//   document.getElementById("u"+i).btn.style.transition = 'width 0.5s';
//       nav.style.overflow="hidden"
  
// }
},

      navBtnStyle() {
  const navButtons = document.querySelectorAll('.navBtn');
  // const rapportButton = document.getElementById('rapportBtn');

  // Add a click event listener to the "rapportBtn"
  // rapportButton.addEventListener('click', function () {
  //   // Remove border from all buttons
  //   navButtons.forEach((btn) => {
  //     btn.style.border = 'none';
  //   });
  // });

  // Add click event listeners to all nav buttons
  navButtons.forEach((button) => {
    button.addEventListener('click', function () {
      // Remove border from all buttons
      navButtons.forEach((btn) => {
        btn.style.border = 'none';
        
      });
      // Apply the border to the clicked button
      this.style.borderBottom = '1px solid black';
    });
  });
},
      setComponentView(comp){
          this.$store.commit(comp,true)
          var compTab=['setEvaluateAll','setMainScreenView','setChooseServices','setAutoEvaluation',
          'setEvaluateTeam','setEvaluateCauseChosen','setRh','setUpdatePerso','setUpdateCritere',
          'setEvaluateAsChef','setCriteriaComp','setRapport']
          for (let i = 0; i < compTab.length; i++) {
              if(compTab[i]!=comp)this.$store.commit(compTab[i],false)

          }
      },
      fetchUserName(){
         var formData=new FormData();
                formData.append('action',"fetchNameUser");
                formData.append('matriculeNbr',this.$store.state.matriculeNbr);
              

                axios
          .post(this.$store.state.fileConfContent, formData)
          .then((response) => {
           this.$store.commit("setUserName",response.data.prenom)
       
       
      })
        .catch((err) => {
         console.log(err); 
     
        
      });
      },
   toggleSearchBtn(){
      this.boolSearch=!this.boolSearch
      if(!this.boolSearch)this.searchDataInput=""
   },
      fetchListOfHasBeen(){
        var formData=new FormData();
                formData.append('action',"fetchListOfHasBeen");
                formData.append('matriculeNbr',this.$store.state.matriculeNbr);
              

                axios
          .post(this.$store.state.fileConfContent, formData)
          .then((response) => {
           this. hasBeenListDb=response.data;
       
       
      })
        .catch((err) => {
         console.log(err); 
     
        
      });

      },
      
      showChangePswd(){
        if(this.pswdShowed)this.pswdShowed=false
         else this.pswdShowed=true
          
      },

      fetchChef(){
        var formData=new FormData();
                formData.append('action',"fetchChef");
                formData.append('matriculeNbr',this.$store.state.matriculeNbr);
              

                axios
          .post(this.$store.state.fileConfContent, formData)
          .then((response) => {
            if(response.data==null)this.chefList=[];
            else this.chefList=response.data;
           
       
       
      })
        .catch((err) => {
         console.log(err); 
       
        
      });

      },

      fetchChosenServices(){

        var formData=new FormData();
                formData.append('action',"fetchChosenServices");
                formData.append('matriculeNbr',this.$store.state.matriculeNbr);
              

                axios
          .post(this.$store.state.fileConfContent, formData)
          .then((response) => {
           this.chosenServices=response.data;
       
       
      })
        .catch((err) => {
         console.log(err); 
        
        
      });
      },

      fetchNotEvaluatedChef(){
        
        this.chefNotEvaluated=[];
      
        var formData=new FormData();
                formData.append('action',"fetchNotEvaluatedChef");
                formData.append('matriculeNbr',this.$store.state.matriculeNbr);
              

                axios
          .post(this.$store.state.fileConfContent, formData)
          .then((response) => {
           this.chefNotEvaluated=response.data;
    
      })
        .catch((err) => {
         console.log(err); 
       
        
      });
      },

      fetchNonEvaluatedService(){
        var formData=new FormData();
                formData.append('action',"fetchNonEvaluatedService");
                formData.append('matriculeNbr',this.$store.state.matriculeNbr);
              

                axios
          .post(this.$store.state.fileConfContent, formData)
          .then((response) => {
           this.otherServiceNonEvaluated=response.data;
       
       
      })
        .catch((err) => {
         console.log(err); 
         
        
      });

            
      },
      
      fetchNonEvaluatedCounter(){
        var formData=new FormData();
                formData.append('action',"fetchNonEvaluatedCounterPart");
                formData.append('matriculeNbr',this.$store.state.matriculeNbr);
              

                axios
          .post(this.$store.state.fileConfContent, formData)
          .then((response) => {
           this.counterPartNonEvaluated=response.data;
      
       
      })
        .catch((err) => {
         console.log(err); 
        
        
      });

            
      },
      fetchLanguage(){
        var formData=new FormData();
                formData.append('action',"fetchLanguage");
                formData.append('matriculeNbr',this.$store.state.matriculeNbr);
              

                axios
          .post(this.$store.state.fileConfContent, formData)
          .then((response) => {
           this.$store.commit("setLanguageSys",response.data.language);
   
       
      })
        .catch((err) => {
         console.log(err); 
        
        
      });
      },
      fetchServiceName(){
        var formData=new FormData();
                formData.append('action'," fetchServiceName");
                formData.append('matriculeNbr',this.$store.state.matriculeNbr);
              

                axios
          .post(this.$store.state.fileConfContent, formData)
          .then((response) => {
          this.serviceName=response.data.nomService
       
       
      })
        .catch((err) => {
         console.log(err); 
        
        
      });
      },
      changeLanguage(){
    

        var formData=new FormData();
                formData.append('action',"changeLanguage");
                formData.append('matriculeNbr',this.$store.state.matriculeNbr);
                formData.append("languageSys",this.$store.state.languageSys);

                axios
          .post(this.$store.state.fileConfContent, formData)
          .then((response) => {
            console.log("inserted new language");
            this.cAlert(this.insertedlgAlt_syslg);
            
        
       
      })
        .catch((err) => {
         console.log(err); 
         
        
      });
      },
      toggleMenuDisplay(){
        // Get a reference to the menu container

      },
      changePswd(){
        
        if(this.pswd==this.confirmation && this.confirmation!="" ){
if (confirm(this.changePswdQuest_syslg)) {

  var formData=new FormData();
                formData.append('action',"changePswd");
                formData.append('matriculeNbr',this.$store.state.matriculeNbr);
                formData.append("pswd",this.pswd);

                axios
          .post(this.$store.state.fileConfContent, formData)
          .then((response) => {
          
            this.cAlert(this.insertedPswdQuest_syslg);
            
        
       
      })
        .catch((err) => {
      
        
      });
}
   
    }else this.cAlert(this.pswdAndConfNotMatchingAlt);
      },
      logout(){
         if(this.chosenServices.serviceChoice1!=''  && this.chosenServices.serviceChoice2!=''  &&
          this.counterPartNonEvaluated.length == 0 && this.otherServiceNonEvaluated.length==0 && this.chefNotEvaluated.length==0  ){
         
       
          // var compTab=['setEvaluateAll','setMainScreenView','setChooseServices','setAutoEvaluation',
          // 'setEvaluateTeam','setEvaluateCauseChosen','setRh','setUpdatePerso','setUpdateCritere',
          // 'setEvaluateAsChef','setCriteriaComp','setRapport']

          // for (let i = 0; i < compTab.length; i++) {
          //   this.$store.commit(compTab[i],false)

          // } 
          //   this.$store.commit("setMainScreen",false);
          // this.$store.commit("setgMatriculation",true);
          location.reload();
      
         }else this.cAlert(this.moreStafforServiceToBeOperated_syslg);
          
        
      },
      getIdServiceFetch(){
        var formData=new FormData();
                formData.append('action',"getIdService");
                formData.append('matriculeNbr',this.$store.state.matriculeNbr);

                axios
          .post(this.$store.state.fileConfContent, formData)
          .then((response) => {
            this.$store.commit("setIdService",response.data.idService);
        
       
      })
        .catch((err) => {
         console.log(err); 
        
        
      });
      },
      searchEvaluated(){
        var formData=new FormData();
                formData.append('action',"searchEvaluated");
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


    },
  };
  </script>
  
  <style  scoped>
  @font-face {
  font-family: 'openSansFont';
  src: url('fontFamily/openSansRegular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

#divMain{
 justify-items: center;
 flex-direction: row; 
    align-items: flex-start;
}
.menuBtn{
  color: black;
}
.custom-table {
  width:25%; /* Make the table take the full width of its container */
  border-collapse: collapse; /* Remove space between table cells */
  margin-top: 20px; /* Add some top margin */

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
#serviceLogo{
  border: 1px dashed white;
  border-radius: 80%; 
  text-align: center;
  margin: auto;
display: flex;
justify-content: center;
color: white;
position: relative;
justify-items: center;

}
#serviceLogo span{
  position: absolute;
  top: 43%;

}
#userName{

  text-align: center;
box-shadow: 3px 3px black ;
border-radius: 5px;
color: white;
}
  #mainScreen{
    
    width: 100%;
height: 100%;
position: absolute;
  
  }
  body{
    background:  white
    
    }
 

nav button{
white-space: nowrap; /* Prevent text from wrapping */
      overflow: hidden;   /* Hide overflowed text */
      text-overflow: ellipsis ;
background-color: transparent;
  color: #fff; /* Set text color */
  padding: 10px 20px; /* Add padding for button size */
  margin-right: 10px; /* Add margin between buttons */
 border: none;
  cursor: pointer; /* Show a pointer cursor on  */
  transition: background-color 0.3s, color 0.3s;
width: 10%;
font-family: 'openSansFont';
display: inline-block;
 
}
nav button:hover{
  border-bottom: 1px white solid;
 
}
#chbtn{
  margin-left: 180px;
}

 
#changePswd{
  z-index: 3000;
}
#pswdChangeOverlay{
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 5000;
  display: flex;
  align-items: center;
  justify-content: center;
}
#pswdChangepopup{
  background: #267871; /* Background color matching #267871 */
  padding: 20px;
  border-radius: 10px;
  z-index: 3000;
}
#pswdChangepopup label {
  display: block;
  color: white;
  margin: 10px 0;
}
#pswdChangepopup input {
  width: 100%;
  padding: 5px;
  margin: 5px 0;
  border: none;
  border-radius: 5px;

}

#pswdChangepopup button {
  background: white;
  color:#333333 ;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

caption 
{
          border: none;
         
}
table{
 border: collapse;
}


  .menu-buttons {
  margin-top: auto; /* Push the buttons to the bottom */
  padding: 10px; /* Add some space around the buttons */
  width: 100%;
}
  #logoutBtn, #changeLangBtn, #changePswdBtn,#searchLabel,#rapportBtn,#mainviewBtnMenu ,#down{
   width: 100%;
  /*background-color:#0C3B2E;*/
  background: transparent;
  /*border: 1px solid #0C3B2E; /* Cell border */
  border: none;
  border-radius: 6px;/* Background color of the menu */
  color: white; /* Text color is white */
  padding: 10px 15px;
  cursor: pointer;
  text-align: left;
  transition: background-color 0.3s;

}
/* #logoutBtn{
margin-top: 300px;
margin-left: 18px;
} */

#logoutBtn:hover, #changeLangBtn:hover,#searchLabel:hover,#changePswdBtn:hover,#rapportBtn:hover,#mainviewBtnMenu:hover,#down:hover  {
  background-color: rgba(255, 255, 255, 0.9);
  /*background-color: #6B9773;*/
  color:black;
}
#changeLangBtn {
  margin-top: auto; /* Push the Change Language button to the bottom */
}
  .navBtn{
    color: black;
  }
  .navBtn:hover{
    border-bottom: black solid 1px;
    transition: 0.5s;
  }
nav{
overflow:-moz-hidden-unscrollable;
  justify-content:flex-start ; /* Align buttons to the right */
  padding: 10px 20px; /* Add padding for spacing */
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
 background:#f2f2f2;
 color: #333333 ;
 position: fixed;
top: 0;
z-index: 100;
left: 250px;
height: 60px;
}
  /* Style for the Menu Window */
  .menu-container {
    display: flex;
  flex-direction: column; /* Stack items vertically */
background: #267871;
  top: 0;

  border-top-right-radius: 100px;

color: white;
  overflow-x: hidden;
  z-index: 1000;
  transform: translateX(0); /* Start with the menu open */

color: black;

  position: fixed;
  
    right: -250px; /* Start the menu off-screen to the right */
   
    height: 100%;
  
    transition: right 0.3s; /* Add a smooth transition effect */
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
    
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
  .languageBtn {
    margin-top: 30px;
    padding: 10px;
    border: 1px solid white;
    border-radius: 5px;
color: #333333;
    cursor: pointer;
margin-left: 7px;
margin-right: 7px;
  }
  #languageBtn{
    position: relative;
    top: 50px;
    left: 45px;
    background: white;
    border-radius: 10px;
    width: 100px;
  }
  
  .selected {
    background-color:#267871 ; 
    color: white;
    border-color: #267871 ;
    
  }
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background:rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    
  }

  #cover{
    position: absolute;
    width: max-content;
    height: 157px;
    justify-content: center;
    align-items: center;
    background:   #267871 ; 
    border-radius: 10px;
  }
  #cancel{
    position: absolute;
    top: 100px;
    left: 10px;
    width: max-content;
  /*background-color:#0C3B2E;*/
  background: #FFFFFF ;
  /*border: 1px solid #0C3B2E; /* Cell border */
  border: none;
  border-radius: 6px;/* Background color of the menu */
  color: #333333 ; /* Text color is white */
  padding: 10px 15px;
  cursor: pointer;
  text-align: left;
  transition: background-color 0.3s;
  
  }


  searchAStaff{
    position: relative;
    top: 10px;
    left: 50%;
  }

  /* template */
  

  </style>

  
  
  