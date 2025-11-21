import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#home");

  const links = [
    { label: "INÍCIO", href: "#home" },
    { label: "SOBRE", href: "#sobre" },
    { label: "DEPOIMENTOS", href: "#depoimentos" },
    { label: "LOCAIS", href: "#locations" },
  ];

  const handleLinkClick = (href: string) => {
    setOpen(false);
    setActiveHref(href);

    const el = document.querySelector(href);
    if (el) {
      (el as HTMLElement).scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.hash = href;
    }
  };

  return (
    <header
      data-navbar-mounted
      className="fixed top-2 sm:top-8 md:top-2 left-1 right-1 z-50"
    >
      <div className="container mx-auto px-4">
        <nav className="bg-background/80 backdrop-blur-sm border border-border rounded-2xl px-4 py-3 flex items-center justify-between shadow-md overflow-hidden">
          <div className="flex items-center gap-4">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick("#home");
              }}
              className=" text-lg text-foreground tracking-wide uppercase"
            >
              Paulo Virgílio
            </a>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-2">
            {links.map((link) => (
              <button
                key={link.href}
                onClick={() => handleLinkClick(link.href)}
                className={cn(
                  "px-4 py-2 rounded-md text-sm transition-colors uppercase tracking-wide",
                  activeHref === link.href
                    ? "bg-primary text-primary-foreground shadow"
                    : "text-foreground hover:bg-primary/5"
                )}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen(true)}
              className="p-2 rounded-md bg-primary/5"
              aria-label="Abrir menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={() => setOpen(false)}
        >
          <div className="flex h-full w-full justify-end">
            <div
              className="h-full w-[65%] sm:w-1/2 max-w-md bg-background border-l border-border shadow-2xl p-6 flex flex-col gap-6 animate-in slide-in-from-right"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-end">
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-full bg-primary/10"
                  aria-label="Fechar menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col">
                {links.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleLinkClick(link.href)}
                    className={cn(
                      "w-full px-4 py-3 rounded-xl text-base tracking-wide text-left uppercase",
                      activeHref === link.href
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-primary/5"
                    )}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
