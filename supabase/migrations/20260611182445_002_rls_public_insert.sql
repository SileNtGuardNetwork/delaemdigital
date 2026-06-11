-- Enable RLS on all lead tables
ALTER TABLE site_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE consent_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_logs ENABLE ROW LEVEL SECURITY;

-- Allow public (anon key) to insert leads
CREATE POLICY "anon_insert_leads" ON site_leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow service role full access
CREATE POLICY "service_role_all" ON site_leads
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Allow service role to manage consent_logs
CREATE POLICY "service_role_consent_logs" ON consent_logs
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Allow service role to manage lead_events
CREATE POLICY "service_role_lead_events" ON lead_events
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Allow service role to manage notification_logs
CREATE POLICY "service_role_notification_logs" ON notification_logs
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);