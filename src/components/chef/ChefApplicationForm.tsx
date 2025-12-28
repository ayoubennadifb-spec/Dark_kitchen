import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Loader2, Upload, X, ChefHat, Camera } from 'lucide-react';
import { z } from 'zod';

const applicationSchema = z.object({
  bio: z.string().min(50, 'La biographie doit contenir au moins 50 caractères').max(500),
  specialties: z.array(z.string()).min(1, 'Sélectionnez au moins une spécialité'),
  applicationMessage: z.string().min(20, 'Le message doit contenir au moins 20 caractères').max(1000),
});

const SPECIALTIES = [
  'Tajines', 'Couscous', 'Pastilla', 'Pâtisserie', 'Harira',
  'Grillades', 'Rfissa', 'Briouates', 'Msemen', 'Tanjia'
];

export const ChefApplicationForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bio, setBio] = useState('');
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [applicationMessage, setApplicationMessage] = useState('');
  const [kitchenPhotos, setKitchenPhotos] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleSpecialty = (specialty: string) => {
    setSpecialties(prev => 
      prev.includes(specialty) 
        ? prev.filter(s => s !== specialty)
        : [...prev, specialty]
    );
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !user) return;

    // Simulated URLs for demo - in production, upload to Supabase Storage
    const newPhotos: string[] = [];
    for (const file of Array.from(files)) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          newPhotos.push(ev.target.result as string);
          setKitchenPhotos(prev => [...prev, ev.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = (index: number) => {
    setKitchenPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Vous devez être connecté');
      return;
    }

    // Validate
    const result = applicationSchema.safeParse({ bio, specialties, applicationMessage });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(err => {
        fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      // Check if user already has a chef profile
      const { data: existing } = await supabase
        .from('chef_profiles')
        .select('id, status')
        .eq('user_id', user.id)
        .maybeSingle();

      if (existing) {
        if (existing.status === 'pending') {
          toast.error('Votre candidature est déjà en cours de traitement');
        } else if (existing.status === 'approved') {
          toast.error('Vous êtes déjà un chef approuvé');
          navigate('/chef/dashboard');
        } else {
          toast.error('Une candidature existe déjà pour ce compte');
        }
        setIsSubmitting(false);
        return;
      }

      // Create chef profile
      const { error } = await supabase
        .from('chef_profiles')
        .insert({
          user_id: user.id,
          bio,
          specialties,
          application_message: applicationMessage,
          kitchen_photos: kitchenPhotos,
          status: 'pending',
        });

      if (error) throw error;

      // Add chef role
      await supabase
        .from('user_roles')
        .insert({
          user_id: user.id,
          role: 'chef',
        });

      toast.success('Candidature envoyée avec succès !');
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Error submitting application:', error);
      toast.error(error.message || 'Erreur lors de l\'envoi');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <ChefHat className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle>Devenir Chef DarFood</CardTitle>
            <CardDescription>Remplissez le formulaire pour soumettre votre candidature</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio">Votre biographie *</Label>
            <Textarea
              id="bio"
              placeholder="Présentez-vous, parlez de votre passion pour la cuisine..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              className="resize-none"
            />
            {errors.bio && <p className="text-sm text-destructive">{errors.bio}</p>}
            <p className="text-xs text-muted-foreground">{bio.length}/500 caractères</p>
          </div>

          {/* Specialties */}
          <div className="space-y-2">
            <Label>Vos spécialités culinaires *</Label>
            <div className="flex flex-wrap gap-2">
              {SPECIALTIES.map(specialty => (
                <Badge
                  key={specialty}
                  variant={specialties.includes(specialty) ? 'default' : 'outline'}
                  className="cursor-pointer transition-all"
                  onClick={() => toggleSpecialty(specialty)}
                >
                  {specialty}
                </Badge>
              ))}
            </div>
            {errors.specialties && <p className="text-sm text-destructive">{errors.specialties}</p>}
          </div>

          {/* Kitchen Photos */}
          <div className="space-y-2">
            <Label>Photos de votre cuisine (optionnel)</Label>
            <div className="grid grid-cols-3 gap-4">
              {kitchenPhotos.map((photo, idx) => (
                <div key={idx} className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                  <img src={photo} alt={`Kitchen ${idx + 1}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removePhoto(idx)}
                    className="absolute top-1 right-1 p-1 rounded-full bg-destructive text-destructive-foreground"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              {kitchenPhotos.length < 5 && (
                <label className="aspect-square rounded-lg border-2 border-dashed border-border hover:border-primary/50 flex flex-col items-center justify-center cursor-pointer transition-colors">
                  <Camera className="h-8 w-8 text-muted-foreground mb-1" />
                  <span className="text-xs text-muted-foreground">Ajouter</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Ajoutez jusqu'à 5 photos de votre espace de travail
            </p>
          </div>

          {/* Application Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Pourquoi voulez-vous rejoindre DarFood ? *</Label>
            <Textarea
              id="message"
              placeholder="Expliquez vos motivations, votre expérience culinaire..."
              value={applicationMessage}
              onChange={(e) => setApplicationMessage(e.target.value)}
              rows={4}
              className="resize-none"
            />
            {errors.applicationMessage && <p className="text-sm text-destructive">{errors.applicationMessage}</p>}
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Envoi en cours...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Soumettre ma candidature
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
