<template>
    <div class="mr_select_input" v-clickoutside="hideSelect">
        <input autocomplete="off" aria-required="true" aria-invalid="false" v-model="thisInput" @keyup="fetch()">
        <ul>
            <li v-for="item in list" v-text="item[namekey]" @click="select(item)"></li>
        </ul>
    </div>
</template>

<style lang="less">
    .mr_select_input {
        position: relative;
        padding: 0;
        width: 392px;
        height: 46px;
        // font-size: 14px;
        text-align: left;
        line-height: 24px;
        border: 0;
        background-color: #fff;
        input {
            width: 100%;
            height: 100%;
            padding: 0 17px;
            box-sizing: border-box;
            -webkit-appearance:none;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0); 
            border: 1px solid #ededed;
            outline: 0;
        }      
        ul {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            margin: 0;
            background: #fff;
            li {
                width: 100%;
                height: 32px;
                margin: 0;
                padding: 0 17px;
                box-sizing: border-box; 
                line-height: 32px;
                font-size: 14px;
                background: #efefef;
            }
            li:hover {
                background: #00b38a;
            }
        }
    }
</style>

<script>
    import clickoutside from '../directives/clickoutside';
     export default {
         directives: { clickoutside },
         props: {
             inputVal: {
                type: String,
                default: ''
             },
             namekey: {
                 type: String,
                 default: ''
             }
         },
         created: function () {
            this.thisInput = this.inputVal
         },
         data: function () {
             return {
                 list: [],
                 thisInput: '',
                 handle: null
             }
         },
         methods: {
            select: function (item) {
                this.$emit('select', item);
                this.list = [];
                this.thisInput = item[this.namekey]
            },
            fetch: function (event) {
                var _this = this;
                var val = this.thisInput;
                _this.list = [];
                clearTimeout(_this.handle);
                _this.handle = setTimeout(function () {
                    _this.$emit('fetch-data', val, _this);
                }, 200);
            },
            hideSelect: function () {
                this.list = [];
            },
            setList: function (list) {
                this.list = list;
            }
         }
     }
</script>
