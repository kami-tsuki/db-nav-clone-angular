import {Injectable} from '@angular/core';

/**
 * Interface for the content of the cache.
 * Contains the expiry time and the value of the cache entry.
 */
interface CacheContent {
    expiry: number;
    value: any;
}

@Injectable({
    providedIn: 'root'
})
/**
 * Service for caching data.
 * Provides methods for getting, setting, removing, updating, and clearing cache entries.
 */
export class CacheService {
    private cache = new Map<string, CacheContent>();
    private cacheSpace: number = 100;

    /**
     * Initializes the CacheService.
     * Logs the initial cache space.
     */
    constructor() {
        console.log('CacheService initialized with cacheSpace:', this.cacheSpace);
    }

    /**
     * Gets the value of a cache entry by key.
     * If the key does not exist or the cache entry has expired, returns null.
     * @param key - The key of the cache entry.
     * @returns The value of the cache entry, or null if the key does not exist or the cache entry has expired.
     */
    get(key: string): any {
        console.log('Getting value for key:', key);
        if (!this.cache.has(key)) {
            console.log('Key not found in cache:', key);
            return null;
        }

        const cacheContent = this.cache.get(key);

        if (cacheContent && cacheContent.expiry < Date.now()) {
            console.log('Cache content expired for key:', key);
            this.cache.delete(key);
            return null;
        }

        console.log('Returning value for key:', key);
        return cacheContent?.value;
    }

    /**
     * Sets the value of a cache entry.
     * If the cache is full, removes the oldest cache entry.
     * @param key - The key of the cache entry.
     * @param value - The value of the cache entry.
     * @param ttl - The time to live (expiry time) of the cache entry in milliseconds. Default is 300000 ms (5 minutes).
     */
    set(key: string, value: any, ttl: number = 300000): void {
        console.log('Setting value for key:', key);
        if (this.cache.size >= this.cacheSpace) {
            const oldestKey = this.cache.keys().next().value;
            console.log('Cache is full, removing oldest key:', oldestKey);
            this.cache.delete(oldestKey);
        }

        const expiry = Date.now() + ttl;
        this.cache.set(key, {value, expiry});
        console.log('Value set for key:', key);
    }

    /**
     * Removes a cache entry by key.
     * @param key - The key of the cache entry.
     */
    remove(key: string): void {
        console.log('Removing value for key:', key);
        this.cache.delete(key);
    }

    /**
     * Updates the value of a cache entry.
     * This is equivalent to setting the value of the cache entry.
     * @param key - The key of the cache entry.
     * @param value - The new value of the cache entry.
     * @param ttl - The new time to live (expiry time) of the cache entry in milliseconds. Default is 300000 ms (5 minutes).
     */
    update(key: string, value: any, ttl: number = 300000): void {
        console.log('Updating value for key:', key);
        this.set(key, value, ttl);
    }

    /**
     * Clears all cache entries.
     */
    clear(): void {
        console.log('Clearing cache');
        this.cache.clear();
    }

    /**
     * Removes all expired cache entries.
     * This method is private and can only be called within the CacheService class.
     */
    private removeExpiredEntries(): void {
        console.log('Removing expired entries');
        for (const [key, cacheContent] of this.cache.entries()) {
            if (cacheContent.expiry < Date.now()) {
                console.log('Cache content expired for key:', key);
                this.cache.delete(key);
            }
        }
    }
}
