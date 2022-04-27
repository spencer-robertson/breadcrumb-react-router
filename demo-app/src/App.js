import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { BreadCrumbRoute, BreadCrumbRouter, useBreadCrumb } from "./BreadCrumb";

export default function App() {
  const array = [1, 2, 3, 4, 5];
  return (
    <BreadCrumbRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/users/about">About</Link>
            </li>
              <li>
                <Link to="/users/1">Users 1</Link>
              </li>

            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <BreadCrumbRoute path="/users/about">
            <About />
          </BreadCrumbRoute>
          <BreadCrumbRoute path="/users/:id" generateName={(id) => "test"}>
            <User />
          </BreadCrumbRoute>
          <BreadCrumbRoute path="/users">
            <Users />
          </BreadCrumbRoute>
          <BreadCrumbRoute path="/">
            <Home />
          </BreadCrumbRoute>
        </Switch>
      </div>
    </BreadCrumbRouter>
  );
}

function Home() {
  const contextType = useBreadCrumb();
  console.log("Home ~ contextType", contextType);
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

function User() {
  return <h2>User</h2>;
}
