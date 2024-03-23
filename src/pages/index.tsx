type Props = {
  message: string;
};

export async function getServerSideProps(): Promise<{ props: Props }> {
  const message: string = await new Promise((res) =>
    setTimeout(
      () =>
        res(
          "👋 Hello I am nterol"
            .split(" ")
            .sort(() => Math.random() - 0.5)
            .join(" ")
        ),
      50
    )
  );

  return { props: { message } };
}

export default function Home({ message }: Props) {
  const handleClick = () => {
    console.log("HELLo From OWN SSR");
  };
  return (
    <main>
      <h1>Welcome to homepage</h1>
      <p>{message}</p>
      <button onClick={handleClick}>Click me</button>
    </main>
  );
}
