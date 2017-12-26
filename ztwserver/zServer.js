const callCtx=require('./ctx/ctx.js');
const http=require('http');
class zServer{
	constructor(){
		this.routerArr=[];
	}
	use(cb){
		this.routerArr.push(cb);
	}
	configUse(){
		this.routerArr.reverse();
		let runFn=()=>{},ctx0;
		this.routerArr.forEach(v=>{
			const old=runFn;
			runFn=()=>{
			 	 v(ctx0,old);
			}
		})
		return (ctx)=>{
			ctx0=ctx;
			runFn();
		};
	}
	listen(port){
		const fn=this.configUse();
		const app=http.createServer(async(req,res)=>{
			const ctx=callCtx(req,res);
			fn(ctx);
		})
		app.listen(port);
	}
}
module.exports=zServer;