export const DB = {
  async get(key: string): Promise<string | null> {
    return await SIGNAGE_KV.get(key);
  },
  async put(key: string, value: string, expirationTtl?: number): Promise<void> {
    await SIGNAGE_KV.put(key, value, { expirationTtl });
  },
  async delete(key: string): Promise<void> {
    await SIGNAGE_KV.delete(key);
  }
};