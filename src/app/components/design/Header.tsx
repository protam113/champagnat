export default function Header({ name }: { name: string }) {
  return (
    <header
      className="bg-primary-500 py-3 rounded-lg w-max"
      style={{ width: '880px' }}
    >
      <h2 className="text-white font-semibold pl-4">{name}</h2>
    </header>
  );
}
