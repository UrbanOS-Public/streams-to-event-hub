export const mockTopic = 'mock_topic';

process.env.SOURCE_STREAMS_URL = 'ws://localhost:1111';
process.env.EVENT_HUB_URL =
    'Endpoint=sb://dummynamespace.servicebus.windows.net';
process.env.STREAMS_TOPIC = mockTopic;
