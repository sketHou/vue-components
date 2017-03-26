<template>
    <ul>
        <li v-for="num in list">
            <span v-text="num" @click="choose(num)"></span>
        </li>
    </ul>
</template>

<script>
     export default {
         props: {
            data: {
                type: Object,
                require: false
            },
         },
         model: {
            prop: 'num',
            event: 'choosenum'
         },
         data: function () {
            return {
                list: [1, 2, 3, 4],
            }
         },
         methods: {
            choose: function (num) {
                this.data.val = num;
                console.log(this);
                this.$emit('choosenum', num)
            }
         }
     }
</script>

<style lang="less">
    
</style>