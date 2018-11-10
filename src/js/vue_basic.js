import Vue from 'vue'
import App from './vue/hello.vue';

// Vue.component('todo-item',{
//     props: ['todo'],
//     template: '<li> content: {{ todo.text }} </li>'
// });

var app = new Vue({
    el: '#main',
    components: { App },
});

// var app = new Vue({
//     el: '#main',
//     components: { App },
//     data: {
//         content: 'data content',
//         seen: true
//     },
//     methods:{
//         btn_click: function(){
//             this.content = this.content.split('').reverse().join('')
//         }
//     }
// });

// var app = new Vue({
//     el: '#main',
//     data: {
//         todoList:[
//             {id: 0, text: 'Vegetables all content'},
//             {id: 1, text: 'Cheese reload'},
//             {id: 2, text: 'Whatever else humans are supposed to eat'}
//         ]
//     }
// });


