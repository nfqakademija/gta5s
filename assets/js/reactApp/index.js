import React from "react";
import {render} from "react-dom";
import configureStore from "./store/configureStore";
import {Provider} from "react-redux";
import Map from "./components/Map";
import "./styles/styles.css";

let store = configureStore();

render(
    <Provider store={store}>
        <Map />
    </Provider>,
    document.getElementById("map")
);