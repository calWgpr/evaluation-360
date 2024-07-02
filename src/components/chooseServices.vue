<template>


     <div  id="divMain2" class="FirstDiv" >

    <form id="formId" @submit.prevent="chooseServices">

    <ul id="ulList">
        <li class="serviceChoiceList"  v-for="i in filteredServicesList" :key="i.idService"><button class="btnS" :class="{ selected: services.includes(i.idService)}" @click="select(i.idService);" type="button" >{{ i.nomService }}</button></li>
    </ul>

    <button class="serviceChoiceBtn" id="btnB" type="submit">{{ submitChoiceBtn }}</button>

    </form>

</div>
</template>

<script>
import axios from 'axios';

    export default{
       

        created(){
  
  window.addEventListener('resize', this.styleMain())
},
        data(){
            return{
              choose2LeastAlt_syslg:"",
             servicesList:[],
                services:[],
                submitChoiceBtn:"",
                insertedData_syslg:"",
                noMoreAlterAlt:"",
                sure:"",
            }

               
            },
            computed:{

              filteredServicesList(){
             
      const search = this.$store.state.dataSearchInput.toLowerCase();
  return this.servicesList.filter(item => {
    const name = item.nomService.toLowerCase();
    
    return name.includes(search) ;
  });
            
            },
          },
               mounted(){
            this.listServices();
            this.styleMain();
            this.shiftLanguage()
        },
        created(){
  
  window.addEventListener('resize', this.styleMain())
},
            methods:{
             
              shiftLanguage(){
                if(this.$store.state.languageSys=="french"){
                    
                  this.submitChoiceBtn="Sauvegarder mes choix de service pour cette année "
                  this.choose2LeastAlt_syslg="Choisissez au moins 2 services"
                  this.insertedData_syslg="Votre choix est sauvegardé"
                  this.noMoreAlterAlt="3 choix maximum"
                  this.sure="Voulez-vous changer votre choix de service evaluateur de cette année ?"

                }else if(this.$store.state.languageSys=="english"){
                
                  this.submitChoiceBtn="Save my choice of this year"
                  this.choose2LeastAlt_syslg="Choose at least 2 services"
                  this.insertedData_syslg="Your choice has been inserted"
                  this.noMoreAlterAlt="Max alternative is 3"
                  this.sure="Do you want to change this year's evaluator service?"

                }else{
                    this.submitChoiceBtn="Alefa ny safidy ho an'ity taona ity"
                    this.choose2LeastAlt_syslg="Misafidiana servisy 2 farafahakeliny"
                    this.insertedData_syslg="Tafiditra ny safidinao"
                    this.noMoreAlterAlt="Safidy 3 farafahabetsany"
                    this.sure="Tanterahina ve ny fanovana ny servisy mpanombana amin'ity taona ity?"
                }
              },
              styleMain(){
 
              },

                listServices(){

            var formData=new FormData();
                formData.append("action", "listServices");

                formData.append("matriculeNbr", this.$store.state.matriculeNbr);
                
                axios
          .post(this.$store.state.fileConfContent, formData)
          .then((response) => {
        this.servicesList= response.data;
        
       
      })
        .catch((err) => {
         console.log(err); 
       
        
      });
        },
      
                chooseServices(){
                        
            if(this.services.length<2)
               this.cAlert(this.choose2LeastAlt_syslg);
              else{
                if(confirm(this.sure)){
                    
            var formData=new FormData();
                formData.append("action", "chooseServices");

                formData.append("matriculeNbr", this.$store.state.matriculeNbr);
                formData.append("service1",this.services[0]);
                formData.append("service2",this.services[1]);
                if(this.services.length==3) formData.append("service3",this.services[2]);
                else formData.append("service3","");
                
                axios
          .post(this.$store.state.fileConfContent, formData)
          .then((response) => {
       
        console.log(response);
        this.cAlert(this.insertedData_syslg)
        this.$store.commit("setChooseServices",false);

        this.$store.commit("setMainScreenView",true);
        this.refreshComponentView()
        

        
       
      })
        .catch((err) => {
         console.log(err); 
        
        
      });
                }
            
    }
                },

                select(idService){
                        
          
            if(this.services.length<3){

      if (this.services.includes(idService)) {
        this.services = this.services.filter((k) => k !== idService);
      } else {
        this.services.push(idService);
      }

     } else {

            if (this.services.includes(idService)) {
        this.services = this.services.filter((k) => k !== idService);
      } else {
        this.cAlert(this.noMoreAlterAlt);
      }
      }
                },
            },
        
    }


</script>

<style >
.btnS{
  height: 50px;
 border: outset white 1px;
}

#ulList{
  display: flex;
  list-style-type: none;
  align-items: center;
  justify-content: center;
  flex-direction: row; 

  
}

#formId{
  position: absolute;
  top: 30%;
  left: 0;
  width: max-content;
  justify-items: center;
  align-content: flex-start;
margin-left: 0;
height: 100%;
}
li{
  margin-right: 10px;
}

#divMain2{
  justify-items: center;
  align-content: flex-start;
}
 .selected {
      height: 50px;
      color: white;
      width: auto;
      border: inset 1px #267871;
   
}

#btnB{
  height: 50px;
  color: white;
  background:#267871 ;
  width: max-content;
  margin-left: 50%;
}
</style>