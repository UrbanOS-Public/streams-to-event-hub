import { SocketConnection } from './SocketConnection';
import { EventHub } from './EventHub';
import { Logger } from './Logger';
import { summarizeStatsInterval } from './configuration';

const eventHub = new EventHub();
const streams = new SocketConnection();

streams.msgCallback = eventHub.sendToEventHub;
streams.listen();

setInterval(Logger.summarizeStats, summarizeStatsInterval * 1000);
