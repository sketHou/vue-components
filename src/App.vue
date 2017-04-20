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
				v-start-date="startDate"
				v-end-date="endDate"
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

		<h2>#SELECT-INPUT</h2>
		<select-input class="select-input"
				:input-val = "'chan'"
				:namekey = "'cont'"
				@select="selectInput"
				@fetch-data="fetchData"></select-input>
		<h2>#EDIT-AREA</h2>
		<edit-area :name="'工作经历'" :tips="'添加工作经历'">
			<div slot="editlist">
				<div v-for="data in workList" v-text="data"></div>
			</div>
		</edit-area>
		<h2>#COMPONENT COMMUNICATION</h2>
		<h3>##v-model</h3>
		<h2>dddd</h2>
		<binding :data="data" v-model="num"></binding>
	</div>
</template>

<script>

import datePicker from './component/date-picker/datePicker.vue'
import dateRange from './component/date-range/dateRange.vue'
import skillSlide from './component/skill-slide/skillSlide.vue'
import selectInput from './component/select-input/selectInput.vue'
import $ from 'jquery'

var directives = Object.assign(skillSlide.Directive(), datePicker.Directive(), dateRange.Directive());
// Object.assign()

export default {
	name: 'app',
	directives: directives,
	components: {
		datePicker: datePicker,
		dateRange: dateRange,
		skillSlide: skillSlide,
		selectInput: selectInput
	},
	data () {
		return {
			date: '2016.09',
			currentTime: '2017.3',
			selectrange: ['2016.7','2017.8'],
			startDate: '2016.11',
			endDate: '2017.01',
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
			// this.endDate = val;
		},
		deleteSkill: function (skillcom) {
			// console.log(skillcom);
		},
		selectInput: function (val) {
			// console.log(val);
		},
		fetchData: function (val, vm) {
			$.ajax({
				type: 'POST',
				async: false,
				url: 'https://suggest.lagou.com' + '/suggestion',
				dataType: "jsonp",
				jsonp: "suggestCompanyback",
				data : {
					input: val, //用户的原始输入
					type: 2, //1-职位，2-公司，3-学校，4-专业，5-期望职位
					num: 6 //最多希望获取多少suggestion。不能大于30
				}
			}).done(function(result){
				//json = result;
				//result的key由参数中的type决定：1-POSITION，2-COMPANY,3-COLLEGE,4-MAJOR,5-EXPECT_JOB。json的value是一个数组，数组的每个元素是一个对象，该对象有两个成员：cont和hotness，cont就是suggestion的内容，hotness表示热度
				if (result) {
					vm.setList(result.COMPANY);
				}
			});
		}
	}
}
</script>

<style lang="less">
	.select-input {
		margin: auto;
	}
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
