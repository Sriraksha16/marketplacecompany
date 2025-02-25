"use client";



import { useState, useEffect } from "react";
import CompanyCard from "../CompanyCard";


type Company = {
  id: number;
  name: string;
  industry: string;
  description: string;
  image_url: string;
  price: number;
};

export const SearchFilters = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    const fetchCompanies = () => {
      setTimeout(() => {
        const dummyCompanies: Company[] = [
          {
            id: 1,
            name: "TechCorp",
            industry: "Technology",
            description: "A leading tech company specializing in AI.",
            image_url: "https://via.placeholder.com/150", // Placeholder image URL
            price: 1999,
          },
          {
            id: 2,
            name: "HealthPlus",
            industry: "Healthcare",
            description: "Healthcare company focused on wellness.",
            image_url: "https://via.placeholder.com/150", // Placeholder image URL
            price: 1299,
          },
          {
            id: 3,
            name: "EcoProducts",
            industry: "Retail",
            description: "Sustainable products for everyday life.",
            image_url: "https://via.placeholder.com/150", // Placeholder image URL
            price: 999,
          },
        ];
        setCompanies(dummyCompanies);
        setLoading(false);
      }, 1000);
    };

    fetchCompanies();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
      {companies.map((company) => (
        <CompanyCard key={company.id} company={company} />
      ))}
    </div>
  );
};
