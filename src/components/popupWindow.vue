<template>
  
     <div id="popup-overlay" @click="closePopup">

  <div id="popup" >
    <i id="bell" class="fa-regular fa-bell fa-2xl" style="color: white;"></i>
 
    <span >{{ $store.state.alertValue }}</span>
    
<!-- <div v-if="$store.state.conf" id="btns">
  <button id="b1" class="submitBtn"  @click="set('no')">No</button>
   <button id="b2" class="submitBtn" @click="set('yes')">Yes</button>

</div> -->
  
  
  </div>

</div>
</template>

<script>
 export default {
    data() {
        return{
          
        
            
        }
    },
    methods:{
      set(i){
      this.$store.commit("setUserSetBool",i)
      },
     
    closePopup() {
        this.$store.commit("setPopupWindow",false);
       
        this.$store.commit("setConf",false)
    },
    },
 }
</script>

<style scoped>
#b1{

margin-bottom: 15px;
  margin-left: 0;
}
#b2{
position: absolute;
right: 0;
margin-right: 0;
}
#btns{
  position: relative;
padding: 0;
  width: 100%;
margin-top: 40px;
 height: max-content;
}
.submitBtn{
  background: white;
  width: 70px;
  height: 40px;
  color:#267871 ;
  border: 1px solid white;
  margin-right:50px ;
}
#bell{
position: absolute;
top: 20px;
left: 50%;
transform: translateX(-50%); /* Center the icon horizontally */
}
#popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Semi-transparent overlay */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000; /* Ensure it's above the rest of the content */

}

#popup {
  background:#267871 ; /* Background color matching #267871 */
  padding: 20px;
  border-radius: 10px;
  border: solid #267871  3px;
position: absolute;
height: 80px;
justify-content: center;
width: max-content;
}


span{
    color: white;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size: medium;
position: relative;
top: 25px;

}
</style>