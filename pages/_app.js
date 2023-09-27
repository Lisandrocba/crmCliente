import '@/styles/globals.css'
import { ApolloProvider } from '@apollo/client'
import client from '@/config/apollo'
import PedidosState from '@/context/pedidos/PedidosState'

export default function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <PedidosState>
        <Component {...pageProps} />
      </PedidosState>
    </ApolloProvider>
  )
}
