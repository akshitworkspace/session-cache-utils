/**
 * Shape of the cached data stored in sessionStorage.
 */
type CachedDataShape<T> = {
    data: T;
    created_at: number;
    updated_at: number;
};
/**
 * Retrieves cached data from sessionStorage.
 * Must be called in a client-side environment.
 *
 * @param {string} keyName - Key name used to store the data
 * @param {number} notOlderThan - Max age allowed (in minutes)
 * @returns {CachedDataShape<T> | null} - Parsed data or null if not found or invalid
 */
export declare function readCache<T>(keyName: string, notOlderThan: number): CachedDataShape<T> | null;
/**
 * Writes data to sessionStorage
 * It will replace the existing data if found
 * Else will create a new entry
 *
 * @param {string} keyName - Key name used to replace the data
 * @param {T} chunk - Data to be stored
 * @returns {boolean} - True if cached success
 */
export declare function writeCache<T>(keyName: string, chunk: T): boolean;
/**
 * Removes data from storage
 *
 * @param {string} keyName - Key name to remove
 * @returns {boolean}
 */
export declare function invalidateCache(keyName: string): boolean;
export {};
