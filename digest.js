import vandium from 'vandium';

module.exports  = digest();

function digest(){

	/********************* DATA SPECS ******************************

	body: {

		  userId: [GUID]

		  day: {

		    date: [STRING],

		    events: [ARRAY OF EVENT OBJECTS]}

  	}

	event: {

	    time: `${hours}:${minutes}`,

	    category: [STRING],

	    contentFormat: [STRING],

	    displayType: [STRING],

	    cardId: [GUID],

	    action : [STRING],

	    additional: [OBJECT]

	}  		


	**************************************************************/


	var uuidSchema = function uuidSchema() {
	  return vandium.types.uuid();
	};

	var objectSchema = function objectSchema() {
	  return vandium.types.object();
	};	

	//TODO: should this be a timestamp or a date RegEx? string?
	var dateSchema = function dateSchema() {
	  return vandium.types.string().min(8).max(10);
	};	

	//TODO: should this be a timestamp or a time RegEx? string?
	var timeSchema = function timeSchema() {
	  return vandium.types.string().min(2).max(4);
	};		

	var categorySchema = function descriptionSchema() {
	  return vandium.types.string().min(4).max(200);
	};	

	var contentFormatSchema = function contentFormatSchema() {
	  return vandium.types.string().min(4).max(200);
	};	

	var displayTypeSchema = function displayTypeSchema() {
	  return vandium.types.string().min(4).max(200);
	};	

	var actionSchema = function actionSchema() {
	  return vandium.types.string().min(4).max(200);
	};	

	var eventSchema = function eventSchema() {
		return( (0, objectSchema)().keys({
			time: (0, timeSchema)().required(),
			category: (0, categorySchema)().required(),
	    	contentFormat: (0, contentFormatSchema)().required(),
	    	displayType: (0, displayTypeSchema)().required(),
	    	cardId: (0, uuidSchema)().required(),
	    	action : (0, actionSchema)().required(),
	    	additional: (0, objectSchema)().required() //TODO any specs here?
		}) );
	};

	var daySchema = function daySchema() {
	  return( (0, objectSchema)().keys({
	    	date: (0, dateSchema)().required(),
	    	events: vandium.types.array().items(
	    		(0, eventSchema)().required()
	    	).required()
	    }) ); 
	};	

	var digestValidationSchema = {
		  body: {

		    id: (0, uuidSchema)(), 
		    userId: (0, uuidSchema)().required(),
		    day: (0, daySchema)().required()

		  }
		};

	//TODO: What are the required keys?
	var digestRequiredKeys = ['userId','day'];
	var digestOptionalKeys = [];

	return(
	{
	  validationSchema: digestValidationSchema,
	  requiredKeys: digestRequiredKeys,
	  optionalKeys: digestOptionalKeys
	});

}
