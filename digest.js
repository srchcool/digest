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
		return( objectSchema().keys({
			time: timeSchema().required(),
			category: categorySchema().required(),
	    	contentFormat: contentFormatSchema().required(),
	    	displayType: displayTypeSchema().required(),
	    	cardId: uuidSchema().required(),
	    	action : actionSchema().required(),
	    	additional: objectSchema().required() //TODO any specs here?
		}) );
	};

	const daySchema = ()=> {
	  return( objectSchema().keys({
	    	date: dateSchema().required(),
	    	events: vandium.types.array().items(
	    		eventSchema().required()
	    	).required()
	    }) ); 
	};	

	const digestValidationSchema = {
		  body: {

		    id: uuidSchema(), 
		    userId: uuidSchema().required(),
		    day: daySchema().required()

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
