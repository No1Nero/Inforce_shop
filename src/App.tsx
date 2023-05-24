import {Routes, Route} from 'react-router-dom';
import ProductsView from './views/ProductsView';
import Header from './components/Header';
import ProductView from './views/ProductView';

export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<ProductsView />} />
        <Route path='/:id' element={<ProductView />} />
      </Routes>
    </div>
  );
}
