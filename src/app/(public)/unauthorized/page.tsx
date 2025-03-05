import React from 'react';
import Link from 'next/link';

export default function UnauthorizedPage() {
    return (
        <section className='flex items-center justify-center h-screen'>
            <div className='text-center'>
                <h1 className='text-2xl font-bold text-secondary mb-4'>401 - Unauthorized</h1>
                <p>Você não tem permissão para acessar esta página. Por favor, faça <Link href="/" className='text-secondary underline underline-offset-2'>login</Link>.</p>
            </div>
        </section>
    );
};
