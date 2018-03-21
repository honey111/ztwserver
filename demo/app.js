const Server=require('../ztwserver');
const Router=require('../ztwserver-router');
const Static=require('ztwserver-static');
const app=new Server();
const router=new Router();

const myRouter=require('./router/router.js')(router);

app.use(myRouter.routes());
app.use(Static('static','assets',{
	etag:true,
	gzip:true
}));
app.use(async(ctx,next)=>{
	ctx.body=`
		<html>
			<body>
				<h3>Router</h3>
				<ul>
					<li><a href='path1'>path1</a></li>
					<li><a href='path2'>path2</a></li>
					<li><a href='path3'>path3</a></li>
				</ul>

				<h3>static Html</h3>
				<ul>
					<li><a href='static/1.html'>1.html</a></li>
					<li><a href='static/2.html'>2.html</a></li>
					<li><a href='static/3.html'>3.html</a></li>
				</ul>
			</body>

		</html>


	`;
})

app.listen(3000)