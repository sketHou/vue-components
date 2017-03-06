<template>
  <div id="app">
    <h1>SKET VUE COMPONENTS</h1>
    <h2>#DATEPICKER</h2>
    <date-picker class="datepicker" 
                 :value = "value" 
                 :current-time = "currentTime"
                 :select-range = "selectrange"
                 :show-current = "true" 
                 @select-year = "selectYear"
                 @select-month = "selectMonth"
                 @select = "select"
    ></date-picker>
    <p>
      <span>可选区域： </span><span v-text="selectrange[0] + ' -- ' + selectrange[1] "></span>
    </p>
    <p>
      <span>选择日期： </span><span v-text="value"></span>
    </p>
    <button class="button" @click = "changeSelect()">改变可选区域</button>
    <h2>#DATERANGE</h2>
    <date-range class="date-range" 
        :start-date="startDate"
        :end-date="endDate"
        @select-start="selectStart"
        @select-end="selectEnd">
    </date-range>
  </div>
</template>

<script>

import datePicker from './component/date-picker/datePicker.vue'
import dateRange from './component/date-range/dateRange.vue'

export default {
  name: 'app',
  components: {
    datePicker: datePicker,
    dateRange: dateRange
  },
  data () {
    return {
        value: '2016.09',
        currentTime: '2017.3',
        selectrange: ['2016.7','2017.8'],
        startDate: '2016.7',
        endDate: '2017.1'
    }
  },
  methods: {
    selectYear: function (year) {
      console.log(year);
    },
    selectMonth: function (month) {
      console.log(month);
    },
    select: function (year, month, currentVal) {
      if (currentVal) {
        this.value = currentVal;
        return;
      }
      this.value = year + '.' + (parseInt(month) < 10 ? '0' + month : month)
    },
    changeSelect: function () {
      this.selectrange = ['2015.7','2017.8'];
    },
    selectStart: function (val) {
      console.log(val);
      this.startDate = val;
    },
    selectEnd: function (val) {
      console.log(val);
      this.endDate = val;
    }
  }
}
</script>

<style lang="less">
h2 {
  margin-top: 40px;
  font-weight: bold;
}
.datepicker{
  margin: auto;
}
.date-range {
  width: 392px;
  margin: auto;
}
.button {
  margin: 10px auto;
  padding: 5px;
  border: 1px solid #777;
  border-radius: 5px;
  overflow: hidden;
  background: #fff;
  cursor: pointer;
}
.button:hover {
  background: #efefef;
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
