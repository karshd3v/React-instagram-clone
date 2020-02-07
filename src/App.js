import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Post from './components/Post';

class App extends Component{
  render(){
    return(
      <div className="App">
          <Header />
          <section className="App-main">
              <Post nickname="Utkarsh" avatar="https://avatars2.githubusercontent.com/u/11817859?s=460&v=4" caption="Moving the community!" image="https://pbs.twimg.com/media/DOXI0IEXkAAkokm.jpg" />
              <Post nickname="Ashish" avatar="https://avatars2.githubusercontent.com/u/11817859?s=460&v=4" caption="Holding a mic" image="https://pbs.twimg.com/media/DOXI0IEXkAAkokm.jpg" />

              {/* more posts */}
          </section>
      </div>
    );
  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
