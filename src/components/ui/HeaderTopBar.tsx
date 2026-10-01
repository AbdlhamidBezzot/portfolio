import Link from "next/link";

interface HeaderTopBarProps {
  location?: string;
  email?: string;
}

export function HeaderTopBar() {
  return (
    <header className="w-full py-4 px-6 md:px-12 flex justify-between items-center relative z-20 pointer-events-none">
      {/* Top spacer maintaining clean top margins */}
      <div className="h-6" />
    </header>
  );
}
