'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { collection, getDocs, doc, deleteDoc, updateDoc, serverTimestamp, query, orderBy, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface SmpQueueItem {
  id: string;
  name: string;
  ip: string;
  discord: string;
  twist?: string;
  maxPlayers?: string;
  theme?: string;
  timestamp: any;
}

interface SmpPublicItem extends Omit<SmpQueueItem, 'maxPlayers' | 'theme'> {
  tier: number;
  date: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'queue' | 'tierlist'>('queue');
  const [queue, setQueue] = useState<SmpQueueItem[]>([]);
  const [tierList, setTierList] = useState<SmpPublicItem[]>([]);
  const toast = useToast();
  const [editingSmp, setEditingSmp] = useState<SmpPublicItem | null>(null);
  const [editForm, setEditForm] = useState({
    tier: 5,
    twist: '',
    date: ''
  });

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const storedAuth = localStorage.getItem('smpTierAdminAuth');
    if (storedAuth) {
      // Ici, vous devriez vérifier le token côté serveur dans une application réelle
      setIsAuthenticated(true);
      loadData();
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Dans une vraie application, utilisez une authentification sécurisée
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      localStorage.setItem('smpTierAdminAuth', 'true');
      setIsAuthenticated(true);
      loadData();
    } else {
      toast({
        title: 'Erreur',
        description: 'Mot de passe incorrect',
        type: 'error'
      });
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      // Charger la file d'attente
      const queueQuery = query(collection(db, 'smp_queue'), orderBy('timestamp', 'asc'));
      const queueSnapshot = await getDocs(queueQuery);
      const queueData = queueSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as SmpQueueItem[];
      setQueue(queueData);

      // Charger le classement
      const tierListQuery = query(collection(db, 'smp_public'), orderBy('tier', 'asc'), orderBy('timestamp', 'desc'));
      const tierListSnapshot = await getDocs(tierListQuery);
      const tierListData = tierListSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as SmpPublicItem[];
      setTierList(tierListData);
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
      toast.error({
        title: 'Erreur',
        description: 'Une erreur est survenue lors du chargement des données.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleValidateSmp = async (smp: SmpQueueItem) => {
    if (!window.confirm(`Valider l'ajout de ${smp.name} au classement ?`)) return;

    try {
      // Ajouter à la liste publique
      await addDoc(collection(db, 'smp_public'), {
        name: smp.name,
        ip: smp.ip,
        discord: smp.discord,
        twist: smp.twist || 'Non spécifié',
        tier: 3, // Tier par défaut
        date: new Date().toLocaleDateString('fr-FR'),
        timestamp: serverTimestamp()
      });

      // Supprimer de la file d'attente
      await deleteDoc(doc(db, 'smp_queue', smp.id));
      
      toast({
        title: 'Succès',
        description: `${smp.name} a été ajouté au classement avec succès !`,
        type: 'success'
      });
      
      await loadData();
    } catch (error) {
      console.error('Erreur lors de la validation du SMP:', error);
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la validation du SMP.',
        type: 'error'
      });
    }
  };

