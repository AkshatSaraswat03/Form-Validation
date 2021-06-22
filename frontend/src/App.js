import { BrowserRouter as Router, Route } from 'react-router-dom'
import Form from './components/Form'
import DisplayInfo from './components/DisplayInfo'

function App() {
  return (
    <Router>
      <Route exact path='/' component={Form} />
      <Route exact path='/displayInfo' component={DisplayInfo} />
    </Router>
  );
}

export default App;
