import { type Page } from '@playwright/test'
import { playAudit } from "playwright-lighthouse"
import desktopConfig from 'lighthouse/core/config/lr-desktop-config.js'

export async function runPerformanceTest(page: Page, url: string, reportName: string){
  const reports = `${reportName}-${Date.now()}`
  await page.goto(url);

  const resultAudit = await playAudit({
    page: page,
    config: desktopConfig,
    port: 9222,
    thresholds: {
      performance: 10,
    },
    disableLogs: true,
    reports: {
      formats: {
        html: true,
      },
      name: reports,
      directory: 'performance-reports', 
    },
  })
  return { resultAudit }
}
