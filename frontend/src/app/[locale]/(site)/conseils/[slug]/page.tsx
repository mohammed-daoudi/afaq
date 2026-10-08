import React from 'react';
import Image from 'next/image';
import { Link } from '@/navigation';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, AlertTriangle, Lightbulb } from 'lucide-react';
import { MOCK_ARTICLES } from '@/data/conseils';
import { getTranslations } from 'next-intl/server';

const DESKTOP_CTA_MARKER = '<div class="mt-12 text-center hidden lg:flex flex-col items-center">';

const ARTICLE_CTAS: Record<string, { title: string; text: string; href: string; label: string }> = {
  'magnesium-comment-choisir-bonne-formule': {
    title: "Envie d'aller plus loin ?",
    text: 'Découvrez notre formule synergique associant Magnésium, Zinc et Vitamine D3.',
    href: '/produits/bisglycinate-magnesium',
    label: 'DÉCOUVRIR LE BISGLYCINATE DE MAGNÉSIUM',
  },
  'sante-masculine-comprendre-prostate': {
    title: "Envie d'aller plus loin ?",
    text: 'Découvrez notre formule synergique associant plusieurs extraits végétaux et du zinc pour la santé masculine.',
    href: '/produits/prostal',
    label: 'DÉCOUVRIR PROSTAL',
  },
  'cycle-feminin-comprendre-role-huile-onagre': {
    title: "Envie d'aller plus loin ?",
    text: "Découvrez notre formule à base d'huile de graines d'onagre, riche en GLA, et de vitamine E.",
    href: '/produits/huile-onagre',
    label: "DÉCOUVRIR L'HUILE D'ONAGRE",
  },
};

function getArticleBody(content: string) {
  const desktopCtaIndex = content.indexOf(DESKTOP_CTA_MARKER);

  return desktopCtaIndex >= 0 ? content.slice(0, desktopCtaIndex) : content;
}

function renderInline(content: string, keyPrefix: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const brParts = content.split(/<br\s*\/?>/gi);

  brParts.forEach((part, brIndex) => {
    if (brIndex > 0) {
      nodes.push(<br key={`${keyPrefix}-br-${brIndex}`} />);
    }

    const strongPattern = /<strong>([\s\S]*?)<\/strong>/gi;
    let lastIndex = 0;

    for (const match of part.matchAll(strongPattern)) {
      if (match.index > lastIndex) {
        nodes.push(part.slice(lastIndex, match.index));
      }

      nodes.push(
        <strong key={`${keyPrefix}-strong-${brIndex}-${match.index}`}>
          {renderInline(match[1], `${keyPrefix}-strong-${brIndex}-${match.index}`)}
        </strong>,
      );
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < part.length) {
      nodes.push(part.slice(lastIndex));
    }
  });

  return nodes;
}

function renderArticleBlocks(content: string) {
  const blocks: React.ReactNode[] = [];
  const blockPattern = /<(h2|p|ul)>([\s\S]*?)<\/\1>/gi;

  for (const match of content.matchAll(blockPattern)) {
    const [, tag, innerHtml] = match;
    const key = `${tag}-${match.index}`;

    if (tag === 'h2') {
      blocks.push(<h2 key={key}>{renderInline(innerHtml.trim(), key)}</h2>);
    }

    if (tag === 'p') {
      blocks.push(<p key={key}>{renderInline(innerHtml.trim(), key)}</p>);
    }

    if (tag === 'ul') {
      const items: React.ReactNode[] = [];
      const itemPattern = /<li>([\s\S]*?)<\/li>/gi;

      for (const itemMatch of innerHtml.matchAll(itemPattern)) {
        const itemKey = `${key}-li-${itemMatch.index}`;
        items.push(<li key={itemKey}>{renderInline(itemMatch[1].trim(), itemKey)}</li>);
      }

      blocks.push(<ul key={key}>{items}</ul>);
    }
  }

  return blocks;
}

