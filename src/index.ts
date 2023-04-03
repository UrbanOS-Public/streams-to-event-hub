import { app } from './app';
import { EventHub } from './EventHub';
import { SocketConnection } from './SocketConnection';

import * as dotenv from 'dotenv';
dotenv.config();
app(new EventHub(), new SocketConnection());
