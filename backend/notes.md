## For running and connecting mongodb
- npm install (just on time, no need second)
- npm run dev

## for manual data add to database powershell command

```Invoke-RestMethod `
  -Uri http://localhost:5000/api/announcements `
  -Method POST `
  -ContentType "application/json" `
  -Body '{
    "title":       "Pool Safety Tips",
    "description": "Always supervise children near water and keep a life vest on hand.",
    "date":        "2025-04-18T10:00:00Z",
    "location":    "Miami, FL",
    "parentName":  "John Smith",
    "childrenAge": "4-7"
  }' ```
