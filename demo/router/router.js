module.exports=(router)=>{

	router.get('path1',ctx=>{
		ctx.res.setHeader('Set-Cookie',['name=1','age=2'])
		ctx.body=`
			<html>
				<head><head>
				<body>
					<button id='btn1'>1</button>
					<button id='btn2'>2</button>
				</body>
				<script>
					const btn=document.getElementById('btn1');
					const getDate=()=>{
						const date=new Date().getTime()-1;
						return new Date(date).toGMTString();
					}
					btn.onclick=()=>{
						const date=new Date().getTime()-1;
						const expires=new Date(date).toGMTString();
						const cookies=document.cookie;
						arr=cookies.split(';').map(v=>v.trim().match(/^[^=]+/).toString());
						arr.forEach(v=>{
							document.cookie=v+'=1;expires='+expires
						})
					}
					const btn2=document.getElementById('btn2');

					btn2.onclick=()=>{
						const str='name=1;path=/path1;expires='+getDate();
						console.log(str);
						document.cookie=str;
					}
				</script>
			</html>

		`
	});
	router.get('path2',ctx=>ctx.body='path2');
	router.get('path3',ctx=>ctx.body='path3');
	

	return router;

}