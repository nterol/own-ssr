import { useOwnContext } from "../context";

export function Link({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  const { navigate } = useOwnContext();
  return (
    <a
      onClick={(e) => {
        e.preventDefault();
        navigate(to);
      }}
      href={to}
    >
      {children}
    </a>
  );
}
