import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import './App.scss';

// Components
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import TestProducts from './components/TestProducts';

// Apollo client setup
const client = new ApolloClient({
	uri: 'http://localhost:4000/graphql',
})

function App() {
	return (
		<ApolloProvider client={client}>
			<div className="main">
				<h1 className="main__heading">StudioME Analytics</h1>
				<ProductList />
				<TestProducts />
				<AddProduct />
			</div>
		</ApolloProvider>
	);
}

export default App;
