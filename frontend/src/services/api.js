const API_URL =
  "http://localhost:5000";

export const fetchData =
  async (
    url,
    options = {}
  ) => {
    const response =
      await fetch(
        `${API_URL}${url}`,
        options
      );

    const data =
      await response.json();

    if (!response.ok) {
      throw new Error(
        data.message
      );
    }

    return data;
  };

export default API_URL;