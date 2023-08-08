export const isRedacted = () => !!sessionStorage.getItem("redacted");
export const setRedacted = (val: boolean) =>
  sessionStorage.setItem("redacted", `${val}`);
