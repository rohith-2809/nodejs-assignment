# School Management API

## Project Overview

This repository contains a RESTful API built with Node.js and Express.js designed to manage school data. The primary objective is to provide endpoints for adding new schools to a MySQL database and retrieving a list of schools sorted by their geographical proximity to a user-specified location.

## Technology Stack

* **Runtime Environment:** Node.js
* **Framework:** Express.js
* **Database:** MySQL
* **Database Driver:** `mysql2` (with connection pooling)

## Architecture and Design Decisions

The application was designed with a focus on maintainability, performance, and clear separation of concerns.

### 1. Relational Database Management
MySQL was selected as the database. School records represent highly structured data with defined relationships, making a relational database an ideal choice. We utilized the `mysql2/promise` library to implement connection pooling. Connection pooling prevents the overhead of establishing a new database connection for every API request, significantly improving the application's throughput and response times under load.

### 2. Separation of Concerns
The codebase is structured into distinct layers:
* **Routes:** Define the API endpoints and map them to specific controllers.
* **Controllers:** Handle the business logic, process incoming requests, and format the responses.
* **Middleware:** Intercepts requests for purposes such as rigorous input validation before the controller is invoked.

### 3. Haversine Formula for Proximity Calculation
To sort schools by proximity, the application utilizes the Haversine formula within the controller layer. The Haversine formula accurately calculates the great-circle distance between two points on a sphere given their longitudes and latitudes. 
* **Reasoning:** While advanced spatial database extensions exist, calculating the distance at the application layer using the Haversine formula provides a lightweight, dependency-free solution that is highly performant for this scale of data, avoiding unnecessary database complexity.

### 4. Middleware-based Validation
Input validation is handled via custom middleware before requests reach the core business logic. 
* **Reasoning:** This ensures that the application fails fast when provided with malformed data, returning a `400 Bad Request` immediately. It protects the database from invalid entries and keeps the controller logic clean and focused solely on processing valid data.

## Hosting & Deployment

The application is hosted on **Render**. 

> **Note:** As we are utilizing free tier instances for both the web service and the database, they are configured by the provider to spin down (go to sleep) after a period of inactivity (usually 15 minutes). To circumvent this and ensure the API remains responsive, we have implemented an automated keep-alive mechanism. The server periodically pings its own `/keep-alive` endpoint every 10 minutes, which in turn queries the database, keeping both the Render instance and the database active.

## API Endpoints

### 1. Add School
* **Endpoint:** `POST /addSchool`
* **Description:** Inserts a new school into the database.
* **Payload:**
  * `name` (String)
  * `address` (String)
  * `latitude` (Float, -90 to 90)
  * `longitude` (Float, -180 to 180)
* **Response:** Returns a `201 Created` status with the newly created school ID upon success.

### 2. List Schools
* **Endpoint:** `GET /listSchools`
* **Description:** Retrieves a list of all schools, sorted by distance (in kilometers) from the provided coordinates.
* **Query Parameters:**
  * `latitude` (Float)
  * `longitude` (Float)
* **Response:** Returns a `200 OK` status with a JSON array of school objects, including a calculated `distance` field, sorted nearest to farthest.

## Setup and Installation

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   cd nodejs-assignment
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Database Configuration:**
   * Ensure a MySQL server is running.
   * Execute the SQL commands in `schema.sql` to initialize the database and the `schools` table.
   * Rename `.env.example` to `.env` (or create a new `.env` file) and populate it with your MySQL credentials:
     ```
     PORT=3000
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=your_password
     DB_NAME=school_management
     ```

4. **Start the application:**
   ```bash
   npm start
   ```
   For development with auto-restart, use:
   ```bash
   npm run dev
   ```

## Testing

A Postman collection (`postman_collection.json`) is included in the root directory. It contains pre-configured requests covering success and validation failure scenarios for all endpoints. Import this file into Postman to execute the tests. Full documentation for the Postman collection can be found in `postman-collection.md`.
