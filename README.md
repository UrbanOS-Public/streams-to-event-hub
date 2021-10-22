## streams-to-event-hub

A node microservice made to forward events from a websocket to
azure event hub

## Setup

-   `npm i` to install deps
-   The `EVENT_HUB_URL` env var must be set. This is where the service will attempt to send events to. No default.
-   `SOURCE_STREAMS_URL` env var must be set: This is where the service will connect to. Defaults listed in configuration.ts

## Notes

Logs display high level information about what has been forwarded

[Created with bmitchinson/ts-node-starter](https://github.com/bmitchinson/ts-node-starter)
