import { JSX, Show, createEffect, createSignal } from "solid-js";
import delay from "../helpers/delay";
import Flush, { flushDelay } from "./Flush";

export const Legends = {
  NewLine: "¨",
} as const;

interface TerminalText {
  input?: any[];
  children?: JSX.Element;
  opts?: {
    textSize?: "regular" | "small";
  };
}

export default function TerminalText(props: TerminalText) {
  const [delayedText, setDelayedText] = createSignal<string[]>([]);

  const typeText = async (newText: string[]) => {
    setDelayedText([]);
    await delay(flushDelay);

    for (let lineIndex = 0; lineIndex < newText.length; lineIndex++) {
      // for setting JSX elements
      if (typeof newText[lineIndex] !== "string") {
        newText[lineIndex];
        setDelayedText((prev) => {
          const newArray = [...prev];
          newArray[lineIndex] = newText[lineIndex];
          return newArray;
        });
        continue;
      }

      //for setting text
      for (const character of newText[lineIndex]) {
        setDelayedText((prev) => {
          const newArray = [...prev];
          if (newArray[lineIndex]) {
            newArray[lineIndex] = newArray[lineIndex] + character;
          } else {
            newArray[lineIndex] = character;
          }
          return newArray;
        });

        const isDivider = newText[lineIndex][0] + newText[lineIndex][1] == "+-";
        isDivider ? await delay(7) : await delay(17);
      }
      const isBigBreak =
        newText[lineIndex + 1] === Legends.NewLine &&
        newText[lineIndex + 2] === Legends.NewLine;

      isBigBreak ? await delay(230) : await delay(30);
    }
  };

  createEffect(() => {
    console.log("props.input:", props.input);
    handleSetText(props.input || []);
  }, props.input);

  const handleSetText = (input: string[]) => {
    typeText(input);
  };

  return (
    <>
      {/* <div class="h-full"> */}
      <div>
        {props.children}
        <br />
        <small>
          {delayedText().map((char) => {
            console.log("char:", char);
            if (char === Legends.NewLine) {
              return <br />;
            }
            return <span>{char}</span>;
          })}
        </small>
      </div>
    </>
  );
}
