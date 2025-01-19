import { Github, Twitter, Coffee } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="fixed w-full top-0 z-50 backdrop-blur-sm bg-background/80 border-b">
      <div className="container flex justify-end items-center h-14 px-4 max-w-7xl mx-auto">
        <nav className="flex gap-4">
          <Link
            href="https://github.com/Haimantika/Mood-map"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </Link>
          <Link
            href="https://x.com/HaimantikaM"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Twitter"
          >
            <Twitter className="h-5 w-5" />
          </Link>
          <Link
            href="https://buymeacoffee.com/haimantika"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Buy Me a Coffee"
          >
            <Coffee className="h-5 w-5" />
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;