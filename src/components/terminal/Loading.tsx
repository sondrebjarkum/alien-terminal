export default function Loading() {
  return <div class="loading"></div>;
}

export function LoadingFill() {
  return (
    <div class="w-full h-2/3 flex justify-center items-center">
      <div class="loading"></div>
    </div>
  );
}
