# Postman Collection — School Management API

## Base URL

```
http://localhost:3000
```

> For production, replace with your live deployed URL.

---

## 1. Add School

**Endpoint:** `POST /addSchool`

### Request

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "name": "Springfield Elementary",
  "address": "123 Main St, Springfield",
  "latitude": 18.5204,
  "longitude": 73.8567
}
```

### Responses

**201 Created — Success**
```json
{
  "message": "School added successfully",
  "schoolId": 1
}
```

**400 Bad Request — Empty name**
```json
{
  "error": "name is required and must be a non-empty string"
}
```

**400 Bad Request — Empty address**
```json
{
  "error": "address is required and must be a non-empty string"
}
```

**400 Bad Request — Invalid latitude (out of range)**
```json
{
  "error": "latitude must be a number between -90 and 90"
}
```

**400 Bad Request — Invalid longitude (out of range)**
```json
{
  "error": "longitude must be a number between -180 and 180"
}
```

---

## 2. List Schools

**Endpoint:** `GET /listSchools`

### Request

**Query Parameters:**

| Parameter | Type   | Required | Description              |
|-----------|--------|----------|--------------------------|
| latitude  | Float  | Yes      | User's current latitude  |
| longitude | Float  | Yes      | User's current longitude |

**Example:**
```
GET /listSchools?latitude=18.5204&longitude=73.8567
```

### Responses

**200 OK — Success**
```json
{
  "schools": [
    {
      "id": 1,
      "name": "Springfield Elementary",
      "address": "123 Main St, Springfield",
      "latitude": 18.5204,
      "longitude": 73.8567,
      "distance": 0.0003
    },
    {
      "id": 2,
      "name": "Greenwood High",
      "address": "456 Oak Ave, Pune",
      "latitude": 18.5314,
      "longitude": 73.8446,
      "distance": 1.77
    },
    {
      "id": 3,
      "name": "Sunrise Academy",
      "address": "789 Park Rd, Mumbai",
      "latitude": 19.0760,
      "longitude": 72.8777,
      "distance": 120.15
    }
  ]
}
```

> Schools are sorted by `distance` (km) in ascending order — nearest first.

**400 Bad Request — Missing or invalid latitude**
```json
{
  "error": "Query param 'latitude' must be a number between -90 and 90"
}
```

**400 Bad Request — Missing or invalid longitude**
```json
{
  "error": "Query param 'longitude' must be a number between -180 and 180"
}
```

---

## Postman Collection Import

The file `postman_collection.json` in this repository can be directly imported into Postman:

1. Open Postman → click **Import**
2. Select `postman_collection.json`
3. Collection variable `{{base_url}}` is pre-set to `http://localhost:3000`
4. Run individual requests or use **Collection Runner** to run all 7 tests at once

---

## Test Summary

| # | Request | Method | Expected Status |
|---|---------|--------|-----------------|
| 1 | Add School — Success | POST | 201 |
| 2 | Add School — Missing Name | POST | 400 |
| 3 | Add School — Missing Address | POST | 400 |
| 4 | Add School — Invalid Latitude | POST | 400 |
| 5 | List Schools — Success | GET | 200 |
| 6 | List Schools — Missing Latitude | GET | 400 |
| 7 | List Schools — Invalid Longitude | GET | 400 |
