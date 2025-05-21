// src/main.tsx
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";
import {
  Provider,
  teamsDarkTheme,
  teamsTheme,
} from "@fluentui/react-northstar";
import { useState } from "react";

const Root = () => {
  //This hook should be inside a componente because if it is not inside a componente
  //the app will crash
  const [theme, setTheme] = useState(
    //Assign  the default value that get from the local storage
    teamsTheme
  );

  //Method that will be passed to all components  and will activate in the moon icon when we click
  //It assign if the theme is the light it will change to  dark assign to the variable of the hook and update the local storage and will update the theme

    const toggleTheme = async (selectedThem: string) => {
      try {
        if (selectedThem == "light") {
          setTheme(teamsTheme);
        }
        else{
          setTheme(teamsDarkTheme);
        }
      } catch (error) {
        console.error("Error fetching theme:", error);
      }
    };


  return (
    <Provider theme = {theme}>
      <Router>
        <App toggleTheme = {toggleTheme} />
      </Router>
    </Provider>
  );
};

createRoot(document.getElementById("root")!).render(<Root />);
