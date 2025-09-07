'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface FormData {
  name: string;
  ip: string;
  discord: string;
}

interface Message {
  text: string;
  isError: boolean;
}

export default function TesterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    ip: '',
    discord: ''
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [message, setMessage] = useState<Message>({ text: '', isError: false });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: '', isError: false });

    try {
      const docRef = await addDoc(collection(db, 'smp_queue'), {
        name: formData.name.trim(),
        ip: formData.ip.trim(),
        discord: formData.discord.trim(),
        timestamp: serverTimestamp()
      });
      
      setMessage({ 
        text: 'Soumission réussie ! Votre SMP est en attente de modération.', 
        isError: false 
      });
      
      // Rediriger vers la page de suivi
      router.push(`/track?id=${docRef.id}`);
      
      // Réinitialiser le formulaire
      setFormData({ name: '', ip: '', discord: '' });
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      setMessage({ 
        text: 'Une erreur est survenue lors de la soumission. Veuillez réessayer.', 
        isError: true 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      
      <main>
        <section className="section card max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Soumettre votre SMP</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                Nom du SMP *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: Dream SMP FR"
                required
              />
            </div>
            
            <div>
              <label htmlFor="ip" className="block text-sm font-medium text-gray-300 mb-1">
                IP / Adresse du serveur *
              </label>
              <input
                type="text"
                id="ip"
                name="ip"
                value={formData.ip}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: smp.monserveur.fr"
                required
              />
            </div>
            
            <div>
              <label htmlFor="discord" className="block text-sm font-medium text-gray-300 mb-1">
                Votre Discord *
              </label>
              <input
                type="text"
                id="discord"
                name="discord"
                value={formData.discord}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: Pseudo#1234"
                required
              />
              <p className="mt-1 text-xs text-gray-400">
                Nous vous contacterons sur Discord pour vous tenir informé de l'avancement de votre demande.
              </p>
            </div>
            
            {message.text && (
              <div className={`p-3 rounded-md ${message.isError ? 'bg-red-900/50 text-red-200' : 'bg-green-900/50 text-green-200'}`}>
                {message.text}
              </div>
            )}
            
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Envoi en cours...' : 'Soumettre mon SMP'}
              </button>
            </div>
          </form>
          
          <div className="mt-6 p-4 bg-gray-800/50 rounded-md">
            <h3 className="font-medium text-blue-400 mb-2">Comment ça marche ?</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-300">
              <li>Remplissez le formulaire avec les informations de votre SMP</li>
              <li>Notre équipe examinera votre demande sous 48h</li>
              <li>Vous recevrez une notification sur Discord une fois l'évaluation terminée</li>
              <li>Votre SMP apparaîtra dans le classement public</li>
            </ol>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
