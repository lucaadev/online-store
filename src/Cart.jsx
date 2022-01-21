import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Cart extends React.Component {
  constructor() {
    super();

    this.state = {
      array: [],
      total: 0,
      quantidade: {},
    };
  }

  componentDidMount() {
    let total = 0;
    const { items } = this.props;
    items.map((item) => {
      total += item.price;
      this.adiciona(item.id);
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
          {quantidade[item.id]}
        </h2>

        <button
          type="button"
          onClick={ () => this.adiciona(item.id, item.available_quantity) }
          data-testid="product-increase-quantity"
          className="product-increase-quantity"
        >
          Adiciona
        </button>
        <button
          type="button"
          onClick={ () => this.remover(item.id) }
          data-testid="product-decrease-quantity"
        >
          Retira
        </button>
      </section>
    );
  };

  adiciona = (id, quantidadeMaxima) => {
    const { quantidade } = this.state;
    if (quantidade[id] === undefined) {
      quantidade[id] = 1;
    } else if (quantidade[id] !== Number(quantidadeMaxima)) {
      quantidade[id] += 1;
    }
    this.setState({
      quantidade,
    });
  };

  remover = (id) => {
    const { quantidade } = this.state;
    quantidade[id] -= 1;
    if (quantidade[id] <= 0) {
      quantidade[id] = 1;
    }
    this.setState({
      quantidade,
    });
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
