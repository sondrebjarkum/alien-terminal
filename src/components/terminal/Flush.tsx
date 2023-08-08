import { Show, createEffect, createSignal } from "solid-js";
import delay from "../helpers/delay";

export const flushDelay = 145 as const;

export default function Flush() {
  const displays = 3 as const;
  const [display, setDisplay] = createSignal(0);

  const run = async () => {
    let count = 0;
    while (count < displays) {
      setDisplay(count);
      count++;
      await delay(flushDelay / displays);
    }
  };

  createEffect(() => {
    run();
  });

  return (
    <div class="w-full h-full relative">
      <Show when={display() === 0}>
        <div class="w-full h-1/2 top-0 bg-green-50 absolute shadow-monitor-100 shadow-2xl" />
      </Show>

      <Show when={display() === 1}>
        <div class="w-full h-full bg-monitor-100 absolute shadow-monitor-100 shadow-2xl" />
      </Show>

      <Show when={display() === 2}>
        <div class="w-full h-1/2 bottom-0 bg-green-50 absolute shadow-monitor-100 shadow-2xl" />
      </Show>
    </div>
  );
}
