
import { getServerSession } from 'next-auth';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import GoogleSignInButton from './components/buttons/GoogleSignInButton';
import { authConfig } from '@/modules/auth';
import { redirect } from 'next/navigation';
import { getSessionRole } from '@/modules/session';
import { Card, CardBody } from 'react-bootstrap';
import Image from 'next/image';

export default async function Login() {
    const session = await getServerSession(authConfig);

    if (session){
      const role = await getSessionRole();
      if(role=='Admin'){
        return redirect("/admin/ujian");
      }
      else{
        return redirect("/dosen/jadwal");
      }
    }

    return (
      <>
        <div className='w-100 h-100 d-flex flex-column align-items-center justify-content-center'>
          <div>
            <Card className='text-center' style={{border:"2px solid black"}}>
              <CardBody>
                <h3><strong>Sistem Alokasi</strong></h3>
                <h3><strong>Pengawas Ujian</strong></h3>
                <div>
                  <Image className="text-light mx-2 my-1" src="/people-group-svgrepo-com.svg" alt="Pengguna" height={50} width={50}/>
                  <Image className="text-light mx-2 my-1" src="/exam-a-plus-svgrepo-com.svg" alt="Pengguna" height={50} width={50}/>
                </div>
              </CardBody>
            </Card>
          </div>
          <div>
          <GoogleSignInButton/>
          </div>
        </div>
      </>
    )
}
