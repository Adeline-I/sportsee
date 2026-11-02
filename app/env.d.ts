// Types des variables du fichier .env
// (interface obligatoire ici : elle complète celle déjà fournie par Vite)
interface ImportMetaEnv {
  readonly VITE_DATA_SOURCE: "api" | "mock";
  readonly VITE_API_URL: string;
}
