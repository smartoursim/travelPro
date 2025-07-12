# TravelPro Backend

A comprehensive Spring Boot backend for the TravelPro travel planning platform.

## Features

- **RESTful API** for destinations, blog posts, and travel planning
- **JWT Authentication** with Spring Security
- **PostgreSQL Database** with JPA/Hibernate
- **Redis Caching** for improved performance
- **OpenAPI Documentation** with Swagger UI
- **MapStruct** for DTO mapping
- **Comprehensive Error Handling**
- **Logging and Monitoring** with Actuator

## Technology Stack

- **Java 17**
- **Spring Boot 3.2.1**
- **Spring Security 6**
- **Spring Data JPA**
- **PostgreSQL**
- **Redis**
- **MapStruct**
- **OpenAPI 3**
- **Maven**

## Getting Started

### Prerequisites

- Java 17 or higher
- Maven 3.6+
- PostgreSQL 12+
- Redis 6+

### Database Setup

1. Create a PostgreSQL database:
```sql
CREATE DATABASE travelpro;
```

2. Run the migration scripts from the `supabase/migrations` folder to set up the schema and seed data.

### Configuration

Create an `application-local.yml` file in `src/main/resources` for local development:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/travelpro
    username: your_username
    password: your_password
  
  redis:
    host: localhost
    port: 6379

app:
  jwt:
    secret: your-secret-key
    expiration: 86400000
```

### Running the Application

```bash
# Navigate to backend directory
cd backend

# Run with Maven
mvn spring-boot:run

# Or run with specific profile
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

The application will start on `http://localhost:8080/api`

### API Documentation

Once the application is running, you can access:

- **Swagger UI**: http://localhost:8080/api/swagger-ui.html
- **OpenAPI JSON**: http://localhost:8080/api/v3/api-docs

### Testing

```bash
# Run all tests
mvn test

# Run tests with coverage
mvn test jacoco:report
```

## API Endpoints

### Destinations

- `GET /api/destinations` - Get all destinations (paginated)
- `GET /api/destinations/{id}` - Get destination by ID
- `GET /api/destinations/slug/{slug}` - Get destination by slug
- `GET /api/destinations/featured` - Get featured destinations
- `GET /api/destinations/top` - Get top-rated destinations
- `GET /api/destinations/search?q={query}` - Search destinations
- `GET /api/destinations/category/{category}` - Get destinations by category
- `GET /api/destinations/filter` - Filter destinations with multiple criteria
- `GET /api/destinations/categories` - Get all categories

### Blog

- `GET /api/blog/posts` - Get all blog posts (paginated)
- `GET /api/blog/posts/{slug}` - Get blog post by slug
- `GET /api/blog/posts/featured` - Get featured blog posts
- `GET /api/blog/posts/search?q={query}` - Search blog posts
- `GET /api/blog/posts/category/{categoryId}` - Get posts by category
- `GET /api/blog/categories` - Get all blog categories
- `GET /api/blog/categories/{slug}` - Get category by slug

## Architecture

### Project Structure

```
backend/
├── src/main/java/com/travelpro/
│   ├── config/          # Configuration classes
│   ├── controller/      # REST controllers
│   ├── dto/            # Data Transfer Objects
│   ├── entity/         # JPA entities
│   ├── exception/      # Exception handling
│   ├── mapper/         # MapStruct mappers
│   ├── repository/     # JPA repositories
│   ├── security/       # Security configuration
│   └── service/        # Business logic
├── src/main/resources/
│   ├── application.yml
│   ├── application-dev.yml
│   └── application-prod.yml
└── src/test/           # Test classes
```

### Key Components

- **Controllers**: Handle HTTP requests and responses
- **Services**: Contain business logic and transaction management
- **Repositories**: Data access layer using Spring Data JPA
- **DTOs**: Data transfer objects for API communication
- **Mappers**: MapStruct mappers for entity-DTO conversion
- **Security**: JWT-based authentication and authorization

## Caching Strategy

The application uses Redis for caching with different TTL values:

- **Destinations**: 1-2 hours
- **Featured content**: 6 hours
- **Categories**: 12 hours
- **Blog posts**: 30 minutes - 1 hour

## Monitoring and Health Checks

Spring Boot Actuator provides:

- **Health checks**: `/api/actuator/health`
- **Metrics**: `/api/actuator/metrics`
- **Application info**: `/api/actuator/info`

## Environment Profiles

- **dev**: Development environment with debug logging
- **prod**: Production environment with optimized settings
- **test**: Testing environment with H2 in-memory database

## Security

- JWT-based authentication
- CORS configuration for frontend integration
- Input validation and sanitization
- Comprehensive error handling without information leakage

## Performance Optimizations

- Redis caching for frequently accessed data
- Database connection pooling with HikariCP
- Lazy loading for JPA relationships
- Pagination for large datasets
- Optimized database queries

## Contributing

1. Follow the existing code style and patterns
2. Write tests for new features
3. Update documentation as needed
4. Use meaningful commit messages