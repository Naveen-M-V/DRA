import fs from "fs";
import path from "path";

const leadsDir = path.join(process.cwd(), "data");
const leadsFile = path.join(leadsDir, "leads.json");

export type LeadRecord = {
  id: string;
  name: string;
  email: string;
  phone: string;
  srd: string;
  project: string;
  campaignName: string;
  submittedAt: string;
  timestamp: number;
};

function ensureDataDir() {
  if (!fs.existsSync(leadsDir)) {
    fs.mkdirSync(leadsDir, { recursive: true });
  }
}

function getLeadsData(): LeadRecord[] {
  ensureDataDir();
  if (!fs.existsSync(leadsFile)) {
    return [];
  }
  try {
    const data = fs.readFileSync(leadsFile, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function saveLeads(leads: LeadRecord[]) {
  ensureDataDir();
  fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2));
}

export function saveLead(lead: Omit<LeadRecord, "id" | "submittedAt" | "timestamp">) {
  const leads = getLeadsData();
  const newLead: LeadRecord = {
    ...lead,
    id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    submittedAt: new Date().toISOString(),
    timestamp: Date.now(),
  };
  leads.push(newLead);
  saveLeads(leads);
  return newLead;
}

export function getLeadStats() {
  const leads = getLeadsData();
  const stats = {
    totalLeads: leads.length,
    byProject: {} as Record<string, number>,
    byCampaign: {} as Record<string, number>,
    byDate: {} as Record<string, number>,
    recentLeads: leads.slice(-10).reverse(),
  };

  leads.forEach((lead) => {
    // By project
    if (!stats.byProject[lead.project]) {
      stats.byProject[lead.project] = 0;
    }
    stats.byProject[lead.project]++;

    // By campaign
    if (!stats.byCampaign[lead.campaignName]) {
      stats.byCampaign[lead.campaignName] = 0;
    }
    stats.byCampaign[lead.campaignName]++;

    // By date
    const date = new Date(lead.submittedAt).toLocaleDateString();
    if (!stats.byDate[date]) {
      stats.byDate[date] = 0;
    }
    stats.byDate[date]++;
  });

  return stats;
}

export function getLeadsByProject(project: string) {
  const leads = getLeadsData();
  return leads.filter((l) => l.project === project);
}

export function getLeadsByCampaign(campaign: string) {
  const leads = getLeadsData();
  return leads.filter((l) => l.campaignName === campaign);
}
