'use client';
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { supabase } from "@/lib/supabase/client";

export function AuthForm({ type }: { type: 'login' | 'signup' }) {
  const router = useRouter();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const credentials: { email: string; password: string } = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };
   const { error } = type === 'login'
      ? await supabase.auth.signInWithPassword(credentials)
      : await supabase.auth.signUp(credentials);
  
    if (!error) router.push('/');
  };
  

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input name="email" type="email" placeholder="Email" required />
      <Input name="password" type="password" placeholder="Password" required />
      <Button type="submit">{type === 'login' ? 'Login' : 'Sign Up'}</Button>
    </form>
  );
}