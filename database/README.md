# Travel Planning Platform Database Schema

This document describes the database schema for the comprehensive travel planning platform.

## Overview

The database is designed to support a full-featured travel planning application with the following core functionalities:

- User management and authentication
- Destination discovery and search
- Trip planning and itinerary creation
- Budget calculation and management
- Weather and seasonal information
- Blog and content management
- User reviews and interactions

## Database Structure

### Core Tables

#### User Management
- `users` - User accounts and profiles
- `user_sessions` - Authentication sessions
- `user_favorites` - User's favorite destinations
- `search_history` - User search patterns

#### Location Hierarchy
- `countries` - Country information
- `states` - States/provinces within countries
- `cities` - Cities within states
- `destinations` - Main travel destinations
- `attractions` - Specific attractions within destinations

#### Content Management
- `destination_images` - Images for destinations
- `blog_categories` - Blog post categories
- `blog_posts` - Travel blog articles
- `destination_reviews` - User reviews for destinations

#### Trip Planning
- `trip_plans` - User-created trip plans
- `trip_itineraries` - Daily itineraries for trips
- `itinerary_activities` - Individual activities within itineraries

#### Budget and Pricing
- `destination_budgets` - Budget information by category and type
- `accommodations` - Accommodation options with pricing

#### Weather and Seasonal Data
- `destination_weather` - Monthly weather data for destinations
- `seasonal_recommendations` - Best destinations by month

#### System
- `system_settings` - Application configuration
- `activity_logs` - User activity tracking

## Key Features

### Search and Discovery
- Full-text search across destinations and content
- Geographic search by country, state, city
- Category-based filtering (Historical, Nature, Beach, etc.)
- Budget-based filtering

### Trip Planning
- Multi-day itinerary creation
- Activity scheduling with time and cost tracking
- Budget calculation across multiple categories
- Traveler count and preference management

### Content Management
- Rich destination information with history and culture
- Attraction categorization (Essential vs Optional)
- Blog system with categories and tags
- Image management for destinations

### User Experience
- User favorites and personalization
- Review and rating system
- Search history tracking
- Activity logging

## Data Relationships

### Location Hierarchy
```
Countries → States → Cities → Destinations → Attractions
```

### Trip Planning Flow
```
Users → Trip Plans → Trip Itineraries → Itinerary Activities
```

### Content Structure
```
Destinations → Destination Images, Reviews, Weather Data, Budget Info
Blog Categories → Blog Posts
```

## Indexes and Performance

The schema includes comprehensive indexing for:
- Search performance (GIN indexes for full-text search)
- Geographic queries (location-based indexes)
- User activity (user_id indexes)
- Date-based queries (timestamp indexes)
- Rating and review queries

## Triggers and Automation

### Automatic Updates
- `updated_at` timestamp triggers on relevant tables
- Destination rating calculation when reviews are added/updated/deleted

### Data Integrity
- Foreign key constraints maintain referential integrity
- Check constraints ensure data validity (ratings 1-5, valid months, etc.)
- Unique constraints prevent duplicate data

## Sample Data

The `seed_data.sql` file includes:
- Indian destinations with complete information
- Weather data for major destinations
- Blog categories and sample structure
- Seasonal recommendations
- System configuration settings

## Usage Examples

### Finding Destinations by Category
```sql
SELECT d.name, d.rating, c.name as city, s.name as state
FROM destinations d
JOIN cities c ON d.city_id = c.id
JOIN states s ON c.state_id = s.id
WHERE d.category = 'Historical'
ORDER BY d.rating DESC;
```

### Getting Budget Information
```sql
SELECT d.name, db.category, db.budget_type, db.price_per_day
FROM destinations d
JOIN destination_budgets db ON d.id = db.destination_id
WHERE d.slug = 'taj-mahal'
ORDER BY db.category, db.budget_type;
```

### Weather Information by Month
```sql
SELECT d.name, dw.month, dw.min_temperature, dw.max_temperature, dw.weather_description
FROM destinations d
JOIN destination_weather dw ON d.id = dw.destination_id
WHERE d.slug = 'kerala-backwaters'
ORDER BY dw.month;
```

## Security Considerations

- Password hashing for user authentication
- UUID primary keys to prevent enumeration attacks
- User session management with expiration
- Activity logging for audit trails
- Input validation through constraints

## Scalability Features

- Efficient indexing for large datasets
- JSONB fields for flexible data storage
- Partitioning-ready design for large tables
- Optimized queries for common operations

This schema provides a solid foundation for a comprehensive travel planning platform that can scale with user growth and feature expansion.