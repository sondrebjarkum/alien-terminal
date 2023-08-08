import {
  JSX,
  Show,
  createEffect,
  createMemo,
  createSignal,
  on,
} from "solid-js";
import NotFound from "./views/NotFound";
import Welcome from "./views/Welcome";
import Flush, { flushDelay } from "./Flush";
import DDrive from "./views/DDrive";

interface Router {
  route: Routes;
  children?: JSX.Element;
}

export enum Routes {
  welcome = "/welcome",
  ddrive = "/D_DRIVE",
  notfound = "/404",
  none = "/",
}

export default function Router(props: Router) {
  const routeIs = (route: Routes) => route == props.route;
  const [flush, setFlush] = createSignal(false);

  const handleFlush = async () => {
    setFlush(() => true);
    setTimeout(() => {
      setFlush(() => false);
    }, flushDelay);
  };

  createEffect(() => {
    handleFlush();
  });

  createEffect(
    on(
      () => props.route,
      () => handleFlush(),
      {
        defer: false,
      }
    )
  );

  return (
    <>
      <Show when={!flush()} fallback={<Flush />}>
        {props.children}
        <Show when={routeIs(Routes.welcome)}>
          <Welcome />
        </Show>

        <Show when={routeIs(Routes.ddrive)}>
          <DDrive />
        </Show>

        <Show when={routeIs(Routes.notfound)}>
          <NotFound />
        </Show>
      </Show>
    </>
  );
}
