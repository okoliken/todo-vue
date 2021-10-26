<template>
 <div class="todo_items"
 >
     <transition-group name="list" tag="div">
        <TodoItems 
            v-for="item in title" 
            :item="item"  
            :key="item.ids" 
            @todoItem="$emit('todoItem', item.ids)"
            @isComplete="$emit('isComplete',item.ids)"
            />
    </transition-group>
     <div class="bottom-nav">
        <slot></slot>
        <div class="desktop-status">
            <span class="active" @click="allActive">all</span>
            <span @click="allActiveTodos">active</span>
            <span @click="allCompletedTODOs">completed</span>
        </div>
        <span class="clear-todos" style="text-transform: capitalize;" @click="deleteAllCompletedTodo">clear  completed</span>
     </div>
 </div>
</template> 

<script>
import TodoItems from '@/components/TodoItems';

export default {
  name:'TodoItemContainer',
  emits:['todoItem','isComplete'],
  props:{
      title:Array,
      deleteAllCompletedTodo:Function,
      allCompletedTODOs:Function,
      allActiveTodos:Function,
      allActive:Function
  },
  components:{
      TodoItems
  },methods:{
      drop: e=> {
          const todo_id = e.dataTransfer.getData('todo_id')

          const todo = document.getElementById(todo_id)

          todo.style.display = 'block'

          e.target.appendChild(todo)
      }
  }
}
</script>

<style>
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all .28s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}

.bottom-nav{
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.title{
    color: var(--title-color);
    font-weight: 500;
    margin-left: 14px;
    text-transform: capitalize;
}
.title-gray{
    color: #777a92;
    margin-left: 14px;
    text-transform: capitalize;
}
.clear-todos{
    cursor: pointer;
    font-size:13px;
    color: #777a92;
      text-transform: capitalize;
  transition: color .1s;
}
.clear-todos:hover{
       color: #c5c7e0;
}

strike{
    color: #777a92;
}
.check_title{
    display: flex;
    align-items: center;
}

.delete:hover{
    cursor: pointer;
}
.desktop-status{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.desktop-status span{
    margin-left:10px;
    color: #777a92;
    text-transform: capitalize ;
    font-size:13px;
    transition: color .1s;
}
.desktop-status span:hover{
    color: #c5c7e0;
    cursor: pointer;
}
.desktop-status span.active,.TodoStatus span.active{
    color: #5571ab;
}
</style>