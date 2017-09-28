import _ from 'lodash'
import $ from 'jquery'
export default {
    props: {
        list: {
            type: [Array, Object],
            default: []
        }
    },
    render: function (h, ctx) {
        var _this = this;
        var list = _this.list;

        function createElm(list) {
            var elems = [];
            _.forEach(list, function(item, k) {
                if (k == 'expanded') {
                    return;
                }
                if (isTraversal(item)) {
                    elems.push(
                        h('li', {
                            class: ['tree__main'],      
                            on: {
                                click: _this._click(item)
                            }
                        },[
                            h('p', {
                                class: ['tree__row'],
                            }, [ 
                                h('span', {
                                    domProps: {
                                        innerHTML: '- '
                                    },
                                    on: {
                                        click: _this._expand(item)
                                    } 
                                }),
                                h('span', {
                                    domProps: {
                                        innerHTML: k
                                    }
                                })
                            ]),
                            createElm(item)
                        ])
                    ); 
                } else {
                    elems.push(
                        h('li', {
                            on: {
                                click: _this._click(item)
                            },
                            class: ['tree__main']
                        }, [ h('p', {
                            class: ['tree__row']
                        }, [
                            h('span', {
                                domProps: {
                                    innerHTML: k + ': '
                                }
                            }),
                            h('span', {
                                domProps: {
                                    innerHTML: item
                                }
                            })
                        ]) ])
                    );
                }
            });
            
            return h('ul', {
                'class': {
                    'tree__trunk': true,
                    'expanded': true
                },               
                
                            
            }, elems);
        } 

        // 是对象或数组就可以遍历
        function isTraversal(data) {
            if (!data) {
                return false;
            };
            return typeof data == 'object';
        }

        return createElm(list);

    },
    data: function () {
        return {

        }
    },
    methods: {
        _click: function (data) {
            var _this = this;
            return function (event) {
                console.log(data);
                event.stopPropagation();
                _this.$emit('show', data)
            }
        },
        _expand: function (data) {
            return function (e) {
                e.stopPropagation();
                var $target = $(e.target);
                var $trunk = $target.parent().siblings('ul');
                if ( $trunk.hasClass('expanded') ) {
                    $target.html('+ ');
                    $trunk.removeClass('expanded');
                } else {
                    $target.html('- ');
                    $trunk.addClass('expanded');
                }
            }
        }
    },
    watch: {

    }
}



