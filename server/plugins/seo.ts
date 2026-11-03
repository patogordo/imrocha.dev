import type { H3Event } from "h3";

// The site is a SPA (ssr: false), so link previews (WhatsApp, LinkedIn, Google...) read the
// HTML without running the app. Title, description, Open Graph and JSON-LD go in here per route.

type Lang = "pt" | "en";

type Seo = {
  lang: Lang;
  title: string;
  description: string;
  path: string;
  type: "website" | "article";
  jsonLd: Record<string, unknown>;
};

const SITE = "https://imrocha.dev";

const PERSON = {
  "@type": "Person",
  name: "Ícaro Rocha",
  alternateName: "Pato",
  url: SITE,
  sameAs: [
    "https://github.com/patogordo",
    "https://www.linkedin.com/in/icaromiguel/",
  ],
};

const TEXT = {
  pt: {
    title: "Ícaro Rocha (Pato) · Engenheiro de Software",
    description:
      "Engenheiro de software em fintech e meios de pagamento. Back-end com Node.js e NestJS, front-end com Vue e Nuxt e apps Android com Kotlin. Veja meus projetos.",
    jobTitle: "Engenheiro de Software",
    blogTitle: "Blog · Ícaro Rocha",
    blogDescription:
      "Escrevo aqui sobre o que aprendo nos meus projetos e no trabalho, quase sempre sobre back-end, Nuxt e Nitro.",
    imageAlt: "Ícaro Rocha, Engenheiro de Software",
  },
  en: {
    title: "Ícaro Rocha (Pato) · Software Engineer",
    description:
      "Software engineer in fintech and payments. Back end with Node.js and NestJS, front end with Vue and Nuxt, and Android apps with Kotlin. Check out my projects.",
    jobTitle: "Software Engineer",
    blogTitle: "Blog · Ícaro Rocha",
    blogDescription:
      "Notes on what I learn building my projects and at work, mostly about back end, Nuxt and Nitro.",
    imageAlt: "Ícaro Rocha, Software Engineer",
  },
};

/** Same order the app uses: i18n cookie, then Accept-Language. Bots usually send neither. */
function requestLang(event: H3Event): Lang {
  const cookie = getCookie(event, "i18n_redirected");
  if (cookie === "pt" || cookie === "en") return cookie;
  for (const part of (getRequestHeader(event, "accept-language") ?? "").split(",")) {
    const tag = part.split(";")[0].trim().toLowerCase();
    if (tag.startsWith("pt")) return "pt";
    if (tag.startsWith("en")) return "en";
  }
  return "pt";
}

async function buildSeo(event: H3Event): Promise<Seo> {
  const lang = requestLang(event);
  const text = TEXT[lang];
  const path = getRequestURL(event).pathname.replace(/\/+$/, "") || "/";

  if (path.startsWith("/blog/tags/")) {
    const tag = decodeURIComponent(path.slice("/blog/tags/".length));
    return {
      lang,
      title: `#${tag} · ${text.blogTitle}`,
      description: lang === "pt" ? `Posts com a tag ${tag}.` : `Posts tagged ${tag}.`,
      path,
      type: "website",
      jsonLd: { "@context": "https://schema.org", "@type": "CollectionPage", name: `#${tag}`, url: `${SITE}${path}` },
    };
  }

  if (path.startsWith("/blog/")) {
    const post = await queryCollection(event, "content")
      .path(path)
      .select("title", "description", "date")
      .first()
      .catch(() => null);
    if (post) {
      return {
        lang: "pt", // posts are written in Portuguese
        title: `${post.title} · Ícaro Rocha`,
        description: post.description,
        path,
        type: "article",
        jsonLd: {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          inLanguage: "pt-BR",
          author: PERSON,
          url: `${SITE}${path}`,
        },
      };
    }
  }

  if (path === "/blog") {
    return {
      lang,
      title: text.blogTitle,
      description: text.blogDescription,
      path,
      type: "website",
      jsonLd: { "@context": "https://schema.org", "@type": "Blog", name: text.blogTitle, url: `${SITE}/blog`, author: PERSON },
    };
  }

  return {
    lang,
    title: text.title,
    description: text.description,
    path,
    type: "website",
    jsonLd: { "@context": "https://schema.org", ...PERSON, jobTitle: text.jobTitle },
  };
}

function esc(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function seoTags(seo: Seo) {
  const url = `${SITE}${seo.path === "/" ? "/" : seo.path}`;
  const image = `${SITE}/og/${seo.lang}.jpg`;
  const imageAlt = TEXT[seo.lang].imageAlt;
  const meta = (attr: "name" | "property", key: string, content: string) =>
    `<meta ${attr}="${key}" content="${esc(content)}">`;

  return [
    `<title>${esc(seo.title)}</title>`,
    meta("name", "description", seo.description),
    `<link rel="canonical" href="${esc(url)}">`,
    meta("property", "og:site_name", "Ícaro Rocha"),
    meta("property", "og:type", seo.type),
    meta("property", "og:locale", seo.lang === "pt" ? "pt_BR" : "en_US"),
    meta("property", "og:title", seo.title),
    meta("property", "og:description", seo.description),
    meta("property", "og:url", url),
    meta("property", "og:image", image),
    meta("property", "og:image:type", "image/jpeg"),
    meta("property", "og:image:width", "1200"),
    meta("property", "og:image:height", "630"),
    meta("property", "og:image:alt", imageAlt),
    meta("name", "twitter:card", "summary_large_image"),
    meta("name", "twitter:title", seo.title),
    meta("name", "twitter:description", seo.description),
    meta("name", "twitter:image", image),
    meta("name", "twitter:image:alt", imageAlt),
    `<script type="application/ld+json">${JSON.stringify(seo.jsonLd).replace(/</g, "\\u003c")}</script>`,
  ].join("");
}

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("render:html", async (html, { event }) => {
    try {
      const seo = await buildSeo(event);
      html.head = html.head.map((chunk) =>
        chunk.replace(/<title>[\s\S]*?<\/title>/g, "").replace(/<meta name="description"[^>]*>/g, ""),
      );
      html.head.push(seoTags(seo));
      html.htmlAttrs.push(`lang="${seo.lang === "pt" ? "pt-BR" : "en"}"`);
    } catch (err) {
      console.error("[seo] failed to build meta tags:", err);
    }
  });
});
