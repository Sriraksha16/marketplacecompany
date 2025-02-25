'use client';
 
 import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

interface BuyerInfoProps {
  buyerId: number; 
}

interface BuyerProfile {
  id: string;
  full_name?: string;
  email?: string;
  phone?: string;
  created_at: string;
}

const BuyerInfo: React.FC<BuyerInfoProps> = ({ buyerId }) => {
  const [buyer, setBuyer] = useState<BuyerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBuyerInfo = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', buyerId)
          .single();

        if (error) throw error;
        if (data) setBuyer(data);
      } catch (err) {
        setError('Failed to fetch buyer information');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBuyerInfo();
  }, [buyerId]);

  if (loading) {
    return <div className="text-sm text-muted-foreground">Loading buyer info...</div>;
  }

  if (error) {
    return (
      <div className="text-sm text-destructive">
        {error}
        <button 
          onClick={() => window.location.reload()}
          className="ml-2 text-primary hover:underline"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!buyer) {
    return <div className="text-sm text-muted-foreground">Buyer information not found</div>;
  }

  return (
    <div className="space-y-2 p-4 border rounded-lg">
      <h3 className="font-medium">Buyer Details</h3>
      <div className="text-sm">
        {buyer.full_name && <p>Name: {buyer.full_name}</p>}
        {buyer.email && <p>Email: {buyer.email}</p>}
        {buyer.phone && <p>Phone: {buyer.phone}</p>}
        <p className="text-muted-foreground">
          Member since: {new Date(buyer.created_at).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default BuyerInfo;
  