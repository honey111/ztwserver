module.exports=(router)=>{
	router.get('path1',ctx=>ctx.body='path1');
	router.get('path2',ctx=>ctx.body='path2');
	router.get('path3',ctx=>ctx.body='path3');

	return router;

}