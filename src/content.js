// All copy lives here, one object per language. Edit text here, not in the components.

export const links = {
  email: 'claudinojosemartins@gmail.com',
  github: 'https://github.com/dino3111',
  githubUser: 'dino3111',
  linkedin: 'https://www.linkedin.com/in/claudinomartins/',
  cv: `${import.meta.env.BASE_URL}cv/Claudino-Martins-CV.pdf`,
}

const projects = {
  elevate: {
    site: 'https://pei-elevate.github.io/elevate-site/',
    repo: 'https://github.com/pei-elevate',
    stack: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Docker', 'Nginx', 'Authentik'],
  },
  easyspot: {
    repo: 'https://github.com/dino3111/projIES_EasySpot',
    stack: ['Docker', 'Docker Compose', 'Authentik', 'Make', 'Java'],
  },
}

// Friendly names for repos in the GitHub grid. Anything not listed shows its repo name.
export const repoInfo = {
  projRS_CDN: { kind: 'project', pt: 'CDN com cache em disco e Redis', en: 'CDN with disk and Redis caching' },
  projectMPEI: { kind: 'project', pt: 'Detetor de phishing em URLs', en: 'Phishing URL detector' },
  project2AED_TADGraph: { kind: 'project', pt: 'TAD Grafo em C', en: 'Graph ADT in C' },
  project1AED_TADImageRGB: { kind: 'project', pt: 'Imagens com cor indexada em C', en: 'Indexed-colour images in C' },
}

