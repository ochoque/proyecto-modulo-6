<template>
    <div>
        <h5>Editar Producto {{ $route.params.id }} </h5>
        <div class="row card p-2" style="max-width: 650px;">
            <h6>Formulario editar Producto</h6>
            <form class="col s12" @submit.prevent="saveProducto()">
                <div class="row">
                    <div class="input-field col s12">
                        <input id="name" type="text"  class="validate" v-model="payload.nombre">
                        <label for="name"> Nombre</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input id="precio" type="number" step="0.01" class="validate" v-model="payload.precio">
                        <label for="precio"> Precio</label>
                    </div>
                </div>
                 <div class="row">
                            <div class="input-field col s12">

                                <select v-model="payload.fabricantesId">
                                  <option value="" disabled selected>Elija Fabricante</option> 
                                   <option v-for="(value, key) in fabricantes" :key="key" :value="value.id">
                                    {{ value.nombre }}
                                    </option>
                                   
                                </select>
                                <label>Fabricante</label>
                                
                            </div>
                </div>
                 <div class="row">
                    <div class="input-field col s12">
                        <button class="btn waves-effect waves-light" type="submit" name="action">Enviar
                            <i class="material-icons right">send</i>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
  
<script>

export default {
    name: 'ProductoEdit',
    data() {
        const api = process.env.VUE_APP_API;
        return {
            api,
            fabricantes: [],
            fabricante:null,
            payload: {
                id:null,
                nombre: null,
                precio:null,
                fabricantesId:null,
            }
        }
    },
    methods: {

        getItem() {
            this.axios({
                method: 'get',
                url: this.api + '/productos/'+this.$route.params.id
            })
                .then((response) => {
                    this.payload = response.data;
                    setTimeout(function () {
                        M.updateTextFields();
                    });
                    console.log(response);
                });
        },
        saveProducto() {
            this.axios({
                method: 'patch',
                url: this.api + '/productos/'+this.$route.params.id,
                data: this.payload
            })
                .then((response) => {
                   this.$router.push('/productos');
                    console.log(response);
                });
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
        
        
    },
    mounted() {
        this.getItem();
        this.getFabricantes();
        //this.pedirFabricante();
        
    },
    components: {
        
    },
    created() {
        setTimeout(() => {
            var elems = document.querySelectorAll('select');
            var select = M.FormSelect.init(elems);
        });
    }
}
</script>

<style scoped lang="scss">
i {
    cursor: pointer;
    margin-right: 10px;

}
</style>