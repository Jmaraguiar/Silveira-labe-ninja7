import React from 'react';
import styled from 'styled-components';
import Axios from 'axios';
import { PaginaInicial } from './components/PaginaInicial/PaginaInicial';
import { Cadastro } from './components/Cadastro/cadastro'
import { Servicos } from './components/Servicos/servicos'
import { Carrinho } from './components/Carrinho/carrinho'
import Global from './Global.css'

const headers = {
	headers: {
		Authorization: "85b665ca-9cb7-4839-a692-5efea90e1fa7"
	}
}

class App extends React.Component {
	state = {
		pagAtual: 'Servicos',
		servicosCarrinho: [],
	}

	mudarParaInicio = () => {
		this.setState({ pagAtual: 'Inicio' })
	}

	mudarParaCadastro = () => {
		this.setState({ pagAtual: 'Cadastro' })
	}

	mudarParaServicos = () => {
		this.setState({ pagAtual: 'Servicos' })
	}

	mudarParaCarrinho = () => {
		this.setState({ pagAtual: 'Carrinho' })
	}

	addCarrinho = (id) => {

		const URL = `https://labeninjas.herokuapp.com/jobs/${id}`
		Axios.get(URL, headers)
			.then((res) => {
				let novaLista = [...this.state.servicosCarrinho, res.data]
				this.setState({ servicosCarrinho: novaLista })
				alert('Serviço adicionado com sucesso!')
			})
			.catch((err) => {
				console.log(err)
			})


	}

	delItemCarrinho = (id) => {

		if(window.confirm('Tem certeza que deseja deletar este item?')){
			this.state.servicosCarrinho.map((item, pos) => {
				if (item.id === id) {
					this.state.servicosCarrinho.splice(pos, 1)
					this.setState({ servicosCarrinho: this.state.servicosCarrinho })
					localStorage.setItem('carrinho', JSON.stringify(this.state.servicosCarrinho))
				}
			})
		}

	}

	delAllCarrinho = () => {

		if(window.confirm('Tem certeza que deseja deletar todos os itens?')){
			this.setState({servicosCarrinho: []})
		}

	}


	infoCard = (id) => {

		const URL = `https://labeninjas.herokuapp.com/jobs/${id}`
		Axios.get(URL, headers)
			.then((res) => {
				console.log(res.data.title)
			})
			.catch((err) => {
				console.log(err)
			})

	}

	render() {
		switch (this.state.pagAtual) {
			case 'Inicio':

				return (
					<PaginaInicial
						mudarParaCadastro={this.mudarParaCadastro}
						mudarParaServicos={this.mudarParaServicos}
						pagAtual={this.state.pagAtual}
						mudarParaCarrinho={this.mudarParaCarrinho}
						mudarParaInicio={this.mudarParaInicio}
					/>
				)

			case 'Cadastro':
				return (
					<Cadastro
						mudarParaCadastro={this.mudarParaCadastro}
						mudarParaServicos={this.mudarParaServicos}
						pagAtual={this.state.pagAtual}
						mudarParaCarrinho={this.mudarParaCarrinho}
						mudarParaInicio={this.mudarParaInicio}
					/>
				)

			case 'Servicos':
				return (
					<Servicos
						mudarParaCadastro={this.mudarParaCadastro}
						mudarParaServicos={this.mudarParaServicos}
						pagAtual={this.state.pagAtual}
						mudarParaCarrinho={this.mudarParaCarrinho}
						mudarParaInicio={this.mudarParaInicio}
						addCarrinho={this.addCarrinho}
						infoCard={this.infoCard}
					/>
				)

			case 'Carrinho':
				return (
					<Carrinho
						mudarParaCadastro={this.mudarParaCadastro}
						mudarParaServicos={this.mudarParaServicos}
						pagAtual={this.state.pagAtual}
						mudarParaCarrinho={this.mudarParaCarrinho}
						mudarParaInicio={this.mudarParaInicio}
						listaCarrinho={this.state.servicosCarrinho}
						delItem={this.delItemCarrinho}
						delAllCarrinho = {this.delAllCarrinho}
					/>
				)

			default:
				return (<h1>Ocorreu um erro</h1>)

		}
	}
}

export default App
