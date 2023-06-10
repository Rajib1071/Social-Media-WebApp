
import './App.css';
import Chat from './components/chat Component/chat';
console.log('App')
const App = ({ socket }) => {
  console.log('App - socket:', socket); // Add this line for debugging

  return (
    <div className="app">
      <h1>My Social Media App</h1>
      <Chat socket={socket} />
    </div>
  );
};

export default App;
