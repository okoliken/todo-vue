<template>
    <div class="container" :class="setMode ? 'dark' : 'light'">
        <div class="img-container">
           <img src="./bg-mobile-dark.jpg" alt="" class="mobile">
           <img src="./bg-desktop-dark.jpg" alt="" class="desktop">
        </div>
    <div class="flex_container">
       
        <div class="inner">
            <TodoHeader 
            :toggleMode="toggleMode"
            :setMode="setMode"
            />
            <TodoForm 
                @changed="update"
            />
            <TodoItemContainer  
             :deleteAllCompletedTodo="deleteAllCompletedTodo"
                @todoItem="DeleteHandler" 
                :title="title"
                @isComplete="IsCompleted"
                :allCompletedTODOs="allCompletedTODOs"
                :allActiveTodos="allActiveTodos"
                :allActive="allActive"
            >
             <small class="title"> {{title.length}} items left</small>
            </TodoItemContainer>    
        <TodoStatus 
                :title="title"
                :allCompletedTODOs="allCompletedTODOs"
                :allActiveTodos="allActiveTodos"
                :allActive="allActive"
            />
        </div>
        
    </div>
    </div>       
</template>

<script>

import TodoItemContainer from './components/TodoItemContainer.vue';
import TodoForm from './components/TodoForm.vue'

import TodoStatus from '@/components/TodoStatus.vue';

import TodoHeader from '@/components/TodoHeader.vue';



