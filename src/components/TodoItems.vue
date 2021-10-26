<template>
  <div :id="item.ids" :draggable="draggable" @dragstart="dragStart" @dragover.stop>
      <div class="flex">
            <div class="check_title">

                <div class="todo-checkbox" :class="{bgc:item.complete}" @click="$emit('isComplete',item.ids)">
                <div v-if="item.complete">
                    <img src="../icon-check.svg" alt="">
                </div>
                </div>
                
                <span v-if="item.complete" >
                    <strike><span class="title-gray">{{item.change}}</span></strike>
                </span>
                <span v-else>
                    <span class="title">{{item.change}}</span>
                </span> 
            
            </div>
            
            <img src="../icon-cross.svg" @click="$emit('todoItem', item.ids)" class="delete">  
        </div>
  </div>
</template>

<script>
export default {
    name:'TodoItems',
    props:{
        id:String,
        draggable:String,
        item:Object
    },  
    emits:['todoItem','isComplete']
    ,
    methods:{
        dragStart: e => {
            const target = e.target

            e.dataTransfer.setData('todo_id', target.id)

            setTimeout(()=>{
                target.style.display = 'none'
            },0)
        }
    }
}
</script>

<style>

</style>