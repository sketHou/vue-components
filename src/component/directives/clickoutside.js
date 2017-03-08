export default {
    bind (el, binding, vnode, oldVnode) {
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