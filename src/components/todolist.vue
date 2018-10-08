<template>
    <div>
        <div class="container-fluid bg-color">
            <div class="row justify-content-center py-1">
                <div class="col-md-8">
                    <h2 class="text-center">Todo List 待辦事項</h2>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-md-10 py-2">
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" v-model="newinput" placeholder="請輸入待辦事項">
                        <div class="input-group-append">
                            <button class="btn btn-secondary" type="button" @click.prevent="addtotodolist()">新增</button>
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-6 text-center">
                            <button class="btn btn-secondary mr-3" @click="visibility ='all'">全部項目</button>
                            <button class="btn btn-secondary mr-3" @click="visibility = 'undo'">進行中</button>
                            <button class="btn btn-secondary" @click="visibility = 'completed'">已完成</button>
                        </div>
                    </div>
                    <ul class="list-group my-2 text-color-listitem">
                        <li class="list-group-item" v-for="(i,index) in filtertodo" :key="index">
                            <div class="d-flex" v-if="i.id !== cachetodo.id">
                                <div class="form-check">
                                    <input class="form-check-input position-static" type="checkbox" v-model="i.iscompleted" @click="updatecompleted(i)">
                                </div>
                                    <label :class="{'deleteline': i.iscompleted === true}" class="form-check-label">{{ i.content }}</label>
                                    <div class="ml-auto">
                                        <button class="btn btn-outline-secondary mr-2" @click.prevent="edittodo(i)">
                                            編輯
                                        </button>
                                        <button class="btn btn-outline-secondary" @click.prevent="deletetodo(i)">
                                            刪除
                                        </button>
                                    </div>
                            </div>
                            <div class="input-group" v-if="i.id === cachetodo.id">
                                <input type="text" class="form-control" placeholder="請輸入待辦事項" v-model="cachetodo.content">
                                <div class="input-group-append">
                                    <button class="btn btn-secondary" type="button" @click.prevent="savefromedit(i)">儲存</button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-10 text-center mt-2 text-white">
                        <p>點擊滑鼠右鍵可以添加標記唷，並選擇你要完成的待辦事項！</p> 
                    </div>
                </div>
            </div>
        </div>
        
        <maps></maps>
    </div>
</template>

<script>
    import maps from '@/components/maps.vue'
    import { db } from '../config/db.js';

    export default {
        data(){
            return{
                newinput:'',
                cachetodo:{
                    id:'',
                    content:'',
                    iscompleted:'',
                },
                visibility:'all',
                todo:[],
            }
        },
        computed:{
            filtertodo(){
                const vm = this;
                if( this.visibility === 'all'){
                    return vm.todo;
                }
                else if( this.visibility === 'undo'){
                    var undo =[];
                    vm.todo.forEach(function(item){
                        if(!item.iscompleted){
                            undo.push(item);
                        }
                    });
                    return undo;
                }
                else if( this.visibility === 'completed' ){
                    var completedtodo =[];
                    vm.todo.forEach(function(item){
                        if(item.iscompleted){
                            completedtodo.push(item);
                        }
                    });
                    return completedtodo;
                }
            }
        },
        firebase: {
                todo: db.ref('todo')
                },
        components:{
            maps,
        },
        methods:{
            addtotodolist(){
                const vm = this
                var inputvalue = vm.newinput;
                var timestamp = Math.floor(Date.now());
                console.log(inputvalue,timestamp);
                this.$firebaseRefs.todo.push({
                    id:timestamp,
                    content:inputvalue,
                    iscompleted:false,
                });
            },
            deletetodo(item){
                ///操控資料庫刪除請用remove
                this.$firebaseRefs.todo.child(item['.key']).remove();
                console.log("delete success");
            },
            edittodo(item){
                const vm = this;
                console.log(item);
                vm.cachetodo = item;
                vm.cachetodo.id = item.id;
                vm.cachetodo.content = item.content;
                vm.cachetodo.iscompleted = item.iscompleted;
            },
            savefromedit(item){
                const vm = this;
                vm.cachetodo.content = item.content;
                const copy = {
                    id:item.id,
                    content:item.content,
                    iscompleted:item.iscompleted,
                }
                // remove the .key attribute
                delete copy['.key'];
                this.$firebaseRefs.todo.child(item['.key']).set(copy);
                vm.cachetodo={};
                console.log('update content success',this.$firebaseRefs.todo.child(item['.key']))
            },
            updatecompleted(item){
                if( item.iscompleted === false ){
                    item.iscompleted = true;
                }
                else{
                    item.iscompleted = false;
                }
                const update = {
                    id:item.id,
                    content:item.content,
                    iscompleted:item.iscompleted,
                }
                delete update['.key'];
                this.$firebaseRefs.todo.child(item['.key']).set(update);
                console.log('update completed option success',this.$firebaseRefs.todo.child(item['.key']))
            },
        }
    }
</script>
