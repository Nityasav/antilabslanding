'use client';

import Image from 'next/image';
import {
  Activity,
  ArrowRight,
  Files,
  Flower,
  GalleryVerticalEnd,
  Sparkles,
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';
import * as React from 'react';
import * as RechartsPrimitive from 'recharts';

import { Card } from '@/components/ui/card';
import DisplayCards from '@/components/ui/display-cards';
import { cn } from '@/lib/utils';

export default function CombinedFeaturedSection() {
  const featuredCasestudy = {
    logo: 'https://images.unsplash.com/photo-1502764613149-7f1d229e2300?auto=format&fit=crop&w=200&q=80',
    company: 'Ruixen',
    tags: 'Enterprise',
    title: 'How we scaled to 1M+ users',
    subtitle: 'without a single second of downtime, using smart architecture and real-time monitoring',
  };

  return (
    <section className="bg-stone-50 py-20">
      <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-6 px-6 md:grid-cols-2 md:grid-rows-2">
        {/* Crawl Animation */}
        <div className="relative border border-gray-200 bg-white p-6 shadow-sm overflow-hidden">
          <div className="mb-4 flex items-center gap-2 text-sm text-gray-500">
            <Files className="h-4 w-4" />
            Crawl
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Crawl your entire domain autonomously.</h3>
          <p className="mt-2 text-sm text-gray-600">
            We scan every URL, heading, metadata field, and content block to extract the authoritative topics your
            product owns.
          </p>

          <div className="relative mt-4 h-48">
            <CrawlingAnimation />
          </div>
        </div>

        {/* Featured case study */}
        <div className="flex flex-col justify-between gap-4 border border-gray-200 bg-white p-6 shadow-sm overflow-visible">
          <div>
            <span className="flex items-center gap-2 text-xs font-medium text-gray-500">
            <GalleryVerticalEnd className="h-4 w-4" /> Expand
            </span>
            <h3 className="mt-3 text-xl font-semibold text-gray-900">Generate every question people could ask.</h3>
            <p className="mt-2 text-sm text-gray-600">
              LLM-based fan-out explores the entire question space, then we score and filter it down to the
              highest-signal candidates.
            </p>
          </div>
          <div className="flex w-full items-center justify-center">
            <DisplayCards
              cards={[
                {
                  icon: <Sparkles className="size-4 text-blue-300" />,
                  title: "Query Generation",
                  description: "LLM explores question space",
                  date: "Real-time",
                  iconClassName: "text-blue-500",
                  titleClassName: "text-blue-500",
                  className:
                    "[grid-area:stack] hover:-translate-y-8 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-white/40 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
                },
                {
                  icon: <Sparkles className="size-4 text-blue-300" />,
                  title: "Signal Scoring",
                  description: "Filter high-value candidates",
                  date: "Instant",
                  iconClassName: "text-blue-500",
                  titleClassName: "text-blue-500",
                  className:
                    "[grid-area:stack] translate-x-12 translate-y-8 hover:-translate-y-2 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-white/40 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
                },
                {
                  icon: <Sparkles className="size-4 text-blue-300" />,
                  title: "Topic Expansion",
                  description: "Full question-space coverage",
                  date: "Automated",
                  iconClassName: "text-blue-500",
                  titleClassName: "text-blue-500",
                  className:
                    "[grid-area:stack] translate-x-24 translate-y-16 hover:translate-y-8",
                },
              ]}
            />
          </div>
        </div>

        {/* Chart */}
        <div className="space-y-4 border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2 text-sm text-gray-500">
            <Activity className="h-4 w-4" />
            Validate
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Validate with real search-volume data.</h3>
          <p className="mt-2 text-sm text-gray-600">
            Google Ads, DataForSEO, and proprietary APIs confirm what people actually search for—no guessing.
          </p>
          <MonitoringChart />
        </div>

        {/* Feature cards */}
        <div className="grid gap-6 bg-stone-50 sm:grid-cols-2">
          <FeatureCard
            icon={<Files className="h-4 w-4" />}
            image="/clusterex.png"
            title="Cluster"
            subtitle="Embeddings + Clustering"
            description="We group validated keywords into content blueprints, briefs, and ready-to-ship outlines."
          />
          <FeatureCard
            icon={<Flower className="h-4 w-4" />}
            image="/blogex.png"
            title="Automate"
            subtitle="Self-updating engine"
            description="We turn the pipeline into a GEO/SEO engine that ships ideas, drafts, and insights automatically."
          />
        </div>
      </div>
    </section>
  );
}

type FeatureCardProps = {
  icon: React.ReactNode;
  image: string;
  title: string;
  subtitle: string;
  description: string;
};

function FeatureCard({ icon, image, title, subtitle, description }: FeatureCardProps) {
  return (
    <div className="relative flex flex-col gap-3 border border-gray-200 bg-white p-4 shadow-sm transition">
      <div>
        <span className="mb-4 flex items-center gap-2 text-xs font-medium text-gray-500">
          {icon}
          {title}
        </span>
        <h3 className="text-lg font-semibold text-gray-900">{subtitle}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>

      <div className="absolute bottom-0 right-0 h-48 w-56 overflow-hidden rounded-xl sm:h-56 sm:w-64 md:h-64 md:w-72">
        <div className="relative h-full w-full">
          <Image src={image} alt={title} fill className="object-cover object-left rounded-xl" sizes="288px" />
        </div>
      </div>
    </div>
  );
}

const CrawlingAnimation = () => {
  const [visibleItems, setVisibleItems] = React.useState<number>(0);
  const [animationComplete, setAnimationComplete] = React.useState(false);

  const crawledPages = [
    { url: '/resources/guide', label: 'Resources Guide' },
    { url: '/products/api', label: 'API Documentation' },
    { url: '/docs/getting-started', label: 'Getting Started' },
  ];

  React.useEffect(() => {
    // One-time subtle animation - items appear one by one
    if (visibleItems < crawledPages.length) {
      const timer = setTimeout(() => {
        setVisibleItems((prev) => {
          const next = prev + 1;
          if (next >= crawledPages.length) {
            setAnimationComplete(true);
          }
          return next;
        });
      }, 700); // Subtle delay between items

      return () => clearTimeout(timer);
    }
  }, [visibleItems, crawledPages.length]);

  return (
    <div className="relative h-full w-full flex items-center justify-center">
      <div className="relative w-full max-w-sm space-y-3">
        {crawledPages.map((page, index) => {
          const isVisible = index < visibleItems;
          
          return (
            <div
              key={page.url}
              className={cn(
                "flex items-center gap-3 transition-all duration-700 ease-out",
                isVisible 
                  ? "opacity-100 translate-x-0" 
                  : "opacity-0 translate-x-4"
              )}
              style={{
                transitionDelay: `${index * 0.1}s`,
              }}
            >
              {/* Subtle dot indicator */}
              <div className="relative flex-shrink-0">
                <div 
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-500",
                    isVisible ? "bg-[#1d40b0] scale-100" : "bg-gray-300 scale-75"
                  )}
                />
                {isVisible && (
                  <div className="absolute inset-0 w-2 h-2 rounded-full bg-[#1d40b0]/30 animate-ping" />
                )}
              </div>
              
              {/* URL text with subtle styling */}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-medium text-gray-900">{page.label}</span>
                  <span className="text-xs text-gray-400 font-mono">{page.url}</span>
                </div>
                {/* Subtle progress line */}
                <div className="mt-1.5 h-0.5 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full rounded-full transition-all duration-1000 ease-out",
                      isVisible ? "w-full" : "w-0"
                    )}
                    style={{
                      background: 'linear-gradient(to right, #1d40b0, #1a3a9e)',
                      transitionDelay: `${index * 0.1 + 0.2}s`,
                    }}
                  />
                </div>
              </div>
              
              {/* Checkmark when complete */}
              {isVisible && (
                <div className="flex-shrink-0 transition-all duration-500 delay-300">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <svg 
                      className="w-3 h-3 text-green-600" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        
        {/* Subtle status indicator */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span>
              {animationComplete 
                ? `${crawledPages.length} pages crawled` 
                : 'Crawling...'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const chartData = [
  { month: 'May', volume: 1200, trend: 850 },
  { month: 'June', volume: 2100, trend: 1200 },
  { month: 'July', volume: 3200, trend: 2100 },
  { month: 'Aug', volume: 4800, trend: 3600 },
  { month: 'Sep', volume: 5600, trend: 4200 },
  { month: 'Oct', volume: 7200, trend: 5800 },
];

const chartConfig = {
  volume: {
    label: 'Search Volume',
    color: '#2563eb',
  },
  trend: {
    label: 'Trending Keywords',
    color: '#60a5fa',
  },
} satisfies ChartConfig;

function MonitoringChart() {
  return (
    <ChartContainer className="h-60 w-full" config={chartConfig}>
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id="fillVolume" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-volume)" stopOpacity={0.8} />
            <stop offset="55%" stopColor="var(--color-volume)" stopOpacity={0.1} />
          </linearGradient>
          <linearGradient id="fillTrend" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-trend)" stopOpacity={0.8} />
            <stop offset="55%" stopColor="var(--color-trend)" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <XAxis hide />
        <YAxis hide />
        <CartesianGrid horizontal={false} vertical={false} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent className="dark:bg-muted" />} />
          <Area strokeWidth={2} dataKey="trend" type="monotone" fill="url(#fillTrend)" stroke="var(--color-trend)" />
          <Area
            strokeWidth={2}
            dataKey="volume"
            type="monotone"
            fill="url(#fillVolume)"
            stroke="var(--color-volume)"
          />
      </AreaChart>
    </ChartContainer>
  );
}

interface Message {
  title: string;
  time: string;
  content: string;
  color: string;
}

const messages: Message[] = [
  {
    title: 'Ruixen Design',
    time: '1m ago',
    content: 'New components added to your team workspace.',
    color: 'from-pink-400 to-indigo-500',
  },
  {
    title: 'Pro User Feedback',
    time: '3m ago',
    content: 'You’ve received 8 new user reviews this week.',
    color: 'from-orange-500 to-pink-500',
  },
  {
    title: 'Billing Alert',
    time: '6m ago',
    content: 'Your subscription was successfully renewed.',
    color: 'from-yellow-400 to-red-400',
  },
  {
    title: 'Integration Hub',
    time: '10m ago',
    content: 'Figma plugin connected to your dashboard.',
    color: 'from-sky-400 to-blue-700',
  },
  {
    title: 'Product Analytics',
    time: '12m ago',
    content: 'Dashboard insights updated with latest metrics.',
    color: 'from-orange-300 to-fuchsia-500',
  },
  {
    title: 'Weekly Recap',
    time: '15m ago',
    content: 'Here’s what your team accomplished this week.',
    color: 'from-green-400 to-blue-500',
  },
];

const RuixenFeaturedMessageCard = () => {
  return (
    <div className="relative h-[280px] w-full max-w-sm overflow-hidden bg-white p-2 font-sans">
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent" />

      <div className="relative z-0 space-y-2">
        {messages.map((msg, i) => (
          <div
            key={msg.title}
            className={cn('flex cursor-pointer items-start gap-3 rounded-lg border border-gray-200 p-3 transition duration-300 ease-in-out', 'animate-scaleUp')}
            style={{ animationDelay: `${i * 300}ms`, animationFillMode: 'forwards', opacity: 0 }}
          >
            <div className={cn('h-8 w-8 min-h-[2rem] min-w-[2rem] rounded-lg bg-gradient-to-br', msg.color)} />
            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-800">
                {msg.title}
                <span className="text-xs text-gray-500 before:mr-1 before:content-['•']">{msg.time}</span>
              </div>
              <p className="mt-0.5 text-xs text-gray-600">{msg.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const THEMES = { light: '', dark: '.dark' } as const;

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & ({ color?: string; theme?: never } | { color?: never; theme: Record<keyof typeof THEMES, string> });
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error('useChart must be used within a <ChartContainer />');
  }

  return context;
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    config: ChartConfig;
    children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>['children'];
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, '')}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          'flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke="#ccc"]]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke="#fff"]]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke="#ccc"]]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke="#ccc"]]:stroke-border [&_.recharts-sector[stroke="#fff"]]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none',
          className,
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = 'Chart';

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(([, cfg]) => cfg.theme || cfg.color);

  if (!colorConfig.length) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color = itemConfig.theme?.[theme as keyof typeof itemConfig.theme] || itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .filter(Boolean)
  .join('\n')}
}
`,
          )
          .join('\n'),
      }}
    />
  );
};

const ChartTooltip = RechartsPrimitive.Tooltip as React.FC<RechartsPrimitive.TooltipProps<any, any>>;

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  {
    active?: boolean;
    payload?: Array<any>;
    label?: React.ReactNode;
    labelFormatter?: (label: any, payload: Array<any>) => React.ReactNode;
    labelClassName?: string;
    formatter?: (value: any, name: any, item: any, index: number, payload: any) => React.ReactNode;
    color?: string;
    hideLabel?: boolean;
    hideIndicator?: boolean;
    indicator?: 'line' | 'dot' | 'dashed';
    nameKey?: string;
    labelKey?: string;
  } & React.ComponentProps<'div'>
>(
  (
    {
      active,
      payload,
      className,
      indicator = 'dot',
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref,
  ) => {
    const { config } = useChart();

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null;
      }

      const [item] = payload;
      const key = `${labelKey || item.dataKey || item.name || 'value'}`;
      const itemConfig = getPayloadConfigFromPayload(config, item, key);
      const value =
        !labelKey && typeof label === 'string'
          ? config[label as keyof typeof config]?.label || label
          : itemConfig?.label;

      if (labelFormatter) {
        return (
          <div className={cn('font-medium', labelClassName)}>
            {labelFormatter(value, payload)}
          </div>
        );
      }

      if (!value) {
        return null;
      }

      return <div className={cn('font-medium', labelClassName)}>{value}</div>;
    }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey]);

    if (!active || !payload?.length) {
      return null;
    }

    const nestLabel = payload.length === 1 && indicator !== 'dot';

    return (
      <div
        ref={ref}
        className={cn(
          'grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl',
          className,
        )}
      >
        {!nestLabel ? tooltipLabel : null}
        <div className="grid gap-1.5">
          {payload.map((item, index) => {
            const key = `${nameKey || item.name || item.dataKey || 'value'}`;
            const itemConfig = getPayloadConfigFromPayload(config, item, key);
            const indicatorColor = color || item.payload.fill || item.color;

            return (
              <div
                key={item.dataKey}
                className={cn(
                  'flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground',
                  indicator === 'dot' && 'items-center',
                )}
              >
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn('shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]', {
                            'h-2.5 w-2.5': indicator === 'dot',
                            'w-1': indicator === 'line',
                            'w-0 border-[1.5px] border-dashed bg-transparent': indicator === 'dashed',
                            'my-0.5': nestLabel && indicator === 'dashed',
                          })}
                          style={
                            {
                              '--color-bg': indicatorColor,
                              '--color-border': indicatorColor,
                            } as React.CSSProperties
                          }
                        />
                      )
                    )}
                    <div
                      className={cn(
                        'flex flex-1 justify-between leading-none',
                        nestLabel ? 'items-end' : 'items-center',
                      )}
                    >
                      <div className="grid gap-1.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-muted-foreground">{itemConfig?.label || item.name}</span>
                      </div>
                      {item.value && (
                        <span className="font-mono font-medium tabular-nums text-foreground">
                          {typeof item.value === 'number' ? item.value.toLocaleString() : item.value}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);
ChartTooltipContent.displayName = 'ChartTooltip';

const ChartLegend = RechartsPrimitive.Legend as unknown as React.FC<RechartsPrimitive.LegendProps>;

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    payload?: Array<any>;
    verticalAlign?: 'top' | 'middle' | 'bottom';
    hideIcon?: boolean;
    nameKey?: string;
  }
>(({ className, hideIcon = false, payload, verticalAlign = 'bottom', nameKey }, ref) => {
  const { config } = useChart();

  if (!payload?.length) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-center gap-4',
        verticalAlign === 'top' ? 'pb-3' : 'pt-3',
        className,
      )}
    >
      {payload.map((item) => {
        const key = `${nameKey || item.dataKey || 'value'}`;
        const itemConfig = getPayloadConfigFromPayload(config, item, key);

        return (
          <div
            key={item.value}
            className={cn(
              'flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground',
            )}
          >
            {itemConfig?.icon && !hideIcon ? (
              <itemConfig.icon />
            ) : (
              <div
                className="h-2 w-2 shrink-0 rounded-[2px]"
                style={{
                  backgroundColor: item.color,
                }}
              />
            )}
            {itemConfig?.label}
          </div>
        );
      })}
    </div>
  );
});
ChartLegendContent.displayName = 'ChartLegend';

function getPayloadConfigFromPayload(config: ChartConfig, payload: unknown, key: string) {
  if (typeof payload !== 'object' || payload === null) {
    return undefined;
  }

  const payloadObj = payload as Record<string, unknown>;

  const payloadPayload =
    'payload' in payloadObj && typeof payloadObj.payload === 'object' && payloadObj.payload !== null
      ? (payloadObj.payload as Record<string, unknown>)
      : undefined;

  let configLabelKey: string = key;

  if (key in payloadObj && typeof payloadObj[key] === 'string') {
    configLabelKey = payloadObj[key] as string;
  } else if (payloadPayload && key in payloadPayload && typeof payloadPayload[key] === 'string') {
    configLabelKey = payloadPayload[key] as string;
  }

  return configLabelKey in config
    ? config[configLabelKey]
    : (config[key] as (typeof config)[keyof typeof config] | undefined);
}

export { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartStyle };


