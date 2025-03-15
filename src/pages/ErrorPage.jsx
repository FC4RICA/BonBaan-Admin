import { useRouteError } from "react-router";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="flex flex-col items-center h-screen justify-center">
      <h1  className="text-4xl">{error.status}</h1>
      <p className="text-base">Oops! Something went wrong.</p>
    </div>
  );
}
