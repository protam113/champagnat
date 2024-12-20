export default function Tittle({ name }: { name: string }) {
  return (
    <span className="relative lg:flex-row text-20 font-bold text-primary-900 pb-2">
      {name}
      <span className="absolute left-0 -bottom-1.5 w-full h-1 bg-yellow-400 transition-all duration-300" />
    </span>
  );
}
