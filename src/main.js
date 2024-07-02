import { createApp   } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'



const store = createStore({
  state() {
    return {
      userSetBool:null,
      personAppropriate:false,
        dataSearchInput:"",
        mainScreenView:true,
        userName:"",
     languageSys:"none",
     initAccount:false,
     gMatriculation:true,
     matriculeNbr:"",
     signIn:false,
     mainScreen:false,
     autoEvaluation:false,
     choice:false,
     evaluateTeam:false,
     criteria:false,
     evaluateCauseChosen:false,
     rh:false,
     updatePerso:false,
      idService:"",
      updateCritere:false,
      rapport:false,
      evaluateAsChef:false, 
      selfEvaluation:false,
      chooseServices:false,
      criteriaComp:false,
      matriculeEvaluated:"",
      popupWindow:false,
      alertValue:"",
      evaluateAll:false,
      conf:false,
      fileConfContent:"",
    }
  },
  mutations: {
    setFileConfContent(state,data){
      state.fileConfContent = data
    },
    setPersonAppropriate(state,data){
      state.personAppropriate = data
    },
    setDataSearchInput(state,data){
        state.dataSearchInput=data
    },
    setMainScreenView(state,mains){
        state.mainScreenView=mains
    },
    setUserName(state,userName){
        state.userName = userName
      },
    setEvaluateAll(state,evaluateAll){
      state.evaluateAll=evaluateAll
    },
    setPopupWindow(state,popupWindow){
      state.popupWindow=popupWindow
  },
    setAlert(state,alertValue){
      state.alertValue = alertValue
     
    },
    
    setMatriculeEvaluated(state,matriculeEvaluated){
      state.matriculeEvaluated = matriculeEvaluated;
    },
    setCriteriaComp(state,criteriaComp){
      state.criteriaComp=criteriaComp;
    },
    setChooseServices(state,chooseServices){
      state.chooseServices=chooseServices;
    },
    setSelfEvaluation(state,selfEvaluation){
        state.selfEvaluation = selfEvaluation;
    },
    setEvaluateAsChef(state,evaluateAsChef){
      state.evaluateAsChef = evaluateAsChef;
    },
    setRapport(state, rapport) {
      state.rapport=rapport;
    },
    setUpdateCritere(state, updateCritere) {
      state.updateCritere = updateCritere;
    },
    setIdService(state, idService) {
      state.idService = idService;
    },
setUpdatePerso(state, updatePerso){
  state.updatePerso = updatePerso;
},

    setRh(state,rh){
      state.rh = rh;
    },
    setEvaluateCauseChosen(state,evaluateCauseChosen){
      state.evaluateCauseChosen = evaluateCauseChosen;
    },
    setCriteria(state,criteria) {
      state.criteria = criteria;
    },
    setLanguageSys(state, language) {
      state.languageSys = language;
      
    },
    setInitAccount(state, initAccount) {
      state.initAccount = initAccount;
      
    },
    setgMatriculation(state, gMatriculation) {
      state.gMatriculation = gMatriculation;
      
    },
    setMatriculeNbr(state, matriculeNbr) {
      state.matriculeNbr = matriculeNbr;
      
    },
    setSignIn(state, signIn) {
      state.signIn = signIn;
      
    },
    setMainScreen(state,mainScreen){
      state.mainScreen = mainScreen;
    },
    setAutoEvaluation(state,autoEvaluation){
      state.autoEvaluation = autoEvaluation;
    },
    setChoice(state,choice){
      state.choice = choice;
    },
    setEvaluateTeam(state,evaluationTeam){
      state.evaluateTeam = evaluationTeam;
    },
  },
})

const app = createApp(App)


app.config.globalProperties.cAlert = function (a) {
  this.$store.commit('setAlert', a);
  this.$store.commit('setPopupWindow', true);
  this.$store.commit("setConf",false)
};

app.config.globalProperties.refreshComponentView=function(){

  if(this.$store.state.chooseServices){

    this.$store.commit("setChooseServices",false)
this.$nextTick(() => {
  
 this.$store.commit("setChooseServices", true);
});

}

if(this.$store.state.mainScreenView){

        this.$store.commit("setMainScreen",false)
this.$nextTick(() => {

 this.$store.commit("setMainScreen", true);
});

}

if(this.$store.state.evaluateAll){

  this.$store.commit("setEvaluateAll",false)
this.$nextTick(() => {

this.$store.commit("setEvaluateAll", true);
});

}
if(this.$store.state.evaluateTeam){

  this.$store.commit("setEvaluateTeam",false)
this.$nextTick(() => {

this.$store.commit("setEvaluateTeam", true);
});

}
if(this.$store.state.evaluateCauseChosen){

  this.$store.commit("setEvaluateCauseChosen",false)
this.$nextTick(() => {

this.$store.commit("setEvaluateCauseChosen", true);
});

}
if(this.$store.state.rh){

  this.$store.commit("setRh",false)
this.$nextTick(() => {

this.$store.commit("setRh", true);
});

}
if(this.$store.state.updatePerso){

  this.$store.commit("setUpdatePerso",false)
this.$nextTick(() => {

this.$store.commit("setUpdatePerso", true);
});

}
if(this.$store.state.updateCritere){

  this.$store.commit("setUpdateCritere",false)
this.$nextTick(() => {

this.$store.commit("setUpdateCritere", true);
});

}
if(this.$store.state.evaluateAsChef){

  this.$store.commit("setEvaluateAsChef",false)
this.$nextTick(() => {

this.$store.commit("setEvaluateAsChef", true);
});

}
if(this.$store.state.criteriaComp){

  this.$store.commit("setCriteriaComp",false)
this.$nextTick(() => {

this.$store.commit("setCriteriaComp", true);
});

}
if(this.$store.state.rapport){

  this.$store.commit("setRapport",false)
this.$nextTick(() => {

this.$store.commit("setRapport", true);
});

}

};

// app.config.globalProperties.cConf = function (a) {
//   this.$store.commit("setUserSetBool",null)
//   this.$store.commit('setAlert', a);
//   this.$store.commit('setPopupWindow', true);
//   this.$store.commit("setConf",true)
// };
app.use(store)
app.mount('#app')
