import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { getCategories } from './services/api';

class ProductsList extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      categories: [],
      input: '',
    };
  }

  async componentDidMount() {
    const categorias = await getCategories();
    this.setStateCategories(categorias);
  }

  setStateCategories = (categorias) => {
    this.setState({ categories: [...categorias] });
  };

  fetchProducts = async (event) => {
    const categoriaID = event.target.nextSibling.innerHTML;
    fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoriaID}`)
      .then((response) => response.json())
      .then((data) => this.setState({ products: [...data.results] }));
  };

  fetchProduct = () => {
    const { input } = this.state;
    fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${input}`)
      .then((response) => response.json())
      .then((data) => this.setState({ products: [...data.results] }));
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { products, categories, input } = this.state;
    const { addCartItem, items } = this.props;
    return (
      <>
        <div>
          <h1 className="title-homepage">TrybeCart! A sua melhor opção.</h1>
        </div>
        {products.length === 0 ? (
          <section>
            <Link
              className="cart-icon-homepage"
              data-testid="shopping-cart-button"
              to="/cart"
            >
              <div>
                <p style={ { display: 'none' } }>Carrinho</p>
                <img
                  className="cart-button-image"
                  src={ `${process.env.PUBLIC_URL}cart.png` }
                  alt="cartbutton"
                />
              </div>
            </Link>
            <h2 className="initial-message" data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </h2>
            <div className="div-search-bar">
              <input
                className="search-bar-homepage"
                data-testid="query-input"
                onChange={ this.handleChange }
                type="text"
                name="input"
                value={ input }
              />
              <button
                className="search-button"
                onClick={ this.fetchProduct }
                type="button"
                data-testid="query-button"
              >
                <div>
                  <p style={ { display: 'none' } }>Pesquisar</p>
                  <img
                    className="lupa-search"
                    src={ `${process.env.PUBLIC_URL}lupa3.png` }
                    alt="lupa"
                  />
                </div>
              </button>
            </div>
            <div className="div-categoties-buttons">
              {categories.length > 0
              && categories.map((categoria) => (
                <div key={ Math.random() }>
                  <button
                    className="items-categories-buttons"
                    onClick={ (event) => this.fetchProducts(event) }
                    type="button"
                    key={ categoria.id }
                    data-testid="category"
                  >
                    {categoria.name}
                  </button>
                  <h2 style={ { display: 'none' } }>{categoria.id}</h2>
                </div>
              ))}
            </div>
          </section>
        ) : (
          ''
        )}
        <h2
          data-testid="shopping-cart-size"
        >
          {items !== undefined
          && <p style={ { display: 'none' } }>0</p>}

        </h2>
        <div className="div-items">
          {products.map((produto) => (
            <div data-testid="product" key={ Math.random() } className="item-homepage">
              <h2>{produto.title}</h2>
              <img className="img-item-homepage" alt="imagem" src={ produto.thumbnail } />
              <div className="frete-and-price">
                <h3 className="price-product">{produto.price}</h3>
                {produto.shipping.free_shipping
                && <h2 data-testid="free-shipping">Frete Grátis</h2>}
              </div>
              <Link
                to={ `/cart/${produto.id}` }
                data-testid="product-detail-link"
              >
                Mais detalhes
              </Link>
              <button
                className="add-to-cart-button"
                onClick={ () => addCartItem(produto) }
                data-testid="product-add-to-cart"
                type="button"
              >
                Adicionar ao Carrinho
              </button>
            </div>
          ))}
        </div>
      </>
    );
  }
}

ProductsList.propTypes = {
  addCartItem: propTypes.func.isRequired,
  items: propTypes.arrayOf(propTypes.object).isRequired,
};

export default ProductsList;
