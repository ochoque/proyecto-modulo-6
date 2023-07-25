<template>
    <div>
        <h5>Fabricante</h5>
        <tabs>
            <template v-slot:lista>
                <search placeholder="Buscar Nombre Fabricante" @searchtext="searchFx($event)"></search>
                <table class="highlight responsive-table ">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Operaciones</th>
                            
                        </tr>
                    </thead>

                     <tbody>
                        <tr v-for="item in items">
                            <td>{{ item.id }}</td>
                            <td>{{ item.nombre }}</td>
                           
                            <td>
                                <router-link :to="'/fabricante/' + item.id"><i class="material-icons">create</i></router-link>

                                <i class="material-icons" style="color:red"
                                    @click="eliminarItem(item.id)">delete_forever</i>
                            </td>
                        </tr>
                    </tbody>
                 </table>

            </template>
            <template v-slot:nuevo>
                <div class="row card p-2" style="max-width: 650px;">
                    <h6>Formulario nuevo Fabricante</h6>
                    <form class="col s12" @submit.prevent="saveFabricante()">
                        <div class="row">
                            <div class="input-field col s12">
                                <input id="id" type="number" class="validate" v-model="payload.id">
                                <label for="id">Id Fabricante</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <input id="name" type="text" class="validate" v-model="payload.nombre">
                                <label for="name"> Nombre Fabricante</label>
                            </div>
                        </div>
                        
                        

                        <div class="row">
                            <div class="input-field col s12">
                                <button class="btn waves-effect waves-light" type="submit" name="action">Submit
                                    <i class="material-icons right">send</i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </template>
        </tabs>
        
    </div>
</template>
  
<script>

import Tabs from '@/components/Tabs.vue'
import Search from '@/components/Search.vue'

export default {
    name: 'Fabricante',
    data() {
        const api = process.env.VUE_APP_API;
        return {
            api,
            items: [],
            toSearch: "",
            payload: {
                id:null,
                nombre: null,
                
            }
        }
    },
    
    components: {
        Tabs,Search
    },
    mounted () {
        this.getItems();
    },
    methods:{
        getItems() {
            this.axios({
                method: 'get',
                url: this.api + '/fabricantes'+this.toSearch
            })
                .then((response) => {
                    this.items = response.data;
                    console.log(response);
                })
                .catch((error) => { console.log(error) })
                .finally(() => { });
            },
        saveFabricante() {
                this.axios({
                method: 'post',
                url: this.api + '/fabricante',
                data: this.payload
                })
            .then((response) => {
                this.payload = {
                id: 0,
                nombre: null,
                
            };
            setTimeout(function () {
                var elems = document.querySelectorAll('select');
                var select = M.FormSelect.init(elems);
            });
            this.getItems();
            console.log(response);
            });
        }, 
        eliminarItem(id) {
            if (confirm("Esta seguro de eliminar?")) {
                this.axios({
                    method: 'delete',
                    url: this.api + '/fabricantes/' + id
                })
                    .then((response) => {
                        this.getItems();
                        console.log(response);
                    });
            }
        },
        searchFx(event){
            if (event === "") {
                this.toSearch = '';
            } else {
                this.toSearch = '?q=' + event;
            }
            console.log(this.toSearch)
            this.getItems();
        }
    }, 
    created() {
        setTimeout(() => {
            var elems = document.querySelectorAll('select');
            var select = M.FormSelect.init(elems);
        });
    }
}
</script>

<style></style>