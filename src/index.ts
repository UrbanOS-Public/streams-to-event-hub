// TODO
// ✅ connect to streams! log messages
// event hub boiler plate
// forward streams messages
// detailed logs, no longer log messages, log cleanup

// ✅  make sure pod restarts if websocket connection error
// put streams url in k8s secret (add to teams wiki)

import { SocketConnection } from './SocketConnection';

const connection = new SocketConnection();
connection.listen();
