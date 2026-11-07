import PageHeader from "../components/ui/PageHeader";

const REPO_URL = "https://github.com/luisfernandez270406-ux/Sephira-catalogo-interactivo";

const TECHNOLOGIES = [
  { name: "React", role: "Interfaz basada en componentes, useState y useEffect" },
  { name: "Tailwind CSS", role: "Estilos y diseño responsive" },
  { name: "Redux Toolkit", role: "Estado global con slices y thunks" },
  { name: "Node.js + Express", role: "API REST propia" },
  { name: "MongoDB Atlas + Mongoose", role: "Base de datos en la nube y modelos" },
  { name: "Vite", role: "Entorno de desarrollo del frontend" },
];

const FEATURES = [
  "CRUD completo de productos, categorías y pedidos",
  "Formularios con validación en el cliente y en el servidor",
  "Tablas reutilizables con búsqueda y filtros",
  "Pedidos armados con un carrito y total calculado en el backend",
  "Dashboard con ingresos, pedidos por estado y últimos pedidos",
  "Navegación entre secciones controlada por estado (sin react router)",
];

const CUSTOM_HOOKS = [
  { name: "useModal", role: "Abrir y cerrar ventanas modales" },
  { name: "useForm", role: "Valores, errores y envío de formularios" },
  { name: "useDebounce", role: "Retrasar la búsqueda mientras se escribe" },
  { name: "useCart", role: "Carrito de productos de un pedido" },
  { name: "useFetch", role: "Cargar datos con estados de carga y error" },
];

const FUTURE_WORK = [
  "Tienda pública con catálogo y carrito para clientes",
  "Inicio de sesión para proteger el panel de administración",
  "Descontar el stock automáticamente al crear un pedido",
];

const Card = ({ title, children }) => (
  <section className="rounded-xl bg-white p-5 shadow-sm">
    <h2 className="mb-3 font-bold text-primary-dark">{title}</h2>
    {children}
  </section>
);

const About = () => (
  <>
    <PageHeader title="Acerca de" subtitle="Información del proyecto" />

    <div className="grid gap-6 lg:grid-cols-2">
      <Card title="SÉPHIRA">
        <p className="text-sm leading-relaxed">
          SÉPHIRA nació como un catálogo interactivo en JavaScript puro. En esta versión evoluciona
          a un panel de administración para gestionar el catálogo, las categorías y los pedidos de
          una tienda, con frontend en React y backend propio conectado a una base de datos en la
          nube.
        </p>
        <a
          href={REPO_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-block text-sm font-semibold text-primary underline"
        >
          Ver repositorio en GitHub
        </a>
      </Card>

      <Card title="Datos académicos">
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-ink/60">Universidad</dt>
            <dd className="text-right font-medium">COMPLETAR</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-ink/60">Materia</dt>
            <dd className="text-right font-medium">COMPLETAR</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-ink/60">Carrera</dt>
            <dd className="text-right font-medium">COMPLETAR</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-ink/60">Docente</dt>
            <dd className="text-right font-medium">Prof. Anggelo Huz</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-ink/60">Autor</dt>
            <dd className="text-right font-medium">COMPLETAR</dd>
          </div>
        </dl>
      </Card>

      <Card title="Tecnologías">
        <ul className="space-y-3">
          {TECHNOLOGIES.map(({ name, role }) => (
            <li key={name} className="text-sm">
              <span className="font-semibold">{name}</span>
              <span className="text-ink/60"> — {role}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card title="Custom hooks">
        <ul className="space-y-3">
          {CUSTOM_HOOKS.map(({ name, role }) => (
            <li key={name} className="text-sm">
              <code className="rounded bg-surface px-1.5 py-0.5 font-semibold text-primary-dark">
                {name}
              </code>
              <span className="text-ink/60"> — {role}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card title="Funcionalidades">
        <ul className="list-disc space-y-2 pl-5 text-sm">
          {FEATURES.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </Card>

      <Card title="Mejoras futuras">
        <ul className="list-disc space-y-2 pl-5 text-sm">
          {FUTURE_WORK.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Card>
    </div>
  </>
);

export default About;