import React, { Component } from 'react';
import styled from 'styled-components';
import Axios from 'axios';
import { Header } from '../Header/header';
import { Footer } from '../Footer/footer';
import { Card} from "./card";


const headers = {
  headers: {
    Authorization: "85b665ca-9cb7-4839-a692-5efea90e1fa7"
  }
}

export class Servicos extends Component {
  state = {
    Servicos: [],
    valorMaximo: '',
    valorMinimo: '',
    query: '',


  }
  pegarServicos = () => {
   const URL = "https://labeninjas.herokuapp.com/jobs"
   Axios.get(URL, headers)
   .then((res)=>{
     this.setState({Servicos:res.data.jobs})
     console.log(this.state.Servicos)
   })

   .catch((err)=>{
    console.log(err)
   })
  }
   componentDidMount (){
     this.pegarServicos()
   }

   onChangeMax = (e) => {
     this.setState({valorMaximo: e.target.value})
   }

   onChangeMin = (e) => {
    this.setState({valorMinimo: e.target.value})
  }
  onChangeQuery = (e) => {
    this.setState({query: e.target.value})
  }
 
  render() {

    let mapeamentoDeTarefas = this.state.Servicos.filter((servico)=>{
      if(this.state.valorMaximo != '') {
        return (servico.price <= this.state.valorMaximo)
      }else{
        return servico
      }
    }).filter((servico)=>{
      return (servico.price >= this.state.valorMinimo)
    })
    .filter((servico)=>{
      return servico.title.toLowerCase().includes(this.state.query.toLowerCase())
    })
    .map((servico) => {
     return(<Card
       nome= {servico.title}
       descricao = {servico.description}
       preco ={servico.price}
       formaDePagamento = {servico.paymentMethods}
       prazo = {servico.dueDate}
     />)
    })
    
    return (
      <div>
        <Header 
        mudarParaInicio={this.props.mudarParaInicio}
        mudarParaCarrinho={this.props.mudarParaCarrinho}
        pagAtual={this.props.pagAtual}
        onChange={this.onChangeQuery}
        query={this.state.query}
        />
        <div>
          <input 
           placeholder='Valor Max'
           type = 'number'
           value = {this.state.valorMaximo}
           onChange = {this.onChangeMax}
          />
          <input 
           placeholder='Valor Min'
           type = 'number'
           value = {this.state.valorMinimo}
           onChange = {this.onChangeMin}
          />
          <select>
            <option> Valor 1</option>
            <option>Valor 2</option>
            <option>Valor 3</option>
            
          </select>

        </div>
        {mapeamentoDeTarefas}
        <Footer />
      </div>
    )
  }
}