interface CardProperties {
  children: React.ReactNode;
}

export function Card(properties: CardProperties) {
  return (
    <div className="bg-card-background-light dark:bg-card-background-dark rounded-md p-1 shadow-sm sm:p-4">
      {properties.children}
    </div>
  );
}
