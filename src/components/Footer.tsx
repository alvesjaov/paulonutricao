import { Instagram, MapPin, Mail, Phone } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#21262C] text-white border-t border-[#2a3036] dark:bg-background dark:text-foreground dark:border-border/80">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-10 md:grid-cols-4 text-sm text-white/80 dark:text-foreground/80">
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-white dark:text-foreground">Paulo Virgílio</h3>
            <p>Nutricionista Esportivo e Clínico</p>
            <p className="text-white/70 dark:text-foreground/60">CRN 7995/P</p>
            <p className="text-white/70 dark:text-foreground/60">
              Transformando hábitos alimentares com estratégias objetivas e resultados sustentáveis.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-white dark:text-foreground">Contato</h4>
            <a href="tel:+557799817849" className="flex items-center gap-2 hover:text-white dark:hover:text-foreground transition-colors">
              <Phone className="w-4 h-4" />
              (77) 99817-849
            </a>
            <a
              href="mailto:contato@paulovirgilio.com.br"
              className="flex items-center gap-2 hover:text-white dark:hover:text-foreground transition-colors"
            >
              <Mail className="w-4 h-4" />
              contato@paulovirgilio.com.br
            </a>
          </div>

          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-white dark:text-foreground">Redes Sociais</h4>
            <a
              href="https://www.instagram.com/paulonutricao"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white dark:hover:text-foreground transition-colors"
            >
              <Instagram className="w-4 h-4" />
              @paulonutricao
            </a>
          </div>

          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-white dark:text-foreground">Localização</h4>
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Bahia, Brasil
            </p>
            <a href="#locations" className="inline-flex text-primary hover:text-white dark:hover:text-foreground transition-colors">
              Ver todos os consultórios →
            </a>
          </div>
        </div>

        <div className="border-t border-[#333941] pt-8 mt-12 text-center text-md text-white/70 dark:border-border/40 dark:text-foreground/60">
          <p>© {year} Paulo Virgílio – Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
