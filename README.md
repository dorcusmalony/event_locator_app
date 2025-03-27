# Multi-User Event Locator Application

## Project Overview

This project is a multi-user event locator application built using Node.js and Express. The application allows users to discover events based on location and preferences. It demonstrates backend development skills, including user management, event management, geospatial data handling, asynchronous task handling, internationalization, and robust testing.

## Learning Objectives

- Demonstrate proficiency in building backend applications with Node.js.
- Apply knowledge of database design and interaction, including geospatial data handling.
- Implement asynchronous task handling using a message queuing system.
- Develop internationalization features to support multiple languages.
- Write comprehensive unit tests to ensure code quality and reliability.

## Features

- **User Management**: Secure user registration and login with password hashing. Users can set their location and preferred event categories.
- **Event Management**: Users (or administrators) can create, read, update, and delete events, including event details, location, date/time, and categories.
- **Location-Based Search**: Users can find events within a specified radius of their location.
- **Category Filtering**: Users can filter events based on categories.
- **Multilingual Support (i18n)**: Users can select their preferred language for the user interface.
- **Notification System (Queuing)**: Notifications are sent to users about upcoming events that match their preferences.
- **Unit Testing**: Comprehensive unit tests for core functionalities, including user authentication, event management, location-based search, and the notification system.

## Additional Features (Optional)

- Event ratings and reviews.
- Integration with Google Maps API to display event locations on a map.
- Feature to allow users to save favorite events.
- Real-time updates for event changes.

## Technical Choices

- **Node.js Framework**: Express.js
- **Database**: PostgreSQL with PostGIS for geospatial data handling.
- **Queuing System**: Redis Pub/Sub or RabbitMQ for asynchronous notifications.
- **Authentication**: Secure password hashing with bcrypt and authentication using Passport.js.
- **Internationalization (i18n)**: i18next library for multilingual support.
- **Testing Framework**: Jest for unit testing.

## Project Structure

```
event-locator/
├── config/
│   └── database.js
├── controllers/
│   ├── authController.js
│   └── eventController.js
├── models/
│   ├── index.js
│   ├── user.js
│   └── event.js
├── routes/
│   ├── authRoutes.js
│   └── eventRoutes.js
├── middlewares/
│   └── authMiddleware.js
├── locales/
│   ├── en/
│   │   └── translation.json
│   └── es/
│       └── translation.json
├── tests/
│   ├── auth.test.js
│   └── event.test.js
├── .gitignore
├── app.js
├── package.json
└── README.md
```

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/event-locator.git
   cd event-locator
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure the database**:
   - Ensure PostgreSQL is installed and running.
   - Create a database named `event_locator_db`.
   - Update the `config/database.js` file with your PostgreSQL credentials.

4. **Run database migrations**:
   ```bash
   npx sequelize-cli db:migrate
   ```

5. **Start the server**:
   ```bash
   node app.js
   ```

6. **Test the application**:
   - Use a tool like Postman to test the user registration and login endpoints.
   - URL for user registration: `http://localhost:3000/auth/register`
   - URL for user login: `http://localhost:3000/auth/login`
   - URL for user logout: `http://localhost:3000/auth/logout`

## API Endpoints

### User Management
- **Register User**
  - URL: `/auth/register`
  - Method: `POST`
  - Description: Register a new user
  - Request Body:
    ```json
    {
      "username": "string",
      "email": "string",
      "password": "string",
      "location": {
        "type": "Point",
        "coordinates": [longitude, latitude]
      },
      "preferredCategories": ["string"]
    }
    ```

- **Login User**
  - URL: `/auth/login`
  - Method: `POST`
  - Description: Login an existing user
  - Request Body:
    ```json
    {
      "username": "string",
      "password": "string"
    }
    ```

- **Logout User**
  - URL: `/auth/logout`
  - Method: `POST`
  - Description: Logout the current user

### Event Management
- **Create Event**
  - URL: `/events`
  - Method: `POST`
  - Description: Create a new event
  - Request Body:
    ```json
    {
      "title": "string",
      "description": "string",
      "location": {
        "type": "Point",
        "coordinates": [longitude, latitude]
      },
      "date": "datetime",
      "categories": ["string"]
    }
    ```

- **Get All Events**
  - URL: `/events`
  - Method: `GET`
  - Description: Get a list of all events

- **Get Event by ID**
  - URL: `/events/:id`
  - Method: `GET`
  - Description: Get details of a specific event by ID

- **Update Event**
  - URL: `/events/:id`
  - Method: `PUT`
  - Description: Update an existing event by ID
  - Request Body:
    ```json
    {
      "title": "string",
      "description": "string",
      "location": {
        "type": "Point",
        "coordinates": [longitude, latitude]
      },
      "date": "datetime",
      "categories": ["string"]
    }
    ```

- **Delete Event**
  - URL: `/events/:id`
  - Method: `DELETE`
  - Description: Delete an event by ID

### Location-Based Search
- **Search Events by Location**
  - URL: `/events/search`
  - Method: `GET`
  - Description: Search for events within a specified radius of a location
  - Query Parameters:
    - `latitude`: Latitude of the location
    - `longitude`: Longitude of the location
    - `radius`: Radius in kilometers

### Category Filtering
- **Filter Events by Category**
  - URL: `/events/filter`
  - Method: `GET`
  - Description: Filter events based on categories
  - Query Parameters:
    - `categories`: Comma-separated list of categories

### Multilingual Support (i18n)
- **Set Preferred Language**
  - URL: `/users/:id/language`
  - Method: `PUT`
  - Description: Set the preferred language for the user interface
  - Request Body:
    ```json
    {
      "language": "string"
    }
    ```

### Notification System (Queuing)
- **Send Notifications**
  - URL: `/notifications/send`
  - Method: `POST`
  - Description: Send notifications to users about upcoming events
  - Request Body:
    ```json
    {
      "userId": "integer",
      "eventId": "integer"
    }
    ```

## Database Schema

The database schema includes the following tables:

- **Users**:
  - `id`: Primary key
  - `username`: Unique username
  - `email`: Unique email address
  - `password`: Hashed password
  - `location`: Geospatial point (latitude/longitude)
  - `preferredCategories`: Array of preferred event categories

- **Events**:
  - `id`: Primary key
  - `title`: Event title
  - `description`: Event description
  - `location`: Geospatial point (latitude/longitude)
  - `date`: Event date and time
  - `categories`: Array of event categories

## Usage Instructions

- **User Registration**: Users can register by providing a username, email, password, location, and preferred categories.
- **User Login**: Users can log in using their username and password.
- **Event Management**: Users can create, read, update, and delete events.
- **Search Events**: Users can search for events based on location and categories.
- **Multilingual Support**: Users can select their preferred language for the user interface.
- **Notifications**: Users receive notifications about upcoming events that match their preferences.

## Testing

- **Run Unit Tests**:
  ```bash
  npm test
  ```

- **Test Coverage**: Ensure comprehensive test coverage for core functionalities, including user authentication, event management, location-based search, and the notification system.

Collabortors
Dorcus Adich Alier Malony
Abukduot