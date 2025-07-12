-- Seed Data for Travel Planning Platform
-- This file contains sample data to populate the database

-- ============================================================================
-- COUNTRIES AND LOCATIONS
-- ============================================================================

-- Insert countries
INSERT INTO countries (name, code, currency, language, timezone) VALUES
('India', 'IND', 'INR', 'Hindi/English', 'Asia/Kolkata'),
('Nepal', 'NPL', 'NPR', 'Nepali', 'Asia/Kathmandu'),
('Bhutan', 'BTN', 'BTN', 'Dzongkha', 'Asia/Thimphu'),
('Sri Lanka', 'LKA', 'LKR', 'Sinhala/Tamil', 'Asia/Colombo'),
('Thailand', 'THA', 'THB', 'Thai', 'Asia/Bangkok'),
('Malaysia', 'MYS', 'MYR', 'Malay', 'Asia/Kuala_Lumpur'),
('Singapore', 'SGP', 'SGD', 'English/Malay/Tamil/Chinese', 'Asia/Singapore');

-- Insert Indian states
INSERT INTO states (country_id, name, code) 
SELECT c.id, state_name, state_code FROM countries c, (VALUES
    ('Uttar Pradesh', 'UP'),
    ('Kerala', 'KL'),
    ('Goa', 'GA'),
    ('Rajasthan', 'RJ'),
    ('Himachal Pradesh', 'HP'),
    ('Maharashtra', 'MH'),
    ('Tamil Nadu', 'TN'),
    ('Karnataka', 'KA'),
    ('West Bengal', 'WB'),
    ('Gujarat', 'GJ'),
    ('Madhya Pradesh', 'MP'),
    ('Uttarakhand', 'UK'),
    ('Jammu and Kashmir', 'JK'),
    ('Punjab', 'PB'),
    ('Haryana', 'HR'),
    ('Delhi', 'DL')
) AS states_data(state_name, state_code)
WHERE c.name = 'India';

-- Insert cities
INSERT INTO cities (state_id, name, latitude, longitude, population)
SELECT s.id, city_name, lat, lng, pop FROM states s, (VALUES
    ('Uttar Pradesh', 'Agra', 27.1767, 78.0081, 1686976),
    ('Kerala', 'Alleppey', 9.4981, 76.3388, 174164),
    ('Kerala', 'Kochi', 9.9312, 76.2673, 677381),
    ('Goa', 'Panaji', 15.4909, 73.8278, 114405),
    ('Rajasthan', 'Jaipur', 26.9124, 75.7873, 3073350),
    ('Rajasthan', 'Udaipur', 24.5854, 73.7125, 451735),
    ('Himachal Pradesh', 'Shimla', 31.1048, 77.1734, 169578),
    ('Himachal Pradesh', 'Manali', 32.2396, 77.1887, 8096),
    ('Maharashtra', 'Mumbai', 19.0760, 72.8777, 12442373),
    ('Tamil Nadu', 'Chennai', 13.0827, 80.2707, 4681087),
    ('Karnataka', 'Bangalore', 12.9716, 77.5946, 8443675),
    ('West Bengal', 'Kolkata', 22.5726, 88.3639, 4496694),
    ('Delhi', 'New Delhi', 28.6139, 77.2090, 249998)
) AS cities_data(state_name, city_name, lat, lng, pop)
WHERE s.name = cities_data.state_name;

-- ============================================================================
-- BLOG CATEGORIES
-- ============================================================================

INSERT INTO blog_categories (name, slug, description, sort_order) VALUES
('Travel Tips', 'travel-tips', 'Practical advice and tips for travelers', 1),
('Destination Guides', 'destination-guides', 'Comprehensive guides to destinations', 2),
('Budget Travel', 'budget-travel', 'Money-saving tips and budget travel advice', 3),
('Seasonal Travel', 'seasonal-travel', 'Best times to visit destinations', 4),
('Culture', 'culture', 'Cultural insights and local customs', 5),
('Food', 'food', 'Local cuisine and food experiences', 6),
('Adventure', 'adventure', 'Adventure travel and outdoor activities', 7),
('Photography', 'photography', 'Travel photography tips and guides', 8);

-- ============================================================================
-- DESTINATIONS
-- ============================================================================

