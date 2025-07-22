interface CardProperties {
  children: React.ReactNode;
}

export function Card(properties: CardProperties) {
  return (
    <div
      className={`
        rounded-md bg-card-background-light p-1 shadow-sm
        sm:p-4
        dark:bg-card-background-dark
      `}>
      {properties.children}
    </div>
  );
}
