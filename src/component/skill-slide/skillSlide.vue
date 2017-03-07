<template>
    <div class="mr_skill_slide_bar" :class="{editable:isEdit}">
        <div class="skill_name" @click="showNameEdit" v-clickoutside="hideNameEdit">
            <div class="skill_name uneditable" v-text="thisSkillName" v-show="!isEditName" ></div>
            <input type="text" class="skill_name editable" v-if="isEditName" v-model="thisSkillName">
        </div>
        <div class="skill_bar">
            <em></em>
        </div>
        <i class="mr_skill_circle">
            <em v-text="thisMasterLevel"></em>
        </i>
        <div class="close"></div>
        <div class="clear"></div>
    </div>
</template>

<script>
import Vue from 'vue'
    import clickoutside from '../directives/clickoutside';
    export default {
        directives: { clickoutside },
        props: {
            id: {
                type: [Number, String],
                default: ''
            },
            skillName: {
                type: String,
                default: '输入技能名称'
            },
            masterLevel: {
                type: String,
                default: '了解'
            },
            skillPercent: {
                type: Number,
                default: 0
            },
            isEdit: {
                type: Boolean,
                default: true
            }
        },
        data: function () {
            return {
                thisSkillName: this.skillName,
                thisMasterLevel: this.masterLevel,
                isEditName: false
            }
        },
        methods: {
            showNameEdit: function () {
                var _this = this;
                if (!_this.isEdit) {
                    _this.isEditName = false;
                }

                _this.isEditName = true;
                if (_this.isEditName) {
                    Vue.nextTick(function () {
                    var input = _this.$el.getElementsByTagName('input')[0];
                    input.onfocus = function () {
                        this.select();
                    }
                    input.focus();
                })
                }
                
            },
            hideNameEdit: function () {
                this.isEditName = false;
            }
        }  
    }

</script>


<style lang="less">
    .clear {
        clear: both;
    }
    .mr_skill_slide_bar * {
        margin: 0;
        padding: 0;
    }
    .mr_skill_slide_bar.editable {
        .mr_skill_circle {
            display: block;
        }
    }
    .mr_skill_slide_bar {
        position: relative;
        padding-left: 10px;
        margin-bottom: 18px;
        .skill_name {
            width: 102px;
            height: 24px;
            float: left;
            text-align: right;
            margin-right: 13px;
            line-height: 24px;
            word-wrap: break-word;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 14px;
        }
        input.skill_name {
            width: 90px; 
            height: 22px; 
            font-size: 14px; 
            border: 1px solid rgb(0, 184, 141); 
            outline: none; 
            padding: 0px 5px; 
            line-height: 22px; 
            color: rgb(0, 0, 0);
        }
        .skill_bar {
            position: relative;
            width: 420px;
            height: 8px;
            float: left;
            border-radius: 4px;
            background-color: #eee;
            margin-right: 21px;
            margin-top: 8px;
            overflow: hidden;
            em {
                position: absolute;
                left: 0;
                top: 0;
                display: block;
                height: 8px;
                background-color: #00b88d;
                border-radius: 4px;
                overflow: hidden;
            }
        }
        .mr_skill_circle {
            display: none;
            position: absolute;
            left: 122px;
            top: 3px;
            width: 20px;
            height: 19px;
            background: url(https://www.lgstatic.com/www/static/mycenter/modules/common/img/skill_circle_752598c.png) no-repeat center top;
            // background:url(../../common/img/skill_circle.png) no-repeat center top;
            cursor: pointer;
            em {
                position: absolute;
                right: -4px;
                top: -22px;
                display: block;
                width: 29px;
                height: 23px;
                padding: 0;
                line-height: 17px;
                text-align: center;
                font-size: 10px;
                color: #fff;
                background: url(https://www.lgstatic.com/www/static/mycenter/modules/common/img/skill_img_f5a4aab.png) center top no-repeat;
                // background:url(../../common/img/skill_img.png) center top no-repeat;
            }
        }
        .close {
            width: 13px;
            height: 13px;
            margin-top: 5.5px;
            float: left;
            background: url(https://www.lgstatic.com/www/static/mycenter/modules/common/img/skill_delete_b0062d9.png) center top no-repeat;
            // background:url(../../common/img/skill_delete.png) center top no-repeat;
            cursor: pointer;
        }
        input::selection {
            background: #00b88d; 
            color: #fff;
        }

        input::-moz-selection {
            background: #00b88d; 
            color: #fff;
        }

        input::-webkit-selection {
            background: #00b88d; 
            color: #fff;
        }
    }
    
</style>


