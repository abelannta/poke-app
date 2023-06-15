import React from "react";

function PokemonCard({ item }) {
  const getBaseStatByName = (statName) => {
    const stat = item?.stats.find((item) => item.stat.name === statName);
    return stat ? stat.base_stat : null;
  };

  return (
    <div className="pokemon-card">
      <div className="pokemon-card-id">{item?.base_experience}</div>
      <div className="pokemon-card-cover">
        <img
          className="pokemon-card-img"
          alt={item?.name}
          src={item?.sprites?.other?.dream_world?.front_default}
        />
      </div>
      <div className="pokemon-card-desc">
        <div className="pokemon-card-desc-header">
          <h3>{item?.name}</h3>
          <div className="pokemon-card-badge">{item?.types[0]?.type?.name}</div>
        </div>
        <div className="pokemon-card-desc-content">
          <div className="flex-row">
            <div className="pokemon-stats-badge">
              HP{" "}
              <span style={{ fontWeight: 700 }}>{getBaseStatByName("hp")}</span>
            </div>
            <div className="pokemon-stats-badge">
              ATK{" "}
              <span style={{ fontWeight: 700 }}>
                {getBaseStatByName("attack")}
              </span>
            </div>
            <div className="pokemon-stats-badge">
              DEF{" "}
              <span style={{ fontWeight: 700 }}>
                {getBaseStatByName("defense")}
              </span>
            </div>
          </div>
          <div className="flex-row">
            {item?.abilities?.map((item, i) => (
              <div className="pokemon-stats-badge" key={i}>
                <span style={{ fontWeight: 700 }}>{item.ability.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
