import { Instagram, MapPin, Mail, Phone } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-10 md:grid-cols-4 text-sm text-background/80">
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-background">Paulo Virgílio</h3>
            <p>Nutricionista Esportivo e Clínico</p>
            <p className="text-background/60">CRN 7995/P</p>
            <p className="text-background/60">
              Transformando hábitos alimentares com estratégias objetivas e resultados sustentáveis.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-background">Contato</h4>
            <a href="tel:+557799817849" className="flex items-center gap-2 hover:text-background transition-colors">
              <Phone className="w-4 h-4" />
              (77) 99817-849
            </a>
            <a
              href="mailto:contato@paulovirgilio.com.br"
              className="flex items-center gap-2 hover:text-background transition-colors"
            >
              <Mail className="w-4 h-4" />
              contato@paulovirgilio.com.br
            </a>
          </div>

          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-background">Redes Sociais</h4>
            <a
              href="https://www.instagram.com/paulonutricao"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-background transition-colors"
            >
              <Instagram className="w-4 h-4" />
              @paulonutricao
            </a>
          </div>

          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-background">Localização</h4>
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Bahia, Brasil
            </p>
            <a href="#locations" className="inline-flex text-primary hover:text-background transition-colors">
              Ver todos os consultórios →
            </a>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 mt-12 text-center text-md text-background/60">
          <p>© {year} Paulo Virgílio – Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
