const pj={
	'html':'text/html;charset=utf8',
	'txt':'text/html'
}


module.exports=function(name,res){
	const extension=name.slice(name.indexOf('\.',-1)+1);
	res.setHeader('Content-Type',pj[extension]||'text/html');
}