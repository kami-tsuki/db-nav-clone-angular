import {Injectable} from '@angular/core';

interface CacheContent {
    expiry: number;
    value: any;
}

@Injectable({
    providedIn: 'root'
})
export class CacheService {
    private cache = new Map<string, CacheContent>();

    constructor() {
        setInterval(() => this.removeExpiredEntries(), 10000);
    }

    get(key: string): any {
        if (!this.cache.has(key)) {
            return null;
        }

        const cacheContent = this.cache.get(key);

        if (cacheContent && cacheContent.expiry < Date.now()) {
            this.cache.delete(key);
            return null;
        }

        return cacheContent?.value;
    }

    set(key: string, value: any, ttl: number = 300000): void {
        const expiry = Date.now() + ttl;
        this.cache.set(key, {value, expiry});
    }

    remove(key: string): void {
        this.cache.delete(key);
    }

    update(key: string, value: any, ttl: number = 300000): void {
        this.set(key, value, ttl);
    }

    clear(): void {
        this.cache.clear();
    }

    has(key: string): boolean {
        return this.cache.has(key);
    }

    keys(): IterableIterator<string> {
        return this.cache.keys();
    }

    values(): IterableIterator<CacheContent> {
        return this.cache.values();
    }

    entries(): IterableIterator<[string, CacheContent]> {
        return this.cache.entries();
    }

    private removeExpiredEntries(): void {
        let removedCount = 0;
        for (const [key, cacheContent] of this.cache.entries()) {
            if (cacheContent.expiry < Date.now()) {
                this.cache.delete(key);
                removedCount++;
            }
        }
        console.log(`Removed ${removedCount} expired cache entries.`);
    }
}
