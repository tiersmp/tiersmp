import { db } from '@/lib/firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'SmpTier — Classement',
  description: 'Découvrez le classement des meilleurs SMP francophones',
};

interface SmpData {
  id: string;
  name: string;
  discord: string;
  ip: string;
  twist: string;
  date: string;
  tier: number;
}

async function getSmpList(): Promise<SmpData[]> {
  try {
    const q = query(collection(db, "smp_public"), orderBy("tier", "asc"));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as SmpData[];
  } catch (error) {
    console.error('Error fetching SMP list:', error);
    return [];
  }
}

export default async function ClassementPage() {
  const smpList = await getSmpList();

  return (
    <>
      <Header />
      
      <main>
        <section className="section card">
          <h2>Classement public</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Nom</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Discord</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">IP</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Twist</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Tier</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {smpList.length > 0 ? (
                  smpList.map((smp) => (
                    <tr key={smp.id} className="hover:bg-gray-700 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{smp.name || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{smp.discord || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{smp.ip || '-'}</td>
                      <td className="px-6 py-4 text-sm text-gray-300">{smp.twist || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{smp.date || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800`}>
                          Tier {smp.tier || 5}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-400">
                      Aucun SMP n'a encore été enregistré. Soyez le premier !
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-gray-400">
            Pour apparaître dans le classement, remplissez le formulaire de test SMP. Validation par un administrateur requise.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}
