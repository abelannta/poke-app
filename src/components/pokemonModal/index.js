import React, { useState, useEffect } from "react";
import { Modal, Descriptions } from "antd";

function PokemonModal({ openModal, setOpenModal, data }) {
  const [ability, setAbility] = useState([]);

  const getAbilitiesDesc = async () => {
    try {
      const res = await Promise.all(
        data?.abilities?.map((item) => fetch(item.ability.url))
      );
      const resData = await Promise.all(res.map((res) => res.json()));
      setAbility(resData);
    } catch (err) {
      console.error(err);
    }
  };

  const getEnglishDesc = (item) => {
    const desc = item.effect_entries.find(
      (item) => item.language.name === "en"
    );
    return desc ? desc.effect : null;
  };

  useEffect(() => {
    getAbilitiesDesc();
  }, [data]);

  return (
    <Modal
      title={data?.name}
      style={{
        textTransform: "capitalize",
        position: "relative",
        textAlign: "center",
      }}
      open={openModal}
      onOk={() => setOpenModal(false)}
      onCancel={() => setOpenModal(false)}
      width={1000}
      centered
    >
      <div className="pokemon-modal-header">
        <img
          style={{ width: 200, height: 200 }}
          src={data?.sprites?.other?.dream_world?.front_default}
          alt={data?.name}
        />
      </div>
      <Descriptions layout="vertical">
        <Descriptions.Item label="Tipe">
          <div className="flex-row">
            {data?.types?.map((item, i) => (
              <div className="pokemon-card-badge" key={i}>
                {item?.type?.name}
              </div>
            ))}
          </div>
        </Descriptions.Item>
        <Descriptions.Item label="Stats">
          <div className="flex-row">
            {data?.stats?.map((item, i) => (
              <div className="pokemon-stats-badge" key={i}>
                {item?.stat?.name}{" "}
                <span style={{ fontWeight: 700 }}>{item?.base_stat}</span>
              </div>
            ))}
          </div>
        </Descriptions.Item>
        <Descriptions.Item label="Items">
          {data?.held_items?.length === 0 ? (
            <p>Tidak ada item</p>
          ) : (
            <div className="flex-row">
              {data?.held_items?.map((item, i) => (
                <div className="pokemon-stats-badge" key={i}>
                  <span style={{ fontWeight: 700 }}>{item?.item?.name}</span>
                </div>
              ))}
            </div>
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Abilities" span={3}>
          <div className="pokemon-modal-abiity">
            {ability.map((item, i) => (
              <div style={{ textAlign: "left" }} key={i}>
                <h3>{item.name}</h3>
                <p>{getEnglishDesc(item)}</p>
              </div>
            ))}
          </div>
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
}

export default PokemonModal;
