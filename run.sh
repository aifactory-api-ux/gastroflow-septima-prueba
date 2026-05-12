#!/bin/bash
set -e

echo ">>> Starting GastroFlow services..."

docker-compose up -d

echo ">>> Waiting for services to be healthy..."
sleep 10

echo ">>> Services started successfully!"
echo ">>> API available at http://localhost:23001"
echo ">>> Frontend available at http://localhost:24000"
echo ">>> RabbitMQ Management at http://localhost:15672"