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

  const imprimirArray = () => {
    console.clear();
    for(var i = 0; i < restaurantes.length - 1; i++){
      //restaurantes[i].pratos[0].nome = "teste";
      

      let meuPrato = {
      id: 3,
      descricao: 'Empadão de Frango',
      imagem: 'https://t1.uc.ltmcdn.com/pt/images/5/7/1/img_como_fazer_empadao_de_frango_27175_600.jpg',
      nome: 'Empadão de Frango',
      restaurante: 1,
      tag: 'Portuguesa'
    }
    restaurantes[i].pratos[0] = meuPrato;
    console.log(restaurantes[i]);
    }
  }
  return (
    <section className={style.ListaRestaurantes}>
      <div>

      <p>Você clicou {count} vezes</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={buscarPratos}>Buscar Pratos</button>


      <button onClick={imprimirArray}>Imprimir Array</button>


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
