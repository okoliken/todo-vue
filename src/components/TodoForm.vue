<template>
  <form @submit.prevent="change" class="todo-form">
             <div class="todo-checkbox" :class="{bgc:completed}" @click="toggle" >
               <div v-if="completed">
                   <img src="../icon-check.svg" alt="">
               </div>
            </div>
        <input 
            type="text" 
            v-model="value" 
            class="todo-form-input"
            placeholder="Create new todos..."
            >
    </form>
</template>

<script>
export default {
    name:'TodoForm',
    data() {
        return {
            value: "",
            completed:false
        }
    },
    emits:['changed'],
    methods:{
        toggle ()
        {
            this.completed = !this.completed
        },
      change()  
      {
          let value = {change:this.value,complete:this.completed}
          this.$emit('changed',value);

          this.value = ''
          this.completed = false
      }
  }
}
</script>

<style >

</style>