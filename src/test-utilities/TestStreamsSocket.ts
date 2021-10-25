import { WebSocketServer } from 'ws';

const testPort = 1111;

export class TestStreamsSocket {
    private server: WebSocketServer;
    private connectionMade = false;
    private receivedMsgs = [] as any[];

    constructor() {
        this.server = new WebSocketServer({ port: testPort });
        this.server.on('connection', (client) => {
            this.connectionMade = true;
            client.on('message', (data) => {
                console.log('Client message received');
                const parsedMessage = JSON.parse(data.toString());
                this.receivedMsgs.push(parsedMessage);
            });
        });
    }

    close(): void {
        this.server.close();
        console.log('closed');
    }

    receivedMessagesCount(): number {
        return this.receivedMsgs.length;
    }
}
