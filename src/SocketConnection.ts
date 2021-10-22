import WebSocket from 'ws';
import { getStreamsUrl, initial_topic_request } from './configuration';

const options = { headers: { 'user-agent': 'node' } };
const reportMsgCountInterval = 20; // seconds
const keepAliveInterval = 5; // seconds
const exitAfterFailure = 15; // seconds

export class SocketConnection {
    private socket: WebSocket;
    private msgCount = 0;

    constructor() {
        this.socket = new WebSocket(getStreamsUrl(), options);
    }

    listen(): void {
        this.socket.on('open', () => this.onConnection());
        this.socket.on('close', () => this.onClose());
        this.socket.on('error', (err) => this.onError(err));
        this.socket.on('message', (data) => this.onMessage(data));

        setInterval(() => {
            this.socket.ping('keep alive msg');
        }, keepAliveInterval * 1000);

        setInterval(() => this.reportMsgCount(), reportMsgCountInterval * 1000);

        console.log(
            `Listening to messages on topic. Will print summary every ${reportMsgCountInterval} seconds`,
        );
    }

    private onMessage(data: WebSocket.RawData): void {
        const msg = JSON.parse(data.toString());
        if (this.msgIsAnOkay(msg)) console.log('Subscribed to topic: ok');
        else {
            this.msgCount++;
        }
    }

    private onConnection(): void {
        console.log('Connection established, subscribing to topic');
        this.socket.send(JSON.stringify(initial_topic_request));
    }

    private onError(error: Error): void {
        console.log('error:', error);
    }

    private onClose(): void {
        console.log('Socket closed');
        console.log(`Waiting ${exitAfterFailure} seconds, then exiting`);
        setTimeout(() => {
            process.exit(1);
        }, exitAfterFailure * 1000);
    }

    private msgIsAnOkay(data: any): boolean {
        return data?.event === 'phx_reply' && data?.payload?.status === 'ok';
    }

    private reportMsgCount(): void {
        console.log(
            `Received ${this.msgCount} messages from streams in the last ${reportMsgCountInterval} seconds.`,
        );
        this.msgCount = 0;
    }
}
