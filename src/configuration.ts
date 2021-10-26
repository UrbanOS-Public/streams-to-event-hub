export const summarizeStatsInterval = 20;

const defaultStreamsURL = 'ws://localhost:4000/socket/websocket';
export const getStreamsUrl = (): string =>
    process.env['SOURCE_STREAMS_URL'] ?? defaultStreamsURL;

export const getEventHubUrl = (): string => {
    if (!process.env['EVENT_HUB_URL']) {
        throw new Error('Missing EVENT_HUB_URL environment variable');
    } else return process.env['EVENT_HUB_URL'];
};

export const initial_topic_request = {
    topic: 'streaming:org__cve_data_oct21',
    event: 'phx_join',
    payload: {},
    ref: '1',
};
