// import React from "react";
// import ReactDOM from "react-dom/client";
// import { createRoot } from "react-dom/client";
// import App from "./App";
// import { ThirdwebProvider } from "@thirdweb-dev/react";
// import "./index.css";

// const activeChain = "Goerli";

// const container = document.getElementById("root");
// const root = createRoot(container);
// root.render(
//   <React.StrictMode>
//     <ThirdwebProvider activeChain={activeChain}>
//       <App />
//     </ThirdwebProvider>
//   </React.StrictMode>
// );

// // root.render(
// //   <ThirdwebProvider activeChain={activeChain}>
// //     <Router>
// //       <StateContextProvider>
// //         <App />
// //       </StateContextProvider>
// //     </Router>
// //   </ThirdwebProvider>
// // );

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";

import { StateContextProvider } from "./context";
import App from "./App";
import "./index.css";
//const activeChain = "goerli";
//const activeChain = sepolia;

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ThirdwebProvider activeChain={Sepolia}>
    <Router>
      <StateContextProvider>
        <App />
      </StateContextProvider>
    </Router>
  </ThirdwebProvider>
);
