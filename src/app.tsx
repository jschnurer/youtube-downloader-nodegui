import { Window, hot } from "@nodegui/react-nodegui";
import React from "react";
import { QIcon } from "@nodegui/nodegui";
import nodeguiIcon from "../assets/nodegui.jpg";
import RipperForm from "./components/RipperForm";

const minSize = { width: 500, height: 520 };
const winIcon = new QIcon(nodeguiIcon);
class App extends React.Component {
  render() {
    return (
      <Window
        windowIcon={winIcon}
        windowTitle="YouTube Ripper"
        minSize={minSize}
      >
        <RipperForm />
      </Window>
    );
  }
}

export default hot(App);
