export const apiGatewayEventForTest = () => ({
  path: '/digest',
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

export function basicdigestBody() {

  const event = {

    time: '12:13',

    category: ‘physical’,

    contentFormat: ‘static’,

    displayType:’greeting’,

    cardId: '31a9923b-9ee1-4e9e-a3d4-8f800fabce54',

    action : dismiss’ ,

    additional: {

      view: null

    }

  };

  const digest = {

      userId: 'a43a3de4-6a46-11e8-adc0-fa7ae01bbebc',

      day: {

        date: '7/6/2018',

        events: [event] }

  }


  return digest;
}
