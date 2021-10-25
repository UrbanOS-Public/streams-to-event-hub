// Integration tests for making sure callbacks are called correctly.

//  Calling them "integration" because traditional class level unit tests would
//  just be testing the libraries themselves.

import { app } from './app';
import waitForExpect from 'wait-for-expect';
import { TestStreamsSocket } from './test-utilities/TestStreamsSocket';
import { SocketConnection } from './SocketConnection';
let mockStreams: TestStreamsSocket;

const mockEventHub = { sendToEventHub: jest.fn() };
jest.mock('./Logger', () => {
    return {
        Logger: {
            streams: jest.fn(),
            azure: jest.fn(),
            summarizeStats: jest.fn(),
        },
    };
});

let socketConnection: SocketConnection;
describe('The app', () => {
    beforeEach(() => {
        mockStreams = new TestStreamsSocket();
        socketConnection = new SocketConnection();
    });

    afterEach(async () => {
        mockStreams.close();
    });

    it('Sends the topic request upon streams connection', async () => {
        app(mockEventHub, socketConnection);
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
