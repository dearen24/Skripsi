
import { getServerSession } from 'next-auth';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import GoogleSignInButton from './components/buttons/GoogleSignInButton';
import { authConfig } from '@/modules/auth';
import { redirect } from 'next/navigation';
import { getSessionRole } from '@/modules/session';

export default async function Login() {
    const session = await getServerSession(authConfig);

    if (session){
      const role = await getSessionRole();
      if(role=='Admin'){
        return redirect("/admin/dosen");
      }
      else{
        return redirect("/dosen/jadwal");
      }
    }

    return (
      <>
        <div className='w-100 h-100 d-flex flex-column align-items-center justify-content-center'>
          <div>
            <span className='border border-dark'>
              LOGO
            </span>
          </div>
          <div>
          <GoogleSignInButton/>
          </div>
        </div>
      </>
    )
}
