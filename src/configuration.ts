const default_streams_url = 'ws://localhost:4000/socket/websocket';

export const getStreamsUrl = (): string =>
    process.env['SOURCE_STREAMS_URL'] ?? default_streams_url;

export const initial_topic_request = {
    topic: 'streaming:org__cve_data_oct21',
    event: 'phx_join',
    payload: {},
    ref: '1',
};
