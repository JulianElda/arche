type CardProps = {
  children: React.ReactNode;
};

export function Card(props: CardProps) {
  return (
    <div className="rounded-md bg-white p-1 shadow-sm sm:p-4 dark:bg-slate-700">
      {props.children}
    </div>
  );
}
