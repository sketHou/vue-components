<template>
    <div class="mr_date_picker">
        <div class="mr_date_picker_input" @click="showSelect">
            <span v-text="inputValue"></span>
        </div>
        <div class="mr_date_picker_select" v-if="isShowSelect">
            <ul class="mr_date_picker_year">
                <li v-if="showCurrent" @click="selectCurrent()" :class="{active: (value == '至今') && showCurrentActive}">至今</li>
                <li v-for="year in yearRange" :class="{active: isYearActive(year), disabled: !isValidYear(year)}" v-text="year" @click="selectYear(year, $event)"></li>
            </ul>
            <ul class="mr_date_picker_month">
                <li v-for="month in monthRange">
                    <span :class="{active: isMonthActive(month), disabled: !isValidMonth(month)}" v-text="month + '月'" @click="selectMonth(month, $event)"></span>
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="less">
    .mr_date_picker {
        position: relative;
        width: 190px;
        height: 46px;
        cursor: pointer;
        text-align: left;
        line-height: 46px;
        border: 1px solid #f1f3e9;
        background-color: #fff;
        border-radius: 3px;
        .mr_date_picker_input {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            span {
                padding-left: 17px;
            }
        }
        .mr_date_picker_input :before{
            content: '';
            position: absolute;
            right: 18px;
            top: 20px;
            display: block;
            height: 0;
            width: 0;
            font-size: 0;
            border: 6px solid #fff;
            border-color: #d3d3d3 transparent transparent;
        }
        .mr_date_picker_select {
            position: absolute;
            top: 49px;
            left: -1px;
            z-index: 10;
            height: 160px;
            width: 244px;
            background-color: #fff;
            border: 1px solid #e7e7e7;
            border-radius: 3px;
            box-shadow: 2px 2px 4px #e7e7e7;
        }
        .mr_date_picker_year {
            width: 90px;
            height: 160px;
            margin: 0;
            overflow: auto;
            float: left;
            li {
                width: 72px;
                height: 32px;
                float: left;
                margin: 0;
                color: #333;
                text-align: center;
                line-height: 32px;
                background-color: #fff;
                cursor: pointer;
            }
            li.active {
                background-color: #4ed6b7;
                color: #fff;
            }
            li.disabled {
                color: #c0c0c0;
            }
            li:hover:not(.active) {
                color: #c0c0c0;
            }
        }
        .mr_date_picker_month {
            margin: 0;
            float: left;
            width: 136px;
            padding: 20px 0 11px 15px;
            word-wrap: normal;
            background-color: #fff;
            li {
                width: 33%;
                height: 22px;
                margin: 0 0 10px;
                float: left;
                line-height: 22px;
                text-align: center;
                color: #333;
                cursor: pointer;
                background-color: #fff;
            }
            span {
                padding: 0 6px;
                font-size: 14px;
                border-radius: 3px;
            }
            span.disabled {
                color: #c0c0c0;
            }
            span.active {
                background-color: #4ed6b7;
                color: #fff;
            }
            span:hover:not(.disabled,acitve){
                background-color: #f4f4f4;
                color: #333;
            }
        }
    }
    

</style>

