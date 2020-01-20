import React, { useCallback, useState } from "react";
import axios from "axios";
export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const BASE_URL = "http://localhost:8080/api";
  const request = useCallback(
    async (url, method = "GET", data = null, headers = {}) => {
      setLoading(true);
      try {
        if (data) {
          data = JSON.stringify(data);
          headers["Content-Type"] = "application/json";
        }
        const response = await axios({
          url: `${BASE_URL}${url}`,
          method,
          data,
          headers
        });
        setLoading(false);
        return response;
      } catch (error) {
        setError(error.response.data.message);
        setLoading(false);
        throw error;
      }
    },
    []
  );

  const clearError = () => setError(null);

  return { request, error, loading, clearError };
};
