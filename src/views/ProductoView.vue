<template>
    <div>
        <h5>PRODUCTO</h5>
        <tabs>
            <template v-slot:lista>
                <search placeholder="Buscar Producto" @searchtext="searchFx($event)"></search>
                  <filter-group>
                    <filter-item :fabricantes="fabricantes" label="Fabricante"
                        @onfilter="onFilterFx('fabricantesId', $event)"></filter-item>
                                <label><H6>PARA FILTRAR MAYORES A:</H6></label>
                                <input id="precioc" type="number" class="validate" v-model="precioc" :onchange="getItems()">
                                <label for="precioc">
                                  <h6>  Precio mayor que {{ precioc }}</h6>
                                </label>
                       
                </filter-group>
                  <table class="highlight responsive-table ">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Fabricante</th>
                            <th>Operaciones</th>
                        </tr>
                    </thead>

                     <tbody>
                        <tr v-for="item in items">
                            <!-- {{ getItem(item.fabricanteId) }} -->
                            <td>{{ item.id }}</td>
                            <td>{{ item.nombre }}</td>
                            <td>{{ item.precio }}</td>
                            <td>{{ item.fabricantes.nombre}} </td>

                           
                            <td>
                                <router-link :to="'/producto/' + item.id"><i class="material-icons">create</i></router-link>

                                <i class="material-icons" style="color:red"
                                    @click="eliminarItem(item.id)">delete_forever</i>
    
                            </td>
                        </tr>
                    </tbody>
                 </table>

            </template>
            <template v-slot:nuevo>
                <div class="row card p-2" style="max-width: 650px;">
                    <h6>Formulario nuevo producto</h6>
                    <form class="col s12" @submit.prevent="saveProducto()">
                        <div class="row">
                            <div class="input-field col s12">
                                <input id="id" type="number" class="validate" v-model="payload.id">
                                <label for="id">Id Prodcuto</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <input id="name" type="text" class="validate" v-model="payload.nombre">
                                <label for="name"> Nombre Producto</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <input id="precio" type="number" step="0.01" class="validate" v-model="payload.precio">
                                <label for="precio">Precio</label>
                            </div>
                        </div>
                       
                        
                        <div class="row">
                            <div class="input-field col s12">
                                <select v-model="payload.fabricantesId" >
                                    <option value="" disabled selected>Elija Fabricante</option>
                                    <option v-for="(value, key) in fabricantes" :key="key" :value="value.id">{{ value.nombre }}
                                    </option>
                                </select>
                                <label>Fabricante</label>
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
import FilterGroup from '@/components/FilterGroup.vue';
import FilterItem from '@/components/FilterItem.vue';

export default {
    name: 'Producto',
    data() {
        const api = process.env.VUE_APP_API;
        return {
            api,
            
            items: [],
            auxitems: [],
            precioc:0,
            fabricante: [],
            fabricantes: [],
            toSearch: "",
            toFilter:"",
            payload: {
                id:null,
                nombre: null,
                precio:null,
                fabricantesId:null,
                
            }
        }
    },
    
    components: {
        Tabs,Search,FilterGroup,FilterItem
    },
   
    methods:{
        getItems() {
            this.axios({
                method: 'get',
                url: this.api + '/productos?_expand=fabricantes' + this.toSearch + this.toFilter
            })
                .then((response) => {
                    this.auxitems=response.data;
                    console.log("get itmes");
                    setTimeout(function () {
                        var elems = document.querySelectorAll('select');
                        var select = M.FormSelect.init(elems);
                    });
                    this.filtrar(this.precioc)  
                    console.log(this.toSearch)
                    console.log(response);
                })
                .catch((error) => { console.log(error) })
                .finally(() => { });
            },
        
        saveProducto() {
                this.axios({
                method: 'post',
                url: this.api + '/productos',
                data: this.payload
                })
            .then((response) => {
                this.payload = {
                id: null,
                nombre: null,
                precio:0,
                fabricanteId:null,
               
            };
            this.getItems();
            console.log(response);
            });
        }, 
        eliminarItem(id) {
            if (confirm("Esta seguro de eliminar?")) {
                this.axios({
                    method: 'delete',
                    url: this.api + '/productos/' + id
                })
                    .then((response) => {
                        this.getItems();
                        console.log(response);
                    });
            }
        },
        
        getFabricantes() {
            this.axios({
                method: 'get',
                url: this.api + '/fabricantes'
            })
                .then((response) => {
                    console.log("-------------------")
                    this.fabricantes = response.data;
                    this.itemsf= response.data;
                    setTimeout(function () {
                        var elems = document.querySelectorAll('select');
                        var select = M.FormSelect.init(elems);
                    });
                    console.log(this.fabricantes);
                });
        },
        searchFx(event){
            if (event === "") {
                this.toSearch = '';
            } else {
                this.toSearch = '&q=' + event;
                console.log(this.toSearch)
            }
            this.getItems();
        },
        onFilterFx(field, event) {
            if (event === '') {
                this.toFilter = '';
            } else {
                console.log(field + " " + event)
                this.toFilter = '&' + field + '=' + event;
            }
            this.getItems();
        },
        filtrar(){
            console.log(this.precioc);
            this.items=[];
            for(var i in this.auxitems)
            {
                       if(this.auxitems[i].precio>this.precioc){
                             this.items.push(this.auxitems[i])
                        
                        
                       }
                    

            }
            
        }
        
        
    }, 
    mounted () {
        this.getItems();
        this.getFabricantes();
        //this.getItem();
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