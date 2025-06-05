/**
 * Shape of the cached data stored in sessionStorage.
 */
type CachedDataShape<T> = {
    data: T;
    created_at: number;
    updated_at: number;
};

//Constants
const ONE_DAY = 86400000;
//Helpers
const getWhenItCached = (keyName: string): number | null => {
    try {
        const data = sessionStorage.getItem(keyName);
        if (!data) return null;
        const parsedData = JSON.parse(data) as CachedDataShape<any>;
        if (!parsedData || isNaN(parsedData?.created_at)) return null;
        return parsedData.created_at;
    }
    catch {
        return null;
    }
};
const minutesToMillisec = (minutes: number) => {
    if (!minutes || isNaN(minutes) || minutes <= 0) {
        throw new Error("Invalid minutes argument for cache TTL.");
    };
    return minutes * 60 * 1000;
}

/**
 * Retrieves cached data from sessionStorage.
 * Must be called in a client-side environment.
 *
 * @param {string} keyName - Key name used to store the data
 * @param {number} notOlderThan - Max age allowed (in minutes)
 * @returns {CachedDataShape<T> | null} - Parsed data or null if not found or invalid
 */
export function readCache<T>(keyName: string, notOlderThan: number): CachedDataShape<T> | null {
    if (typeof window === "undefined") return null;

    try {
        const rawData = sessionStorage.getItem(keyName);
        if (!rawData) return null;

        const parsedData = JSON.parse(rawData) as CachedDataShape<T>;
        if (!parsedData || typeof parsedData !== "object") throw new Error("Invalid structure");

        const { updated_at } = parsedData;
        const timeNow = Date.now();
        const maxAge = Math.min(minutesToMillisec(notOlderThan), ONE_DAY);
        const age = timeNow - updated_at;

        if (isNaN(age) || age > maxAge) throw new Error("Cache expired");

        return parsedData;
    } catch {
        sessionStorage.removeItem(keyName);
        return null;
    }
};

/**
 * Writes data to sessionStorage
 * It will replace the existing data if found
 * Else will create a new entry
 * 
 * @param {string} keyName - Key name used to replace the data
 * @param {T} chunk - Data to be stored
 * @returns {boolean} - True if cached success 
 */
export function writeCache<T>(keyName: string, chunk: T): boolean {
    if (typeof window === "undefined") return false;

    if (!keyName || !chunk) return false;
    try {
        const timeNow = Date.now();
        const cachedOn = getWhenItCached(keyName);
        const payload: CachedDataShape<T> = {
            data: chunk,
            created_at: cachedOn || timeNow,
            updated_at: timeNow
        };
        sessionStorage.setItem(keyName, JSON.stringify(payload));
        return true;
    }
    catch {
        return false;
    }
};

/**
 * Removes data from storage
 * 
 * @param {string} keyName - Key name to remove
 * @returns {boolean}
 */
export function invalidateCache(keyName: string): boolean {
    if (typeof window === "undefined") return false;
    try {
        sessionStorage.removeItem(keyName);
        return true;
    }
    catch {
        return false;
    }
}
