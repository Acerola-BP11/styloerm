import '@/app/globals.css';
import AuthContext from '@/components/AuthContext/AuthContext';
import Header from '@/components/Header';

export const metadata = {
    title: 'Stylo Vest Eventos',
    description: 'Pagina da empresa Stylo Vest Eventos',
}

export default function RootLayout({ children }) {

    return (
        <html lang="pt-br">
            <body>
                <div className='flex flex-1 flex-col h-screen w-screen'>
                    <Header />
                    <AuthContext />
                    {children}
                </div>
            </body>
        </html>
    )
}
