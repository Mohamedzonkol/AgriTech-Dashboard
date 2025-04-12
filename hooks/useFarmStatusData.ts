"use client";
import { useState, useEffect } from "react";
import { fetchFarmStatusApi } from "../utils/api/FarmStatus";
import { FarmStatus } from "../utils/types";

export const useFarmStatusData = () => {
  const [farmStatus, setFarmStatus] = useState<FarmStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => { 
    const fetchData = async () => {
      try {
        const data = await fetchFarmStatusApi();
        setFarmStatus(data);
        setLoading(false);
      } catch (error) {
        setError(error as Error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);   

  return { farmStatus, loading, error };
};




