import { Route, Switch } from "react-router";
import { NavLink } from "react-router-dom";
import HomeViews from './views/HomeViews';
import MoviesPage from './views/MoviesPage';
import NotFound from './views/NotFoundViews';
import MovieDetailsPage from './views/MovieDetailsPage';




const App =() => (
  <>
<ul className="topnav">
  <li>
    <NavLink 
    exact
    to='/' 
    className ="NavLink"
    activeClassName ="NavLink--active"
    >
      Home
    </NavLink>
  </li>
  <li>
  <NavLink 
    to ='/movies'
    className ="NavLink"
    activeClassName ="NavLink--active"
  >
    Movies
  </NavLink>
  </li>
</ul>

<Switch>
  <Route exact path ="/" component ={HomeViews}/>
  <Route exact path ="/movies" component ={MoviesPage}/>
  <Route path ="/movies/:moviesId" component ={MovieDetailsPage}/>
  <Route component ={NotFound}/>
</Switch>
  </>
);



export default App;
