const pj={
	'html':'text/html;charset=utf8',
	'txt':'text/html',
	'css':'text/css;charset=utf-8',
	'jpg':'image/jpeg',
	'png':'image/png',
	'git':'image/gif',
	'jpeg':'image/jpeg',
	'ico':'image/x-icon',
	'js':'application/javascript;charset=utf-8',
	'woff':'application/font-woff',
	'svg':'text/xml'
}


module.exports=function(name,res){
	const extension=name.slice(name.indexOf('\.',-1)+1);
	res.setHeader('Content-Type',pj[extension]||'text/html');
}