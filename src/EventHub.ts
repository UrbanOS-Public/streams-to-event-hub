import { EventHubProducerClient } from '@azure/event-hubs';
import { getEventHubUrl } from './configuration';

const eventHubName = 'micnotppasevn01';
const producer = new EventHubProducerClient(getEventHubUrl(), eventHubName);
const reportingInterval = 20;

export class EventHub {
    private azureMsgAttemptCount = 0;
    private azureMsgSentCount = 0;

    constructor() {
        setInterval(() => {
            console.log(
                `Event Hub - Over the last ${reportingInterval} seconds: ${this.azureMsgSentCount} of attempted ${this.azureMsgAttemptCount} messages were sent successfully`,
            );
            this.azureMsgAttemptCount = 0;
            this.azureMsgSentCount = 0;
        }, reportingInterval * 1000);
    }

    public sendToEventHub = async (msg: any): Promise<void> => {
        this.azureMsgAttemptCount++;

        const batch = await producer.createBatch();
        batch.tryAdd(msg);
        await producer
            .sendBatch(batch)
            .then(() => {
                this.azureMsgSentCount++;
            })
            .catch((err) => {
                console.log('Error sending to azure:', err);
            });
    };
}
