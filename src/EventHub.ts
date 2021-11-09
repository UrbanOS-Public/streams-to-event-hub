import { EventHubProducerClient } from '@azure/event-hubs';
import { getEventHubUrl } from './configuration';
import { Logger } from './Logger';

const eventHubName = 'urban-os';
const producer = new EventHubProducerClient(getEventHubUrl(), eventHubName);
export class EventHub {
    public sendToEventHub = async (msg: any): Promise<void> => {
        Logger.azureSendAttempt();
        const batch = await producer.createBatch();
        batch.tryAdd({ body: msg });
        await producer
            .sendBatch(batch)
            .then(Logger.azureSendSuccess)
            .catch((err) => {
                console.log('Error sending to azure:', err);
            });
    };
}
