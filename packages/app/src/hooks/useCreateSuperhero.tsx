import { useState, useCallback } from "react";
import { SuperheroDto } from "./type";
import { useLocalStorage } from "@uidotdev/usehooks";

type CreateSuperheroInput = {
  name: string;
  superpower: string;
  humilityScore: number;
};

type CreateSuperheroType = {
  data: SuperheroDto | null;
  error: any;
  loading: boolean;
  createSuperhero: (args: CreateSuperheroInput) => Promise<SuperheroDto>;
};

export const useCreateSuperhero = (): CreateSuperheroType => {
  const [apiKey] = useLocalStorage<string | null>("apiKey", null);
  const [data, setData] = useState<SuperheroDto | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const createSuperhero = useCallback(
    async (args: CreateSuperheroInput) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          import.meta.env.VITE_API_URL + "superheroes",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": apiKey ?? "",
            },
            body: JSON.stringify(args),
          }
        );

        if (!response.ok) {
          throw new Error(`Error creating superhero: ${response.statusText}`);
        }

        const responseData = await response.json();
        setData(responseData);
        return responseData;
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [apiKey]
  );

  return { data, error, loading, createSuperhero };
};
