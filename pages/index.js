import dynamic from "next/dynamic";
import React, { Suspense } from "react";
import { useApp } from "shell/hooks";
import { http } from "shell/utils";

const PokemonItem = dynamic(() => import("shell/pokemonItem"), { ssr: true });

const Home = ({ pokemonList }) => {
  useApp();

  return (
    <div className="pokemon">
      <div className="row">
        {pokemonList?.map((pokemon) => (
          <div className="col" key={pokemon.id}>
            <PokemonItem {...pokemon} />
          </div>
        ))}
      </div>
    </div>
  );
};

Home.getInitialProps = async () => {
  const { data } = await http.get("/api/v2/pokemon");

  const detailsData = data?.results?.map(async (pokemon) => {
    var endPoint = new URL(pokemon.url);
    const { data: poekmonDetails } = await http.get(endPoint.pathname);
    return {
      name: poekmonDetails.name,
      weight: poekmonDetails.weight,
      image: poekmonDetails.sprites?.front_default,
      id: poekmonDetails.id,
    };
  });

  const pokemonList = await http.all(detailsData);

  return {
    pokemonList,
  };
};

export default Home;
