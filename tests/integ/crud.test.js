import { utilities } from '@welbot/sdk';
import * as create from '../../create';
import * as get from '../../get';
import * as list from '../../list';
import * as update from '../../update';
import * as deleteStep from '../../delete';
import { apiGatewayEventForTest, contextForTest, basicStepBody } from '../test-shared';

const { isoStringRegex } = utilities;

let stepId;
const stepBody = basicStepBody();
const updatedStepBody = basicStepBody(true);
updatedStepBody.adminTitle = 'updated_test_step';
updatedStepBody.description = 'updated step is updated';


test('create step', async (done) => {
  console.log('create.');

  const event = apiGatewayEventForTest();
  event.httpMethod = 'POST';
  event.body = JSON.stringify(stepBody);

  const context = contextForTest();
  context.logGroupName = '/aws/lambda/step-service-dev-create';
  context.functionName = 'step-service-dev-create';

  const callback = (error, response) => {
    console.log(response);
    expect(response.statusCode).toEqual(200);
    expect(typeof response.body).toBe('string');
    const responseBody = JSON.parse(response.body);
    expect(typeof responseBody.id).toBe('string');
    expect(typeof responseBody.createdAt).toBe('string');
    stepId = responseBody.id;
    Object.keys(stepBody).forEach((key) => {
      console.log(`key is checking: ${key}`);
      expect(responseBody[key]).toBeTruthy();
      expect(responseBody[key]).toEqual(stepBody[key]);
    });
    done();
  };
  await create.main(event, context, callback);
});

test('get created step', async (done) => {
  console.log('get.');
  const event = apiGatewayEventForTest();
  event.pathParameters = { id: stepId };
  event.httpMethod = 'GET';
  const context = contextForTest();
  context.logGroupName = '/aws/lambda/step-service-dev-get';
  context.functionName = 'step-service-dev-get';

  const callback = (error, response) => {
    expect(response.statusCode).toEqual(200);
    expect(typeof response.body).toBe('string');
    const responseBody = JSON.parse(response.body);
    expect(JSON.parse(response.body).id).toBe(stepId);
    console.log('stepId checked.');
    Object.keys(stepBody).forEach((key) => {
      console.log(`key is checking: ${key}`);
      expect(responseBody[key]).toBeTruthy();
      console.log(` equal checking: ${key}, value: ${stepBody[key]}`);
      expect(responseBody[key]).toEqual(stepBody[key]);
    });
    done();
  };

  await get.main(event, context, callback);
});

test('list succeeds', async (done) => {
  console.log('list.');
  const event = apiGatewayEventForTest();
  event.httpMethod = 'GET';

  const context = contextForTest();
  context.logGroupName = '/aws/lambda/nudge-group-service-dev-list';
  context.functionName = 'nudge-group-service-dev-list';

  const callback = (error, response) => {
    expect(response.statusCode).toEqual(200);
    expect(typeof response.body).toBe('string');
    expect(typeof JSON.parse(response.body)[0].nudgeGroups).toBe('object');
    expect(JSON.parse(response.body)[0].createdAt).toEqual(expect.stringMatching(isoStringRegex));
    done();
  };

  await list.main(event, context, callback);
});

test('update step content', async (done) => {
  console.log('update.');
  const event = apiGatewayEventForTest();
  event.pathParameters = { id: stepId };
  event.httpMethod = 'PUT';
  event.body = JSON.stringify(updatedStepBody);

  event.pathParameters = { id: stepId };
  const context = contextForTest();
  context.logGroupName = '/aws/lambda/step-service-dev-update';
  context.functionName = 'step-service-dev-update';

  const callback = (error, response) => {
    console.log(response);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toBe('{"status":true}');
    done();
  };

  await update.main(event, context, callback);
});

test('get updated step', async (done) => {
  console.log('get.');
  const event = apiGatewayEventForTest();
  event.pathParameters = { id: stepId };
  event.httpMethod = 'GET';
  const context = contextForTest();
  context.logGroupName = '/aws/lambda/step-service-dev-get';
  context.functionName = 'step-service-dev-get';
  const callback = (error, response) => {
    expect(response.statusCode).toEqual(200);
    expect(typeof response.body).toBe('string');
    const responseBody = JSON.parse(response.body);
    expect(JSON.parse(response.body).id).toBe(stepId);
    Object.keys(updatedStepBody).forEach((key) => {
      console.log(`key is checking: ${key}`);
      expect(responseBody[key]).toBeTruthy();
      console.log(` equal checking: ${key}, value: ${stepBody[key]}`);
      expect(responseBody[key]).toEqual(updatedStepBody[key]);
    });
    done();
  };

  await get.main(event, context, callback);
});

test('delete step', async (done) => {
  console.log('delete.');
  const event = apiGatewayEventForTest();
  event.pathParameters = { id: stepId };
  event.httpMethod = 'DELETE';
  const context = contextForTest();
  context.logGroupName = '/aws/lambda/step-service-dev-delete';
  context.functionName = 'step-service-dev-delete';

  const callback = (error, response) => {
    expect(response.statusCode).toEqual(200);
    done();
  };

  await deleteStep.main(event, context, callback);
});

test('get fails on deleted step', async (done) => {
  console.log('get.');
  const event = apiGatewayEventForTest();
  event.pathParameters = { id: stepId };
  event.httpMethod = 'GET';
  const context = contextForTest();
  context.logGroupName = '/aws/lambda/step-service-dev-get';
  context.functionName = 'step-service-dev-get';

  const callback = (error, response) => {
    expect(response.statusCode).toEqual(500);
    expect(response.body).toBe('{"type":"Error","message":"Item not found."}');
    done();
  };

  await get.main(event, context, callback);
});
