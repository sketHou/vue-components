<template>
	<div id="app">
		<h1>SKET VUE COMPONENTS</h1>

		<h2>#DATEPICKER</h2>
		<date-picker class="datepicker" 
				v-date = "date" 
				:current-time = "currentTime"
				:select-range = "selectrange"
				:show-current = "true" 
				@select-year = "selectYear"
				@select-month = "selectMonth"
				@select = "select"
				:range = "['1995', '2017']"
		></date-picker>
		<p>
			<span>可选区域： </span><span v-text="selectrange[0] + ' -- ' + selectrange[1] "></span>
		</p>
		<p>
			<span>选择日期： </span><span v-text="date"></span>
		</p>
		<button class="button" @click = "changeSelect()">改变可选区域</button>

		<h2>#DATERANGE</h2>
		<date-range class="date-range" 
				:start-date="startDate"
				:end-date="endDate"
				@select-start="selectStart"
				@select-end="selectEnd"
				:range = "['1994.1', '2017.12']">
		</date-range>

		<h2>#SKILL-SLIDER</h2>
		<skill-slide class="skill_slider" 
				v-skill-name="skill.skillName" 
				v-skill-percent="skill.percent" 
				v-skill-level="skill.masterLevel"
				@del="deleteSkill"
		></skill-slide>
		<p>
			<span>技能名称： </span><span v-text="skill.skillName"></span>
		</p>
		<p>
			<span>掌握程度： </span><span v-text="skill.masterLevel + ' (' + skill.percent + '%)'"></span>
		</p>

	</div>
</template>

<script>

import datePicker from './component/date-picker/datePicker.vue'
import dateRange from './component/date-range/dateRange.vue'
import skillSlide from './component/skill-slide/skillSlide.vue'

var directives = Object.assign(skillSlide.Directive(), datePicker.Directive());
// Object.assign()

export default {
	name: 'app',
	directives: directives,
	components: {
		datePicker: datePicker,
		dateRange: dateRange,
		skillSlide: skillSlide
	},
	data () {
		return {
			date: '2016.09',
			currentTime: '2017.3',
			selectrange: ['2016.7','2017.8'],
			startDate: '',
			endDate: '',
			skill: {
				skillName: 'html',
				percent: 22,
				masterLevel: '熟悉'
			}
		}
	},
	watch: {
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
				this.date = currentVal;
				return;
			};
			if (parseInt(month) < 10) {
				month = '0' + parseInt(month);
			};
			this.date = year + '.' + month;
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
		},
		deleteSkill: function (skillcom) {
			console.log(skillcom);
		}
	}
}
</script>

<style lang="less">
	.skill_slider {
	margin: auto;
	width: 569px;
	}
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