-- Insert sample destinations
INSERT INTO destinations (name, slug, city_id, category, description, short_description, main_image_url, rating, best_time_to_visit, recommended_duration, history, culture, interesting_facts, latitude, longitude, is_featured)
SELECT 
    c.id,
    dest_data.*
FROM cities c
JOIN (VALUES
    ('Agra', 'Taj Mahal', 'taj-mahal', 'Historical', 
     'An ivory-white marble mausoleum and UNESCO World Heritage Site, considered one of the finest examples of Mughal architecture.',
     'Iconic marble mausoleum and symbol of eternal love',
     'https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg',
     4.8, 'October to March', '1-2 days',
     'Built between 1632-1653 by Mughal Emperor Shah Jahan as a mausoleum for his beloved wife Mumtaz Mahal.',
     'Symbol of eternal love and architectural marvel representing the pinnacle of Mughal art and craftsmanship.',
     ARRAY['Changes color throughout the day', 'Took 22 years to complete', 'Main dome is 35 meters high'],
     27.1751, 78.0421, true),
    
    ('Alleppey', 'Kerala Backwaters', 'kerala-backwaters', 'Nature',
     'A network of brackish lagoons and lakes lying parallel to the Arabian Sea coast, famous for houseboat cruises.',
     'Serene waterways perfect for houseboat experiences',
     'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg',
     4.6, 'November to February', '2-3 days',
     'The backwaters were formed by the action of waves and shore currents creating a natural water system.',
     'Central to Kerala culture, supporting fishing communities and traditional industries.',
     ARRAY['Stretches over 900 km of waterways', 'Home to over 150 species of fish', 'Traditional houseboats called Kettuvallams'],
     9.4981, 76.3388, true),
     
    ('Panaji', 'Goa Beaches', 'goa-beaches', 'Beach',
     'Golden sandy beaches, Portuguese colonial architecture, and vibrant nightlife along India''s western coast.',
     'Tropical paradise with beaches and Portuguese heritage',
     'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg',
     4.4, 'November to February', '3-5 days',
     'Former Portuguese colony for over 450 years, liberated in 1961.',
     'Famous for its laid-back lifestyle, seafood cuisine, and vibrant festivals.',
     ARRAY['Smallest state in India by area', 'Two UNESCO World Heritage Sites', 'Famous for cashew production'],
     15.4909, 73.8278, true),
     
    ('Jaipur', 'Rajasthan Palaces', 'rajasthan-palaces', 'Historical',
     'Royal palaces and forts showcasing the grandeur of Rajput architecture and rich cultural heritage.',
     'Pink City with magnificent palaces and forts',
     'https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg',
     4.7, 'October to March', '4-6 days',
     'Land of maharajas and legendary warriors, with magnificent forts and palaces built over centuries.',
     'Rich traditions of folk music, dance, handicrafts, and colorful festivals.',
     ARRAY['Known as the Pink City', 'Home to the Thar Desert', 'Three UNESCO World Heritage Sites'],
     26.9124, 75.7873, true),
     
    ('Shimla', 'Himachal Mountains', 'himachal-mountains', 'Mountain',
     'Scenic hill stations with snow-capped peaks, adventure sports, and colonial architecture.',
     'Former British summer capital in the Himalayas',
     'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg',
     4.5, 'March to June, September to November', '4-7 days',
     'Former British summer capital, established as a hill station in 1822.',
     'Blend of Hindu culture with Tibetan influences, famous for apple orchards.',
     ARRAY['Summer capital of British India', 'UNESCO World Heritage Kalka-Shimla Railway', 'Gateway to adventure sports'],
     31.1048, 77.1734, false)
) AS dest_data(city_name, dest_name, dest_slug, dest_category, dest_description, dest_short_description, dest_image, dest_rating, dest_best_time, dest_duration, dest_history, dest_culture, dest_facts, dest_lat, dest_lng, dest_featured)
ON c.name = dest_data.city_name;

-- ============================================================================
-- ATTRACTIONS
-- ============================================================================

