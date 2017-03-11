module.exports = function ensure(moduleId, fn, done){
  if(__webpack_modules__[moduleId]) {       //eslint-disable-line no-undef
    return done(undefined, __webpack_require__(moduleId))        //eslint-disable-line no-undef
  } 
  fn().then(Module => done(undefined, Module), done)
}
