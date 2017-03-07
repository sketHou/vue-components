export default {
    bind (el, binding, vnode, oldVnode) {
        console.log(el);
        el.documentHandler = function(e) {
            if (el.contains(e.target)) {
                return false;
            }
            if (binding.expression) {
                vnode.context[binding.expression]();
            }
        };
        document.addEventListener('click', el.documentHandler);
    },
    update () {

    },
    unbind (el) {
        document.removeEventListener('click', el.documentHandler);
    }
};