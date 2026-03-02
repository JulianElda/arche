interface CardProps {
  children: React.ReactNode;
}

export function Card(props: CardProps) {
  const { children } = props;

  return (
    <div className="bg-card-background-light dark:bg-card-background-dark rounded-md p-1 shadow-sm sm:p-4">
      {children}
    </div>
  );
}
