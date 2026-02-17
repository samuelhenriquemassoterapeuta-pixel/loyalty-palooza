import { useParams, useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { ProtocoloDetail } from "@/features/protocolos/components/ProtocoloDetail";
import { useProtocolos } from "@/features/protocolos/hooks/useProtocolos";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const ProtocoloDetalhe = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { protocolos, isLoading } = useProtocolos();

  const protocolo = protocolos.find((p) => p.id === id);

  if (isLoading) {
    return (
      <AppLayout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </AppLayout>
    );
  }

  if (!protocolo) {
    return (
      <AppLayout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <p className="text-lg font-semibold">Protocolo não encontrado</p>
            <button
              onClick={() => navigate("/protocolos")}
              className="mt-3 text-primary hover:underline text-sm"
            >
              Voltar para protocolos
            </button>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="min-h-screen bg-background pb-24 lg:pb-8">
        <div className="max-w-lg lg:max-w-4xl xl:max-w-5xl mx-auto px-4 lg:px-8 pt-6 safe-top">
          <ProtocoloDetail
            protocolo={protocolo}
            onBack={() => navigate("/protocolos")}
          />
        </div>
      </div>
    </AppLayout>
  );
};

export default ProtocoloDetalhe;
