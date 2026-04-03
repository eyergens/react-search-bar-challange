import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css'
import Quotes from './pages/Quotes'
import Search from "./pages/Search"

const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <BrowserRouter>
        {/* Navigation */}
        <nav>
          <Link to="/">Search</Link> |{" "}
          <Link to="/quotes">Quotes</Link> |{" "}
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Search/>}/>
          <Route path="/quotes" element={<Quotes />}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App
