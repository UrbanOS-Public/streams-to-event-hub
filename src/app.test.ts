// Integration tests for making sure callbacks are called correctly.

//  Calling them "integration" because traditional class level unit tests would
//  just be testing the libraries themselves, and these instead check several
// class connections to be sure callback interactions are wired correctly.

import { app } from './app';
import waitForExpect from 'wait-for-expect';
import { TestWsServerWrapper } from './test-utilities/TestWsServerWrapper';
import { mockTopic } from './test-utilities/jestEnvironmentSetup';
import { SocketConnection } from './SocketConnection';
import { initial_topic_request } from './configuration';
let localWsServer: TestWsServerWrapper;

let mockSendToEventHub = jest.fn();

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
        mockSendToEventHub = jest.fn();
        const mockEventHub = { sendToEventHub: mockSendToEventHub };
        localWsServer = new TestWsServerWrapper();
        socketConnection = new SocketConnection();
        app(mockEventHub, socketConnection);
    });

    afterEach(async () => {
        localWsServer.close();
    });

    it('Sends the topic request to server upon streams connection', async () => {
        await waitForExpect(() => {
            expect(localWsServer.clientConnected()).toBeTruthy();
            expect(localWsServer.receivedMessagesCount()).toBe(1);
            expect(localWsServer.receivedMsgs[0]).toMatchObject({
                ...initial_topic_request,
                topic: mockTopic,
            });
        });
    });

    it('SocketConnection *DOES* call the msgCallback function if shouldForward is true', async () => {
        await waitForExpect(async () => {
            expect(localWsServer.clientConnected()).toBeTruthy();
            localWsServer.sendMessageToForward();
            expect(mockSendToEventHub).toHaveBeenCalled();
        });
    });

    it('SocketConnection does *NOT* call the msgCallback function if shouldForward is false', async () => {
        await waitForExpect(async () => {
            expect(localWsServer.clientConnected()).toBeTruthy();
            localWsServer.sendMessageNotToForward();
            expect(mockSendToEventHub).not.toHaveBeenCalled();
        });
    });
});
