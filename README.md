## streams-to-event-hub

A node microservice made to forward events from a websocket to Azure Event Hub.

## Setup

-   `npm i` to install deps
-   The `EVENT_HUB_URL` env var must be set. This is where the service will attempt to send events to. No default.
    -   For deployments this is set in the values.yml
-   `SOURCE_STREAMS_URL` env var must be set: This is where the service will connect to. Default for local development is listed in configuration.ts
    -   For deployments this is set as a k8s secret

## Notes

A summary of messages received / successfully forwarded will be logged every 20
seconds. This logging interval is configurable in the `configuration.ts` file.

[Created with bmitchinson/ts-node-starter](https://github.com/bmitchinson/ts-node-starter)
