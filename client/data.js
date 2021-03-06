window.data = {};

data.init = function(){

	//get the data
	console.time("downloading data");
	Meteor.call('getData', function(error, data){

		console.timeEnd("downloading data");

		//error
		if(error){
			console.log('ERROR fetching data');
			return false;
		}

		//change copy/preloader
		Session.set("loaderCopy", 'Loading...');

		var buildings = new Buildings(DDD.scene);
		buildings.source(data.buildings);
		buildings.addTo(DDD.group);

		var streets = new Streets(DDD.scene);
		streets.source(data.streets);
		// streets.source(data.streets);
		streets.addTo(DDD.group);

		var surfaces = new Surfaces(DDD.scene);
		surfaces.source('water', data.water);
		surfaces.source('floor', data.region);
		surfaces.addTo(DDD.group);

		//preloader
		DDD.preloader.load([buildings, surfaces, streets]);
		DDD.preloader.start();	

		//timeline
		DDD.timeline.add([ surfaces, streets ]);

		data = null;

	});

	
};