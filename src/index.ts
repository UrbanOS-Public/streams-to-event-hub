// TODO
// ✅ connect to streams! log messages
// ✅ event hub boiler plate
// forward streams messages
// ✅ detailed logs, no longer log messages, log cleanup

// ✅  make sure pod restarts if websocket connection error
// put streams url in k8s secret (add to teams wiki) + map it with the chart

import { SocketConnection } from './SocketConnection';
import { EventHub } from './EventHub';

const eventHub = new EventHub();
const streamsConnection = new SocketConnection();

streamsConnection.msgCallback = eventHub.sendToEventHub;

streamsConnection.listen();
