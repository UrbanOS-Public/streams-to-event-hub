// Integration tests for making sure callbacks are called correctly.

//  Calling them "integration" because traditional class level unit tests would
//  just be testing the libraries themselves.

import { app } from './app';
import waitForExpect from 'wait-for-expect';
import { TestWsServerWrapper } from './test-utilities/TestWsServerWrapper';
import { SocketConnection } from './SocketConnection';
let localWsServer: TestWsServerWrapper;

const mockMessageCallback = jest.fn();
const mockEventHub = { sendToEventHub: mockMessageCallback };
jest.mock('./Logger', () => {
    return {
        Logger: {
            streams: jest.fn(),
            streamsMsgReceived: jest.fn(),
            azure: jest.fn(),
            summarizeStats: jest.fn(),
        },
    };
});

let socketConnection: SocketConnection;
describe('The app', () => {
    beforeEach(() => {
        localWsServer = new TestWsServerWrapper();
        socketConnection = new SocketConnection();
        app(mockEventHub, socketConnection);
    });

    afterEach(async () => {
        localWsServer.close();
    });

    it('Sends the topic request to server upon streams connection', async () => {
        await waitForExpect(() => {
            expect(localWsServer.receivedMessagesCount()).toBe(1);
            // expect(localWsServer.receivedMsgs[0]).toBe('slekrj');
        });
    });

    it('SocketConnection calls the msgCallback function upon receiving a message', async () => {
        localWsServer.sendMessage();
        await waitForExpect(() => {
            expect(mockMessageCallback).toHaveBeenCalled();
        });
    });
    it.todo('A message is sent to EventHub when received');

    it.todo('A connection is made to SOURCE_STREAMS_URL env variable');
    it.todo(
        'An event hub connection is established to the EVENT_HUB_URL env variable',
    );
});
