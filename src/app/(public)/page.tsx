import Link from "next/link";
import { LoginForm } from "./components/login/form";

export default function Home() {
  return (
    <section className="flex items-center justify-center h-screen">
      <div>
        <h1 className="font-bold text-xl text-center">Acesso</h1>

        <LoginForm />

        <div className="mt-9 flex items-center justify-between">
          <Link
            href="/"
            className="font-bold text-sm hover:text-white/80 transition-colors"
          >
            Esqueci a senha
          </Link>

          <Link
            href="/"
            className="font-bold text-sm hover:text-white/80 transition-colors"
          >
            Criar conta
          </Link>
        </div>
      </div>
    </section>
  );
}
