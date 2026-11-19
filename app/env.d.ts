/** Types des variables du .env (interface obligatoire : elle complète celle fournie par Vite) */
interface ImportMetaEnv {
  readonly VITE_DATA_SOURCE: "api" | "mock";
  readonly VITE_API_URL: string;
}
