import { app } from './app';
import { EventHub } from './EventHub';
import { SocketConnection } from './SocketConnection';

app(new EventHub(), new SocketConnection());
