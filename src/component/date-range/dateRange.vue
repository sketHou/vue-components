<template>
    <div class="mr_date_range">
        <date-picker class="mr_date_range_pick" 
                v-date="thisStartDate"
                @select = "selectStart"
                :current-time = "currentTime"
                :select-range = "selectStartRange"
                :range = "range"
        ></date-picker>
        <date-picker class="mr_date_range_pick"
                v-date="thisEndDate"
                :show-current = "true"
                :select-range = "selectEndRange"
                :current-time = "currentTime"
                @select = "selectEnd"
                :range = "range"
        ></date-picker>
        <div class="clear"></div>
    </div>
    
</template>

<style lang="less">
    .clear{
        clear: both;
    }
    .mr_date_range_pick{
        float: left;
    }
    .mr_date_range_pick:nth-child(1) {
        margin-right: 8px;
    }
</style>

<script>
    import datePicker from '../date-picker/datePicker.vue';
    var directives = datePicker.Directive()
    export default {
        directives: directives,
        components: {
            datePicker: datePicker
        },
        props: {
            range: {
                type: Array,
                default: function () {
                    return ['1991', '2017']
                }
            },
            startDate: {
                type: String,
                default: ''
            },
            endDate: {
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
            }
        },
        data: function () {
            return {
                thisStartDate: this.endDate,
                thisEndDate: this.endDate
            }
        },
        computed: {
            selectEndRange: function () {
                var _this = this;
                if (_this.thisStartDate) {
                    return [_this.thisStartDate, _this.currentTime]
                }
                return ['1991.01', _this.currentTime]                
            },
            selectStartRange: function () {
                var _this = this;
                if (_this.thisEndDate == '至今') {
                    return ['1991.01', _this.currentTime]
                }
                if (_this.thisEndDate) {
                    return ['1991.01', _this.thisEndDate]
                }
                return ['1991.01', _this.currentTime]    
            }
        },
        methods: {
            selectStart: function (year, month, currentVal) {
                // var _this = this;
                // _this.$emit('select-start', year + '.' + (parseInt(month) < 10 ? '0' + month : month));
            },
            selectEnd: function (year, month, currentVal) {
                // var _this = this;
                // if (currentVal) {
                //     _this.$emit('select-end', currentVal);
                //     return;
                // }
                // _this.$emit('select-end', year + '.' + (parseInt(month) < 10 ? '0' + month : month));
            }
        }
    }
</script>