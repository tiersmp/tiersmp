'use client';

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export function ToastDemo() {
  const toast = useToast();

  return (
    <div className="grid grid-cols-1 gap-4 p-4">
      <h2 className="text-xl font-semibold mb-4">Démonstration des Toasts</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Button
          onClick={() => {
            toast({
              title: 'Notification',
              description: 'Ceci est une notification par défaut',
            });
          }}
          className="w-full"
        >
          Afficher un toast par défaut
        </Button>

        <Button
          variant="success"
          onClick={() => {
            toast.success({
              title: 'Succès',
              description: 'Opération réussie avec succès !',
            });
          }}
          className="w-full"
        >
          Toast de succès
        </Button>

        <Button
          variant="destructive"
          onClick={() => {
            toast.error({
              title: 'Erreur',
              description: 'Une erreur est survenue',
              duration: 10000, // 10 secondes
            });
          }}
          className="w-full"
        >
          Toast d'erreur
        </Button>

        <Button
          variant="warning"
          onClick={() => {
            toast.warning({
              title: 'Attention',
              description: 'Ceci est un avertissement',
            });
          }}
          className="w-full"
        >
          Toast d'avertissement
        </Button>

        <Button
          variant="outline"
          onClick={() => {
            toast.info({
              title: 'Information',
              description: 'Voici une information importante',
            });
          }}
          className="w-full"
        >
          Toast d'information
        </Button>

        <Button
          variant="outline"
          onClick={() => {
            const toastId = toast({
              title: 'Toast personnalisé',
              description: 'Ce toast peut être mis à jour',
              duration: 0, // Ne pas fermer automatiquement
            });

            // Mettre à jour le toast après 2 secondes
            setTimeout(() => {
              toast.update(toastId, {
                title: 'Mis à jour',
                description: 'Ce toast a été mis à jour !',
                type: 'success',
                duration: 3000,
              });
            }, 2000);
          }}
          className="w-full"
        >
          Toast avec mise à jour
        </Button>
      </div>
    </div>
  );
}
