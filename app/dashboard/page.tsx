'use client';
import { supabase } from "@/lib/supabase/client";
import BuyerInfo from '@/components/BuyerInfo'; 

interface Interest {
  id: number;
  buyer_id: number;
}

interface Company {
  id: number;
  name: string;
  interests: Interest[];
}

export default async function Dashboard() {
  const { data: { user } } = await supabase.auth.getUser();
  
  const { data: companies } = await supabase
    .from('companies')
    .select('*, interests(*)')
    .eq('seller_id', user?.id);

  return (
    <div className="space-y-4">
      {companies?.map((company: Company) => (
        <div key={company.id} className="p-4 border rounded">
          <h3 className="text-xl font-bold">{company.name}</h3>
          <div className="mt-2">
            <h4 className="font-semibold">Interested Buyers:</h4>
            {company.interests.map((interest: Interest) => (
              <BuyerInfo key={interest.id} buyerId={interest.buyer_id} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
