export async function apiClient<T>(url: string, options: RequestInit = {}): Promise<T> {
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!res.ok) throw new Error(`Request failed: ${res.statusText}`);

    return res.json();
  } catch (error) {
    console.error('API Request Error:', error);
    throw new Error('An error occurred while fetching data.');
  }
}
