read -p "Reminder: Join the VPN (enter to continue)"
docker build . -t micnotppasacr01.azurecr.io/streams-to-event-hub:latest
docker push micnotppasacr01.azurecr.io/streams-to-event-hub:latest
helm uninstall streams-to-event-hub -n urban-os-demo-services
helm install streams-to-event-hub ./chart -n urban-os-demo-services --create-namespace