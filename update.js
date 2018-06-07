import { crud, models } from '@welbot/sdk';

//TODO: include this into '@welbot/sdk' as part of models
var digest = require('./digest');
models.digest = digest;
//END TODO

const { updateBase, getUpdateExpressionWithAttributeValues } = crud.dynamoUpdate;
const digestDefinition = models.digest;

const digestUpdateParams = (baseParams, data, id) => {
  const params = JSON.parse(JSON.stringify(baseParams));
  params.TableName = 'digest';
  params.Key = { id };

  const updateExpressionWithAttributeValues = getUpdateExpressionWithAttributeValues(
    params.UpdateExpression,
    data,
    digestDefinition,
  );
  console.log(updateExpressionWithAttributeValues.updateExpression);

  params.UpdateExpression = updateExpressionWithAttributeValues.updateExpression;
  Object.assign(
    params.ExpressionAttributeValues,
    updateExpressionWithAttributeValues.newExpressionAttributeValues,
  );

  return params;
};

// eslint-disable-next-line import/prefer-default-export
export const main = updateBase(digestUpdateParams, digestDefinition.validationSchema);
