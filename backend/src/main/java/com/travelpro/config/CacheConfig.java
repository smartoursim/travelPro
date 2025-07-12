package com.travelpro.config;

import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

@Configuration
@EnableCaching
public class CacheConfig {

    @Bean
    public CacheManager cacheManager(RedisConnectionFactory redisConnectionFactory) {
        RedisCacheConfiguration defaultConfig = RedisCacheConfiguration.defaultCacheConfig()
                .entryTtl(Duration.ofMinutes(10))
                .serializeKeysWith(RedisSerializationContext.SerializationPair
                        .fromSerializer(new StringRedisSerializer()))
                .serializeValuesWith(RedisSerializationContext.SerializationPair
                        .fromSerializer(new GenericJackson2JsonRedisSerializer()));

        Map<String, RedisCacheConfiguration> cacheConfigurations = new HashMap<>();
        
        // Cache configurations for different cache names
        cacheConfigurations.put("destinations", defaultConfig.entryTtl(Duration.ofHours(1)));
        cacheConfigurations.put("destination", defaultConfig.entryTtl(Duration.ofHours(2)));
        cacheConfigurations.put("featuredDestinations", defaultConfig.entryTtl(Duration.ofHours(6)));
        cacheConfigurations.put("topDestinations", defaultConfig.entryTtl(Duration.ofHours(6)));
        cacheConfigurations.put("destinationCategories", defaultConfig.entryTtl(Duration.ofHours(12)));
        
        cacheConfigurations.put("blogPosts", defaultConfig.entryTtl(Duration.ofMinutes(30)));
        cacheConfigurations.put("blogPost", defaultConfig.entryTtl(Duration.ofHours(1)));
        cacheConfigurations.put("featuredBlogPosts", defaultConfig.entryTtl(Duration.ofHours(2)));
        cacheConfigurations.put("blogCategories", defaultConfig.entryTtl(Duration.ofHours(12)));
        cacheConfigurations.put("blogCategory", defaultConfig.entryTtl(Duration.ofHours(12)));

        return RedisCacheManager.builder(redisConnectionFactory)
                .cacheDefaults(defaultConfig)
                .withInitialCacheConfigurations(cacheConfigurations)
                .build();
    }
}