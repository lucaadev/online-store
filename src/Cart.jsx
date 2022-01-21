import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Cart extends React.Component {
  constructor() {
    super();

    this.state = {
      array: [],
      total: 0,
      quantidade: 1,
    };
  }

  componentDidMount() {
    let total = 0;
    const { items } = this.props;
    items.map((item) => {
      total += item.price;
      return '';
    });
    this.setStateTotal(total);
  }

  setStateTotal = (total) => {
    this.setState({ total });
  }

  verifica = (item) => {
    const { array, quantidade } = this.state;
    const quant = this.quantity(item.id);
    console.log(quant);
    this.quantidade = quant;
    console.log(array);
    return (
      <section data-testid="teste" key={ Math.random() }>
        <h2 data-testid="shopping-cart-product-name">{item.title}</h2>
        <h2
          id={ item.id }
          data-testid="shopping-cart-product-quantity"
        >
          {Number(quantidade)}
        </h2>
        <button
          type="button"
          onClick={ () => this.adiciona('', item.id, item.available_quantity) }
          data-testid="product-increase-quantity"
          className="product-increase-quantity"
        >
          Adiciona
        </button>
        <button
          type="button"
          onClick={ () => this.remover('', item.id) }
          data-testid="product-decrease-quantity"
        >
          Retira
        </button>
      </section>
    );
  };

  adiciona = (quantidade2, id, quantidadeDisponivel) => {
    const valor = document.getElementById(id).innerText;
    const { quantidade } = this.state;
    console.log(valor);
    console.log(quantidadeDisponivel);
    if (Number(quantidade) !== Number(quantidadeDisponivel)) {
      this.setState((prevState) => ({ quantidade: prevState.quantidade + 1 }));
    }
  };

  remover = (quantidade, id) => {
    const valor = document.getElementById(id).innerText;
    console.log(valor);
    if (document.getElementById(id).innerText > 0) {
      this.setState((prevState) => ({ quantidade: prevState.quantidade - 1 }));
    }
  };

  quantity = (id) => {
    const { items } = this.props;
    let quantidade = 0;
    items.map((item) => {
      if (item.id === id) {
        quantidade += 1;
      }
      return '';
    });
    return quantidade;
  };

  render() {
    const { items } = this.props;
    const { total } = this.state;
    const ids = [];
    const itemsFiltrados = items.filter((item) => {
      if (ids.find((id) => id === item.id)) {
        ids.push(item.id);
        return false;
      }
      ids.push(item.id);
      return true;
    });

    return (
      <section>
        {items.length === 0 ? (
          <h2 data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </h2>
        ) : (
          itemsFiltrados.map((item) => this.verifica(item))
        )}
        {total}
        <Link to="/checkout" data-testid="checkout-products">
          Checkout
        </Link>
      </section>
    );
  }
}

Cart.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
};

export default Cart;
