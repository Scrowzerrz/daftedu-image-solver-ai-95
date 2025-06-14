import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useToast } from "@/hooks/use-toast";

// This is a placeholder that should be replaced with actual Supabase auth implementation
interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  subscription?: "free" | "pro" | "premium";
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name?: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // This is where we would initialize Supabase auth and listen for auth state changes
  useEffect(() => {
    // Simulate auth state check
    const checkAuth = async () => {
      try {
        // In a real implementation, we would check the Supabase auth state
        const savedUser = localStorage.getItem("daftedu_user");
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error("Auth state check failed:", error);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
    
    // Cleanup function
    return () => {
      // Clear any subscriptions or listeners
    };
  }, []);
  
  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // In a real implementation, we would use Supabase auth
      // const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      // if (error) throw error;
      
      // Mock successful auth for demo
      if (email === "demo@example.com" && password === "password") {
        const mockUser = {
          id: "usr_" + Math.random().toString(36).substring(2, 15),
          email,
          name: "Demo User",
          subscription: "free" as const
        };
        setUser(mockUser);
        localStorage.setItem("daftedu_user", JSON.stringify(mockUser));
        toast({
          title: "Signed in successfully!",
          description: `Welcome back, ${mockUser.name}!`,
        });
        navigate("/dashboard");
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error: any) {
      toast({
        title: "Sign in failed",
        description: error.message || "Please check your credentials and try again.",
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  const signUp = async (email: string, password: string, name?: string) => {
    try {
      setLoading(true);
      
      // In a real implementation, we would use Supabase auth
      // const { data, error } = await supabase.auth.signUp({ email, password });
      // if (error) throw error;
      
      // Mock successful signup for demo
      const mockUser = {
        id: "usr_" + Math.random().toString(36).substring(2, 15),
        email,
        name: name || email.split("@")[0],
        subscription: "free" as const
      };
      setUser(mockUser);
      localStorage.setItem("daftedu_user", JSON.stringify(mockUser));
      toast({
        title: "Account created successfully!",
        description: "Welcome to daftedu!",
      });
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Sign up failed",
        description: error.message || "Please try again with a different email.",
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  const signOut = async () => {
    try {
      setLoading(true);
      
      // In a real implementation, we would use Supabase auth
      // await supabase.auth.signOut();
      
      // Mock signout
      setUser(null);
      localStorage.removeItem("daftedu_user");
      toast({
        title: "Signed out successfully",
      });
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Sign out failed",
        description: error.message || "Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  const resetPassword = async (email: string) => {
    try {
      setLoading(true);
      
      // In a real implementation, we would use Supabase auth
      // const { error } = await supabase.auth.resetPasswordForEmail(email);
      // if (error) throw error;
      
      // Mock successful password reset for demo
      // Always show success message for security reasons
      toast({
        title: "Link de redefinição enviado",
        description: "Se o email estiver cadastrado, você receberá um link para redefinir sua senha.",
      });
    } catch (error: any) {
      // Even on error, show success message for security
      toast({
        title: "Link de redefinição enviado",
        description: "Se o email estiver cadastrado, você receberá um link para redefinir sua senha.",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const updateProfile = async (data: Partial<User>) => {
    try {
      setLoading(true);
      
      // In a real implementation, we would use Supabase
      // const { error } = await supabase.from('profiles').update(data).eq('id', user.id);
      // if (error) throw error;
      
      // Mock update
      if (user) {
        const updatedUser = { ...user, ...data };
        setUser(updatedUser);
        localStorage.setItem("daftedu_user", JSON.stringify(updatedUser));
        toast({
          title: "Profile updated successfully",
        });
      }
    } catch (error: any) {
      toast({
        title: "Profile update failed",
        description: error.message || "Please try again.",
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateProfile
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
