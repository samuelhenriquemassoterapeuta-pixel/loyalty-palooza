import { useState } from 'react'
import { Check, Loader2, Crown, Diamond } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PaymentDialog } from '@/features/pagamento/components/PaymentDialog'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'
import { PaymentResult } from '@/features/pagamento/hooks/useAsaasPayment'

interface Plan {
  key: string
  name: string
  price: number
  icon: React.ReactNode
  color: string
  features: string[]
  planId?: string // id na tabela assinaturas_planos
}

const plans: Plan[] = [
  {
    key: 'platinum',
    name: 'Platinum',
    price: 49.90,
    icon: <Crown className="w-5 h-5" />,
    color: 'from-slate-400 to-slate-600',
    features: [
      'Mirror AR ilimitado',
      'Voice Assistant premium',
      'Recomendações IA avançadas',
      '100 créditos/mês',
    ],
  },
  {
    key: 'diamond',
    name: 'Diamond',
    price: 99.90,
    icon: <Diamond className="w-5 h-5" />,
    color: 'from-cyan-400 to-blue-600',
    features: [
      'Tudo do Platinum',
      'Análise DNA',
      'Terapia VR',
      'Mentoria exclusiva',
      '300 créditos/mês',
    ],
  },
]

interface PlanSelectorProps {
  onSelect?: (planKey: string) => void
}

export function PlanSelector({ onSelect }: PlanSelectorProps) {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const [paymentOpen, setPaymentOpen] = useState(false)
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)
  const [referenceId, setReferenceId] = useState<string>('')

  const handleSelectPlan = async (plan: Plan) => {
    setLoadingPlan(plan.key)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        toast.error('Faça login para assinar um plano')
        return
      }

      // Buscar o plano na tabela assinaturas_planos pelo nome
      const { data: planData, error } = await supabase
        .from('assinaturas_planos')
        .select('id')
        .ilike('nome', `%${plan.name}%`)
        .eq('disponivel', true)
        .single()

      if (error || !planData) {
        toast.error('Plano não encontrado. Tente novamente em instantes.')
        return
      }

      // Criar registro de assinatura pendente
      const { data: assinatura, error: assError } = await supabase
        .from('assinaturas_usuario')
        .insert({
          user_id: user.id,
          plano_id: planData.id,
          status: 'pendente',
          data_inicio: new Date().toISOString(),
        })
        .select('id')
        .single()

      if (assError || !assinatura) {
        toast.error('Erro ao iniciar assinatura. Tente novamente.')
        return
      }

      setSelectedPlan(plan)
      setReferenceId(assinatura.id)
      setPaymentOpen(true)
      onSelect?.(plan.key)
    } catch (err) {
      toast.error('Erro inesperado. Tente novamente.')
    } finally {
      setLoadingPlan(null)
    }
  }

  const handlePaymentSuccess = async (result: PaymentResult) => {
    if (!referenceId) return

    // Ativar assinatura após pagamento confirmado (Pix/Cartão confirmado)
    if (result.status === 'CONFIRMED' || result.status === 'RECEIVED') {
      await supabase
        .from('assinaturas_usuario')
        .update({ status: 'ativo', renovacao_automatica: true })
        .eq('id', referenceId)

      toast.success(`Bem-vindo ao plano ${selectedPlan?.name}! 🎉`)
    } else {
      toast.info('Aguardando confirmação do pagamento.')
    }
  }

  return (
    <>
      <div className="grid md:grid-cols-2 gap-6">
        {plans.map(plan => (
          <div
            key={plan.key}
            className="relative border-2 rounded-2xl p-6 hover:border-primary/50 transition-all duration-200 bg-card cursor-pointer group"
            onClick={() => !loadingPlan && handleSelectPlan(plan)}
          >
            {/* Header com gradiente */}
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${plan.color} text-white text-sm font-semibold mb-4`}>
              {plan.icon}
              {plan.name}
            </div>

            <div className="mb-5">
              <span className="text-3xl font-bold text-foreground">
                R$ {plan.price.toFixed(2).replace('.', ',')}
              </span>
              <span className="text-muted-foreground text-sm ml-1">/mês</span>
            </div>

            <ul className="space-y-2.5 mb-6">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground/80">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              className={`w-full bg-gradient-to-r ${plan.color} text-white border-0 hover:opacity-90 transition-opacity`}
              disabled={loadingPlan === plan.key}
              onClick={(e) => {
                e.stopPropagation()
                handleSelectPlan(plan)
              }}
            >
              {loadingPlan === plan.key ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Aguarde...
                </>
              ) : (
                `Assinar ${plan.name}`
              )}
            </Button>
          </div>
        ))}
      </div>

      {selectedPlan && (
        <PaymentDialog
          open={paymentOpen}
          onOpenChange={setPaymentOpen}
          value={selectedPlan.price}
          description={`Assinatura ${selectedPlan.name} — Resinkra`}
          tipoReferencia="assinatura"
          referenciaId={referenceId}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </>
  )
}
