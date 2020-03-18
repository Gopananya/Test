<template>
    <div>
        <br>
        <button type='button' class="btn btn-success" @click="add">Add</button><br><br>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th v-for="key in keys">{{key}}</th>
              <th></th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in list" :key="index">
                <td><input type="text" v-model='item.country' :name="'list['+index+'][country]'"></td>
                <td><input type="text" v-model='item.capital' :name="'list['+index+'][capital]'"></td>
              <td></td>
              <td><button class="btn btn-danger" type="button" @click="remove" :data-id="index">Remove</button></td>
            </tr>
          </tbody>
        </table>
        <div class="row">
            <div class="col-md-2">
                <select class="form-control form-control-sm" v-model="selected" name="type">
                    <option v-for="type in types"  :value="type">{{type}}</option>
                </select>
            </div>
            <div class="col-md-2">
                <button type="submit" class="btn btn-success" >Submit</button>
            </div>
        </div>
    </div>
</template>

<script>
    import fileService from '../services/fileService.js';

    export default {
        name: 'EditableTableComponent',
        props: ['keys','list'],
        data() {
            return {
                types: ['csv', 'json', 'xml'],
                selected: 'csv'
            }
        },
        methods: {
            submit: function(){
                // console.log(this.list);
                // console.log(this.selected);
                const data = {
                    list:this.list,
                    selected: this.selected
                }
                fileService.saveChanges(data);
            },
            add: function() {
                this.list.push({country: '',capital:''})
            },
            remove: function() {
                this.list.splice(event.target.getAttribute('data-id'),1);
            }
        }
    }
</script>

<style>
    table td {
      position: relative;
    }

    table td input {
      position: absolute;
      display: block;
      top:0;
      left:0;
      margin: 0;
      height: 100%;
      width: 100%;
      border: none;
      padding: 10px;
      box-sizing: border-box;
    }
</style>