import './App.css';
import Header from "./components/Header"
import CardsList from "./components/CardsList"
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
function App() {
  return (
    <div className="App">
<Header/>
<CardsList />
    </div>
  );
}

export default App;
