export const summarizeStatsInterval = 20;

const defaultStreamsURL = 'ws://localhost:4000/socket/websocket';
export const getStreamsUrl = (): string =>
    process.env['SOURCE_STREAMS_URL'] ?? defaultStreamsURL;

export const getEventHubUrl = (): string => {
    if (!process.env['EVENT_HUB_URL']) {
        throw new Error('Missing EVENT_HUB_URL environment variable');
    } else return process.env['EVENT_HUB_URL'];
};

const shouldForwardAttribute = 'is_crashed';
export const shouldForward = (message: any): boolean =>
    message[shouldForwardAttribute] === true;

const topic = process.env['STREAMS_TOPIC'];
export const initial_topic_request = {
    topic: topic,
    event: 'phx_join',
    payload: {},
    ref: '1',
    api_key: process.env['STREAMS_API_KEY'] ?? null,
};
