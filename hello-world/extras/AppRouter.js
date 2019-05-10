import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Index() {
  return <h2>Home</h2>;
}

function Today() {
  return <h2>Today</h2>;
}

function Plan() {
  return <h2>Plan</h2>;
}

function AppRouter() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/today/">Today</Link>
            </li>
            <li>
              <Link to="/plan/">Plan</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={Index} />
        <Route path="/today/" component={Today} />
        <Route path="/plan/" component={Plan} />
      </div>
    </Router>
  );
}

export default AppRouter;