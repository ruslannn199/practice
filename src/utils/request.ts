export const request = async <T extends unknown>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const response = await fetch(`http://localhost:8000/${url}`, options);
  return response.json();
};
