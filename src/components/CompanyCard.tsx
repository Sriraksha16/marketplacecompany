import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { InterestButton } from "./InterestButton";

interface Company {
  id: number;
  name: string;
  description: string;
  image_url: string;
  industry: string;
  price: number;

}

type CompanyCardProps = {
  company: Company;
};

const CompanyCard = ({ company }: CompanyCardProps) => {
  return (
    <div className="border p-4 rounded shadow-lg">
      <img src={company.image_url} alt={company.name} className="w-full h-48 object-cover rounded mb-4" />
      <h3 className="text-xl font-bold">{company.name}</h3>
      <p>Industry: {company.industry}</p>
      <p>{company.description}</p>
      <p className="text-green-600">${company.price}</p>
    </div>
  );
};

export default CompanyCard;