function ArticleCta({
  cta,
  className,
}: {
  cta: { title: string; text: string; href: string; label: string };
  className: string;
}) {
  return (
    <div className={className}>
      <h3 className="text-xl lg:text-3xl font-bold text-teal-deep mb-3 lg:mb-4 mt-0">{cta.title}</h3>
      <p className="text-black lg:text-anthracite-soft mb-6 lg:mb-8 font-medium lg:font-normal lg:text-xl">{cta.text}</p>
      <Link href={cta.href} className="inline-flex w-full sm:w-auto max-w-full justify-center text-center text-sm font-bold bg-teal-deep text-white px-5 sm:px-6 py-3 rounded-xl hover:bg-gold-soft hover:text-teal-deep transition-all shadow-md shimmer-effect uppercase tracking-wider leading-snug">
        {cta.label}
      </Link>
    </div>
  );
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = MOCK_ARTICLES.find(a => a.slug === slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = MOCK_ARTICLES.filter(a => a.slug !== article.slug).slice(0, 3);
  const t = await getTranslations('ConseilsPage');
  const articleCta = ARTICLE_CTAS[article.slug];
  const articleBody = getArticleBody(article.content);

  return (
    <div className="min-h-screen bg-ivory-soft pt-12 pb-24">
      {/* Article Header */}
      <div className="container mx-auto px-4 max-w-7xl mb-12">
        <Link
          href="/conseils"
          className="inline-flex items-center gap-2 text-teal-deep font-semibold hover:text-gold-soft transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span>{t('back')}</span>
        </Link>

        <div className="space-y-6 lg:w-2/3">
          <div className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest text-black bg-sage-light rounded-full uppercase">
            {article.category}
          </div>

          <h1 className="text-3xl md:text-5xl font-semibold text-black leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-black font-semibold uppercase tracking-wider border-y border-sage-light/50 py-4">
            <span className="flex items-center gap-2">
              <Calendar size={16} className="text-gold-soft" />
              {article.date}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={16} className="text-gold-soft" />
              {article.readTime}
            </span>
          </div>
        </div>
      </div>
      {/* Article Content & Sidebar */}
      <div className="container mx-auto px-4 max-w-7xl flex flex-col lg:flex-row gap-12 lg:gap-16 items-stretch lg:items-start">

        {/* Left Column: Content */}
        <div className="w-full min-w-0 lg:w-2/3 flex flex-col">
          <div className="lg:mb-16 lg:rounded-[2rem] lg:border lg:border-[#d7ceb9]/60 lg:bg-gradient-to-br lg:from-[#f3eedf]/80 lg:via-[#eee6d4]/55 lg:to-[#e6dcc7]/45 lg:p-8 xl:p-10 lg:shadow-[0_18px_50px_rgba(23,103,71,0.06)]">
            <div className="text-lg md:text-xl text-black font-bold leading-relaxed mb-12 lg:mb-10 border-l-4 border-gold-soft pl-5 md:pl-6">
              {article.intro}
            </div>

            {/* Prose Content */}
            <div
              className="mb-16 lg:mb-0 max-w-none [&_h2]:text-2xl md:[&_h2]:text-4xl [&_h2]:text-black [&_h2]:font-semibold [&_h2]:leading-tight [&_h2]:mt-12 [&_h2]:mb-6 [&_p]:text-base md:[&_p]:text-lg [&_h3]:text-black [&_h3]:font-semibold [&_p]:text-black [&_p]:leading-relaxed [&_p]:mb-6 [&_ul]:list-disc [&_ul]:pl-6 md:[&_ul]:pl-8 [&_ul]:mb-6 [&_ul]:text-base md:[&_ul]:text-lg [&_ul]:leading-relaxed [&_ul]:text-black [&_li]:text-black [&_ul]:space-y-2 [&_img]:max-w-full [&_img]:h-auto [&_a:not(.shimmer-effect)]:text-black [&_a:not(.shimmer-effect)]:underline [&_strong]:text-black [&_strong]:font-semibold"
            >
              {renderArticleBlocks(articleBody)}
            </div>
          </div>

          {articleCta && (
            <ArticleCta
              cta={articleCta}
              className="mt-12 text-center hidden lg:flex flex-col items-center"
            />
          )}

          {/* Featured Media (Mobile Only) */}
          <div className="lg:hidden relative h-[300px] sm:h-[400px] w-full rounded-3xl overflow-hidden shadow-2xl mb-8">
            {(article as any).video ? (
              <video
                src={(article as any).video}
                autoPlay
                loop
                muted
                playsInline
                className="block w-full h-full object-cover"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            )}
          </div>

          {/* CTA Box (Mobile Only) */}
          {articleCta && (
            <ArticleCta
              cta={articleCta}
              className="lg:hidden bg-white border border-sage-light rounded-2xl p-6 mb-12 shadow-md text-center"
            />
          )}

          {/* Takeaway Box */}
          {article.takeaway && (
            <div className="bg-sage-light/30 border border-sage-light rounded-3xl p-5 sm:p-8 mb-16 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <Lightbulb size={120} />
              </div>
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="bg-white p-3 rounded-2xl shadow-sm text-gold-soft flex-shrink-0">
                  <Lightbulb size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">{t('takeaway')}</h3>
                  <p className="text-black font-medium leading-relaxed">
                    {article.takeaway}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Sidebar (Image & Disclaimer) */}
        <div className="w-full min-w-0 lg:w-1/3 lg:sticky top-[160px] flex flex-col gap-8">
            {/* Featured Media (Desktop Only) */}
            <div className="hidden lg:block relative h-[450px] w-full rounded-3xl overflow-hidden shadow-2xl">
              {(article as any).video ? (
                <video
                  src={(article as any).video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="block w-full h-full object-cover"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                />
              )}
            </div>

            {/* Disclaimer */}
            <div className="w-full bg-white rounded-3xl p-5 sm:p-6 border border-teal-light/20 shadow-sm flex items-start gap-4">
              <AlertTriangle className="text-gold-soft flex-shrink-0 mt-1" size={24} />
              <div>
                <h4 className="font-bold text-black text-sm uppercase tracking-wider mb-1">{t('importantInfo')}</h4>
                <p className="text-sm text-black leading-relaxed ">
                  {t('disclaimer')}
                </p>
              </div>
            </div>
        </div>
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="container mx-auto px-4 mt-24 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-teal-deep text-center mb-12">
            {t('relatedArticles')}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {relatedArticles.map(related => (
              <Link
                key={related.slug}
                href={`/conseils/${related.slug}`}
                className="group block bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full"
              >
                <div className="relative h-64 w-full shrink-0 overflow-hidden">
                  <Image
                    src={related.image}
                    alt={related.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <div className="text-xs font-bold text-gold-soft uppercase tracking-widest mb-4">
                    {related.category}
                  </div>
                  <h3 className="text-xl font-bold text-teal-deep mb-4 line-clamp-2 group-hover:text-gold-soft transition-colors">
                    {related.title}
                  </h3>
                  <p className="text-sm text-anthracite-soft/80 leading-relaxed line-clamp-3 mb-6 flex-1">
                    {related.intro}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
