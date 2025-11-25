import { useState, useEffect, useRef } from "react";
import { MapPin, Phone, Navigation, PinIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import logoNaturalLife from "@/assets/logo-natural-life.jpg";
import logoErghos from "@/assets/logo-erghos.jpg";
import logoMirelleSantos from "@/assets/logo-mirelle-santos.jpg";
import logoClinicaEssencial from "@/assets/logo-clinica-essecial.jpg";
import logoAme from "@/assets/logo-ame.jpg";

interface Location {
  id: string;
  city: string;
  name: string;
  address: string;
  phone: string;
  whatsapp: string;
  coordinates: { lat: number; lng: number };
  logo: string;
}

// CONFIGURAÇÃO DAS LOCALIZAÇÕES
const locations: Location[] = [
  {
    id: "brumado",
    city: "Brumado",
    name: "Natural Life",
    address: "Rua Cassimiro Pinheiro de Azevedo, 240 - Centro, Brumado - BA",
    phone: "(77) 99817-849",
    whatsapp: "557799817849",
    coordinates: { lat: -14.206683, lng: -41.668224 },
    logo: logoNaturalLife,
  },
  {
    id: "livramento",
    city: "Livramento de Nossa Senhora",
    name: "Academia Erghos",
    address: "Rua Edmundo Rodrigues Meira, 40 - Centro, Livramento de Nossa Senhora - BA",
    phone: "(77) 99554-458",
    whatsapp: "5577999554458",
    coordinates: { lat: -13.6378, lng: -41.8404 },
    logo: logoErghos,
  },
  {
    id: "malhada",
    city: "Malhada de Pedras",
    name: "Clinica Essencial - Saúde Integrativa",
    address: "Rua Bela Vista, 68 - Centro, Malhada de Pedras - BA",
    phone: "(77) 98833-1865",
    whatsapp: "5577988331865",
    coordinates: { lat: -14.39038155479054, lng: -41.878528099862976 },
    logo: logoClinicaEssencial,
  },
  {
    id: "ibitira",
    city: "Ibitira",
    name: "AME - Clínica Médica Integrada",
    address: "Rua Joaquim Gonçalves, s/n, Ibitira, Rio do Antônio - BA",
    phone: "(77) 98858-6055",
    whatsapp: "5577988586055",
    coordinates: { lat: -14.20731909829922, lng: -42.113622799782355 },
    logo: logoAme,
  }
];

const Locations = () => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [nearestLocation, setNearestLocation] = useState<Location | null>(null);
  const [locationPermission, setLocationPermission] = useState<"prompt" | "granted" | "denied">("prompt");

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  const loadingToastRef = useRef<string | number | null>(null);

  const requestLocation = () => {
    // Se já temos a localização, não solicitamos novamente
    if (userLocation) return;

    if ("geolocation" in navigator) {
      // Evita múltiplos toasts/calls simultâneos
      if (loadingToastRef.current) return;

      loadingToastRef.current = toast.loading("Obtendo sua localização...");

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setLocationPermission("granted");

          let nearest = locations[0];
          let minDistance = calculateDistance(latitude, longitude, nearest.coordinates.lat, nearest.coordinates.lng);

          locations.forEach((location) => {
            const distance = calculateDistance(latitude, longitude, location.coordinates.lat, location.coordinates.lng);
            if (distance < minDistance) {
              minDistance = distance;
              nearest = location;
            }
          });

          setNearestLocation(nearest);
          // atualiza o toast de loading usando o id armazenado
          toast.success(`Local mais próximo: ${nearest.city}`, { id: loadingToastRef.current ?? undefined });
          loadingToastRef.current = null;
        },
        (error) => {
          setLocationPermission("denied");
          toast.error("Não foi possível obter sua localização.", { id: loadingToastRef.current ?? undefined });
          console.error("Erro ao obter localização:", error);
          loadingToastRef.current = null;
        }
      );
    } else {
      toast.error("Geolocalização não é suportada pelo seu navegador.");
    }
  };

  // Chama apenas uma vez no mount; desabilitamos regra de deps para evitar múltiplas chamadas intencionais
  useEffect(() => {
    requestLocation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleWhatsAppClick = (location: Location) => {
    const message = encodeURIComponent(
      `Olá! Gostaria de agendar uma consulta com o Nutricionista Paulo Virgílio.`
    );
    window.open(`https://wa.me/${location.whatsapp}?text=${message}`, "_blank");
  };

  return (
    <section id="locations" className="py-20 bg-background relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-2">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">Atendimento Presencial</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Escolha o Local Mais Próximo
            </h2>
            <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
              Atendimento personalizado em 4 cidades da Bahia
            </p>

            {locationPermission === "prompt" && (
              <Button
                onClick={requestLocation}
                variant="outline"
                className="gap-2 hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <Navigation className="w-4 h-4" />
                Encontrar Local Mais Próximo
              </Button>
            )}
          </div>

          <div className="space-y-8">
            {(() => {
              let orderedLocations = locations;
              if (nearestLocation) {
                // Move o local mais próximo para o topo
                const idx = locations.findIndex(l => l.id === nearestLocation.id);
                if (idx > 0) {
                  orderedLocations = [locations[idx], ...locations.slice(0, idx), ...locations.slice(idx + 1)];
                }
              }
              return orderedLocations.map((location, index) => {
                const isNearest = nearestLocation?.id === location.id;
                return (
                  <Card
                    key={location.id}
                    className={`group relative overflow-hidden transition-all duration-500 animate-fade-in ${isNearest
                        ? "ring-2 ring-primary shadow-xl"
                        : ""
                      }`}
                    style={{
                      animationDelay: `${index * 150}ms`,
                    }}
                  >
                    {/* Gradient Overlay */}
                    {isNearest && (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />
                    )}

                    {/* Badge 'Mais Próximo' */}
                    {isNearest && (
                      <Badge className="absolute top-4 right-4 bg-accent shadow-lg">
                        <PinIcon className="w-3 h-3 mr-1" />
                        Mais Próximo
                      </Badge>
                    )}

                    <div className="relative grid md:grid-cols-4 gap-6">
                      {/* Logo Column (sem foto de fachada) */}
                      <div className="md:col-span-1 flex items-center justify-center p-6">
                        <div className="bg-white/95 backdrop-blur-sm rounded-[28px] sm:rounded-[32px] p-2 sm:p-3 shadow-lg border border-border/60">
                          <div className="-[22px] sm:rounded-[26px] overflow-hidden">
                            <img
                              src={location.logo}
                              alt={`Logo ${location.name}`}
                              className="w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 object-contain bg-white rounded-[22px] sm:rounded-[26px]"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Content Column */}
                      <div className="md:col-span-3 p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-3xl font-bold text-primary mb-1">
                              {location.city}
                            </h3>
                            <p className="text-lg font-medium text-foreground/90">
                              {location.name}
                            </p>
                          </div>
                        </div>

                        <div className="mb-6">
                          <div className="space-y-3">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" />
                              <span className="text-sm">{location.address}</span>
                            </div>
                            <div className="flex items-center gap-3 text-muted-foreground">
                              <Phone className="w-5 h-5 flex-shrink-0 text-primary" />
                              <span className="text-sm">{location.phone}</span>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 mb-6 items-center">
                          <Button
                            onClick={() => handleWhatsAppClick(location)}
                            className="w-full sm:flex-1 bg-whatsapp hover:bg-whatsapp/90 text-whatsapp-foreground shadow-lg hover:shadow-xl transition-all animate-pulse-subtle"
                            size="lg"
                          >
                            <svg
                              className="w-5 h-5 mr-2"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                            </svg>
                            Agendar Consulta!
                          </Button>

                          <Button
                            onClick={() => window.open(
                              `https://www.google.com/maps/dir/?api=1&destination=${location.coordinates.lat},${location.coordinates.lng}`,
                              "_blank"
                            )}
                            className="w-full sm:w-44 flex-none bg-primary/10 hover:bg-primary/20 text-primary border border-border transition-all"
                            size="lg"
                          >
                            <MapPin className="w-5 h-5 mr-2" />
                            Como Chegar
                          </Button>
                        </div>

                      </div>
                    </div>
                  </Card>
                );
              });
            })()}
          </div>

          {locationPermission === "denied" && (
            <div className="mt-8 p-6 bg-gradient-to-r from-muted/50 to-muted/30 rounded-xl border border-border/50 text-center backdrop-blur-sm">
              <p className="text-muted-foreground flex items-center justify-center gap-2">
                <MapPin className="w-8 h-8 text-primary" />
                <span> Ative a localização para encontrarmos o consultório mais próximo de você!</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Locations;
