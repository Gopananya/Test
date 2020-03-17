<template>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">File</div>
                    <div class="card-body">
                        <form>
                            <div class="custom-file">
                                <input type="file" class="custom-file-input" id="customFile" @change='chooseFile'>
                                <label class="custom-file-label" for="customFile">Choose file</label>
                            </div>
                            <div v-if="showTable">
                                <EditableTableComponent :keys='keys' :list="list" />
                            </div>
                        
                      </form>
                  </div>

              </div>
          </div>

      </div>
  </div>
</template>

<script>
import fileReader from '../helpers/fileReader.js';
import EditableTableComponent from './EditableTableComponent.vue';

export default {
    name: 'Home',
    data() {
        return {
            list: [],
            keys: [],
            showTable: false
        }
    },
    methods: {
        chooseFile: async function(event){
            this.list = await fileReader.read(event);
            this.keys = Object.keys(this.list[0]);
            this.showTable = true;
        }
    },
    components: {EditableTableComponent}
}
</script>

<style>

</style>