# Auth Testing — Cleanora Admin

## MongoDB
```
mongosh
use test_database
db.users.find({role: "admin"}).pretty()   # password_hash muss mit $2b$ beginnen
```

## API
```
API=$(grep REACT_APP_BACKEND_URL /app/frontend/.env | cut -d '=' -f2)

# Login (gibt JWT-Token zurück)
TOKEN=$(curl -s -X POST "$API/api/auth/login" -H "Content-Type: application/json" \
  -d '{"email":"admin@cleanora-reinigung.de","password":"Cleanora-Admin-2026!"}' \
  | python3 -c "import sys,json;print(json.load(sys.stdin)['token'])")

# Geschützte Endpunkte mit Bearer-Token
curl -s "$API/api/auth/me" -H "Authorization: Bearer $TOKEN"
curl -s "$API/api/admin/settings/email" -H "Authorization: Bearer $TOKEN"
curl -s "$API/api/admin/requests" -H "Authorization: Bearer $TOKEN"
```

## Erwartung
- Login liefert `{token, email}`; falsches Passwort → 401.
- 5 Fehlversuche → 429 (15 Min. Sperre), Eintrag in `login_attempts`.
- Ohne/ungültiges Token → 401 auf allen `/api/admin/*` und `/api/auth/me`.
