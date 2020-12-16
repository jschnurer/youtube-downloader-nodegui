import React, { useState } from "react";
import { Text, View, LineEdit, ScrollArea, Button } from "@nodegui/react-nodegui";
import { QMessageBox, QPushButton, ButtonRole } from "@nodegui/nodegui";
import { spawn, exec } from "child_process";
import path from "path";

const youtubeDlLocation = `C:\\Projects\\youtube-dl.exe`;

const FipperForm: React.FC = () => {
  const [url, setUrl] = useState("");
  const [output, setOutput] = useState("");
  const [working, setWorking] = useState(false);

  const handleTextChanged = (text: string) => {
    setUrl(text);
  }

  const buttonHandler = {
    clicked: () => {
      if (!url.trim()) {
        const messageBox = new QMessageBox();
        messageBox.setWindowTitle("ERROR");
        messageBox.setText('Youtube URL is required.');
        const accept = new QPushButton();
        accept.setText('OK');
        messageBox.addButton(accept, ButtonRole.AcceptRole);
        messageBox.exec();
        return;
      }

      try {
        const cmd = spawn(youtubeDlLocation, [url]);

        let allOutput = "Starting...\n";

        setOutput(allOutput);
        setWorking(true);

        cmd.on("error", (error) => {
          allOutput += error + ". Are you sure YouTube-dl.exe is in the right place?";
          setOutput(allOutput);
        });

        cmd.stdout.on("data", (data) => {
          allOutput += data.toString() + "\n";
          setOutput(allOutput);
        });

        cmd.stderr.on("data", (data) => {
          allOutput += data.toString();
          setOutput(allOutput);
        });


        cmd.on("exit", (code) => {
          if (code === 0) {
            allOutput += "Download complete.";
          } else {
            allOutput += "Operation failed.";
          }
          setOutput(allOutput);
          setWorking(false);
        });
      } catch (err) {
        setOutput(output + '\n' + err.message);
      }
    },
  };

  return (
    <View
      id="view"
      styleSheet={stylesheet}
    >
      <LineEdit
        on={{ textChanged: handleTextChanged }}
        placeholderText="YouTube url..."
        id="youtube-url"
        enabled={!working}
      />
      <Button
        id="rip"
        on={buttonHandler}
        enabled={!working}
      >
        RIP AND TEAR!
      </Button>
      <Text>Output:</Text>
      <ScrollArea
        id="output"
      >
        <Text
          wordWrap={true}
          id="outputText"
        >
          {output}
        </Text>
      </ScrollArea>
    </View>
  );
}

const stylesheet = `
  #view {
    flex: auto;
    display: flex;
    flex-direction: column;
  }

  #view > * {
    margin: 1em;
  }

  #rip {
    padding: 1em;
    width: 150px;
    align-self: flex-end;
    margin-top: 0;
  }

  #youtube-url {
    padding: .5em;
  }

  #output {
    height: 300px;
  }

  #outputText {
    flex: auto;
  }
`;

export default FipperForm;