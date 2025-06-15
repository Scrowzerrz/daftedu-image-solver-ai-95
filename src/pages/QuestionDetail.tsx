import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useAuth } from '@/contexts/AuthContext';
import { useQuestion, useAnswers, useCreateAnswer, useCreateComment } from '@/hooks/useQuestions';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, 
  User, 
  Clock, 
  MessageCircle, 
  Award, 
  Heart,
  Star,
  Send,
  Edit,
  Trash2,
  Flag,
  FileText,
  ExternalLink,
  Image
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function QuestionDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [newAnswer, setNewAnswer] = useState('');
  const [newComment, setNewComment] = useState<{ [key: string]: string }>({});
  const [showCommentForm, setShowCommentForm] = useState<{ [key: string]: boolean }>({});

  const { data: question, isLoading: questionLoading } = useQuestion(id!);
  const { data: answers, isLoading: answersLoading } = useAnswers(id!);
  const createAnswerMutation = useCreateAnswer();
  const createCommentMutation = useCreateComment();

  // Verificar se o usuário é o autor da pergunta
  const isQuestionAuthor = user && question && user.id === question.user_id;

  const handleDeleteQuestion = () => {
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: "A exclusão de perguntas será implementada em breve.",
    });
  };

  const handleEditQuestion = () => {
    toast({
      title: "Funcionalidade em desenvolvimento", 
      description: "A edição de perguntas será implementada em breve.",
    });
  };

  const handleReportQuestion = () => {
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: "O sistema de denúncias será implementado em breve.",
    });
  };

  const renderAttachments = (anexos: any[]) => {
    if (!anexos || anexos.length === 0) return null;

    return (
      <div className="mt-4 space-y-3">
        <h4 className="text-sm font-medium text-gray-700">Anexos:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {anexos.map((anexo, index) => {
            const isImage = anexo.tipo?.startsWith('image/') || anexo.url?.match(/\.(jpg|jpeg|png|gif|webp)$/i);
            
            return (
              <div key={index} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                <div className="flex items-center gap-3">
                  {isImage ? (
                    <Image className="h-5 w-5 text-blue-600" />
                  ) : (
                    <FileText className="h-5 w-5 text-gray-600" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {anexo.nome || `Anexo ${index + 1}`}
                    </p>
                    {anexo.tamanho && (
                      <p className="text-xs text-gray-500">
                        {(anexo.tamanho / 1024).toFixed(1)} KB
                      </p>
                    )}
                  </div>
                  {anexo.url && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => window.open(anexo.url, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                {isImage && anexo.url && (
                  <div className="mt-2">
                    <img 
                      src={anexo.url} 
                      alt={anexo.nome || 'Anexo'} 
                      className="max-w-full h-auto rounded border"
                      style={{ maxHeight: '200px' }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const getUserTypeLabel = (userType: string) => {
    switch (userType) {
      case 'student': return 'Estudante';
      case 'teacher': return 'Professor';
      case 'admin': return 'Administrador';
      default: return 'Usuário';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ativa':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Ativa</Badge>;
      case 'resolvida':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Resolvida</Badge>;
      case 'fechada':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Fechada</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">{status}</Badge>;
    }
  };

  if (questionLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-daft-50 to-blue-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-daft-600 border-t-transparent"></div>
          <p className="text-daft-600 font-medium">Carregando pergunta...</p>
        </div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-16 bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Pergunta não encontrada</h1>
              <Button onClick={() => navigate('/dashboard')}>
                Voltar ao Dashboard
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleSubmitAnswer = async () => {
    if (!newAnswer.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, escreva uma resposta.",
        variant: "destructive"
      });
      return;
    }

    try {
      await createAnswerMutation.mutateAsync({
        questionId: id!,
        content: newAnswer.trim()
      });
      
      setNewAnswer('');
      toast({
        title: "Sucesso",
        description: "Sua resposta foi publicada!"
      });
    } catch (error) {
      // O erro já é tratado no hook useCreateAnswer
    }
  };

  const handleSubmitComment = async (answerId: string) => {
    const comment = newComment[answerId];
    if (!comment?.trim()) return;

    try {
      await createCommentMutation.mutateAsync({
        answerId,
        content: comment.trim(),
        questionId: id!
      });
      
      setNewComment(prev => ({ ...prev, [answerId]: '' }));
      setShowCommentForm(prev => ({ ...prev, [answerId]: false }));
      toast({
        title: "Sucesso",
        description: "Seu comentário foi publicado!"
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao publicar comentário. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Header com botão voltar */}
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/dashboard')}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao Dashboard
            </Button>
          </div>

          {/* Pergunta Principal */}
          <Card className="mb-8 shadow-sm border border-gray-200">
            <CardContent className="p-8">
              {/* Status e informações básicas */}
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                  {question.materias?.nome || 'Geral'}
                </Badge>
                <Badge className="bg-green-100 text-green-700">
                  +{question.pontos} pontos
                </Badge>
                {getStatusBadge(question.status)}
                <div className="flex items-center gap-1 text-sm text-gray-500 ml-auto">
                  <Clock className="h-4 w-4" />
                  {formatDistanceToNow(new Date(question.created_at), { 
                    addSuffix: true, 
                    locale: ptBR 
                  })}
                </div>
              </div>

              {/* Título da pergunta */}
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                {question.titulo}
              </h1>

              {/* Conteúdo da pergunta */}
              <div className="prose prose-gray max-w-none mb-6">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {question.conteudo}
                </p>
              </div>

              {/* Anexos */}
              {renderAttachments(question.anexos || [])}

              {/* Informações do autor e botões de ação */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-daft-500 to-blue-500 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {question.profiles?.name || question.profiles?.username || 'Usuário'}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>Autor da pergunta</span>
                      {question.profiles && (
                        <>
                          <span>•</span>
                          <span>{getUserTypeLabel((question.profiles as any)?.user_type || 'student')}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {/* Botões para o autor da pergunta */}
                  {isQuestionAuthor && (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleEditQuestion}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Editar Pergunta
                      </Button>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4 mr-1" />
                            Excluir Pergunta
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Excluir pergunta?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta ação não pode ser desfeita. A pergunta e todas as respostas serão permanentemente removidas.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={handleDeleteQuestion}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Excluir
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </>
                  )}
                  
                  {/* Botão reportar para usuários logados */}
                  {user && !isQuestionAuthor && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={handleReportQuestion}
                    >
                      <Flag className="h-4 w-4 mr-1" />
                      Reportar
                    </Button>
                  )}
                  
                  <Button variant="ghost" size="sm">
                    <Heart className="h-4 w-4 mr-1" />
                    Útil
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Respostas */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Respostas ({answers?.length || 0})
            </h2>

            {answersLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-daft-600 border-t-transparent mx-auto"></div>
              </div>
            ) : answers && answers.length > 0 ? (
              <div className="space-y-6">
                {answers.map((answer) => (
                  <Card key={answer.id} className="shadow-sm border border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="font-medium text-gray-900">
                              {answer.profiles?.name || answer.profiles?.username || 'Usuário'}
                            </span>
                            {answer.melhor_resposta && (
                              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 flex items-center gap-1">
                                <Star className="h-3 w-3" />
                                Melhor Resposta
                              </Badge>
                            )}
                            <span className="text-sm text-gray-500 ml-auto">
                              {formatDistanceToNow(new Date(answer.created_at), { 
                                addSuffix: true, 
                                locale: ptBR 
                              })}
                            </span>
                          </div>

                          <div className="prose prose-gray max-w-none mb-4">
                            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                              {answer.conteudo}
                            </p>
                          </div>

                          <div className="flex items-center gap-4 text-sm">
                            <Button variant="ghost" size="sm">
                              <Heart className="h-4 w-4 mr-1" />
                              Útil
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setShowCommentForm(prev => ({ 
                                ...prev, 
                                [answer.id]: !prev[answer.id] 
                              }))}
                            >
                              <MessageCircle className="h-4 w-4 mr-1" />
                              Comentar
                            </Button>
                            <div className="flex items-center gap-1 text-gray-500">
                              <Award className="h-4 w-4" />
                              {answer.pontos} pontos
                            </div>
                          </div>

                          {/* Comentários */}
                          {answer.comentarios && answer.comentarios.length > 0 && (
                            <div className="mt-4 pl-4 border-l-2 border-gray-100">
                              {answer.comentarios.map((comment) => (
                                <div key={comment.id} className="mb-3 last:mb-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-sm font-medium text-gray-900">
                                      {comment.profiles?.name || comment.profiles?.username || 'Usuário'}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                      {formatDistanceToNow(new Date(comment.created_at), { 
                                        addSuffix: true, 
                                        locale: ptBR 
                                      })}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-700">
                                    {comment.conteudo}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Formulário de comentário */}
                          {showCommentForm[answer.id] && user && (
                            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                              <Textarea
                                placeholder="Escreva seu comentário..."
                                value={newComment[answer.id] || ''}
                                onChange={(e) => setNewComment(prev => ({ 
                                  ...prev, 
                                  [answer.id]: e.target.value 
                                }))}
                                className="mb-3"
                                rows={2}
                              />
                              <div className="flex gap-2">
                                <Button 
                                  size="sm"
                                  onClick={() => handleSubmitComment(answer.id)}
                                  disabled={createCommentMutation.isPending}
                                >
                                  <Send className="h-4 w-4 mr-1" />
                                  Comentar
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => setShowCommentForm(prev => ({ 
                                    ...prev, 
                                    [answer.id]: false 
                                  }))}
                                >
                                  Cancelar
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="shadow-sm border border-gray-200">
                <CardContent className="p-8 text-center">
                  <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Nenhuma resposta ainda
                  </h3>
                  <p className="text-gray-500">
                    Seja o primeiro a responder esta pergunta!
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Formulário para nova resposta */}
          {user ? (
            !isQuestionAuthor ? (
              <Card className="shadow-sm border border-gray-200">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Sua Resposta
                  </h3>
                  <Textarea
                    placeholder="Escreva uma resposta detalhada para ajudar o autor da pergunta..."
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                    className="mb-4"
                    rows={6}
                  />
                  <div className="flex gap-3">
                    <Button 
                      onClick={handleSubmitAnswer}
                      disabled={createAnswerMutation.isPending || !newAnswer.trim()}
                      className="bg-gradient-to-r from-daft-600 to-blue-600 hover:from-daft-700 hover:to-blue-700"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      {createAnswerMutation.isPending ? 'Publicando...' : 'Publicar Resposta'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-sm border border-gray-200">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Você é o autor desta pergunta
                  </h3>
                  <p className="text-gray-500">
                    Você não pode responder sua própria pergunta. Aguarde outros usuários responderem!
                  </p>
                </CardContent>
              </Card>
            )
          ) : (
            <Card className="shadow-sm border border-gray-200">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Faça login para responder
                </h3>
                <p className="text-gray-500 mb-4">
                  Você precisa estar logado para responder esta pergunta.
                </p>
                <Button onClick={() => navigate('/login')}>
                  Fazer Login
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
