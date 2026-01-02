import { Header } from "@/components/Header";
import { BalanceCard } from "@/components/BalanceCard";
import { QuickActions } from "@/components/QuickActions";
import { TransactionHistory } from "@/components/TransactionHistory";
import { BottomNavigation } from "@/components/BottomNavigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-background gradient-hero pb-24">
      <div className="max-w-lg mx-auto px-4 safe-top">
        <Header />
        
        <main className="space-y-6 mt-2">
          <BalanceCard />
          <QuickActions />
          <TransactionHistory />
        </main>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Index;
