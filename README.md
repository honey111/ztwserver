web framework for node.js


```js
const zserver=require('ztwserver');
const app=new zserver();

app.use(async(ctx,next)=>{
  ctx.body='hello world';
});

app.listen(3000);

```

### Installation

Before installing, download and install Node.js. Node.js 8.x or higher is required.
```shell
npm install ztwserver

```

### Middleware

example:
```js
const zsesrver=require('ztwserver');
const Router=require('ztwserver-router');
const app=new zserver();
const router=new Router();

router.get('ztw.html',ctx=>{
  ctx.body='...';
})

app.use(router.routes());
app.use(async(ctx,next)=>{
  ctx.body='404 NOT FOUND';
})

app.listen(3000);

```
