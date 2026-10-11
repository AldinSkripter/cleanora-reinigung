#!/usr/bin/env bash
# Cleanora — Build & Restart-Skript für den Plesk-VPS.
#
# Ablauf bei jedem Update:
#   1. In Plesk über die Git-Erweiterung „Pull/Deploy“ klicken (holt die Dateien von GitHub)
#   2. Danach nur noch:  ./deploy.sh
#
# Einmalig ausführbar machen:  chmod +x deploy.sh
# Voraussetzung: Erstinstallation ist erfolgt (siehe README Abschnitt 7)
# und der Dienst "cleanora-api" läuft auf 127.0.0.1:8002.

set -euo pipefail
cd "$(dirname "$0")"

SERVICE="cleanora-api"

echo "==> 1/3 Frontend bauen (npm ci && npm run build) ..."
cd frontend
npm ci
npm run build
cd ..

echo "==> 2/3 Backend-Abhängigkeiten aktualisieren ..."
cd backend
if [ ! -d .venv ]; then
  echo "FEHLER: backend/.venv fehlt — bitte zuerst die Erstinstallation nach README Abschnitt 7 ausführen."
  exit 1
fi
source .venv/bin/activate
pip install -r requirements.txt --quiet
cd ..

echo "==> 3/3 Backend-Dienst neu starten ($SERVICE) ..."
sudo systemctl restart "$SERVICE"
sleep 2

if systemctl is-active --quiet "$SERVICE"; then
  echo ""
  echo "FERTIG — Cleanora ist aktualisiert und $SERVICE läuft."
  echo "Kurz prüfen: curl -s https://cleanora-reinigung.de/api/health"
else
  echo ""
  echo "ACHTUNG: $SERVICE läuft nicht! Logs ansehen mit:"
  echo "  journalctl -u $SERVICE -n 50 --no-pager"
  exit 1
fi
