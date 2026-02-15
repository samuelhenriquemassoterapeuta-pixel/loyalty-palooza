import { Card } from "@/components/ui/card";

interface AulaHeroCardProps {
  image: string;
  video: string;
  title: string;
  description?: string;
}

/**
 * Standardized hero card for course lessons.
 * Shows a background image with ambient video overlay and optional description text.
 */
export function AulaHeroCard({ image, video, title, description }: AulaHeroCardProps) {
  return (
    <Card className="mb-4 overflow-hidden rounded-xl">
      <div className="relative aspect-video">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <video
          src={video}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        {description && (
          <div className="absolute bottom-3 left-3 right-3">
            <p className="text-xs font-medium text-foreground/90 drop-shadow-sm">{description}</p>
          </div>
        )}
      </div>
    </Card>
  );
}
