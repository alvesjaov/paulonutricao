import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

const navLinks = [
  { label: "Início", href: "#home" },
  { label: "Sobre", href: "#sobre" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Locais", href: "#locations" },
] as const;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#home");
  const { resolvedTheme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  const handleToggleTheme = () => {
    if (!isMounted) return;
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const renderThemeIcon = () => {
    if (!isMounted) {
      return <div className="h-5 w-5 animate-pulse rounded-full bg-muted" />;
    }

    return resolvedTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />;
  };

  const ThemeToggle = () => (
    <button
      type="button"
      onClick={handleToggleTheme}
      className="p-2 rounded-md text-foreground hover:bg-primary/10 transition-colors"
      aria-label="Alternar modo claro/escuro"
    >
      {renderThemeIcon()}
    </button>
  );

  return (
    <header
      data-navbar-mounted
      className="fixed top-0 left-0 right-0 z-50"
    >
      <nav className="bg-background px-4 sm:px-8 py-4 flex items-center justify-between shadow-md overflow-hidden">
        <div className="flex items-center gap-4">
          {/* <img
            src={logoPaulo}
            alt="Atividades e nutrição"
            className="h-12 w-auto object-contain md:h-16 mix-blend-multiply"
            loading="lazy"
          /> */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick("#home");
            }}
            className=" text-l text-foreground tracking-wide uppercase font-semibold"
          >
            Paulo Virgílio
          </a>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const isLocations = link.href === "#locations";

              return (
                <button
                  key={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className={cn(
                    "px-4 py-2 rounded-md text-l transition-colors tracking-wide font-semibold",
                    isLocations
                      ? "bg-primary text-white shadow"
                      : "text-foreground hover:text-primary"
                  )}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          <ThemeToggle />

          <div className="md:hidden">
            <button
              onClick={() => setOpen(true)}
              className="p-2 rounded-md bg-primary/5"
              aria-label="Abrir menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

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
                {navLinks.map((link) => {
                  const isLocations = link.href === "#locations";

                  return (
                    <button
                      key={link.href}
                      onClick={() => handleLinkClick(link.href)}
                      className={cn(
                        "w-full px-4 py-3 rounded-xl text-base tracking-wide text-left font-semibold",
                        isLocations
                          ? "bg-primary text-white"
                          : "text-foreground hover:text-primary"
                      )}
                    >
                      {link.label}
                    </button>
                  );
                })}
              </div>

              <div className="mt-auto border-t border-border pt-6 flex items-center justify-between text-sm font-medium text-muted-foreground">
                <span>{isMounted && resolvedTheme === "dark" ? "Modo escuro" : "Modo claro"}</span>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
