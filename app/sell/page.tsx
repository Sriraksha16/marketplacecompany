
import { supabase } from "@/lib/supabase/client";
import CompanyCard from "@/components/CompanyCard";
import { SearchFilters } from '@/components/ui/SearchFilters';



export default async function Home({ searchParams }: {
  searchParams: { [key: string]: string | undefined }
}) {
  let query = supabase.from('companies').select('*');
  
  if (searchParams.industry) 
    query = query.eq('industry', searchParams.industry);
  if (searchParams.search) 
    query = query.ilike('name', `%${searchParams.search}%`);

  const { data: companies } = await query;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
      <SearchFilters />
      {companies?.map((company) => (
        <CompanyCard key={company.id} company={company} />
      ))}
    </div>
  );
}