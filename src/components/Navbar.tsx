import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import logoPaulo from "@/assets/logo-paulo.jpg";

const navLinks = [
  { label: "Início", href: "#home" },
  { label: "Sobre", href: "#sobre" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Locais", href: "#locations" },
] as const;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#home");

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
      className="fixed top-0 left-0 right-0 z-50"
    >
      <nav className="bg-background border border-border px-4 sm:px-8 py-4 flex items-center justify-between shadow-md overflow-hidden">
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

        {/* Desktop links */}
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
                    ? "bg-primary text-primary-foreground shadow"
                    : "text-foreground hover:text-primary"
                )}
              >
                {link.label}
              </button>
            );
          })}
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
                          ? "bg-primary text-primary-foreground"
                          : "text-foreground hover:text-primary"
                      )}
                    >
                      {link.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
