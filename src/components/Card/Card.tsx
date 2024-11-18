export function Card({ children }) {
  return (
    <div className="scale-card h-full border-4 border-gray-700 rounded-md p-4">
      {children}
    </div>
  );
}
