import { SocketConnection } from './SocketConnection';
import { EventHub } from './EventHub';
import { Logger } from './Logger';
import { shouldForward, summarizeStatsInterval } from './configuration';

export const app = (eventHub: EventHub, streams: SocketConnection): void => {
    streams.msgCallback = async (msg) => {
        if (shouldForward(msg)) {
            await eventHub.sendToEventHub(msg);
        }
    };
    streams.listen();

    setInterval(Logger.summarizeStats, summarizeStatsInterval * 1000);
};