-- Insert attractions for Taj Mahal
INSERT INTO attractions (destination_id, name, type, description, image_url, opening_hours, entry_fee, visit_duration, latitude, longitude)
SELECT d.id, attr_name, attr_type, attr_desc, attr_image, attr_hours, attr_fee, attr_duration, attr_lat, attr_lng
FROM destinations d, (VALUES
    ('taj-mahal', 'Taj Mahal Main Mausoleum', 'Essential', 'The iconic white marble mausoleum with intricate inlay work and perfect symmetry.', 'https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg', '6:00 AM - 7:00 PM (Closed on Fridays)', 1100, '2-3 hours', 27.1751, 78.0421),
    ('taj-mahal', 'Taj Mahal Mosque', 'Essential', 'Red sandstone mosque on the western side of the Taj Mahal complex.', 'https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg', '6:00 AM - 7:00 PM', 0, '30 minutes', 27.1749, 78.0419),
    ('taj-mahal', 'Mehtab Bagh', 'Optional', 'Charbagh complex offering stunning sunset views of the Taj Mahal.', 'https://images.pexels.com/photos/2376997/pexels-photo-2376997.jpeg', '6:00 AM - 6:00 PM', 300, '1 hour', 27.1767, 78.0434)
) AS attr_data(dest_slug, attr_name, attr_type, attr_desc, attr_image, attr_hours, attr_fee, attr_duration, attr_lat, attr_lng)
WHERE d.slug = attr_data.dest_slug;

-- ============================================================================
-- BUDGET DATA
-- ============================================================================

-- Insert budget data for destinations
INSERT INTO destination_budgets (destination_id, category, budget_type, price_per_day)
SELECT d.id, budget_category, budget_type, price
FROM destinations d, (VALUES
    ('taj-mahal', 'accommodation', 'budget', 1500),
    ('taj-mahal', 'accommodation', 'mid', 4000),
    ('taj-mahal', 'accommodation', 'luxury', 8000),
    ('taj-mahal', 'food', 'budget', 800),
    ('taj-mahal', 'food', 'mid', 2000),
    ('taj-mahal', 'food', 'luxury', 4000),
    ('taj-mahal', 'transport', 'local', 500),
    ('taj-mahal', 'transport', 'private', 2000),
    ('taj-mahal', 'activities', 'average', 1500),
    
    ('kerala-backwaters', 'accommodation', 'budget', 2000),
    ('kerala-backwaters', 'accommodation', 'mid', 5000),
    ('kerala-backwaters', 'accommodation', 'luxury', 12000),
    ('kerala-backwaters', 'food', 'budget', 600),
    ('kerala-backwaters', 'food', 'mid', 1500),
    ('kerala-backwaters', 'food', 'luxury', 3000),
    ('kerala-backwaters', 'transport', 'local', 300),
    ('kerala-backwaters', 'transport', 'private', 1500),
    ('kerala-backwaters', 'activities', 'average', 3000)
) AS budget_data(dest_slug, budget_category, budget_type, price)
WHERE d.slug = budget_data.dest_slug;

-- ============================================================================
-- WEATHER DATA
-- ============================================================================

