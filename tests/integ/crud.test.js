import { utilities } from '@welbot/sdk';
import * as create from '../../create';
import * as get from '../../get';
import * as list from '../../list';
import * as update from '../../update';

import { apiGatewayEventForTest, contextForTest, basicdigestBody } from '../test-shared';

const { isoStringRegex } = utilities;

let digestId;
const digestBody = basicdigestBody();
const updateddigestBody = basicdigestBody(true);
updateddigestBody.adminTitle = 'updated_test_digest';
updateddigestBody.description = 'updated digest is updated';


test('create digest', async (done) => {
  console.log('create.');

  const event = apiGatewayEventForTest();
  event.httpMethod = 'POST';
  event.body = JSON.stringify(digestBody);

  const context = contextForTest();
  context.logGroupName = '/aws/lambda/digest-prod-create';
  context.functionName = 'digest-prod-create';

  const callback = (error, response) => {
    console.log(response);
    expect(response.statusCode).toEqual(200);
    expect(typeof response.body).toBe('string');
    const responseBody = JSON.parse(response.body);
    expect(typeof responseBody.id).toBe('string');
    expect(typeof responseBody.createdAt).toBe('string');
    digestId = responseBody.id;
    Object.keys(digestBody).forEach((key) => {
      console.log(`key is checking: ${key}`);
      expect(responseBody[key]).toBeTruthy();
      expect(responseBody[key]).toEqual(digestBody[key]);
    });
    done();
  };
  await create.main(event, context, callback);
});

test('get created digest', async (done) => {
  console.log('get.');
  const event = apiGatewayEventForTest();
  event.pathParameters = { id: digestId };
  event.httpMethod = 'GET';
  const context = contextForTest();
  context.logGroupName = '/aws/lambda/digest-prod-get';
  context.functionName = 'digest-prod-get';

  const callback = (error, response) => {
    expect(response.statusCode).toEqual(200);
    expect(typeof response.body).toBe('string');
    const responseBody = JSON.parse(response.body);
    expect(JSON.parse(response.body).id).toBe(digestId);
    console.log('digestId checked.');
    Object.keys(digestBody).forEach((key) => {
      console.log(`key is checking: ${key}`);
      expect(responseBody[key]).toBeTruthy();
      console.log(` equal checking: ${key}, value: ${digestBody[key]}`);
      expect(responseBody[key]).toEqual(digestBody[key]);
    });
    done();
  };

  await get.main(event, context, callback);
});

/*test('list succeeds', async (done) => {
  console.log('list.');
  const event = apiGatewayEventForTest();
  event.httpMethod = 'GET';

  const context = contextForTest();
  context.logGroupName = '/aws/lambda/nudge-group-service-prod-list';
  context.functionName = 'nudge-group-service-prod-list';

  const callback = (error, response) => {
    expect(response.statusCode).toEqual(200);
    expect(typeof response.body).toBe('string');
    expect(typeof JSON.parse(response.body)[0].userId).toBe('uuid');
    expect(typeof JSON.parse(response.body)[0].day).toBe('object');
    expect(typeof JSON.parse(response.body)[0].day.date).toBe('date');
    expect(typeof JSON.parse(response.body)[0].day.events).toBe('array');
    expect(typeof JSON.parse(response.body)[0].day.events[0].time).toBe('string');
    expect(typeof JSON.parse(response.body)[0].day.events[0].category).toBe('string');
    expect(typeof JSON.parse(response.body)[0].day.events[0].contentFormat).toBe('string');
    expect(typeof JSON.parse(response.body)[0].day.events[0].displayType).toBe('string');
    expect(typeof JSON.parse(response.body)[0].day.events[0].cardId).toBe('uuid');
    expect(typeof JSON.parse(response.body)[0].day.events[0].action).toBe('string');
    expect(typeof JSON.parse(response.body)[0].day.events[0].additional).toBe('object');
    done();
  };

  await list.main(event, context, callback);
});*/

test('update digest content', async (done) => {
  console.log('update.');
  const event = apiGatewayEventForTest();
  event.pathParameters = { id: digestId };
  event.httpMethod = 'PUT';
  event.body = JSON.stringify(updateddigestBody);

  event.pathParameters = { id: digestId };
  const context = contextForTest();
  context.logGroupName = '/aws/lambda/digest-prod-update';
  context.functionName = 'digest-prod-update';

  const callback = (error, response) => {
    console.log(response);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toBe('{"status":true}');
    done();
  };

  await update.main(event, context, callback);
});

test('get updated digest', async (done) => {
  console.log('get.');
  const event = apiGatewayEventForTest();
  event.pathParameters = { id: digestId };
  event.httpMethod = 'GET';
  const context = contextForTest();
  context.logGroupName = '/aws/lambda/digest-prod-get';
  context.functionName = 'digest-prod-get';
  const callback = (error, response) => {
    expect(response.statusCode).toEqual(200);
    expect(typeof response.body).toBe('string');
    const responseBody = JSON.parse(response.body);
    expect(JSON.parse(response.body).id).toBe(digestId);
    Object.keys(updateddigestBody).forEach((key) => {
      console.log(`key is checking: ${key}`);
      expect(responseBody[key]).toBeTruthy();
      console.log(` equal checking: ${key}, value: ${digestBody[key]}`);
      expect(responseBody[key]).toEqual(updateddigestBody[key]);
    });
    done();
  };

  await get.main(event, context, callback);
});


test('get fails on deleted digest', async (done) => {
  console.log('get.');
  const event = apiGatewayEventForTest();
  event.pathParameters = { id: digestId };
  event.httpMethod = 'GET';
  const context = contextForTest();
  context.logGroupName = '/aws/lambda/digest-prod-get';
  context.functionName = 'digest-prod-get';

  const callback = (error, response) => {
    expect(response.statusCode).toEqual(500);
    expect(response.body).toBe('{"type":"Error","message":"Item not found."}');
    done();
  };

  await get.main(event, context, callback);
});
