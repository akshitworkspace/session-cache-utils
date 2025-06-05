# ⚡️ session-cache-utils

> Super lightweight, zero-dependency utility to cache data in `sessionStorage` — with automatic TTL expiration, type safety, and full control.

---

## 🚀 Why use this?

- ✅ **Simple**: One function to read, one to write, one to invalidate. That’s it.
- 🧠 **Smart**: Auto-expires stale data based on TTL (in minutes).
- 🧱 **Type-safe**: Written in TypeScript, strongly typed all the way.
- 🌐 **Browser-native**: Uses `sessionStorage`, nothing extra.
- 📦 **Framework-agnostic**: Works in React, Next.js, Svelte, or plain JavaScript apps.

---

## 📦 Installation

```bash
npm install session-cache-utils
```




## Usage/Examples

```javascript
import { writeCache, readCache, invalidateCache } from "session-cache-utils";

//📝 Write to cache
writeCache("user-profile", { id: 42, name: "Akshit" });

//🔍 Read from cache (if not older than 30 minutes)
const result = readCache<{ id: number; name: string }>("user-profile", 30);
console.log(result?.data); // { id: 42, name: "Akshit" }

//❌ Invalidate cache
invalidateCache("user-profile");

```


## 📖 API Reference

| Method                 | Description                   | Example                      |
| ---------------------- | ----------------------------- | ---------------------------- |
| `readCache<T>(key, ttlMinutes)`      | Reads cached data and returns it only if it’s still fresh (not older than ttlMinutes)    | `readCache<User>("user-data", 30) → { data, created_at, updated_at } or null` |
| `writeCache<T>(key, value)` | Writes or updates the cache entry with current timestamps. | `writeCache("user-data", { id: 1, name: "Akshit" }) → true`    |
| `invalidateCache(key)`   | Removes the specified cache entry from sessionStorage     | `invalidateCache("user-data") → true`        |

## 📦 CachedDataShape<T>
Internal structure used to store cached entries:

```readCache``` api will always return this type for cached entry else ```null```
```javascript
type CachedDataShape<T> = {
  data: T;
  created_at: number;
  updated_at: number;
};
```

## 🧠 Use Case Examples

⚙️ Store UI filters temporarily

📄 Cache API response for current tab

🧭 Save navigation state across routes

💾 Cache form data between page reloads


## ⛔ Things to know

Only works client-side (window required).

TTL is capped at 24 hours internally for sanity.
  
Falls back to null and auto-cleans expired data.

## Authors
✨ Made with focus by Akshit
- [@akshitworkspace](https://github.com/akshitworkspace)


## License

MIT – free for personal and commercial use.