-- Insert weather data for destinations
INSERT INTO destination_weather (destination_id, month, min_temperature, max_temperature, rainfall, humidity, weather_description)
SELECT d.id, month_num, min_temp, max_temp, rainfall_mm, humidity_pct, weather_desc
FROM destinations d, (VALUES
    ('taj-mahal', 1, 7, 21, 15, 65, 'Cool and pleasant'),
    ('taj-mahal', 2, 10, 24, 10, 60, 'Ideal weather'),
    ('taj-mahal', 3, 15, 30, 8, 55, 'Pleasant and warm'),
    ('taj-mahal', 4, 21, 36, 5, 50, 'Hot but bearable'),
    ('taj-mahal', 5, 26, 42, 10, 45, 'Very hot'),
    ('taj-mahal', 6, 29, 40, 60, 70, 'Hot and humid'),
    ('taj-mahal', 7, 27, 35, 200, 80, 'Monsoon season'),
    ('taj-mahal', 8, 26, 33, 250, 85, 'Heavy rains'),
    ('taj-mahal', 9, 24, 34, 150, 75, 'Post-monsoon'),
    ('taj-mahal', 10, 19, 33, 10, 55, 'Pleasant and clear'),
    ('taj-mahal', 11, 14, 29, 5, 50, 'Cool and comfortable'),
    ('taj-mahal', 12, 9, 25, 2, 45, 'Cool and dry'),
    
    ('kerala-backwaters', 1, 20, 31, 5, 65, 'Cool and dry'),
    ('kerala-backwaters', 2, 22, 32, 8, 68, 'Perfect for cruising'),
    ('kerala-backwaters', 3, 24, 33, 15, 70, 'Warm and pleasant'),
    ('kerala-backwaters', 4, 26, 34, 50, 75, 'Getting warmer'),
    ('kerala-backwaters', 5, 27, 33, 150, 80, 'Pre-monsoon showers'),
    ('kerala-backwaters', 6, 25, 30, 400, 85, 'Monsoon begins'),
    ('kerala-backwaters', 7, 24, 29, 500, 90, 'Heavy monsoon'),
    ('kerala-backwaters', 8, 24, 29, 450, 88, 'Peak monsoon'),
    ('kerala-backwaters', 9, 24, 30, 300, 85, 'Retreating monsoon'),
    ('kerala-backwaters', 10, 24, 31, 200, 80, 'Post-monsoon'),
    ('kerala-backwaters', 11, 23, 32, 20, 75, 'Pleasant and cool'),
    ('kerala-backwaters', 12, 21, 31, 10, 70, 'Ideal weather')
) AS weather_data(dest_slug, month_num, min_temp, max_temp, rainfall_mm, humidity_pct, weather_desc)
WHERE d.slug = weather_data.dest_slug;

-- ============================================================================
-- SEASONAL RECOMMENDATIONS
-- ============================================================================

INSERT INTO seasonal_recommendations (month, season, best_destinations, festivals, general_tips, clothing_essentials)
SELECT month_num, season_name, dest_array, festival_array, tips_array, clothing_array
FROM (VALUES
    (1, 'Winter', ARRAY['taj-mahal', 'goa-beaches', 'kerala-backwaters', 'rajasthan-palaces'], 
     ARRAY['Makar Sankranti', 'Pongal', 'Republic Day'],
     ARRAY['Perfect time for South India travel', 'Book accommodations early', 'Carry light woolens for North India'],
     ARRAY['Light woolens', 'Warm layers for evenings', 'Comfortable walking shoes', 'Sunglasses']),
     
    (2, 'Winter', ARRAY['goa-beaches', 'rajasthan-palaces', 'kerala-backwaters', 'himachal-mountains'],
     ARRAY['Vasant Panchami', 'Maha Shivratri', 'Carnival (Goa)'],
     ARRAY['Excellent weather for most destinations', 'Peak tourist season', 'Book flights and hotels in advance'],
     ARRAY['Light cotton clothes', 'Warm layers for hills', 'Sunscreen', 'Comfortable shoes']),
     
    (6, 'Summer', ARRAY['himachal-mountains'],
     ARRAY['Rath Yatra', 'Hemis Festival'],
     ARRAY['Escape to hill stations', 'Avoid plains due to extreme heat', 'Perfect for high-altitude treks'],
     ARRAY['Light breathable clothes', 'Rainwear', 'Waterproof shoes', 'Quick-dry fabrics']),
     
    (12, 'Winter', ARRAY['goa-beaches', 'rajasthan-palaces', 'kerala-backwaters', 'taj-mahal'],
     ARRAY['Christmas', 'New Year'],
     ARRAY['Peak tourist season', 'Book early for better rates', 'Perfect for beach destinations'],
     ARRAY['Light woolens', 'Warm layers', 'Comfortable shoes', 'Sun protection'])
) AS seasonal_data(month_num, season_name, dest_array, festival_array, tips_array, clothing_array);

-- ============================================================================
-- SYSTEM SETTINGS
-- ============================================================================

INSERT INTO system_settings (key, value, description) VALUES
('site_name', 'TravelPro', 'Name of the travel platform'),
('default_currency', 'INR', 'Default currency for pricing'),
('max_trip_duration', '30', 'Maximum trip duration in days'),
('default_budget_type', 'mid', 'Default budget category'),
('review_moderation', 'true', 'Whether reviews need moderation'),
('max_travelers', '10', 'Maximum number of travelers per trip'),
('booking_advance_days', '365', 'Maximum days in advance for booking'),
('cancellation_policy', '24', 'Cancellation policy in hours');