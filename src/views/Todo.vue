<template>
  <div>
    <input type="text" v-model="inputVal">
    <button @click="fn1">ADD</button>
    <ul>
      <TodoItem 
      v-for="(item,index) in todolist"
      :key="item.id"
      :todo="item"
      :index="index"
      ></TodoItem>
    </ul>
  </div>
</template>

<script>
import TodoItem from './TodoItem'
//引入vuex辅助函数
import {mapState,mapMutations,mapActions} from 'vuex'

export default {
  computed:{
    //使用 mapState 辅助函数帮助我们生成计算属性, mapState 的作用是把全局的 state 和 getters 映射到当前组件的 computed 计算属性中。以下代码相当于：
    // todolist() {
    //     return this.$store.state['todolist']
    // }
    ...mapState(['todolist']),
    //v-model在表单中的绑定有点特殊
    inputVal:{
      get(){
        return this.$store.state.inputVal
      },
      set(value){
        console.log(value);
        this.$store.commit('chgInputVal',value)
      }
    }
  },
  methods:{
      //使用 mapActions 辅助函数将组件的 methods 映射为 store.dispatch 调用,
      //以下代码即表示，在这个文件的methods选项和store的actions选项中均有fn1和initTodos方法，在actions中做异步操作
      ...mapActions(['initTodos','fn1'])
  },
  created(){
    //初始化界面，让数据库中的数据在首次打开页面时就渲染到页面
    this.initTodos()
  },
  components:{
    TodoItem
  }

}
</script>
