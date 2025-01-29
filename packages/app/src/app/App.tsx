"use client";

import { SuperheroesPage } from "@/pages";
import { Route, Routes } from "react-router-dom";
import { Connection } from "@/components";

export default function App() {
  return (
    <>
      <header className="sticky top-0 border-b p-2">
        <Connection />
      </header>

      <Routes>
        <Route path="/" element={<SuperheroesPage />} />
      </Routes>
    </>
  );
}
