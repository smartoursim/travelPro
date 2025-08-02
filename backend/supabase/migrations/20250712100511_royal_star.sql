-- Travel Planning Platform Database Schema
-- This schema supports all features of the travel planning application

-- ============================================================================
-- USER MANAGEMENT
-- ============================================================================

-- Users table for authentication and profile management
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    date_of_birth DATE,
    profile_image_url TEXT,
    preferences JSONB DEFAULT '{}', -- Travel preferences, interests, etc.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    email_verified BOOLEAN DEFAULT false
);

-- User sessions for authentication
CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- LOCATION AND DESTINATION MANAGEMENT
-- ============================================================================

-- Countries table
CREATE TABLE countries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) UNIQUE NOT NULL,
    code VARCHAR(3) UNIQUE NOT NULL, -- ISO country code
    currency VARCHAR(10),
    language VARCHAR(50),
    timezone VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- States/Provinces table
CREATE TABLE states (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    country_id UUID REFERENCES countries(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(10),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(country_id, name)
);

-- Cities table
CREATE TABLE cities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    state_id UUID REFERENCES states(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    population INTEGER,
    elevation INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(state_id, name)
);

-- Main destinations table
CREATE TABLE destinations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    city_id UUID REFERENCES cities(id),
    category VARCHAR(50) NOT NULL, -- Historical, Nature, Beach, Mountain, etc.
    description TEXT NOT NULL,
    short_description VARCHAR(500),
    main_image_url TEXT,
    rating DECIMAL(3, 2) DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    best_time_to_visit VARCHAR(100),
    recommended_duration VARCHAR(50),
    difficulty_level VARCHAR(20), -- Easy, Moderate, Difficult
    accessibility_info TEXT,
    history TEXT,
    culture TEXT,
    interesting_facts TEXT[],
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Destination images
CREATE TABLE destination_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    destination_id UUID REFERENCES destinations(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    caption VARCHAR(255),
    alt_text VARCHAR(255),
    is_primary BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Attractions within destinations
CREATE TABLE attractions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    destination_id UUID REFERENCES destinations(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('Essential', 'Optional')),
    description TEXT,
    image_url TEXT,
    opening_hours VARCHAR(100),
    entry_fee DECIMAL(10, 2) DEFAULT 0,
    visit_duration VARCHAR(50),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    contact_info JSONB,
    accessibility_info TEXT,
    best_time_to_visit VARCHAR(100),
    tips TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- BUDGET AND PRICING
-- ============================================================================

-- Budget information for destinations
CREATE TABLE destination_budgets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    destination_id UUID REFERENCES destinations(id) ON DELETE CASCADE,
    category VARCHAR(50) NOT NULL, -- accommodation, food, transport, activities
    budget_type VARCHAR(20) NOT NULL, -- budget, mid, luxury
    price_per_day DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'INR',
    description TEXT,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(destination_id, category, budget_type)
);

-- Accommodation options
CREATE TABLE accommodations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    destination_id UUID REFERENCES destinations(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL,
    type VARCHAR(50) NOT NULL, -- hotel, resort, homestay, hostel, etc.
    category VARCHAR(20) NOT NULL, -- budget, mid, luxury
    price_per_night DECIMAL(10, 2) NOT NULL,
    rating DECIMAL(3, 2),
    amenities TEXT[],
    contact_info JSONB,
    booking_url TEXT,
    image_url TEXT,
    description TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- WEATHER AND SEASONAL DATA
-- ============================================================================

-- Weather information by month for destinations
CREATE TABLE destination_weather (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    destination_id UUID REFERENCES destinations(id) ON DELETE CASCADE,
    month INTEGER NOT NULL CHECK (month >= 1 AND month <= 12),
    min_temperature INTEGER,
    max_temperature INTEGER,
    rainfall INTEGER, -- in mm
    humidity INTEGER, -- percentage
    weather_description TEXT,
    clothing_recommendations TEXT[],
    activities_recommended TEXT[],
    travel_tips TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(destination_id, month)
);

-- Seasonal recommendations
CREATE TABLE seasonal_recommendations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    month INTEGER NOT NULL CHECK (month >= 1 AND month <= 12),
    season VARCHAR(20) NOT NULL,
    best_destinations UUID[] NOT NULL, -- Array of destination IDs
    festivals TEXT[],
    general_tips TEXT[],
    clothing_essentials TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(month)
);

-- ============================================================================
-- TRIP PLANNING
-- ============================================================================

-- User trip plans
CREATE TABLE trip_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    destination_id UUID REFERENCES destinations(id),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    travelers_count INTEGER NOT NULL DEFAULT 1,
    budget_range VARCHAR(20), -- budget, mid, luxury
    accommodation_type VARCHAR(50),
    transport_mode VARCHAR(50),
    interests TEXT[],
    total_budget DECIMAL(12, 2),
    status VARCHAR(20) DEFAULT 'draft', -- draft, confirmed, completed, cancelled
    notes TEXT,
    is_public BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Daily itinerary for trip plans
CREATE TABLE trip_itineraries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trip_plan_id UUID REFERENCES trip_plans(id) ON DELETE CASCADE,
    day_number INTEGER NOT NULL,
    date DATE NOT NULL,
    title VARCHAR(200),
    description TEXT,
    total_cost DECIMAL(10, 2) DEFAULT 0,
    travel_time VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(trip_plan_id, day_number)
);

