const  fs=require('fs');
const switchHeader=require('./switchHeader.js');

module.exports=function(req,res){
	const ctx={};
	Object.defineProperty(ctx,'body',{
		get:()=>null,
		set:(value)=>{
			res.end(value);
		}
	})
	ctx.req=req;
	ctx.res=res;
	ctx.sendFile=(path)=>{
		switchHeader(path,res);
		fs.createReadStream(path).pipe(res);
	}
	return ctx;
}