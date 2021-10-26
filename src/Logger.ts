import { summarizeStatsInterval } from './configuration';

export class Logger {
    private static __azureMsgAttempt = 0;
    private static __azureMsgSuccess = 0;
    private static __streamsMsgReceived = 0;

    static azureSendAttempt(): void {
        Logger.__azureMsgAttempt++;
    }
    static azureSendSuccess(): void {
        Logger.__azureMsgSuccess++;
    }
    static streamsMsgReceived(): void {
        Logger.__streamsMsgReceived++;
    }

    static streams(msg: string): void {
        console.log(`Streams - ${msg}`);
    }

    static azure(msg: string): void {
        console.log(`Azure   - ${msg}`);
    }

    static summarizeStats(): void {
        console.log(`Over the last ${summarizeStatsInterval} seconds:`);
        Logger.streams(
            `${Logger.__streamsMsgReceived} messages received from streams`,
        );
        Logger.azure(
            `${Logger.__azureMsgSuccess} of ${Logger.__azureMsgAttempt} messages were sent successfully`,
        );
        Logger.resetStats();
    }

    private static resetStats(): void {
        Logger.__azureMsgAttempt = 0;
        Logger.__azureMsgSuccess = 0;
        Logger.__streamsMsgReceived = 0;
    }
}
