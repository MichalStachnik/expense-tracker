import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

const Header = async () => {
  return (
    <header className="border-b bg-background">
      <div className="mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold hover:opacity-80">
          Quicker Books
        </Link>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default Header;
