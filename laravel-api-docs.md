# Laravel Backend API for Tourism Website

## Installation

```bash
composer create-project laravel/laravel tourism-api
cd tourism-api
php artisan serve
```

## API Endpoints

### Authentication
- POST /api/register - Register a new user
- POST /api/login - Login user
- POST /api/logout - Logout user
- GET /api/user - Get authenticated user

### Destinations
- GET /api/destinations - List all destinations
- GET /api/destinations/{id} - Get destination details
- POST /api/destinations - Create destination (admin)
- PUT /api/destinations/{id} - Update destination (admin)
- DELETE /api/destinations/{id} - Delete destination (admin)

### Categories
- GET /api/categories - List all categories
- GET /api/categories/{id}/destinations - Get destinations by category

### Reviews
- GET /api/destinations/{id}/reviews - Get reviews for destination
- POST /api/destinations/{id}/reviews - Add review for destination
- PUT /api/reviews/{id} - Update review
- DELETE /api/reviews/{id} - Delete review

### User Favorites
- GET /api/user/favorites - Get user favorites
- POST /api/user/favorites - Add destination to favorites
- DELETE /api/user/favorites/{id} - Remove destination from favorites

## Database Schema

### Users
- id (primary key)
- name
- email
- password
- avatar
- bio
- location
- created_at
- updated_at

### Destinations
- id (primary key)
- name
- description
- location
- price
- category_id (foreign key)
- rating
- images (JSON)
- created_at
- updated_at

### Categories
- id (primary key)
- name
- description
- image
- created_at
- updated_at

### Reviews
- id (primary key)
- user_id (foreign key)
- destination_id (foreign key)
- rating
- comment
- images (JSON)
- created_at
- updated_at

### Favorites
- id (primary key)
- user_id (foreign key)
- destination_id (foreign key)
- created_at
- updated_at

## Laravel-React Integration

1. Set up CORS in Laravel:
```php
// config/cors.php
return [
    "paths" => ["api/*"],
    "allowed_methods" => ["*"],
    "allowed_origins" => ["*"],
    "allowed_origins_patterns" => [],
    "allowed_headers" => ["*"],
    "exposed_headers" => [],
    "max_age" => 0,
    "supports_credentials" => true,
];
```

2. Create API service in React:
```typescript
// src/lib/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
```

3. Update authentication in React:
```typescript
// Example login function
const login = async (email: string, password: string) => {
  try {
    const response = await api.post("/login", { email, password });
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
```

