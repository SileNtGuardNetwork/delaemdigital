-- Migration: 001_lead_layer
-- Purpose: Lead storage, consent logs, lead events, and notification logs
-- Created: 2026-06-11

-- Enable uuid extension if not exists
create extension if not exists "uuid-ossp";

-- Lead status enum
create type lead_status as enum (
  'new',
  'notified',
  'notification_failed',
  'in_review',
  'qualified',
  'not_fit',
  'contacted',
  'archived'
);

-- Notification channel enum
create type notification_channel as enum (
  'telegram',
  'email',
  'manual'
);

-- Lead events enum
create type lead_event_type as enum (
  'lead_created',
  'consent_saved',
  'owner_notification_sent',
  'owner_notification_failed',
  'lead_status_changed'
);

-- Main leads table
create table site_leads (
  id uuid primary key default uuid_generate_v4(),

  -- Timestamps
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  -- Status
  status lead_status not null default 'new',

  -- Source tracking
  source text,
  page_path text,
  referrer text,

  -- UTM parameters
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,

  -- Contact info
  name text not null,
  phone text,
  telegram text,
  email text,

  -- Project context
  website text,
  project_type text,
  budget_range text,
  business_context text,
  message text,

  -- Consent
  consent_accepted boolean not null default false,
  consent_version text,
  consent_at timestamptz,

  -- Owner notification status
  owner_notification_status text,
  owner_notification_error text,
  owner_notification_at timestamptz,

  -- Metadata
  ip_hash text,
  user_agent_hash text,
  spam_score integer default 0,
  metadata jsonb default '{}'::jsonb
);

-- Consent logs table
create table consent_logs (
  id uuid primary key default uuid_generate_v4(),
  lead_id uuid references site_leads(id) on delete cascade,
  created_at timestamptz not null default now(),

  consent_accepted boolean not null,
  consent_version text not null,
  privacy_url text,
  consent_url text,

  form_id text,
  page_path text,
  ip_hash text,

  metadata jsonb default '{}'::jsonb
);

-- Lead events table
create table lead_events (
  id uuid primary key default uuid_generate_v4(),
  lead_id uuid not null references site_leads(id) on delete cascade,
  created_at timestamptz not null default now(),

  event_type lead_event_type not null,
  event_payload jsonb default '{}'::jsonb
);

-- Notification logs table
create table notification_logs (
  id uuid primary key default uuid_generate_v4(),
  lead_id uuid references site_leads(id) on delete cascade,
  created_at timestamptz not null default now(),

  channel notification_channel not null,
  status text not null,
  error text,
  payload jsonb default '{}'::jsonb
);

-- Indexes for performance
create index idx_site_leads_created_at on site_leads(created_at desc);
create index idx_site_leads_status on site_leads(status);
create index idx_site_leads_utm_source on site_leads(utm_source);
create index idx_site_leads_project_type on site_leads(project_type);

create index idx_consent_logs_lead_id on consent_logs(lead_id);
create index idx_consent_logs_created_at on consent_logs(created_at desc);

create index idx_lead_events_lead_id on lead_events(lead_id);
create index idx_lead_events_created_at on lead_events(created_at desc);

create index idx_notification_logs_lead_id on notification_logs(lead_id);
create index idx_notification_logs_created_at on notification_logs(created_at desc);

-- Updated_at trigger function
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger for site_leads
create trigger update_site_leads_updated_at
  before update on site_leads
  for each row
  execute function update_updated_at_column();

-- Comments
comment on table site_leads is 'Main table for storing website leads';
comment on table consent_logs is 'Logs of user consent for data processing';
comment on table lead_events is 'Events timeline for lead processing';
comment on table notification_logs is 'Logs of owner notification attempts';