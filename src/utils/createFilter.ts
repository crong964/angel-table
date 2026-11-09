export function createFilter(filters: Record<string, string>) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== '') {
      params.set(key, value);
    }
  });

  return params;
}
