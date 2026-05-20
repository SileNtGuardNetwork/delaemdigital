-- factory-template v0.2 — lead layer
-- Apply in Supabase SQL Editor (dev project) or via Supabase CLI.

-- site_leads: main lead storage
create table if not exists public.site_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  status text not null default 'new',
  source text,
  page_path text,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  name text not null,
  phone text,
  telegram text,
  email text,
  website text,
  project_type text not null,
  budget_range text not null,
  business_context text,
  message text,
  consent_accepted boolean not null default false,
  consent_version text not null,
  owner_notification_status text,
  owner_notification_error text,
  metadata jsonb not null default '{}'::jsonb,
  constraint site_leads_status_check check (
    status in (
      'new',
      'notified',
      'notification_failed',
      'in_review',
      'qualified',
      'not_fit',
      'contacted',
      'archived'
    )
  )
);

create index if not exists site_leads_created_at_idx on public.site_leads (created_at desc);
create index if not exists site_leads_status_idx on public.site_leads (status);
create index if not exists site_leads_utm_source_idx on public.site_leads (utm_source)
  where utm_source is not null;
create index if not exists site_leads_project_type_idx on public.site_leads (project_type);

comment on table public.site_leads is 'Lead submissions from factory-template sites';

-- consent_logs: consent audit trail
create table if not exists public.consent_logs (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.site_leads (id) on delete cascade,
  created_at timestamptz not null default now(),
  consent_accepted boolean not null,
  consent_version text not null,
  privacy_url text,
  consent_url text,
  form_id text,
  page_path text,
  metadata jsonb not null default '{}'::jsonb
);

create index if not exists consent_logs_lead_id_idx on public.consent_logs (lead_id);

comment on table public.consent_logs is 'Consent records linked to site leads';

-- lead_events: processing timeline
create table if not exists public.lead_events (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.site_leads (id) on delete cascade,
  created_at timestamptz not null default now(),
  event_name text not null,
  event_payload jsonb not null default '{}'::jsonb
);

create index if not exists lead_events_lead_id_idx on public.lead_events (lead_id);
create index if not exists lead_events_event_name_idx on public.lead_events (event_name);

comment on table public.lead_events is 'Lead processing events (no PII in payloads)';

-- notification_logs: owner notification attempts
create table if not exists public.notification_logs (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.site_leads (id) on delete cascade,
  created_at timestamptz not null default now(),
  channel text not null,
  status text not null,
  error text,
  payload jsonb not null default '{}'::jsonb,
  constraint notification_logs_channel_check check (
    channel in ('telegram', 'email', 'manual')
  ),
  constraint notification_logs_status_check check (
    status in ('sent', 'failed', 'skipped')
  )
);

create index if not exists notification_logs_lead_id_idx on public.notification_logs (lead_id);

comment on table public.notification_logs is 'Owner notification delivery log';

-- updated_at trigger for site_leads
create or replace function public.set_site_leads_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists site_leads_updated_at on public.site_leads;
create trigger site_leads_updated_at
  before update on public.site_leads
  for each row
  execute function public.set_site_leads_updated_at();

-- RLS: enabled, no public policies (service role only via server route)
alter table public.site_leads enable row level security;
alter table public.consent_logs enable row level security;
alter table public.lead_events enable row level security;
alter table public.notification_logs enable row level security;
