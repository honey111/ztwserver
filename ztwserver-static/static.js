const fs=require('fs');
const switchHeader=require('ztwserver-switchheader');

module.exports=(urlPath,nativePath)=>{
	urlPath='/'+urlPath+'/';
	nativePath=nativePath+'/';
	return async(ctx,next)=>{
		if(ctx.req.url.indexOf(urlPath)==0){
			const pathName=ctx.req.url.slice(urlPath.length);
			if(pathName){
				const result=await new Promise((resolve,reject)=>{
					const rs=fs.createReadStream(nativePath+pathName);
	
					rs.on('error',e=>resolve(false));
					switchHeader(pathName,ctx.res);
					rs.pipe(ctx.res);
				})
				if(!result)await next();
			}
		}else{
			await next();
		}
	}
}
