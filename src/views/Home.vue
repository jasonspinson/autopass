<template>
  <div class="home">
    <todolist></todolist>
  </div>
</template>

<script>
// @ is an alias to /src
import todolist from '@/components/todolist.vue'

export default {
  name: 'home',
  components:{
    todolist,
  }
}
</script>
