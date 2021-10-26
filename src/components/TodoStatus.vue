<template>
  <div>
      <div class="TodoStatus ">
          <span class="active" v-on:click="allActive">all</span>
          <span v-on:click="allActiveTodos">active</span>
          <span v-on:click="allCompletedTODOs">completed</span>
      </div>
  </div>
</template>

<script>
export default {
    name:'TodoStatus',
    props: {
        allCompletedTODOs:Function,
        allActiveTodos:Function,
        allActive:Function,
        title:Array
    }
}
</script>

<style>

</style>