-- Activities within daily itineraries
CREATE TABLE itinerary_activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    itinerary_id UUID REFERENCES trip_itineraries(id) ON DELETE CASCADE,
    attraction_id UUID REFERENCES attractions(id),
    activity_type VARCHAR(50) NOT NULL, -- attraction, meal, transport, accommodation
    name VARCHAR(200) NOT NULL,
    description TEXT,
    start_time TIME,
    duration VARCHAR(50),
    cost DECIMAL(10, 2) DEFAULT 0,
    location VARCHAR(200),
    notes TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- BLOG AND CONTENT MANAGEMENT
-- ============================================================================

-- Blog categories
CREATE TABLE blog_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog posts
CREATE TABLE blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(300) NOT NULL,
    slug VARCHAR(300) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    author_name VARCHAR(100) NOT NULL,
    author_id UUID REFERENCES users(id),
    category_id UUID REFERENCES blog_categories(id),
    featured_image_url TEXT,
    read_time INTEGER, -- in minutes
    tags TEXT[],
    meta_description VARCHAR(160),
    is_published BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- USER INTERACTIONS
-- ============================================================================

-- User reviews for destinations
CREATE TABLE destination_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    destination_id UUID REFERENCES destinations(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(200),
    review_text TEXT,
    visit_date DATE,
    travel_type VARCHAR(50), -- solo, couple, family, friends
    helpful_count INTEGER DEFAULT 0,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, destination_id)
);

-- User favorites
CREATE TABLE user_favorites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    destination_id UUID REFERENCES destinations(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, destination_id)
);

-- User search history
CREATE TABLE search_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    search_query VARCHAR(500) NOT NULL,
    filters JSONB,
    results_count INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- SYSTEM TABLES
-- ============================================================================

-- System settings
CREATE TABLE system_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key VARCHAR(100) UNIQUE NOT NULL,
    value TEXT,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activity logs
CREATE TABLE activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50),
    entity_id UUID,
    details JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

-- User indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);

-- Location indexes
CREATE INDEX idx_destinations_category ON destinations(category);
CREATE INDEX idx_destinations_rating ON destinations(rating DESC);
CREATE INDEX idx_destinations_city_id ON destinations(city_id);
CREATE INDEX idx_destinations_slug ON destinations(slug);
CREATE INDEX idx_destinations_location ON destinations(latitude, longitude);

-- Search indexes
CREATE INDEX idx_destinations_name_search ON destinations USING gin(to_tsvector('english', name));
CREATE INDEX idx_destinations_description_search ON destinations USING gin(to_tsvector('english', description));
CREATE INDEX idx_blog_posts_search ON blog_posts USING gin(to_tsvector('english', title || ' ' || content));

-- Trip planning indexes
CREATE INDEX idx_trip_plans_user_id ON trip_plans(user_id);
CREATE INDEX idx_trip_plans_dates ON trip_plans(start_date, end_date);
CREATE INDEX idx_trip_itineraries_trip_plan_id ON trip_itineraries(trip_plan_id);

-- Review indexes
CREATE INDEX idx_destination_reviews_destination_id ON destination_reviews(destination_id);
CREATE INDEX idx_destination_reviews_rating ON destination_reviews(rating);

-- Blog indexes
CREATE INDEX idx_blog_posts_published ON blog_posts(is_published, published_at DESC);
CREATE INDEX idx_blog_posts_category ON blog_posts(category_id);

-- Weather indexes
CREATE INDEX idx_destination_weather_destination_month ON destination_weather(destination_id, month);

-- ============================================================================
-- TRIGGERS FOR AUTOMATIC UPDATES
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_destinations_updated_at BEFORE UPDATE ON destinations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_trip_plans_updated_at BEFORE UPDATE ON trip_plans FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_destination_reviews_updated_at BEFORE UPDATE ON destination_reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update destination rating when reviews are added/updated
CREATE OR REPLACE FUNCTION update_destination_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE destinations 
    SET 
        rating = (
            SELECT ROUND(AVG(rating)::numeric, 2)
            FROM destination_reviews 
            WHERE destination_id = COALESCE(NEW.destination_id, OLD.destination_id)
        ),
        review_count = (
            SELECT COUNT(*)
            FROM destination_reviews 
            WHERE destination_id = COALESCE(NEW.destination_id, OLD.destination_id)
        )
    WHERE id = COALESCE(NEW.destination_id, OLD.destination_id);
    
    RETURN COALESCE(NEW, OLD);
END;
$$ language 'plpgsql';

-- Apply rating update triggers
CREATE TRIGGER update_destination_rating_on_review_insert 
    AFTER INSERT ON destination_reviews 
    FOR EACH ROW EXECUTE FUNCTION update_destination_rating();

CREATE TRIGGER update_destination_rating_on_review_update 
    AFTER UPDATE ON destination_reviews 
    FOR EACH ROW EXECUTE FUNCTION update_destination_rating();

CREATE TRIGGER update_destination_rating_on_review_delete 
    AFTER DELETE ON destination_reviews 
    FOR EACH ROW EXECUTE FUNCTION update_destination_rating();