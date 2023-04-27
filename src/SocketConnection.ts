import WebSocket from 'ws';
import { getStreamsUrl, getInitialTopicRequest } from './configuration';
import { Logger } from './Logger';

const options = {
    headers: { 'user-agent': 'node' },
    rejectUnauthorized: false,
};
const keepAliveInterval = 5; // seconds
const exitAfterFailure = 15; // seconds

export class SocketConnection {
    private socket: WebSocket;
    public msgCallback = async (msg: any): Promise<void> => Promise.resolve();

    constructor() {
        this.socket = new WebSocket(getStreamsUrl(), options);
    }

    listen(): void {
        this.socket.on('open', () => this.onConnection());
        this.socket.on('close', () => this.onClose());
        this.socket.on('error', (err) => this.onError(err));
        this.socket.on('message', (data) => this.onMessage(data));

        setInterval(() => {
            this.socket.ping('keep alive');
        }, keepAliveInterval * 1000);
    }

    private onMessage(data: WebSocket.RawData): void {
        const msg = JSON.parse(data.toString());
        if (this.msgIsAnOkay(msg)) Logger.streams(`Subscribed to topic: ok`);
        else {
            this.msgCallback(msg.payload);
            Logger.streamsMsgReceived();
        }
    }

    private onConnection(): void {
        Logger.streams('Connection established: subscribing to topic');
        const req = JSON.stringify(getInitialTopicRequest());
        this.socket.send(req);
    }

    private onError(error: Error): void {
        console.log('error:', error);
    }

    private onClose(): void {
        Logger.streams('Socket closed');
        Logger.streams(
            `Waiting ${exitAfterFailure} seconds, then exiting process`,
        );
        setTimeout(() => {
            process.exit(1);
        }, exitAfterFailure * 1000);
    }

    private msgIsAnOkay(data: any): boolean {
        return data?.event === 'phx_reply' && data?.payload?.status === 'ok';
    }

    public close(): void {
        this.socket.close();
    }
}
