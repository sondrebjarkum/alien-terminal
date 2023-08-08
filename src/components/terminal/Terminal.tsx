import { JSX, createEffect, createSignal } from "solid-js";
import Router, { Routes } from "./Router";
import { Button } from "./Buttons";

const viewPort = { width: "850px", height: "640px", padding: "20px" };

interface Terminal {
  output: string[];
}

export const Bordered = () => {
  return (
    <div class="border-monitor-300 border-2 p-4 border-glow">
      <p>text inside box :o</p>
    </div>
  );
};

export default function Terminal() {
  const [route, setRoute] = createSignal(Routes.none);

  const handleRouteChange = (route: Routes) => {
    setRoute(() => route);
  };
  return (
    <div style={viewPort} class="block mx-auto">
      <article class=" w-full h-full border border-monitor-300 text-left p-4 display-gradient mt-12 overflow-y-scroll">
        <Router route={route()}>
          <p>{route()}</p>

          <header class="w-full py-4 flex gap-4 mb-4">
            <Button
              onClick={() => handleRouteChange(Routes.welcome)}
              active={route() === Routes.welcome}
            >
              {"-> HOME"}
            </Button>

            <Button
              onClick={() => handleRouteChange(Routes.ddrive)}
              active={route() === Routes.ddrive}
            >
              {"-> D_DRIVE"}
            </Button>

            <Button
              onClick={() => handleRouteChange(Routes.notfound)}
              active={route() === Routes.notfound}
            >
              {"-> NOT FOUND"}
            </Button>
          </header>
        </Router>
      </article>
    </div>
  );
}
