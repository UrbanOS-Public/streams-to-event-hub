import { SocketConnection } from './SocketConnection';
import { EventHub } from './EventHub';
import { Logger } from './Logger';
import { summarizeStatsInterval } from './configuration';

export const app = (eventHub: EventHub, streams: SocketConnection): void => {
    streams.msgCallback = eventHub.sendToEventHub;
    streams.listen();

    setInterval(Logger.summarizeStats, summarizeStatsInterval * 1000);
};
