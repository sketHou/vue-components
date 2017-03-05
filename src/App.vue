<template>
  <div id="app">
    <h1>SKET VUE COMPONENTS</h1>
    <h2>#DATEPICKER</h2>
    <date-picker class="datepicker" 
                 :value = "value" 
                 :current-time = "currentTime"
                 :select-range = "selectrange" 
                 @select-year = "selectYear"
                 @select-month = "selectMonth"
                 @select = "select"
    ></date-picker>
    <button class="button" @click = "changeSelect()">改变可选区域</button>
  </div>
  
</template>

<script>

import datePicker from './component/date-picker/datePicker.vue'
export default {
  name: 'app',
  components: {
    datePicker: datePicker
  },
  data () {
    return {
        value: '2016-9',
        currentTime: '2017-3',
        selectrange: ['2016-7','2017-8']
    }
  },
  methods: {
    selectYear: function (year) {
      console.log(year);
    },
    selectMonth: function (month) {
      console.log(month);
    },
    select: function (year, month) {
      console.log(year + '.' + month);
      this.value = year + '-' + month
    },
    changeSelect: function () {
      this.selectrange = ['2015-7','2017-8'];
    }
  }
}
</script>

<style lang="less">
.datepicker{
  margin: auto;
}
.button {
  
  margin: 10px auto;
  padding: 5px;
  border: 1px solid #333;
  border-radius: 5px;
  overflow: hidden;
  background: #fff;
  
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
