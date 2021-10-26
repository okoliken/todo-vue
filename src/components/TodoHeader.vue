<template>
  <div class="header-flex">
      <h1 class="title">
          TODO
      </h1>
            <img v-if="setMode" src="../icon-sun.svg" 
                alt="" 
                class="mode"
                 @click="toggleMode"
            >


          <img v-else src="../icon-moon.svg" 
                alt="" 
                class="mode"
                 @click="toggleMode"
            >      
  </div>
</template>

<script>
export default {
    name:'TodoHeader',
    props:{
        toggleMode:Function,
        setMode:Boolean
    }
}
</script>

<style scoped>
.header-flex{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom:2rem;
   
}
.header-flex .title{
    color: #fff;
    font-size:30px;
    font-weight:650;
    letter-spacing:12px;
}
.mode{
    width:26px;
}
.mode:hover{
    cursor: pointer;
}
@media (min-width:375px) {
  .header-flex .title{
    color: #fff;
    font-size:40px;
    font-weight:650;
    letter-spacing:12px;
}
}
</style>