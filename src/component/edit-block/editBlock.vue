<template>
    <div class="mr_jobe_list clearfixs">
        <div class="show_area">
            <div class="edit_btn">编辑</div>
        </div>
        <div class="edit_area"></div>
    </div>
</template>

<script>
    export default {
        props: {

        },
        created: function () {
        
        },
        data: function () {

        },
        methods: {

        }
    }
</script>

<style lang="less">
    .mr_jobe_list .edit_btn {
        position: absolute;
        margin: 5px 0 2px;
        height: 34px;
        text-align: right;
        font-size: 16px;
        color: #00b38a;
        cursor: pointer;
        &:before {
            content: '';
            display:inline-block;
            width:12px;
            height:14px;
            background:url(../../common/img/icons_mr.png) -53px -6px no-repeat;
            margin-right:7px;
        }
    }
</style>