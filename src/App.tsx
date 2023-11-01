import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
// Importa el proveedor del contexto global que has definido
import { GlobalProvider } from './context/GlobalContext';
// Importa tus componentes
import { PostList, Post, NotificationComponent } from "./components";

function App() {
  return (
    <GlobalProvider> 
      <div className="App">
        <PostList />
        <Post />
        <NotificationComponent/>
      </div>
    </GlobalProvider>
  );
}

export default App;
