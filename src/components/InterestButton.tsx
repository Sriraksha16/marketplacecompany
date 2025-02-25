'use client';
import { Button } from "./ui/button";
import { supabase } from "@/lib/supabase/client";

interface InterestButtonProps {
  companyId: number;
}

export function InterestButton({ companyId }: { companyId: number }) {
  const handleInterest = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    
    await supabase.from('interests').insert({
      company_id: companyId,
      buyer_id: user.id
    });
  };

  return (
    <Button onClick={handleInterest}>
      Express Interest
    </Button>
  );
}