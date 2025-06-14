export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      comentarios: {
        Row: {
          conteudo: string
          created_at: string | null
          id: string
          resposta_id: string | null
          user_id: string | null
        }
        Insert: {
          conteudo: string
          created_at?: string | null
          id?: string
          resposta_id?: string | null
          user_id?: string | null
        }
        Update: {
          conteudo?: string
          created_at?: string | null
          id?: string
          resposta_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comentarios_resposta_id_fkey"
            columns: ["resposta_id"]
            isOneToOne: false
            referencedRelation: "respostas"
            referencedColumns: ["id"]
          },
        ]
      }
      disciplinas: {
        Row: {
          created_at: string | null
          id: string
          materia_id: string | null
          nome: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          materia_id?: string | null
          nome: string
        }
        Update: {
          created_at?: string | null
          id?: string
          materia_id?: string | null
          nome?: string
        }
        Relationships: [
          {
            foreignKeyName: "disciplinas_materia_id_fkey"
            columns: ["materia_id"]
            isOneToOne: false
            referencedRelation: "materias"
            referencedColumns: ["id"]
          },
        ]
      }
      materias: {
        Row: {
          created_at: string | null
          descricao: string | null
          id: string
          nome: string
        }
        Insert: {
          created_at?: string | null
          descricao?: string | null
          id?: string
          nome: string
        }
        Update: {
          created_at?: string | null
          descricao?: string | null
          id?: string
          nome?: string
        }
        Relationships: []
      }
      perguntas: {
        Row: {
          anexos: Json | null
          conteudo: string
          created_at: string | null
          disciplina_id: string | null
          id: string
          materia_id: string | null
          pontos: number
          status: string | null
          titulo: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          anexos?: Json | null
          conteudo: string
          created_at?: string | null
          disciplina_id?: string | null
          id?: string
          materia_id?: string | null
          pontos?: number
          status?: string | null
          titulo: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          anexos?: Json | null
          conteudo?: string
          created_at?: string | null
          disciplina_id?: string | null
          id?: string
          materia_id?: string | null
          pontos?: number
          status?: string | null
          titulo?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "perguntas_disciplina_id_fkey"
            columns: ["disciplina_id"]
            isOneToOne: false
            referencedRelation: "disciplinas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "perguntas_materia_id_fkey"
            columns: ["materia_id"]
            isOneToOne: false
            referencedRelation: "materias"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          ai_credits: number
          avatar_url: string | null
          created_at: string
          email: string
          id: string
          name: string | null
          points: number
          subscription: string | null
          updated_at: string
          user_type: string
          username: string
        }
        Insert: {
          ai_credits?: number
          avatar_url?: string | null
          created_at?: string
          email: string
          id: string
          name?: string | null
          points?: number
          subscription?: string | null
          updated_at?: string
          user_type?: string
          username: string
        }
        Update: {
          ai_credits?: number
          avatar_url?: string | null
          created_at?: string
          email?: string
          id?: string
          name?: string | null
          points?: number
          subscription?: string | null
          updated_at?: string
          user_type?: string
          username?: string
        }
        Relationships: []
      }
      questions: {
        Row: {
          author_id: string
          author_name: string
          content: string
          created_at: string | null
          difficulty: string
          has_answer: boolean | null
          id: string
          is_urgent: boolean | null
          likes: number | null
          points: number | null
          subject: string
          title: string
          updated_at: string | null
        }
        Insert: {
          author_id: string
          author_name: string
          content: string
          created_at?: string | null
          difficulty: string
          has_answer?: boolean | null
          id?: string
          is_urgent?: boolean | null
          likes?: number | null
          points?: number | null
          subject: string
          title: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string
          author_name?: string
          content?: string
          created_at?: string | null
          difficulty?: string
          has_answer?: boolean | null
          id?: string
          is_urgent?: boolean | null
          likes?: number | null
          points?: number | null
          subject?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      respostas: {
        Row: {
          conteudo: string
          created_at: string | null
          id: string
          melhor_resposta: boolean | null
          pergunta_id: string | null
          pontos: number
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          conteudo: string
          created_at?: string | null
          id?: string
          melhor_resposta?: boolean | null
          pergunta_id?: string | null
          pontos?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          conteudo?: string
          created_at?: string | null
          id?: string
          melhor_resposta?: boolean | null
          pergunta_id?: string | null
          pontos?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "respostas_pergunta_id_fkey"
            columns: ["pergunta_id"]
            isOneToOne: false
            referencedRelation: "perguntas"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
