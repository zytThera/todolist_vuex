<template>
  <li>{{ todo.name }}--<button @click="delTodo(todo)">Del</button></li>
</template>

<script>
import {mapActions} from 'vuex'
//将要删除的整条数据todo对象传递过来，根据id删除数据
export default {
  props:{
    todo:Object,
    index:Number
  },
methods:{
...mapActions(['delTodo'])
}

}
</script>
