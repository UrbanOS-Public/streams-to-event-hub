// Integration tests for making sure callbacks are called correctly.

//  Calling them "integration" because traditional class level unit tests would
//  just be testing the libraries themselves.

import { app } from './app';
import waitForExpect from 'wait-for-expect';
import { TestStreamsSocket } from './test-utilities/TestStreamsSocket';
import mockedEnv, { RestoreFn } from 'mocked-env';

const mockStreamsURL = 'ws://localhost:1111';
const mockEventHubURL = 'mock-event-hub-url';
let restoreEnvMock: RestoreFn;
let mockStreams: TestStreamsSocket;

jest.mock('./Logger', () => {
    return {
        Logger: {
            streams: () => {},
            azure: () => {},
            summarizeStats: () => {},
        },
    };
});

describe('The app', () => {
    beforeEach(() => {
        restoreEnvMock = mockedEnv({
            EVENT_HUB_URL: mockEventHubURL,
            SOURCE_STREAMS_URL: mockStreamsURL,
        });
        mockStreams = new TestStreamsSocket();
    });

    afterEach(async () => {
        restoreEnvMock();
        mockStreams.close();
    });

    it.only('Sends the topic request upon streams connection', async () => {
        app();
        await waitForExpect(() => {
            expect(mockStreams.receivedMessagesCount()).toBe(1);
        });
    });
    it.todo(
        'SocketConnection calls the msgCallback function upon receiving a message',
    );
    it.todo('A message is sent to EventHub when received');

    it.todo('A connection is made to SOURCE_STREAMS_URL env variable');
    it.todo(
        'An event hub connection is established to the EVENT_HUB_URL env variable',
    );
});
