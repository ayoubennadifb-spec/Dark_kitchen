import { useState } from "react";
import { Navbar, MobileNavbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ChefBadge, BadgeLevel } from "@/components/ChefBadge";
import { 
  Users, 
  BookOpen, 
  Trophy, 
  Calendar,
  MessageSquare,
  Heart,
  Eye,
  Clock,
  Crown,
  Lock
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const tabs = [
  { id: "discussions", label: "Discussions", icon: MessageSquare },
  { id: "recipes", label: "Recettes", icon: BookOpen },
  { id: "competitions", label: "Compétitions", icon: Trophy },
  { id: "events", label: "Événements", icon: Calendar },
];

const discussions = [
  {
    id: 1,
    title: "Astuces pour réussir la pastilla ?",
    author: "Fatima Z.",
    authorBadge: "emerald" as BadgeLevel,
    avatar: "https://images.unsplash.com/photo-1595475207225-428b62bda831?w=100&h=100&fit=crop",
    replies: 24,
    views: 156,
    category: "Conseils",
    timeAgo: "Il y a 2h",
  },
  {
    id: 2,
    title: "Quelle huile d'olive utilisez-vous ?",
    author: "Khadija B.",
    authorBadge: "gold" as BadgeLevel,
    avatar: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=100&h=100&fit=crop",
    replies: 45,
    views: 312,
    category: "Ingrédients",
    timeAgo: "Il y a 5h",
  },
  {
    id: 3,
    title: "Comment fixer ses prix ?",
    author: "Aicha E.",
    authorBadge: "silver" as BadgeLevel,
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop",
    replies: 18,
    views: 89,
    category: "Business",
    timeAgo: "Il y a 1j",
  },
];

const recipes = [
  {
    id: 1,
    title: "Tajine d'agneau aux pruneaux",
    author: "Fatima Zahra",
    authorBadge: "emerald" as BadgeLevel,
    image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=400&h=300&fit=crop",
    likes: 234,
    difficulty: "Moyen",
    duration: "2h",
    isPremium: false,
  },
  {
    id: 2,
    title: "Couscous tfaya (recette de famille)",
    author: "Khadija Benali",
    authorBadge: "gold" as BadgeLevel,
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop",
    likes: 189,
    difficulty: "Difficile",
    duration: "3h",
    isPremium: true,
  },
  {
    id: 3,
    title: "Briouates au fromage",
    author: "Naima C.",
    authorBadge: "bronze" as BadgeLevel,
    image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=400&h=300&fit=crop",
    likes: 156,
    difficulty: "Facile",
    duration: "45min",
    isPremium: false,
  },
];

const competitions = [
  {
    id: 1,
    title: "Meilleur Couscous du Vendredi",
    status: "En cours",
    participants: 48,
    endDate: "5 jours",
    prize: "5,000 DH",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=250&fit=crop",
  },
  {
    id: 2,
    title: "Challenge Harira Ramadan",
    status: "À venir",
    participants: 0,
    endDate: "Dans 2 semaines",
    prize: "Badge Emerald",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&h=250&fit=crop",
  },
];

export default function Community() {
  const [activeTab, setActiveTab] = useState("discussions");
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleNewDiscussion = () => {
    if (!user) {
      toast.error('Connectez-vous pour créer une discussion');
      navigate('/auth');
      return;
    }
    toast.info('Fonctionnalité de création de discussion bientôt disponible !');
  };

  const handleShareRecipe = () => {
    if (!user) {
      toast.error('Connectez-vous pour partager une recette');
      navigate('/auth');
      return;
    }
    toast.info('Fonctionnalité de partage de recette bientôt disponible !');
  };

  const handleSubscribeNotifications = () => {
    if (!user) {
      toast.error('Connectez-vous pour vous abonner aux notifications');
      navigate('/auth');
      return;
    }
    toast.success('Vous serez notifié des prochains événements !');
  };

  const handleParticipate = (competitionTitle: string) => {
    if (!user) {
      toast.error('Connectez-vous pour participer');
      navigate('/auth');
      return;
    }
    toast.success(`Inscription à "${competitionTitle}" en cours !`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 md:pt-24 pb-24 lg:pb-12">
        <div className="container">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent mb-4">
              <Users className="h-4 w-4" />
              <span className="text-sm font-medium">+12,000 membres</span>
            </div>
            <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-2">
              Communauté DarFood
            </h1>
            <p className="text-muted-foreground" dir="rtl">
              مجتمع عشاق الطبخ المغربي
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium whitespace-nowrap transition-all",
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-muted-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Discussions Tab */}
          {activeTab === "discussions" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-semibold text-foreground">Discussions récentes</h2>
                <Button variant="default" size="sm" onClick={handleNewDiscussion}>Nouvelle discussion</Button>
              </div>
              
              {discussions.map((discussion) => (
                <div key={discussion.id} className="p-4 rounded-xl bg-card hover:shadow-soft transition-all cursor-pointer">
                  <div className="flex items-start gap-4">
                    <img src={discussion.avatar} alt={discussion.author} className="h-10 w-10 rounded-full object-cover" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-foreground">{discussion.author}</span>
                        <ChefBadge level={discussion.authorBadge} size="sm" showLabel={false} />
                        <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{discussion.category}</span>
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">{discussion.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-3.5 w-3.5" />
                          {discussion.replies} réponses
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3.5 w-3.5" />
                          {discussion.views} vues
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {discussion.timeAgo}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Recipes Tab */}
          {activeTab === "recipes" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-semibold text-foreground">Recettes de la communauté</h2>
                <Button variant="default" size="sm" onClick={handleShareRecipe}>Partager une recette</Button>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes.map((recipe) => (
                  <div key={recipe.id} className="bg-card rounded-2xl overflow-hidden hover:shadow-card transition-all cursor-pointer group">
                    <div className="relative aspect-[4/3]">
                      <img src={recipe.image} alt={recipe.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      {recipe.isPremium && (
                        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium">
                          <Crown className="h-3 w-3" />
                          Premium
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-display text-lg font-semibold text-foreground mb-2">{recipe.title}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm text-muted-foreground">{recipe.author}</span>
                        <ChefBadge level={recipe.authorBadge} size="sm" showLabel={false} />
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {recipe.duration}
                          </span>
                          <span>{recipe.difficulty}</span>
                        </div>
                        <span className="flex items-center gap-1 text-primary">
                          <Heart className="h-3.5 w-3.5" />
                          {recipe.likes}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Competitions Tab */}
          {activeTab === "competitions" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-semibold text-foreground">Compétitions</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {competitions.map((competition) => (
                  <div key={competition.id} className="bg-card rounded-2xl overflow-hidden hover:shadow-card transition-all">
                    <div className="relative h-40">
                      <img src={competition.image} alt={competition.title} className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-xs font-medium",
                          competition.status === "En cours" 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-muted text-muted-foreground"
                        )}>
                          {competition.status}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-xl font-semibold text-foreground mb-3">{competition.title}</h3>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <span>{competition.participants} participants</span>
                        <span>{competition.endDate}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Trophy className="h-5 w-5 text-accent" />
                          <span className="font-semibold text-foreground">{competition.prize}</span>
                        </div>
                        <Button 
                          variant={competition.status === "En cours" ? "default" : "outline"} 
                          size="sm"
                          onClick={() => handleParticipate(competition.title)}
                        >
                          {competition.status === "En cours" ? "Participer" : "Voir détails"}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Events Tab */}
          {activeTab === "events" && (
            <div className="text-center py-16">
              <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">Événements à venir</h3>
              <p className="text-muted-foreground mb-6">Aucun événement prévu pour le moment.</p>
              <Button variant="outline" onClick={handleSubscribeNotifications}>S'abonner aux notifications</Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <MobileNavbar />
    </div>
  );
}
