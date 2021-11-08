import { WebSocketServer } from 'ws';

const testPort = 1111;

// Mocks discovery streams web socket server behavior

export class TestWsServerWrapper {
    private server: WebSocketServer;
    public receivedMsgs = [] as any[];

    clientConnected(): boolean {
        return this.server.clients.size > 0;
    }

    constructor() {
        this.server = new WebSocketServer({ port: testPort });
        this.server.on('connection', (ws) => {
            ws.on('message', (data) => {
                const parsedMessage = JSON.parse(data.toString());
                this.receivedMsgs.push(parsedMessage);
            });
            ws.send('{"event": "phx_reply", "payload": {"status": "ok"}}');
        });
    }

    close(): void {
        this.server.clients.forEach((ws) => ws.close());
        this.server.close();
    }

    sendMessageToForward(): void {
        this.server.clients.forEach((client) =>
            client.send('{"payload": {"is_crashed": true}}'),
        );
    }

    sendMessageNotToForward(): void {
        this.server.clients.forEach((client) =>
            client.send('{"payload": {"is_crashed": false}}'),
        );
    }

    receivedMessagesCount(): number {
        return this.receivedMsgs.length;
    }
}
