<template>
    <div>
      <h5>Editar cliente {{ $route.params.id }}</h5>
      <form class="col s12" @submit.prevent="saveFabricante()">
        
        <div class="row">
          <div class="input-field col s12">
            <input id="nombre" type="text" class="validate" v-model="payload.nombre">
            <label for="nombre">Nombre Fabricante</label>
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
  <script>
  export default {
    name: 'FabricanteEdit',
    data() {
      return {
        api: process.env.VUE_APP_API,
        fabricantes:[],
      
        payload: {
          id:0,
          nombre:"",
          
        }
      }
    },
    methods: {
    saveFabricante() {
        this.axios({
                  method: 'patch',
                  url: this.api + '/fabricantes/'+this.$route.params.id,
                  data: this.payload
              })
                  .then((response) => {
                      this.fabricantes = response.data;
                      this.$router.push("/fabricantes");
                      
                  })
                  .catch((error) => { console.log(error) })
                  .finally(() => { });
      },
      getItem() {
            this.axios({
                method: 'get',
                url: this.api + '/fabricantes/'+this.$route.params.id
            })
                .then((response) => {
                    this.payload = response.data;
                    setTimeout(function () {
                        M.updateTextFields();
                    });
                    console.log(response);
                });
        },
    },
    mounted() {
        this.getItem()
    }
  }
  </script>