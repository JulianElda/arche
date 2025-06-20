type CardProps = {
  children: React.ReactNode;
};

export function Card(props: CardProps) {
  return (
    <div className="bg-card-background-light dark:bg-card-background-dark rounded-md p-1 shadow-sm sm:p-4">
      {props.children}
    </div>
  );
}
