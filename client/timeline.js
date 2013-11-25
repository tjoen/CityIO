window.timeline = {
	startDate: 1900,
	endDate: 2020,
	currentDate: 1900,
	delta: 0.35,
	objects: []
};

timeline.add = function(obj){

	if(+obj.userData.bouwjaar > timeline.startDate){
		//obj.position.setY( obj.userData.height3D );
		timeline.objects.push(obj);
	}
	
};

timeline.run = function(){

	if(!timeline.active) return false;

	//add
	timeline.currentDate += timeline.delta;
	var currentDate = Math.floor(timeline.currentDate);

	$('#year').text(currentDate);

	//run
	$.each(timeline.objects, function(key,obj){

		if(+obj.userData.bouwjaar < currentDate){
			obj.visible = true;
		} else {
			obj.visible = false;
		}

	});

	// timeline.active = false;

}