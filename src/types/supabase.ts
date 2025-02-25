
export type Database = {
    public: {
      Tables: {
        companies: {
          Row: {
            id: string
            name: string
            description: string | null
            price: number
            industry: string
            image_url: string | null
            seller_id: string
            created_at: string
          }
          Insert: { /* ... */ }
          Update: { /* ... */ }
        }
        interests: {
          Row: {
            id: string
            company_id: string
            buyer_id: string
            created_at: string
          }
         
        }
      }
      
    }
  }
  
  