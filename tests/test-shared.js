export const apiGatewayEventForTest = () => ({
  path: '/step',
  resource: '/{proxy+}',
  queryStringParameters: {},

  requestContext: {
    apiId: 'id',
  },
  resourcePath: '/{proxy+}',
  apiId: 'xxxxxxxxxx',
});

export const contextForTest = () => ({
  awsRequestId: 'id',
  invokeid: 'id',
  logStreamName: '2015/09/22/[HEAD]13370a84ca4ed8b77c427af260',
  functionVersion: 'HEAD',
  isDefaultFunctionVersion: true,
  memoryLimitInMB: '1024',
  getRemainingTimeInMillis: () => 5997,
});

export function basicStepBody(withDescription = false) {
  const step = {
    adminTitle: 'test_step',
    nudgeGroups: ['bb452ed0-0dc2-11e8-9c7e-6b4ba5a8daa6'], // actual group id in db atm
  };
  if (withDescription) {
    step.description = 'testy test step full of nudge groups';
  }
  return step;
}