export const content = {
  pt: {
    meta: {
      title: 'Claudino Martins · Engenharia Informática',
      description:
        'Portfólio de Claudino Martins, estudante de Engenharia Informática na Universidade de Aveiro. Projetos, experiência e CV.',
    },
    nav: {
      skip: 'Saltar para o conteúdo',
      projects: 'Projetos',
      experience: 'Experiência',
      github: 'GitHub',
      contact: 'Contacto',
      theme: { toLight: 'Mudar para tema claro', toDark: 'Mudar para tema escuro' },
      lang: 'Switch to English',
      menuOpen: 'Abrir menu',
      menuClose: 'Fechar menu',
    },
    hero: {
      place: 'Aveiro, Portugal',
      title: 'Claudino Martins',
      lead: 'No último ano da Licenciatura em Engenharia Informática na Universidade de Aveiro, a terminar em 2027. A ganhar experiência em engenharia de software e desenvolvimento full-stack através das aulas e de projetos. Muito motivado para continuar a aprender e aprofundar o conhecimento prático.',
      cv: 'Descarregar CV',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      photoAlt: 'Claudino Martins, de t-shirt branca e braços cruzados',
    },
    projects: {
      title: 'Projects',
      site: 'Ver microsite',
      repo: 'Ver no GitHub',
      items: [
        {
          id: 'elevate',
          name: 'elevate',
          tag: 'PEI',
          summary:
            'Sistema de informação para gerir e inspecionar os elevadores municipais, feito para a Câmara Municipal de Aveiro. Da papelada ao controlo total.',
          features: ['Registo de elevadores', 'Pedidos e agendamento de inspeções', 'Periodicidade e avisos', 'Gestão de não conformidades', 'Dashboard com indicadores'],
          imageAlt: 'Página inicial do microsite do elevate',
          ...projects.elevate,
        },
        {
          id: 'easyspot',
          name: 'EasySpot',
          tag: 'IES',
          summary:
            'Plataforma que mostra em tempo real a ocupação de parques de estacionamento, o estado dos carregadores elétricos e os lugares acessíveis.',
          features: ['Fiquei com o DevOps: o ambiente inteiro arranca com um make setup', 'Docker Compose para todos os serviços', 'Autenticação com Authentik'],
          ...projects.easyspot,
        },
      ],
    },
    experience: {
      title: 'Percurso',
      now: 'presente',
      groups: [
        {
          title: 'Experiência profissional',
          orgs: [
            {
              org: 'Transportes Ferrão & Martins, Lda',
              place: 'Tábua, Coimbra',
              roles: [
                { role: 'Administrador de Sistemas', when: ['2025-12', '2026-01'] },
                {
                  role: 'Administrador de Sistemas',
                  when: ['2025-04', '2025-08'],
                  text: 'Servidores, rede e equipamentos da empresa. Políticas de segurança, backups, monitorização de sistemas críticos e apoio técnico aos colegas. Melhorei ferramentas de gestão de frota e logística.',
                },
              ],
            },
          ],
        },
        {
          title: 'Associativismo',
          orgs: [
            {
              org: 'AETTUA',
              full: 'Associação de Electrónica, Telecomunicações e Telemática da Universidade de Aveiro',
              roles: [
                { role: 'Vogal da Direção', when: ['2025-12', null], text: 'Tesoureiro adjunto, com apoio à gestão financeira da associação.' },
                { role: 'Colaborador da Equipa de Imagem', when: ['2024-11', '2025-12'], text: 'Conteúdos visuais para os eventos e as redes sociais da associação.' },
              ],
            },
            {
              org: 'NEI AAUAv',
              full: 'Núcleo de Estudantes de Informática da Universidade de Aveiro',
              roles: [
                { role: 'Consoante da Secção Desportiva', when: ['2025-09', '2026-06'], text: 'Logística das equipas na Taça UA e gestão do Instagram da secção, com criação de conteúdo e comunicação.' },
                { role: 'Colaborador da Secção Desportiva', when: ['2025-01', '2025-09'], text: 'Apoio logístico à secção.' },
              ],
            },
          ],
        },
        {
          title: 'Educação',
          orgs: [
            {
              org: 'Universidade de Aveiro',
              roles: [{ role: 'Licenciatura em Engenharia Informática', when: ['2024-09', '2027-06'], text: 'Entrada com média de 18,1 valores.' }],
            },
            {
              org: 'Colégio da Rainha Santa Isabel',
              roles: [{ role: 'Ensino Secundário, Ciências Socioeconómicas', when: ['2021-09', '2024-06'], text: 'Terminei com 17 valores.' }],
            },
          ],
        },
      ],
    },
    repos: {
      title: 'More code on GitHub',
      sub: 'Repositórios de outros projetos e das aulas.',
      kinds: { project: 'Projeto', class: 'Aulas' },
      all: 'Ver todos os repositórios',
      error: 'Não deu para carregar os repositórios agora.',
      loading: 'A carregar repositórios…',
    },
    contact: {
      title: 'Let’s talk',
      cv: 'Descarregar CV',
    },
  },

  en: {
    meta: {
      title: 'Claudino Martins · Informatics Engineering',
      description:
        'Portfolio of Claudino Martins, Informatics Engineering student at the University of Aveiro. Projects, experience and CV.',
    },
    nav: {
      skip: 'Skip to content',
      projects: 'Projects',
      experience: 'Experience',
      github: 'GitHub',
      contact: 'Contact',
      theme: { toLight: 'Switch to light theme', toDark: 'Switch to dark theme' },
      lang: 'Mudar para Português',
      menuOpen: 'Open menu',
      menuClose: 'Close menu',
    },
    hero: {
      place: 'Aveiro, Portugal',
      title: 'Claudino Martins',
      lead: 'Currently in my final year of a Bachelor’s degree in Informatics Engineering at Universidade de Aveiro, graduating in 2027. Developing expertise in software engineering and full-stack development through academic coursework and projects. Highly motivated to continuously learn and deepen practical knowledge.',
      cv: 'Download CV',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      photoAlt: 'Claudino Martins in a white t-shirt with arms crossed',
    },
    projects: {
      title: 'Projects',
      site: 'Visit microsite',
      repo: 'View on GitHub',
      items: [
        {
          id: 'elevate',
          name: 'elevate',
          tag: 'PEI',
          summary:
            'Information system to manage and inspect municipal elevators, built for the Aveiro City Council. From paperwork to full control.',
          features: ['Elevator register', 'Inspection requests and scheduling', 'Inspection periods and notices', 'Non-conformity management', 'Dashboard with performance indicators'],
          imageAlt: 'elevate microsite home page',
          ...projects.elevate,
        },
        {
          id: 'easyspot',
          name: 'EasySpot',
          tag: 'IES',
          summary:
            'Real-time platform showing parking occupancy, EV charger status and accessible-bay availability across city sites.',
          features: ['I owned DevOps: the whole stack comes up with one make setup', 'Docker Compose for every service', 'Authentication with Authentik'],
          ...projects.easyspot,
        },
      ],
    },
    experience: {
      title: 'Journey',
      now: 'present',
      groups: [
        {
          title: 'Work experience',
          orgs: [
            {
              org: 'Transportes Ferrão & Martins, Lda',
              place: 'Tábua, Coimbra',
              roles: [
                { role: 'Systems Administrator', when: ['2025-12', '2026-01'] },
                {
                  role: 'Systems Administrator',
                  when: ['2025-04', '2025-08'],
                  text: 'Servers, network and hardware for the company. Security policies, backups, monitoring of critical systems and tech support for staff. Improved fleet and logistics tooling.',
                },
              ],
            },
          ],
        },
        {
          title: 'Student associations',
          orgs: [
            {
              org: 'AETTUA',
              full: 'Associação de Electrónica, Telecomunicações e Telemática da Universidade de Aveiro',
              roles: [
                { role: 'Board Member', when: ['2025-12', null], text: 'Deputy treasurer, helping run the association’s finances.' },
                { role: 'Design Team Member', when: ['2024-11', '2025-12'], text: 'Visual content for the association’s events and social media.' },
              ],
            },
            {
              org: 'NEI AAUAv',
              full: 'Núcleo de Estudantes de Informática da Universidade de Aveiro',
              roles: [
                { role: 'Lead Volunteer, Sports Section', when: ['2025-09', '2026-06'], text: 'Team logistics for the Taça UA tournament and the section’s Instagram, from content to community replies.' },
                { role: 'Sports Section Volunteer', when: ['2025-01', '2025-09'], text: 'Logistics support for the section.' },
              ],
            },
          ],
        },
        {
          title: 'Education',
          orgs: [
            {
              org: 'University of Aveiro',
              roles: [{ role: 'BSc in Informatics Engineering', when: ['2024-09', '2027-06'], text: 'Admitted with an entry grade of 18.1/20.' }],
            },
            {
              org: 'Colégio da Rainha Santa Isabel',
              roles: [{ role: 'High School, Socioeconomic Sciences', when: ['2021-09', '2024-06'], text: 'Graduated with 17/20.' }],
            },
          ],
        },
      ],
    },
    repos: {
      title: 'More code on GitHub',
      sub: 'Repositories from other projects and from classes.',
      kinds: { project: 'Project', class: 'Classes' },
      all: 'See all repositories',
      error: 'Could not load repositories right now.',
      loading: 'Loading repositories…',
    },
    contact: {
      title: 'Let’s talk',
      cv: 'Download CV',
    },
  },
}
