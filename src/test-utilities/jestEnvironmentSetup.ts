console.log('Jest mock environment setup');
process.env.SOURCE_STREAMS_URL = 'ws://localhost:1111';
process.env.EVENT_HUB_URL =
    'Endpoint=sb://dummynamespace.servicebus.windows.net';
