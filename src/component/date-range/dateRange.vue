<template>
    <div class="mr_date_range">
        <date-picker class="mr_date_range_pick" 
                :value="startDate"
                @select = "selectStart"
                :current-time = "currentTime"
                :select-range = "selectStartRange"
                :range = "range"
        ></date-picker>
        <date-picker class="mr_date_range_pick"
                :value="endDate"
                :show-current = "true"
                :select-range = "selectEndRange"
                :current-time = "currentTime"
                @select = "selectEnd"
                :range = "range"
        ></date-picker>
    </div>
    
</template>

<style lang="less">
    .mr_date_range_pick{
        float: left;
    }
    .mr_date_range_pick:nth-child(1) {
        margin-right: 8px;
    }
</style>

<script>
    import datePicker from '../date-picker/datePicker.vue'
    export default {
        components: {
            datePicker: datePicker
        },
        props: {
            range: {
                type: Array,
                default: function () {
                    return ['1991.1', '2017.12']
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
            }
        },
        computed: {
            selectEndRange: function () {
                var _this = this;
                if (_this.startDate) {
                    return [_this.startDate, _this.currentTime]
                }
                return ['1991.01', _this.currentTime]                
            },
            selectStartRange: function () {
                var _this = this;
                if (_this.endDate == '至今') {
                    return ['1991.01', _this.currentTime]
                }
                if (_this.endDate) {
                    return ['1991.01', _this.endDate]
                }
                return ['1991.01', _this.currentTime]    
            }
        },
        methods: {
            selectStart: function (year, month, currentVal) {
                var _this = this;
                _this.$emit('select-start', year + '.' + (parseInt(month) < 10 ? '0' + month : month));
            },
            selectEnd: function (year, month, currentVal) {
                var _this = this;
                if (currentVal) {
                    _this.$emit('select-end', currentVal);
                    return;
                }
                _this.$emit('select-end', year + '.' + (parseInt(month) < 10 ? '0' + month : month));
            }
        }
    }
</script>