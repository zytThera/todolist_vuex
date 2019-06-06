//引入vue和vuex，并且使用
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//store中的state，相当于vue实例中的data选项
const state = {
  inputVal: '',
  todolist: []
}


const mutations = {
  chgInputVal(state, payload) {
    state.inputVal = payload
  },
  initTodo(state, payload) {
    state.todolist = payload
  },
  addTodo(state,todo){
    // let todo={
    //   name:state.inputVal
    // }
    state.todolist.push(todo.name)
  },
  delTodo(state,payload){
    let index=state.todolist.findIndex(item=>item.id===payload)
    state.todolist.splice(index,1)
  }
}

const actions = {
//初始化页面；需要发fetch请求，是异步操作，所以需要在action中写此函数；
//fetch请求的数据，是由json-server --watch db.json进行监听后给出的。
//initTodos({commit}) 参数是解构函数，可以在函数里直接使用commit提交，commit的第一个参数，是指要提交的改数据的方法。
  initTodos({commit}) {
    fetch('http://localhost:3000/todolist')
      .then(response => response.json())
      .then(res => {
        console.log(res)
        commit('initTodo', res)
      })
  },

  //添加数据到数据库的方法，需要发送fetch请求，参数解构{}
  fn1({state,commit}){
    fetch('http://localhost:3000/todolist',{
      method:'post',
      body:JSON.stringify({name:state.inputVal}),
      headers:{
        'Content-Type':'application/json'
      }
    })
    .then(response=>response.json())
    .then(res=>{
      console.log(res)
      commit({type:'addTodo'},res)
    })
  },
  
  //删除事件
  delTodo({state,commit},todo){
    //先把现在仓库的数据储存起来，如果删除失败，可以把元数据返回给用户
    let newTodos=[...state.todolist];
    //根据id先将仓库中的todo删除
    console.log(todo)
    commit('delTodo',todo.id)
    //删除数据库中的数据
    setTimeout(()=>{
      fetch(`http://localhost:3000/todolist/${todo.id}`,{
        method:'delete'
      }).then(response=>response.json())
      .then(res=>{
        console.log(res);
      })
      .catch(error=>{
        commit('initTodo',newTodos)
      })
    },2000)
  }

}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
