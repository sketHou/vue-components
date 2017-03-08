<template>
    <div class="mr_skill_slide_bar" :class="{editable:isEdit}">
        <div class="skill_name" @click="showNameEdit" v-clickoutside="hideNameEdit">
            <div class="skill_name uneditable" v-text="skillName" v-show="!isEditName" ></div>
            <input type="text" class="skill_name editable" v-if="isEditName" v-model="skillName">
        </div>
        <div class="skill_bar">
            <em class="skill_line" :style="{width: skillPercent + '%'}"></em>
            <i class="mr_skill_circle" 
                    :style="{ left: skillPercent + '%'}"
                    @mousedown="onDragStart($event)">
                <em v-text="masterLevel"></em>
            </i>
        </div>

        <div class="close" @click="deleteThis"></div>
        <div class="clear"></div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {assignExpr} from '../util';
    import clickoutside from '../directives/clickoutside';

    const masterLevelList = ['了解', '熟悉', '掌握', '精通', '专家'];
    function getMasterLevel (num) {
        if (num <= 19) {
            return masterLevelList[0]
        }
        if (num <= 37) {
            return masterLevelList[1]
        }
        if (num <= 56) {
            return masterLevelList[2]
        }
        if (num <= 75) {
            return masterLevelList[3]
        }
        if (num <= 100) {
            return masterLevelList[4]
        }
    }

    export default {
        directives: { clickoutside },
        props: {
            id: {
                type: [Number, String],
                default: ''
            },
            isEdit: {
                type: Boolean,
                default: true
            }
        },
        data: function () {
            return {
                skillName: '输入技能名称',
                skillPercent: 0,
                masterLevel: '了解',
                isEditName: false,
                dragging: false,
                dragStartX: 0,
                startX: 0,
                lineWidth: 0,
                left: 0
            }
        },
        methods: {
            onDragStart: function (e) {
                e.preventDefault();
                if (!this.isEdit) {
                    return;
                }
                this.dragging = true;
                this.dragStartX = e.clientX;
                this.left = this.skillPercent;
                window.addEventListener('mousemove', this.onDragging);
                window.addEventListener('mouseup', this.onDragEnd);
            },
            onDragging: function (e) {
                e.preventDefault();
                if (!this.dragging) {
                    return
                }
                var width = this.$el.getElementsByClassName('skill_bar')[0].offsetWidth;
                var currentX = e.clientX;
                var diff = ((currentX - this.dragStartX) / width) * 100;
                var currentWidth = this.left + diff;
                if (currentWidth >= 100) {
                    this.skillPercent = 100;
                } else if (currentWidth < 0){
                    this.skillPercent = 0;
                } else {
                    this.skillPercent = currentWidth;
                }

            },
            onDragEnd: function (e) {
                e.preventDefault();
                this.dragging = false;
                window.removeEventListener('mousemove', this.onDragging);
                window.removeEventListener('mouseup', this.onDragEnd);
            },
            showNameEdit: function () {
                var _this = this;
                if (!_this.isEdit) {
                    _this.isEditName = false;
                    return;
                }

                _this.isEditName = true;
                if (_this.isEditName) {
                    Vue.nextTick(function () {
                        var input = _this.$el.getElementsByTagName('input')[0];
                        input.onfocus = function () {
                            this.select();
                        }
                        input.focus();
                    });
                }
                
            },
            hideNameEdit: function () {
                this.isEditName = false;
            },
            deleteThis: function () {
                this.$emit('del', this)
            }
        },
        watch: {
            skillName: function (val) {
                this.$emit('change-skill-name', val);
            },
            skillPercent: function (val) {
                this.masterLevel = getMasterLevel(val);
                this.$emit('change-skill-percent', val);
                this.$emit('change-skill-masterlevel', this.masterLevel);
            }
        },
        Directive: function () {
            return {
                skillName: {
                    bind: function (el, binding, vnode) {
                        vnode.child.skillName = binding.value;
                        vnode.child.$on('change-skill-name', function (val) {
                            assignExpr(binding.expression, vnode.context, val);                   
                        })
                    },
                    componentUpdated: function (el, binding, vnode) {
                        vnode.child.skillName = binding.value;
                    }
                },
                skillPercent: {
                    bind: function (el, binding, vnode) {
                        var width = el.getElementsByClassName('skill_bar')[0].offsetWidth || 540;
                        vnode.child.skillPercent = binding.value;
                        vnode.child.$on('change-skill-percent', function (val) {
                            assignExpr(binding.expression, vnode.context, Math.round(val));                   
                        })
                    },
                    componentUpdated: function (el, binding, vnode) {
                        var width = el.getElementsByClassName('skill_bar')[0].offsetWidth || 540;;
                        vnode.child.skillPercent = binding.value;
                    }
                },
                skillLevel: {
                    bind: function (el, binding, vnode) {
                        vnode.child.masterLevel = binding.value || '了解';
                        vnode.child.$on('change-skill-masterlevel', function (val) {
                            assignExpr(binding.expression, vnode.context, val);                   
                        })
                    },
                    componentUpdated: function (el, binding, vnode) {
                        vnode.child.masterLevel = binding.value;
                    }
                }
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
        .close {
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
            .skill_line {
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
            left: 0;
            top: 0;
            width: 20px;
            height: 19px;
            margin-left: -10px;
            margin-top: -5px;
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
            display: none;
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


