export default {
    bind (el, binding, vnode, oldVnode) {
        el.documentHandler = function(e) {
            if (contains(el, e.target)) {
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

function contains(root, el) {
    if (root.compareDocumentPosition)
        return root === el || !!(root.compareDocumentPosition(el) & 16);
        if (root.contains && el.nodeType === 1){
        return root.contains(el) && root !== el;
    }
    while ((el = el.parentNode))
        if (el === root) return true;
        return false;
}