<script>
    export default {
        props: {
            value: {
                type: String,
                default: ''
            },
            currentTime: {
                type: String,
                default: function () {
                    var date = new Date();
                    var year = date.getFullYear();
                    var month = date.getMonth() + 1;
                    return year + '.' + month;
                }
            },
            range: {
                type: Array,
                default: function () {
                    return ['1991.01', '2017.12']
                }
            },
            selectRange: {
                type: Array,
                default: function () {
                    return ['1991-01', '2017-12']
                }
            },
            showCurrent: {
                type: Boolean,
                default: false
            }

        },
        data () {
            return {
                isShowSelect: false,
                showCurrentActive: true,
                year: '',
                month: ''
            }
        },
        mounted : function () {
            var _this = this;
            var props = _this.$props || _this;
                if( props.value ) {
                    var valueObj = getDate(props.value);
                    _this.year = valueObj.year;
                    _this.month = valueObj.month;
                }else{
                    _this.year = _this.currentYear;
                }
        },
        computed: {
            currentYear: function () {
                var _this = this;
                var props = _this.$props || _this;
                if( props.currentTime ) {
                    var valueObjCurrent = getDate(props.currentTime);
                    return valueObjCurrent.year;
                }
                return ''
            },
            currentMonth: function () {
                var _this = this;
                var props = _this.$props || _this;
                if( props.currentTime ) {
                    var valueObjCurrent = getDate(props.currentTime);
                    return valueObjCurrent.month;
                }
                return ''
            },
            inputValue: function () {
                var _this = this;
                var props = _this.$props || _this;
                if (props.value == '至今') {
                    _this.showCurrentActive = true;
                    return '至今';
                }
                if (!_this.month) {
                    return props.value.replace() || ''
                }
                var month = _this.month < 10 ? month = '0' + parseInt(_this.month) : _this.month + '';
                return _this.year + '.' + month;
            },
            yearRange: function () {
                var _this = this;
                console.log(this);
                var props = _this.$props || _this;
                var startDateObj = getDate(props.range[0]);
                var endDateObj = getDate(props.range[1]);
                return getArray(endDateObj.year, startDateObj.year);

            },
            monthRange: function () {
                var _this = this;
                var props = _this.$props || _this;
                var startDateObj = getDate(props.range[0]);
                var endDateObj = getDate(props.range[1]);
                return getArray(startDateObj.month, endDateObj.month);
            },
            selectRangeTime: function () {
                var _this =this;
                var props = _this.$props || _this;
                var selectStart = getTimeFromString(props.selectRange[0]);
                var selectEnd = getTimeFromString(props.selectRange[1]);
                var current = getTimeFromString(props.currentTime);
                selectEnd > current ? selectEnd = current : current;
                return [selectStart, selectEnd];
            },
            selectRangeYear: function () {
                var _this = this;
                var props = _this.$props || _this;
                var startYear = parseInt(props.selectRange[0].split('.'));
                var endYear = parseInt(props.selectRange[1].split('.'));
                return [startYear, endYear]
            }
        },
        methods: {
            isValidYear: function (val) {
                var _this = this;
                var _date = parseInt(val);
                if ( (_date < _this.selectRangeYear[0]) || (_date > _this.selectRangeYear[1]) ) {
                    return false
                }
                return true
            },
            isValidMonth: function (val) {
                var _this = this;
                var _date = getTimeFromString(_this.year + '.' + val);
                if ( (_date < _this.selectRangeTime[0]) || (_date > _this.selectRangeTime[1]) ) {
                    return false
                }
                return true
            },
            isYearActive: function (val) {
                var _this = this;
                console.log(_this.year);
                if (val == _this.year) {
                    return true
                }
                return false;
            },
            isMonthActive: function (val) {
                var _this = this;
                if (val == _this.month) {
                    return true
                }
                return false;
            },
            showSelect: function () {
                var _this = this;
                _this.isShowSelect = !_this.isShowSelect;

            },
            selectYear: function (val, event) {
                var _this = this;
                var className = event.target.className;
                if( className.indexOf('disabled') >= 0 ) { 
                    return;
                }
                _this.showCurrentActive = false;
                _this.year = val;
                _this.month = '';
                _this.inputValue = '';
                _this.$emit('select-year', _this.year);
            },
            selectMonth: function (val, event) {
                var _this = this;
                var className = event.target.className;
                if( className.indexOf('disabled') >= 0 ) { 
                    return;
                }
                _this.month = val;
                _this.isShowSelect = false;
                _this.$emit('select-month', _this.month);
                _this.$emit('select', _this.year, _this.month);
            },
            selectCurrent: function () {
                var _this = this;
                _this.isShowSelect = false;
                _this.showCurrentActive = true;
                _this.year = '';
                _this.month = '';
                _this.$emit('select-year', _this.currentYear);
                _this.$emit('select-month', _this.currentMonth);
                _this.$emit('select', _this.currentYear, _this.currentMonth, '至今');
            }
        }
    }

   /**
    * 
    * @param {Number} start 起始数字
    * @param {Number} end 结束数字
    * @return {Array} 从启始数字到结束数字的数组
    */
    function getArray(start, end) {
        var arr = [];
        var length = end - start;
        if(length < 0) {
            for (var i = start; i >= end; i--) {
                arr.push(parseInt(i));
            }
        } else {
            for (var i = start; i <= end; i++) {
                arr.push(parseInt(i));
            }
        }
        return arr;
    }

    /**
     * 改变日期格式方便以后使用
     * @param {String} 2017-01
     * @return {Object} { year: '2017', month: '01'}
     */
    function getDate (str) {
        var dateObj = {};
        var arr = str.split('.');
        dateObj.year = arr[0].replace(/\s/g, '');
        dateObj.month = arr[1].replace(/\s/g, '');
        if( parseInt(dateObj.month) < 10 ) {
            dateObj.month = '0' + dateObj.month;
        }
        return dateObj;
    }


    function getTimeFromString (val) {
        return (new Date(val.toString())).getTime();
    }



</script>


