import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// Components
import ProductList from './components/ProductList';

// Apollo client setup
const client = new ApolloClient({
	uri: 'http://localhost:4000/graphql',
})

function App() {
	return (
		<ApolloProvider client={client}>
			<div id="main">
				<h1>StudioME Analytics</h1>
				<h3>Products</h3>
				<ProductList />
			</div>
		</ApolloProvider>
	);
}

export default App;
