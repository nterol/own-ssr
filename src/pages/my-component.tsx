// eslint-disable-next-line react-refresh/only-export-components
export async function getServerSideProps() {
  const raw = await fetch("https://icanhazdadjoke.com", {
    method: "GET",
    headers: { Accept: "application/json" },
  });

  const res = await raw.json();

  return {
    props: { data: res },
  };
}

export default function Mycomponent({
  data,
}: {
  data: { id: string; joke: string };
}) {
  return (
    <main>
      <h1>I Am A page</h1>
      <section>
        <p>I am server side rendered</p>
        <h2>Here is the joke of the day: </h2>
        <p>{data.joke}</p>
      </section>
    </main>
  );
}
