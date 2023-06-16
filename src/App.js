import { useState, useEffect } from "react";
import icon from "./assets/logo.svg";
import "./App.css";
import { Layout, Input, Pagination, Spin, Modal } from "antd";
import { getPokemon } from "./lib/pokemon";
import PokemonList from "./components/pokemonList";
import axios from "axios";
import PokemonModal from "./components/pokemonModal";

const { Header, Content } = Layout;

function App() {
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pokemonModalData, setPokemonModalData] = useState({});
  const [pokemon, setPokemon] = useState([]);
  const [pokemonDetail, setPokemonDetail] = useState([]);

  const handlePagination = (current, limit) => {
    setParams((prev) => ({ ...prev, page: current, limit: limit }));
  };

  const getPokemonList = () => {
    setLoading(true);
    const res = getPokemon({
      limit: params.limit,
      offset: params.page * params.limit - params.limit,
    })
      .then((res) => {
        setPokemon(res);
        getPokemonDetail(res.results);
      })
      .catch((err) => {
        console.error(err);
      });
    setLoading(false);
  };

  const getPokemonDetail = async (res) => {
    setPokemonDetail([]);
    res.map(async (item) => {
      const res = await axios.get(item.url).then((res) => {
        setPokemonDetail((prev) => {
          prev = [...prev, res.data];
          return prev;
        });
      });
    });
  };

  useEffect(() => {
    getPokemonList();
  }, [params]);

  useEffect(() => {
    console.log(pokemonDetail);
  }, [pokemonDetail]);

  return (
    <>
      <Layout style={{ backgroundColor: "white" }}>
        <Header className="header">
          <img src={icon} style={{ width: "200px" }} />
        </Header>
        <Content className="content">
          <div className="pokemon-list">
            {loading ? (
              <Spin />
            ) : (
              <PokemonList
                pokemon={pokemonDetail}
                setOpenModal={setModalOpen}
                setPokemonModalData={setPokemonModalData}
              />
            )}
          </div>
          <Pagination
            current={params?.page}
            total={pokemon?.count}
            pageSize={params?.limit}
            onChange={handlePagination}
            pageSizeOptions={[10, 20, 50, 100]}
            disabled={loading ? true : false}
          />
        </Content>
      </Layout>
      <PokemonModal
        openModal={modalOpen}
        setOpenModal={setModalOpen}
        data={pokemonModalData}
      />
    </>
  );
}

export default App;
