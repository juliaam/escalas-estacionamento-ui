import { SidebarTrigger } from "@/components/ui";

export function Header() {
  return (
    <header className="flex min-h-14 w-full items-center justify-between border border-b-2 bg-zinc-100 px-4 font-open-sans text-lg font-semibold text-zinc-800">
      <a className="ml-12 text-gray-700 hover:underline" href="/#">
        Gerador de escalas
      </a>
      <SidebarTrigger />
    </header>
  );
}
