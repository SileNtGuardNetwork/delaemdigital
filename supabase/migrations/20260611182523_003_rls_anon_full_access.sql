-- Allow anon to insert consent_logs
CREATE POLICY "anon_insert_consent_logs" ON consent_logs
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow anon to insert lead_events
CREATE POLICY "anon_insert_lead_events" ON lead_events
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow anon to insert notification_logs
CREATE POLICY "anon_insert_notification_logs" ON notification_logs
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow anon to update their own leads (within 1 hour of creation for notification status)
CREATE POLICY "anon_update_leads" ON site_leads
  FOR UPDATE
  TO anon
  USING (created_at > now() - interval '1 hour')
  WITH CHECK (created_at > now() - interval '1 hour');