# 📝 Convenções de Código — Resinkra

## Estrutura de Arquivos

```
src/
├── components/
│   ├── ui/              # Shadcn/UI base components (Button, Card, etc)
│   ├── shared/          # Componentes compartilhados do domínio
│   └── layout/          # Header, Sidebar, Footer
├── features/
│   ├── agendamentos/    # Feature folder
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── types.ts
│   │   └── index.ts
│   ├── cashback/
│   └── cursos/
├── hooks/               # Hooks globais (useAuth, useFeatureFlag, etc)
├── lib/                 # Utilitários puros (formatters, validators)
├── integrations/        # Supabase client, API configs
└── types/               # TypeScript types globais
```

## Regras de Nomenclatura

| Item | Convenção | Exemplo |
|------|-----------|---------|
| Componentes | PascalCase | `CashbackDisplay.tsx` |
| Hooks | camelCase com `use` | `useCursoProgresso.ts` |
| Utils | camelCase | `formatCurrency.ts` |
| Types | PascalCase | `Agendamento`, `Produto` |
| Tabelas SQL | snake_case | `curso_progresso` |
| Feature folders | kebab-case | `vale-presente/` |
| Query keys | array com nome da tabela | `["produtos", filtro]` |

## Regras de Código

### ✅ FAÇA
- Use TanStack Query para TODAS as chamadas ao Supabase
- Use hooks customizados para lógica de negócio
- Use `toast.success/error` do Sonner para feedback
- Use `StatusBadge` para todos os status
- Use `EmptyState` para listas vazias
- Use `ConfirmDialog` para ações destrutivas
- Use `useSupabaseSelect/Mutation` para CRUD simples
- Adicione `data-testid` em elementos interativos para E2E

### ❌ NÃO FAÇA
- NÃO use localStorage para dados persistentes (use Supabase)
- NÃO faça fetch direto — use TanStack Query
- NÃO use `any` — defina tipos
- NÃO duplique componentes — busque em `shared/` primeiro
- NÃO deixe console.log em produção
- NÃO faça componentes >300 linhas — divida em subcomponentes
- NÃO crie lógica de negócio no componente — extraia para hook

## Padrão de Query Keys
```typescript
// Padronizar para invalidação funcionar corretamente
["produtos"]                     // lista
["produtos", produtoId]          // detalhe
["produtos", { categoria }]     // lista filtrada
["curso-progresso", cursoId]     // por curso
["user-features", userId]        // por usuário
```

## Componentes Compartilhados (src/components/shared/)

| Componente | Uso |
|------------|-----|
| `StatusBadge` | Badge padronizado para status (ativo, pendente, cancelado, etc) |
| `EmptyState` | Estado vazio para listas e tabelas |
| `LoadingSkeleton` | Skeletons (CardSkeleton, ListSkeleton, TableSkeleton, PageSkeleton) |
| `CashbackDisplay` | Exibição padronizada de valores Resinks/cashback |
| `ConfirmDialog` | Diálogo de confirmação para ações destrutivas |
| `FeatureGate` | Controle de acesso por feature flag |

## Hooks Globais (src/hooks/)

| Hook | Uso |
|------|-----|
| `useSupabaseSelect` | Query genérica SELECT com cache e filtros |
| `useSupabaseMutation` | Mutation genérica INSERT/UPDATE/DELETE |
| `useFeatureFlag` | Verificar se feature está habilitada |
| `useCursoProgressoGeral` | Progresso de cursos no Supabase |
