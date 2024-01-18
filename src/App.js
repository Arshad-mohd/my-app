// import React from 'react';
// import Table1 from './Table1';

// function App() {
//   return (
//     <div className="App">
//       <h1>Data Table from API</h1>
//       <Table1 />
//     </div>
//   );
// }

// export default App;

// App.js
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import ProductList from './ProductList';
// import AddProduct from './AddProduct';

const App = () => {

  return (
    <Provider store={store}>
      <div>
        <ProductList />
        {/* <AddProduct /> */}
      </div>
    </Provider>
  );
};

export default App;
