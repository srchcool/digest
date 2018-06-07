import vandium from 'vandium';

module.exports  = digest();

function digest(){

	/********************* DATA SPECS ******************************

	body: {

		  userId: [GUID]

		  day: {

		    date: [STRING],

		    events: [ARRAY OF EVENT OBJECTS]
		    }

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


	const uuidSchema = ()=>{
	  return vandium.types.uuid();
	};

	const objectSchema = ()=>{
	  return vandium.types.object();
	};	

	const dateSchema = ()=> {
	  return vandium.types.date();
	};	

	//TODO: should this be a timestamp or a time RegEx? string?
	const timeSchema = ()=> {
	  return vandium.types.string().min(4).max(5);
	};		

	const categorySchema = ()=> {
	  return vandium.types.string().min(4).max(200);
	};	

	const contentFormatSchema = ()=> {
	  return vandium.types.string().min(4).max(200);
	};	

	const displayTypeSchema = ()=> {
	  return vandium.types.string().min(4).max(200);
	};	

	const actionSchema = ()=> {
	  return vandium.types.string().min(4).max(200);
	};	

	const eventSchema = ()=> {
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

	const daySchema = ()=> {
	  return( (0, objectSchema)().keys({
	    	date: (0, dateSchema)().required(),
	    	events: vandium.types.array().items(
	    		(0, eventSchema)().required()
	    	).required()
	    }) ); 
	};	

	const digestValidationSchema = {
		  body: {

		    id: (0, uuidSchema)(), 
		    userId: (0, uuidSchema)().required(),
		    day: (0, daySchema)().required()

		  }
		};

	//TODO: What are the required keys?
	const digestRequiredKeys = ['userId','day'];
	const digestOptionalKeys = [];

	return(
	{
	  validationSchema: digestValidationSchema,
	  requiredKeys: digestRequiredKeys,
	  optionalKeys: digestOptionalKeys
	});

}
