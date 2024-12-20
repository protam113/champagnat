export default function Heading({ name }: { name: string }) {
  return (
    <div className="flex w-full  relative pt-6 pb-2">
      {" "}
      {/* Thêm mt và mb vào đây */}
      <h1 className="text-center w-full text-3xl text-primary-900 font-bold capitalize">
        {name}
      </h1>
    </div>
  );
}
