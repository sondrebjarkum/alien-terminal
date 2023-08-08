import { JSX } from "solid-js/jsx-runtime";

export const Button = (props: {
  onClick?: () => void;
  active?: boolean;
  children?: JSX.Element;
}) => {
  return (
    <button
      class={`border-2 border-glow text-monitor-400 border-monitor-400 py-3 px-4 ${
        props.active && "bg-monitor-300"
      }`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