  const handleDeleteSmp = async (id: string, name: string, fromQueue: boolean = true) => {
    if (!window.confirm(`Supprimer ${name} de la ${fromQueue ? 'file d\'attente' : 'liste des SMP'} ?`)) return;

    try {
      if (fromQueue) {
        await deleteDoc(doc(db, 'smp_queue', id));
      } else {
        await deleteDoc(doc(db, 'smp_public', id));
      }
      
      toast({
        title: 'Succès',
        description: `${name} a été supprimé avec succès !`,
        type: 'success'
      });
      
      await loadData();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la suppression.',
        type: 'error'
      });
    }
  };

  const handleEditSmp = (smp: SmpPublicItem) => {
    setEditingSmp(smp);
    setEditForm({
      tier: smp.tier,
      twist: smp.twist || '',
      date: smp.date || new Date().toLocaleDateString()
    });
  };

  const handleUpdateSmp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSmp) return;

    try {
      await updateDoc(doc(db, 'smp_public', editingSmp.id), {
        tier: parseInt(editForm.tier as any),
        twist: editForm.twist,
        date: editForm.date
      });
      
      toast({
        title: 'Succès',
        description: 'Les modifications ont été enregistrées avec succès !',
        type: 'success'
      });
      
      setEditingSmp(null);
      await loadData();
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la mise à jour.',
        type: 'error'
      });
    }
  };

  // Afficher le formulaire de connexion si non authentifié
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
          <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
            <h1 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">Connexion Admin</h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Mot de passe
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Se connecter
              </button>
            </form>
          </div>
        </main>
      </div>
    );
  }

  // Mode édition d'un SMP
  if (editingSmp) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <button
              onClick={() => setEditingSmp(null)}
              className="mb-6 text-blue-400 hover:text-blue-300 flex items-center"
            >
              ← Retour
            </button>
            
            <div className="bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Modifier {editingSmp.name}</h2>
              
              <form onSubmit={handleUpdateSmp} className="space-y-4">
                <div>
                  <label htmlFor="tier" className="block text-sm font-medium text-gray-300 mb-1">
                    Tier (1-5)
                  </label>
                  <select
                    id="tier"
                    value={editForm.tier}
                    onChange={(e) => setEditForm({...editForm, tier: Number(e.target.value)})}
                    className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>Tier {num}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="twist" className="block text-sm font-medium text-gray-300 mb-1">
                    Description / Twist
                  </label>
                  <textarea
                    id="twist"
                    value={editForm.twist}
                    onChange={(e) => setEditForm({...editForm, twist: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-1">
                    Date d'ajout
                  </label>
                  <input
                    type="text"
                    id="date"
                    value={editForm.date}
                    onChange={(e) => setEditForm({...editForm, date: e.target.value})}
                    className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="JJ/MM/AAAA"
                    required
                  />
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setEditingSmp(null)}
                    className="px-4 py-2 border border-gray-600 rounded-md text-white hover:bg-gray-700 focus:outline-none"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Enregistrer les modifications
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  // Tableau de bord admin
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Panneau d'administration</h1>
          
          <div className="flex border-b border-gray-700 mb-6">
            <button
              className={`py-2 px-4 font-medium ${activeTab === 'queue' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('queue')}
            >
              File d'attente ({queue.length})
            </button>
            <button
              className={`py-2 px-4 font-medium ${activeTab === 'tierlist' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('tierlist')}
            >
              Liste des SMP ({tierList.length})
            </button>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : activeTab === 'queue' ? (
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="p-4 border-b border-gray-700">
                <h2 className="text-xl font-semibold">SMP en attente de validation</h2>
                <p className="text-sm text-gray-400">Approuvez ou rejetez les nouvelles soumissions</p>
              </div>
              
              {queue.length === 0 ? (
                <div className="p-6 text-center text-gray-400">
                  Aucun SMP en attente de validation.
                </div>
              ) : (
                <div className="divide-y divide-gray-700">
                  {queue.map((smp) => (
                    <div key={smp.id} className="p-4 hover:bg-gray-750 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="mb-3 md:mb-0">
                          <h3 className="font-medium text-lg">{smp.name}</h3>
                          <p className="text-sm text-gray-400">
                            IP: {smp.ip} | Discord: {smp.discord}
                          </p>
                          {smp.twist && (
                            <p className="mt-1 text-sm text-gray-300">
                              <span className="text-gray-400">Twist:</span> {smp.twist}
                            </p>
                          )}
                          {smp.theme && (
                            <p className="mt-1 text-sm text-gray-300">
                              <span className="text-gray-400">Thème:</span> {smp.theme}
                            </p>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleValidateSmp(smp)}
                            className="px-3 py-1.5 text-sm bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
                          >
                            Valider
                          </button>
                          <button
                            onClick={() => handleDeleteSmp(smp.id, smp.name)}
                            className="px-3 py-1.5 text-sm bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
                          >
                            Rejeter
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="p-4 border-b border-gray-700">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">Liste des SMP</h2>
                    <p className="text-sm text-gray-400">Gérez les SMP approuvés</p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <button
                      onClick={() => loadData()}
                      className="px-3 py-1.5 text-sm bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Actualiser
                    </button>
                  </div>
                </div>
              </div>
              
              {tierList.length === 0 ? (
                <div className="p-6 text-center text-gray-400">
                  Aucun SMP n'a encore été approuvé.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-750">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Nom
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          IP
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Discord
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Tier
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                      {tierList.map((smp) => (
                        <tr key={smp.id} className="hover:bg-gray-750 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium">{smp.name}</div>
                            {smp.twist && (
                              <div className="text-xs text-gray-400 truncate max-w-xs">
                                {smp.twist}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {smp.ip}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {smp.discord}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              smp.tier === 1 ? 'bg-purple-100 text-purple-800' :
                              smp.tier === 2 ? 'bg-blue-100 text-blue-800' :
                              smp.tier === 3 ? 'bg-green-100 text-green-800' :
                              smp.tier === 4 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              Tier {smp.tier}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {smp.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleEditSmp(smp)}
                              className="text-blue-400 hover:text-blue-300 mr-3"
                            >
                              Modifier
                            </button>
                            <button
                              onClick={() => handleDeleteSmp(smp.id, smp.name, false)}
                              className="text-red-400 hover:text-red-300"
                            >
                              Supprimer
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
