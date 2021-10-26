// Integration tests for making sure callbacks are called correctly.

//  Calling them "integration" because traditional class level unit tests would
//  just be testing the libraries themselves.

import { app } from './app';
import waitForExpect from 'wait-for-expect';
import { TestWsServerWrapper } from './test-utilities/TestWsServerWrapper';
import { SocketConnection } from './SocketConnection';
import { initial_topic_request } from './configuration';
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
            expect(localWsServer.receivedMsgs[0]).toMatchObject(
                initial_topic_request,
            );
        });
    });

    it('SocketConnection calls the msgCallback function upon receiving a message', async () => {
        localWsServer.sendMessage();
        await waitForExpect(() => {
            expect(mockMessageCallback).toHaveBeenCalled();
        });
    });
});
