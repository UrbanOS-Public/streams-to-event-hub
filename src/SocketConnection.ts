import WebSocket from 'ws';
import { getStreamsUrl, initial_topic_request } from './configuration';

const options = { headers: { 'user-agent': 'node' } };
const reportMsgCountInterval = 20; // seconds
const keepAliveInterval = 5; // seconds

export class SocketConnection {
    private socket: WebSocket;
    private msgCount = 0;

    constructor() {
        this.socket = new WebSocket(getStreamsUrl(), options);

        this.socket.on('open', this.onConnection);
        this.socket.on('message', this.onMessage);
        this.socket.on('error', this.onError);
        this.socket.on('close', this.onClose);

        setInterval(() => {
            this.socket.ping('keep alive msg');
        }, keepAliveInterval * 1000);

        setInterval(this.reportMsgCount, this.reportMsgCountInterval * 1000);
    }

    private onConnection(): void {
        console.log('Connection established, subscribing to topic');
        this.socket.send(JSON.stringify(initial_topic_request));
    }

    private onMessage(data: WebSocket.RawData): void {
        if (this.msgIsAnOkay(data)) console.log('Subscribed to topic: ok');
        else {
            this.msgCount++;
        }
    }

    private msgIsAnOkay(data: any): boolean {
        return data?.event === 'phx_reply' && data?.payload?.status === 'ok';
    }

    private reportMsgCount(): void {
        console.log(
            `Received ${this.msgCount} in the last ${this.reportMsgCountInterval} seconds`,
        );
        this.msgCount = 0;
    }

    private onError(error: Error): void {
        console.log('error:', error);
    }

    private onClose(): void {
        console.log('Socket closed');
        console.log('Waiting 20 seconds, then exiting.');
        setTimeout(() => {
            process.exit(1);
        }, 20000);
    }
}
