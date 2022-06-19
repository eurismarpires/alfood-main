import IRestaurante from "../../interfaces/IRestaurante";
import style from "./ListaRestaurantes.module.scss";
import Restaurante from "./Restaurante";
import { useEffect, useState } from "react";
import axios from "axios";
import { IPaginacao } from "../../interfaces/IPaginacao";

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  const [proximaPagina, setProximaPagina] = useState("");

  useEffect(() => {
    axios
      .get<IPaginacao<IRestaurante>>(
        "http://localhost:8000/api/v1/restaurantes/"
      )
      .then((resposta) => {
        setRestaurantes(resposta.data.results);
        setProximaPagina(resposta.data.next);
        console.log(resposta);
      });
  }, []);



  const [pratos, setPratos] = useState([]);
  //useState<IRestaurante[]>([]);
  

  useEffect(() => {
    axios
      .get(
        "http://localhost:8000/api/v1/pratos/"
      )
      .then((resposta) => {
       // setPratos(resposta.data.results);
        console.log(resposta);
      });
  }, []);




  const verMais = () => {
    axios.get<IPaginacao<IRestaurante>>(proximaPagina)
    .then((resposta) => {
      setRestaurantes([...restaurantes, ...resposta.data.results]);
      setProximaPagina(resposta.data.next);
      console.log(resposta);
    });      
  }

  
  const [count, setCount] = useState(0);
  const buscarPratos = ()=>{

    axios
    .get(
      "http://localhost:8000/api/v1/pratos/"
    )
    .then((resposta) => {
       setPratos(resposta.data.results);
       console.clear();
       console.log(pratos)
    });

  }


  return (
    <section className={style.ListaRestaurantes}>
      <div>

      <p>Você clicou {count} vezes</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={buscarPratos}>Buscar Pratos</button>
      </div>
      <h1>
        Os restaurantes mais <em>bacanas</em>!
      </h1>
      {restaurantes?.map((item) => (
        <Restaurante restaurante={item} key={item.id} />
      ))}
      {proximaPagina && <button onClick={verMais}>ver mais</button>}
    </section>
  );
};

export default ListaRestaurantes;
