import { Instagram, MapPin, Mail, Phone } from "lucide-react";
import Monograma from "@/assets/monogra-AJV.png";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">

        {/* GRID PRINCIPAL */}
        <div className="grid gap-10 md:grid-cols-4 text-sm text-background/80">

          {/* SOBRE O PROFISSIONAL */}
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-background">Paulo Virgílio</h3>
            <p>Nutricionista Esportivo e Clínico</p>
            <p className="text-background/60">CRN 7995</p>
            <p className="text-background/60">
              Transformando hábitos alimentares com estratégias objetivas
              e resultados sustentáveis.
            </p>
          </div>

          {/* CONTATO */}
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

          {/* REDES SOCIAIS */}
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

          {/* LOCALIZAÇÃO */}
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

        {/* LINHA INFERIOR */}
        <div className="border-t border-background/20 pt-6 mt-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">

            {/* COPYRIGHT */}
            <p className="text-background/60 text-center md:text-left text-sm">
              © {year} Paulo Virgílio – Todos os direitos reservados.
            </p>

            {/* CRIADOR DO SITE */}
            <a
              href="https://alvesjaov.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 opacity-75"
            >
              <span className="text-background/70 text-sm font-normal">
                Criado por João Victor Alves
              </span>

              <img
                src={Monograma}
                alt="João Victor Alves Monograma"
                className="w-6 h-6 object-contain"
              />
            </a>

          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
