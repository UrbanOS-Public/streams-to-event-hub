import { WebSocketServer } from 'ws';

const testPort = 1111;

export class TestWsServerWrapper {
    private server: WebSocketServer;
    public receivedMsgs = [] as any[];

    constructor() {
        this.server = new WebSocketServer({ port: testPort });
        this.server.on('connection', (ws) => {
            ws.on('message', (data) => {
                const parsedMessage = JSON.parse(data.toString());
                this.receivedMsgs.push(parsedMessage);
            });
            ws.send('{"data":"hello"}');
        });
    }

    close(): void {
        this.server.clients.forEach((ws) => ws.close());
        this.server.close();
    }

    sendMessage(): void {
        this.server.clients.forEach((client) => client.send('{data: true}'));
    }

    receivedMessagesCount(): number {
        return this.receivedMsgs.length;
    }
}
