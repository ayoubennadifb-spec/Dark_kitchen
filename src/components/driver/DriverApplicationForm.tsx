import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { Loader2, Upload, Truck, Bike, Car } from 'lucide-react';
import { z } from 'zod';

const applicationSchema = z.object({
  vehicleType: z.enum(['scooter', 'moto', 'bike', 'car']),
  licenseNumber: z.string().min(5, 'Numéro de permis invalide').optional().or(z.literal('')),
  applicationMessage: z.string().min(20, 'Le message doit contenir au moins 20 caractères').max(500),
});

const VEHICLE_TYPES = [
  { value: 'bike', label: 'Vélo', icon: Bike, description: 'Idéal pour le centre-ville' },
  { value: 'scooter', label: 'Scooter', icon: Bike, description: 'Le plus populaire' },
  { value: 'moto', label: 'Moto', icon: Bike, description: 'Rapide et agile' },
  { value: 'car', label: 'Voiture', icon: Car, description: 'Grandes commandes' },
] as const;

export const DriverApplicationForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [vehicleType, setVehicleType] = useState<'scooter' | 'moto' | 'bike' | 'car'>('scooter');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [applicationMessage, setApplicationMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Vous devez être connecté');
      return;
    }

    // Validate
    const result = applicationSchema.safeParse({ vehicleType, licenseNumber, applicationMessage });
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
      // Check if user already has a driver profile
      const { data: existing } = await supabase
        .from('driver_profiles')
        .select('id, status')
        .eq('user_id', user.id)
        .maybeSingle();

      if (existing) {
        if (existing.status === 'pending') {
          toast.error('Votre candidature est déjà en cours de traitement');
        } else if (existing.status === 'approved') {
          toast.error('Vous êtes déjà un livreur approuvé');
          navigate('/driver/dashboard');
        } else {
          toast.error('Une candidature existe déjà pour ce compte');
        }
        setIsSubmitting(false);
        return;
      }

      // Create driver profile
      const { error } = await supabase
        .from('driver_profiles')
        .insert({
          user_id: user.id,
          vehicle_type: vehicleType,
          license_number: licenseNumber || null,
          application_message: applicationMessage,
          status: 'pending',
        });

      if (error) throw error;

      // Add driver role
      await supabase
        .from('user_roles')
        .insert({
          user_id: user.id,
          role: 'driver',
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
            <Truck className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle>Devenir Livreur DarFood</CardTitle>
            <CardDescription>Remplissez le formulaire pour soumettre votre candidature</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Vehicle Type */}
          <div className="space-y-3">
            <Label>Type de véhicule *</Label>
            <RadioGroup
              value={vehicleType}
              onValueChange={(v) => setVehicleType(v as typeof vehicleType)}
              className="grid grid-cols-2 gap-4"
            >
              {VEHICLE_TYPES.map(vehicle => {
                const Icon = vehicle.icon;
                return (
                  <Label
                    key={vehicle.value}
                    htmlFor={vehicle.value}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      vehicleType === vehicle.value 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/30'
                    }`}
                  >
                    <RadioGroupItem value={vehicle.value} id={vehicle.value} className="sr-only" />
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{vehicle.label}</div>
                      <div className="text-xs text-muted-foreground">{vehicle.description}</div>
                    </div>
                  </Label>
                );
              })}
            </RadioGroup>
            {errors.vehicleType && <p className="text-sm text-destructive">{errors.vehicleType}</p>}
          </div>

          {/* License Number */}
          {vehicleType !== 'bike' && (
            <div className="space-y-2">
              <Label htmlFor="license">Numéro de permis de conduire</Label>
              <Input
                id="license"
                placeholder="Ex: AB123456"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
              />
              {errors.licenseNumber && <p className="text-sm text-destructive">{errors.licenseNumber}</p>}
            </div>
          )}

          {/* Application Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Pourquoi voulez-vous rejoindre DarFood ? *</Label>
            <Textarea
              id="message"
              placeholder="Parlez de votre disponibilité, votre connaissance de la ville..."
              value={applicationMessage}
              onChange={(e) => setApplicationMessage(e.target.value)}
              rows={4}
              className="resize-none"
            />
            {errors.applicationMessage && <p className="text-sm text-destructive">{errors.applicationMessage}</p>}
            <p className="text-xs text-muted-foreground">{applicationMessage.length}/500 caractères</p>
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
