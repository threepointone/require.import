require.import()
---

- add `require.import` to your list of babel plugins.
- when using on server side code, pass `{ server: true }` as an option

usage 
---


```jsx
require.import('./script.js', (err, Module) => {
  // do stuff with Module
}, /* optional chunk name */)
```


why not `import()`/`require.ensure()`?
---

tl;dr - fixes this [issue](https://github.com/webpack/webpack/issues/4199)


when using with ssr 
---

you need to make sure that you insert content into your html in the following order - 

- server side rendered html
- main bundle 
- chunks required for the given html (use predictable chunk names to make this easier)
- a snippet to start the whole app


