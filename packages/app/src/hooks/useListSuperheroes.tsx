import { useState, useCallback } from "react";
import { SuperheroDto } from "./type";

type ListSuperheroesResponse = {
  lastKey: string;
  nodes: SuperheroDto[];
};

type ListSuperheroesType = {
  data: ListSuperheroesResponse | null;
  error: any;
  loading: boolean;
  listSuperheroes: (limit?: number, startKey?: string) => void;
};

export const useListSuperheroes = (): ListSuperheroesType => {
  const [data, setData] = useState<ListSuperheroesResponse | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const listSuperheroes = useCallback(
    async (limit?: number, startKey?: string) => {
      setLoading(true);
      setError(null);

      try {
        const url = new URL(import.meta.env.VITE_API_URL + "superheroes");
        if (limit) url.searchParams.append("limit", limit.toString());
        if (startKey) url.searchParams.append("startKey", startKey);

        const response = await fetch(url.toString(), {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching superheroes: ${response.statusText}`);
        }

        const responseData: ListSuperheroesResponse = await response.json();
        setData(responseData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { data, error, loading, listSuperheroes };
};
