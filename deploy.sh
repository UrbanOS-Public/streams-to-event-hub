read -p "Reminder: Join the VPN (enter to continue)"
docker build . -t smartcitiesdata/streams-to-event-hub:latest
docker push smartcitiesdata/streams-to-event-hub:latest
helm uninstall streams-to-event-hub -n urban-os-demo-services
helm install streams-to-event-hub ./chart -n urban-os-demo-services --create-namespace