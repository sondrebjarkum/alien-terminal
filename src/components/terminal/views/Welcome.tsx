import TerminalText, { Legends } from "../TerminalText";

const welcomeText = [
  "Hello!",
  Legends.NewLine,
  Legends.NewLine,
  "Welcome to terminal-1.",
  Legends.NewLine,
  Legends.NewLine,
  "This is an experiment, both with long and short text.",
];

export default function Welcome() {
  return (
    <>
      <TerminalText input={welcomeText}></TerminalText>
    </>
  );
}
