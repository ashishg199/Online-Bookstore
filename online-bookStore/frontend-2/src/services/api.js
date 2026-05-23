export const API_URL = "http://localhost:5000";

export const fetchData = async (url, options = {}) => {
  const res = await fetch(`${API_URL}${url}`, options);
  if (!res.ok) throw new Error("API Error");
  return res.json();
};