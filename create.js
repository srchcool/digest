import uuid from "uuid";
import { crud, models } from '@welbot/sdk';

//TODO: include this into '@welbot/sdk' as part of models
var digest = require('./digest');
models.digest = digest;
//END TODO

const { createBase, transferCallDataToDynamoRequestParameters } = crud.dynamoCreate;

const digestDefinition = models.digest;
const digestCreateParams = (baseParams, data, id) => {
  const params = transferCallDataToDynamoRequestParameters(baseParams, data, digestDefinition);
  params.TableName = 'digest';
  params.Item.id = id;

  console.log(params);
  return params;
};

// eslint-disable-next-line import/prefer-default-export
export const main = createBase(digestCreateParams, digestDefinition.validationSchema);