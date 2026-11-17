import React from 'react';
import { Card } from '../../components/ui/Card';
import { InputField } from '../../components/forms/InputField';
import { Button } from '../../components/ui/Button';

export function SettingsForm() {
  return (
    <Card title="Workspace Settings" subtitle="Configure system parameters">
      <div className="space-y-4 max-w-md">
        <InputField label="Application Title" defaultValue="PERN Monorepo" />
        <InputField label="Database Schema" defaultValue="public" disabled />
        <Button>Save Preferences</Button>
      </div>
    </Card>
  );
}
