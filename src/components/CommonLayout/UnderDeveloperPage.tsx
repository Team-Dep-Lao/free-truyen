import Link from "next/link";

export default function UnderDeveloperPage() {
  return (
    <section>
      <div className="flex flex-col items-center space-y-4">
        <div className="text-2xl font-bold">This feature is under development. Please come back later.</div>
        <Link href={'/'} className="underline text-blue-500">Go home</Link>
      </div>
    </section>
  );
}
