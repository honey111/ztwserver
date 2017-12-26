const pj={
	'html':'text/html;charset=utf8',
	'txt':'text/html',
	'css':'text/css',
	'jpg':'image/jpeg',
	'png':'image/png',
	'git':'image/gif',
	'jpeg':'image/jpeg',
	'ico':'image/x-icon',
	'js':'application/x-javascript'
}


module.exports=function(name,res){
	const extension=name.slice(name.indexOf('\.',-1)+1);
	res.setHeader('Content-Type',pj[extension]||'text/html');
}