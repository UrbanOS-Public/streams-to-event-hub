export const mockTopic = 'mock_topic';
export const mockApiKey = '1234abcd';

process.env.SOURCE_STREAMS_URL = 'ws://localhost:1111';
process.env.EVENT_HUB_URL =
    'Endpoint=sb://dummynamespace.servicebus.windows.net';
process.env.STREAMS_TOPIC = mockTopic;
process.env.STREAMS_API_KEY = mockApiKey;
