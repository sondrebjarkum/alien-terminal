import TerminalText from "../TerminalText";

export default function NotFound() {
  return (
    <>
      <h1 class="text-2xl">404</h1>
      <TerminalText input={["I'm afraid i cannot do that, Dave..."]} />
    </>
  );
}
