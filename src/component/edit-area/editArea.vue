<template>
    <div class="item_container_target">
        <div class="mr_moudle_head">
            <div class="mr_head_part title">
                <span v-text="name"></span>
            </div>
            <div class="mr_head_part btn" @click="add" v-show="showAdd">
                <span>添加</span>
            </div>
            <div class="mr_head_part btn" @click="cancle" v-show="!showAdd">
                <span>取消</span>
            </div>
            <div class="clear"></div>
        </div>
        <div class="mr_empty_add" @click="add" v-show="showTips">
            <span v-text="tips"></span>
        </div>
        <slot name="editlist"></slot>
    </div>
</template>

<script>
    import clickoutside from '../directives/clickoutside';
     export default {
         directives: { clickoutside },
         props: {
            name: {
                type: String,
                required: true
            },
            tips: {
                type: String,
                required: true
            },
            showTips: {
                type: Boolean,
                default: false
            }
         },
         created: function () {
            
         },
         data: function () {
            return {
                showAdd: true
            }
         },
         methods: {
            add: function () {
                console.log('add');
                this.showAdd = false;
                this.$emit('addList', this);
            },
            cancle: function () {
                this.showAdd = true;
                this.$emit('cancle', this);
            }
         }
     }
</script>

<style lang="less">
    .item_container_target {
        margin: 0;
        padding: 0;
        .mr_moudle_head {
            width: 604px;
            margin: 0 auto;
            margin-bottom: 23px;
            .clear {
                clear: both;
            }
        }
        .mr_head_part {
            float: left;
        }
        .mr_head_part.title {
            width: 528px;
            span {
                padding: 6px 24px;
                margin: 0 13px;
                vertical-align: middle;
                display: inline-block;
                font-size: 18px;
                text-align: center;
                background-color: #eee;
                border-radius: 26px;  
            }
            &:before {
                content: '';
                width: 230px;
                height: 0;
                vertical-align: middle;
                display: inline-block;
                border-top: 1px solid #ededed;
            }
            &:after {
                content: '';
                width: 152px;
                height: 0;
                vertical-align: middle;
                display: inline-block;
                border-top: 1px solid #ededed;
            }
        }

        .mr_head_part.btn {
            float: right;
            margin-top: 3px;
            &:before {
                content: '';
                vertical-align: middle;
                display: inline-block;
                width: 15px;
                height: 15px;
                background: url(https://www.lgstatic.com/www/static/mycenter/modules/common/img/icons_mr_da12dfe.png) -5px -69px no-repeat;
                // background: url(../../common/img/icons_mr.png) -5px -69px no-repeat;
                margin-right: 6px;              
            }
            span {
                font-size: 16px;
                color: #00b88d;
                vertical-align: middle;
            }
        }
        .mr_empty_add {
            width: 604px;
            height: 98px;
            margin: 0 auto;
            margin-bottom: 20px;
            text-align: center;
            line-height: 98px;
            color: #555;
            font-size: 14px;
            border: 1px dashed #d7d7d7;
            background-color: #fcfcfc;
            cursor: pointer;
            &:before {
                content: '';
                vertical-align: middle;
                display: inline-block;
                width: 15px;
                height: 15px;
                background: url(https://www.lgstatic.com/www/static/mycenter/modules/common/img/icons_mr_da12dfe.png) -5px -69px no-repeat;
                // background: url(../../common/img/icons_mr.png) -5px -69px no-repeat;
                margin-right: 6px;
            }
        }
    }
</style>