export default {
    components:{
        TodoItemContainer ,
        TodoForm,
        TodoStatus,
        TodoHeader
    },
   data() {
    return {
        title: [],
        setMode:false 
    }
    },
     watch:
    {
        setMode()
        {
            localStorage.setItem('nightmode', JSON.stringify(this.setMode))
        }
    },
    methods: {
        toggleMode () 
        {
            this.setMode = !this.setMode
        }
        ,
        getLocalStorageItem () 
        {
            let todo;

            if (localStorage.getItem('todo') === null) 
            {
                todo = []
            }else
            {
                todo = JSON.parse(localStorage.getItem('todo'))
            }
            return todo
        }
        ,
        getTodos()
        {
          let todo = this.getLocalStorageItem()
                this.title = [
                    ...todo
                ]
        },
        update (v) 
        {
            let ids = Math.floor( Math.random() * 1000) +1
            this.title = [...this.title ,{ids, ...v}]
            // CALL LOCALSTORAGE METHOD
            let todo = this.getLocalStorageItem()
      
            todo.push({ids, ...v})

            localStorage.setItem('todo', JSON.stringify(todo))
        },

        DeleteHandler (id)
        {
            this.title = this.title.filter(item => item.ids !== id )
             // CALL LOCALSTORAGE METHOD
            let todo = this.getLocalStorageItem()

                todo.forEach((item, index)=> {
                    if (item.ids === id) {
                        todo.splice(index,1)
                    }
                })

                localStorage.setItem('todo',JSON.stringify(todo))
        },

        deleteAllCompletedTodo()
        {
            let [one, two] = [this.title.filter(item => item.complete === true), this.title.filter(item => item.complete === false)]     

            one.splice(0)

            this.title = two

             // CALL LOCALSTORAGE METHOD
            let todo = this.getLocalStorageItem()
                todo.forEach((item,index) => {
                    if (item.complete === true) {
                        todo.splice(index, 100)
                    }
                })

                localStorage.setItem('todo',JSON.stringify(todo))
        },

        allCompletedTODOs () 
        {
           let result = this.title.filter(item =>   item.complete === true)
           if (result.length === 0) {
               return this.title
           }else{
               this.title = result
           }

        },

        allActiveTodos () 
        {
           let result = this.title.filter(item =>   item.complete === false)
           if (result.length === 0) {
               return this.title
           }else{
               this.title = result
           }
        },

        IsCompleted (id) 
        {
            let complete = this.title.map(item => item.ids === id ? {...item, complete:!item.complete} : item)
                this.title = complete
            // CALL LOCALSTORAGE METHOD
            let todo = this.getLocalStorageItem()
            
            todo.forEach(item => {
                if (item.ids === id) {
                    item.complete = !item.complete
                }
            })
            localStorage.setItem('todo',JSON.stringify(todo))
        },

        allActive ()
        {
            this.getTodos()
        }
    
    },

    created(){
        this.setMode = JSON.parse(localStorage.getItem('nightmode'))
       this.getTodos()
    }
}

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+Antique&display=swap');
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
body{
    overflow-x: hidden;
    background-color: var(--Very-Light-Gray);
    font-family: Zen Kaku Gothic Antique;
}
.light{
    --Very-Light-Gray:hsl(0, 0%, 98%);;
   /* --Very-Light-Gray2: hsl(0, 0%, 98%); */
--Very-Light-GrayishBlue: hsl(0, 0%, 95%);;
--Light-GrayishBlue: hsl(233, 11%, 84%);
--Dark-GrayishBlue: hsl(236, 9%, 61%);
--Very-DarkGrayishBlue: hsl(233, 11%, 84%);
--title-color:#333
}
:root{
   --Very-Light-Gray: hsl(235, 21%, 11%);
--Very-Light-GrayishBlue: hsl(235, 24%, 19%);
--Light-GrayishBlue:  hsl(234, 39%, 85%);
--Dark-GrayishBlue: hsl(236, 33%, 92%);
--Very-DarkGrayishBlue:  #37394e;
--purple:#77acf8;
--lightpurple:#9e76f0;
--title-color:#c5c7e0
}
.container{
position: relative;    
  background-color: var(--Very-Light-Gray);
  width: 100%;
  min-height:100vh;
  transition:background-color .3s ease;
}
.container .img-container img{
    object-fit: contain;
}
.flex_container{
    position: absolute;
    top: 12%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.inner{
    min-width:auto;
     padding:1.1rem;
     width: 100%;
}
.desktop{
    display: none;
}
.todo-form{
    padding: 4px;
    display: flex;
    border-radius:8px;
    /* box-shadow: 0px 12px 3px var(--Very-Light-GrayishBlue); */
    align-items: center;
    justify-content: center;
    background-color: var(--Very-Light-GrayishBlue);
   /* box-shadow: 0 4px 4px var(--Very-Light-GrayishBlue); */
   box-shadow: 11px 11px 18px 8px rgba(51,51,51,0.23);
-webkit-box-shadow: 11px 11px 18px 8px rgba(51,51,51,0.23);
-moz-box-shadow: 11px 11px 18px 8px rgba(51,51,51,0.23);
}
.todo-form .todo-checkbox{
    border: 1px solid var(--Very-DarkGrayishBlue);
    width:25px;
    border-radius:50%;
    height: 25px;
    transform:translateX(7px);
       display: flex;
    align-items: center;
    justify-content: center;
}
.desktop-status{
    display: none;
}
.flex{
    padding: 15px;
    border-bottom: 1px solid var(--Very-DarkGrayishBlue);
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: auto;
}

.todo_items .todo-checkbox{
    border: 1px solid var(--Very-DarkGrayishBlue);
    width:25px;
    border-radius:50%;
    height: 25px; 
    display: flex;
    align-items: center;
    justify-content: center;
}
.todo-form .todo-checkbox:hover, .todo_items .todo-checkbox:hover{
    cursor: pointer;
    border: 1px solid var(--purple);
}
.todo-form-input{
    box-sizing: border-box;
    padding:13px;
    width: 100%;
    background-color: var(--Very-Light-GrayishBlue);
    outline: none;
    appearance: none;
    border: none;
     font-size: 14px;
     color:  var(--title-color);
}
.todo_items{
    border-radius:5px;
    transform: translateY(36px);
    background-color:var(--Very-Light-GrayishBlue);
    /* box-shadow: 0 5px 2px var(--Very-Light-GrayishBlue); */
    box-shadow: 11px 11px 18px 8px rgba(51,51,51,0.23);
-webkit-box-shadow: 11px 11px 18px 8px rgba(51,51,51,0.23);
-moz-box-shadow: 11px 11px 18px 8px rgba(51,51,51,0.23);
}
.TodoStatus{
    transform: translateY(50px);
    background-color: var(--Very-Light-GrayishBlue);
    padding:15px;
    display: flex;
    align-items: center;
    justify-content: center;
    /* box-shadow: 0 3px 2px var(--Very-Light-GrayishBlue); */
    box-shadow: 11px 11px 18px 8px rgba(51,51,51,0.23);
-webkit-box-shadow: 11px 11px 18px 8px rgba(51,51,51,0.23);
-moz-box-shadow: 11px 11px 18px 8px rgba(51,51,51,0.23);
}
.TodoStatus span{
    margin-left:22px;
    font-size:13px;
    text-transform: capitalize;
    color: var(--Dark-GrayishBlue);
}
.bgc{
    background:  linear-gradient(to right, var(--purple) ,var(--lightpurple)) ;
    /* opacity: 0.1; */
}

@media (min-width:375px) {
    body{
        overflow-x: hidden;
    }

.inner{
    min-width:555px;
     padding:0.3rem;
     width: auto;
}
.mobile{
    display: none;
}
.desktop{
    display: block;
}
.todo-form{
    padding: 5px;
       border-radius:4px;
       /* box-shadow: 0 4px 4px var(--Very-Light-GrayishBlue); */
}
.todo-form .todo-checkbox{
    width:25px;
    height: 25px;
    margin-left:4px;

}
.todo_items{
     /* box-shadow: 0 5px 2px var(--Very-Light-GrayishBlue); */
}
.todo_items .todo-checkbox{
    width:25px;
    height: 25px; 
}
.todo-form-input{
    padding:19px;
    margin-left: 5px;
}
.TodoStatus{
    display: none;
}
.desktop-status{
    display: flex;
}
.flex:hover{
    cursor: pointer;
}
.flex:hover .delete{
    display: block;
     transition: display .1s ease;
}
.delete{
    width:18px;
    display: none;
   
}
}
</style>