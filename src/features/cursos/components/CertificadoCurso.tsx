import { useState } from "react";
import { Download, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import jsPDF from "jspdf";

interface CertificadoCursoProps {
  courseTitle: string;
  totalHoras: number;
}

export function CertificadoCurso({ courseTitle, totalHoras }: CertificadoCursoProps) {
  const { profile } = useProfile();
  const { user } = useAuth();
  const [generating, setGenerating] = useState(false);

  const nomeAluno = profile?.nome || user?.email || "Aluno";

  const gerarCertificado = async () => {
    setGenerating(true);
    try {
      const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
      const W = 297;
      const H = 210;

      // ── Background ──
      doc.setFillColor(62, 67, 49); // Verde Folha Sombra
      doc.rect(0, 0, W, H, "F");

      // ── Inner frame ──
      const m = 12;
      doc.setDrawColor(235, 235, 224); // Areia Serena
      doc.setLineWidth(0.6);
      doc.rect(m, m, W - m * 2, H - m * 2);
      doc.setLineWidth(0.3);
      doc.rect(m + 3, m + 3, W - (m + 3) * 2, H - (m + 3) * 2);

      // ── Inner fill ──
      doc.setFillColor(250, 249, 245);
      doc.rect(m + 5, m + 5, W - (m + 5) * 2, H - (m + 5) * 2, "F");

      // ── Decorative corners ──
      const cornerSize = 8;
      const inner = m + 5;
      doc.setDrawColor(116, 82, 39); // Canela com Mel
      doc.setLineWidth(0.5);
      // Top-left
      doc.line(inner, inner + cornerSize, inner, inner);
      doc.line(inner, inner, inner + cornerSize, inner);
      // Top-right
      doc.line(W - inner - cornerSize, inner, W - inner, inner);
      doc.line(W - inner, inner, W - inner, inner + cornerSize);
      // Bottom-left
      doc.line(inner, H - inner - cornerSize, inner, H - inner);
      doc.line(inner, H - inner, inner + cornerSize, H - inner);
      // Bottom-right
      doc.line(W - inner - cornerSize, H - inner, W - inner, H - inner);
      doc.line(W - inner, H - inner - cornerSize, W - inner, H - inner);

      const cx = W / 2;

      // ── Brand ──
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(116, 82, 39);
      doc.text("RESINKRA", cx, 32, { align: "center" });

      // ── Title ──
      doc.setFontSize(28);
      doc.setTextColor(62, 67, 49);
      doc.text("CERTIFICADO", cx, 48, { align: "center" });

      // ── Subtitle ──
      doc.setFontSize(11);
      doc.setTextColor(100, 100, 100);
      doc.text("DE CONCLUSÃO DE CURSO", cx, 56, { align: "center" });

      // ── Decorative line ──
      doc.setDrawColor(116, 82, 39);
      doc.setLineWidth(0.4);
      doc.line(cx - 40, 62, cx + 40, 62);

      // ── Body text ──
      doc.setFontSize(11);
      doc.setTextColor(80, 80, 80);
      doc.text("Certificamos que", cx, 74, { align: "center" });

      // ── Student name ──
      doc.setFontSize(24);
      doc.setTextColor(62, 67, 49);
      doc.text(nomeAluno, cx, 88, { align: "center" });

      // ── Name underline ──
      const nameWidth = doc.getTextWidth(nomeAluno);
      doc.setDrawColor(116, 82, 39);
      doc.setLineWidth(0.3);
      doc.line(cx - nameWidth / 2 - 5, 91, cx + nameWidth / 2 + 5, 91);

      // ── Course description ──
      doc.setFontSize(11);
      doc.setTextColor(80, 80, 80);
      doc.text("concluiu com êxito o curso de", cx, 102, { align: "center" });

      doc.setFontSize(18);
      doc.setTextColor(116, 82, 39);
      const titleLines = doc.splitTextToSize(courseTitle, 200);
      doc.text(titleLines, cx, 114, { align: "center" });

      const afterTitle = 114 + titleLines.length * 8;

      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`Carga horária: ${totalHoras} horas`, cx, afterTitle + 6, { align: "center" });

      // ── Date ──
      const hoje = new Date();
      const dataFormatada = hoje.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      doc.text(`Emitido em ${dataFormatada}`, cx, afterTitle + 16, { align: "center" });

      // ── Signature line ──
      const sigY = H - 45;
      doc.setDrawColor(62, 67, 49);
      doc.setLineWidth(0.3);
      doc.line(cx - 40, sigY, cx + 40, sigY);

      doc.setFontSize(10);
      doc.setTextColor(62, 67, 49);
      doc.text("Resinkra — Escola de Formação", cx, sigY + 6, { align: "center" });

      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text("www.resinkra.com.br", cx, sigY + 12, { align: "center" });

      // ── Verification ID ──
      const verificationId = `RES-${Date.now().toString(36).toUpperCase()}`;
      doc.setFontSize(7);
      doc.setTextColor(180, 180, 180);
      doc.text(`ID: ${verificationId}`, W - m - 8, H - m - 8, { align: "right" });

      // ── Save ──
      const fileName = `Certificado_${courseTitle.replace(/\s+/g, "_")}.pdf`;
      doc.save(fileName);

      toast.success("Certificado gerado com sucesso! 🏆");
    } catch (err) {
      console.error("Erro ao gerar certificado:", err);
      toast.error("Erro ao gerar o certificado. Tente novamente.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <Button
      onClick={gerarCertificado}
      disabled={generating}
      className="mt-3 gap-2"
      variant="default"
    >
      {generating ? (
        <>Gerando...</>
      ) : (
        <>
          <Award size={18} />
          Baixar Certificado
        </>
      )}
    </Button>
  );
}
