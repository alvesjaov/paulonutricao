import { Instagram, MapPin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* About */}
            <div>
              <h3 className="text-2xl font-bold mb-4">Paulo Virgílio</h3>
              <p className="text-background/80 mb-4">
                Nutricionista Esportivo e Clínico
              </p>
              <p className="text-sm text-background/60">CRN 7995</p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Links Rápidos</h4>
              <ul className="space-y-2 text-background/80">
                <li>
                  <a href="#sobre" className="hover:text-background transition-colors">
                    Sobre
                  </a>
                </li>
                <li>
                  <a href="#locations" className="hover:text-background transition-colors">
                    Locais de Atendimento
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <div className="space-y-3">
                <a
                  href="https://www.instagram.com/paulonutricao"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-background/80 hover:text-background transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                  <span>@paulonutricao</span>
                </a>
                <div className="flex items-center gap-2 text-background/80">
                  <MapPin className="w-5 h-5" />
                  <span>Bahia, Brasil</span>
                </div>
                {/* <div className="flex items-center gap-2 text-background/80">
                  <Mail className="w-5 h-5" />
                  <span>contato@paulovirgilio.com.br</span>
                </div> */}
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-background/20 text-center text-sm text-background/60">
            <p>© {new Date().getFullYear()} Paulo Virgílio Nutricionista. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
