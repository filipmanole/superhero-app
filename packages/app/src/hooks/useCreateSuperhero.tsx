import { useState, useCallback } from "react";
import { SuperheroDto } from "./type";

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
  const [data, setData] = useState<SuperheroDto | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const createSuperhero = useCallback(async (args: CreateSuperheroInput) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "superheroes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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
  }, []);

  return { data, error, loading, createSuperhero };
};
