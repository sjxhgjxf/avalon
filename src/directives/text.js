var Cache = require('../seed/cache')
var textCache = new Cache(256)
var rexpr = avalon.config.rexpr

avalon.directive('text', {
    parse: function (binding, num, vnode) {
        vnode.children = [{type: '#text', nodeValue: ''}]
        return 'vnode' + num + '.props["ms-text"] =' + avalon.parseExpr(binding) + ';\n'
    },
    diff: function (cur, pre) {
        var curValue = cur.props['ms-text']
        var preValue = pre.props['ms-text']
        cur.children = pre.children
        cur.skipContent = true
        if (curValue !== preValue) {
            cur.children[0].nodeValue = curValue
            var list = cur.change || (cur.change = [])
            avalon.Array.ensure(list, this.update)
        }
        return false
    },
    update: function (node, vnode) {
        var nodeValue = vnode.props['ms-text']
        if ('textContent' in node) {
            node.textContent = nodeValue + ''
        } else {
            node.innerText = nodeValue + ''
        }
    }
})