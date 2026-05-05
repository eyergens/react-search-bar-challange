import {Routes, Route, Link, BrowserRouter} from 'react-router-dom'
import {ThemeProvider, createTheme} from '@mui/material/styles'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import CssBaseline from '@mui/material/CssBaseline'
import './App.css'
import Quotes from './pages/Quotes'
import Search from "./pages/Search"
import {Button, type PaletteMode, Toolbar, Typography} from "@mui/material";
import {type Dispatch, type SetStateAction, useMemo, useState} from "react";
import PageNotFound from "./pages/404.tsx";
import {indigo} from "@mui/material/colors";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import {loginRequest} from './authConfig';
import {AuthenticatedTemplate, UnauthenticatedTemplate, useMsal, useIsAuthenticated} from '@azure/msal-react';

const queryClient = new QueryClient()

const MainContent = ({mode, setMode, price, savePrice, isAuthenticated, signOut}: {
  mode: PaletteMode, setMode: Dispatch<SetStateAction<PaletteMode>>,
  price: number, savePrice: (id: number) => void,
  isAuthenticated: boolean, signOut: () => void
}) => {
  return (
    <div className="App">
      <AuthenticatedTemplate>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Toolbar sx={{height: 80}}>
              {/* Navigation */}
              <nav>
                <Button variant="text"
                        component={Link}
                        to="/">
                  Search
                </Button>
                <Button variant="text"
                        component={Link}
                        to="/quotes">
                  Quotes
                </Button>
              </nav>

              <Button
                sx={{
                  marginLeft: 'auto'
                }}
                onClick={() =>
                  setMode(mode === "light" ? "dark" : "light")
                }
                color="inherit"
                startIcon={mode === "light" ? <DarkModeIcon/> : <LightModeIcon/>}
              >
                {mode === "light" ? "Dark Mode" : "Light Mode"}
              </Button>
              {
                isAuthenticated ?
                  <Button variant="outlined" onClick={signOut}>
                    Sign Out
                  </Button>
                  : ''
              }
            </Toolbar>
            {/* Routes */}
            <Routes>
              <Route path="/" element={<Search price={price} savePrice={savePrice}/>}/>
              <Route path="/quotes" element={<Quotes price={price}/>}/>
              <Route path="*" element={<PageNotFound/>}/>
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <Typography sx={{
          m: 3
        }} variant={"h4"}>Sign In to find out your Vehicle Quote</Typography>
      </UnauthenticatedTemplate>
    </div>
  )
    ;
};

function App() {
  const [mode, setMode] = useState<PaletteMode>("light");
  const [price, setPrice] = useState(0);
  const {instance} = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: indigo,
        },
      }),
    [mode]
  );

  const savePrice = (price: number) => {
    setPrice(price);
  };

  function signIn() {
    instance.loginRedirect(loginRequest).catch(e => {
      console.log(e);
    });
  }

  function signOut() {
    instance.logoutRedirect({
      postLogoutRedirectUri: "/",
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <MainContent mode={mode} setMode={setMode} price={price} savePrice={savePrice} isAuthenticated={isAuthenticated}
                   signOut={signOut}/>
      {
        !isAuthenticated ?
          <Button variant="outlined" onClick={signIn}>
            Sign In
          </Button>
          : ''
      }
    </ThemeProvider>
  );
}

export default App
