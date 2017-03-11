let babylon = require('babylon')

function toString(src, node){
  return src.substring(node.start, node.end)
}

module.exports = function({ types }){
  return {
    visitor: {
      CallExpression: (path) => {
        let src = path.hub.file.code;
        let { callee } = path.node
        if(callee.type === 'MemberExpression' && toString(src, callee) === 'require.import'){
          let [nameNode, callback, chunkName] = path.node.arguments
          
          let replSrc = `(function(id, fn, done){
            __webpack_modules__[id] ? 
              done(undefined, __webpack_require__(id)) : 
              fn().then(M => done(undefined, M), done)
            }(require.resolveWeak('${nameNode.value}'), 
              () => require.ensure([], require => require('${nameNode.value}') 
              ${chunkName ? `, ${toString(src, chunkName)}` : ''}),
              ${toString(src, callback)}))`

          path.replaceWith(babylon.parse(replSrc, {
            plugins: [ '*' ]
          }).program.body[0].expression);
        }
      }
    }
  }
}