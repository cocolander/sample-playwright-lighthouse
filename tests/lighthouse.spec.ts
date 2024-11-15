import { expect, test } from '@playwright/test'
import { runPerformanceTest } from '../utils/helpers'

test.describe('Performance Test', () => {
  test('top page', {
  }, async ({ page }) => {
    // 計測対象の画面に遷移する
    await page.goto('/')

    // 表示しているURLを取得する
    const url: string = page.url()

    // Lighthouseを介してパフォーマンス計測を実行する
    const performanceResult = await runPerformanceTest(page, url, 'top-page')
    // パフォーマンスのScoreを取得する
    const performanceScore = performanceResult.resultAudit.lhr.categories.performance.score
    // 描画速度を取得する
    const speedIndex = performanceResult.resultAudit.lhr.audits['speed-index'].displayValue

    // 取得したspeedIndexの不要な文字列をリプレイスする > sを取り除く
    // 値を数値型にする
    const assertSpeedIndex = Number(speedIndex?.replace('s', ''))

    // パフォーマンスが0.1以上であることを確認する
    expect(performanceScore).toBeGreaterThanOrEqual(0.1)
    // 10秒以下であることを確認する
    expect(assertSpeedIndex).toBeLessThanOrEqual(10)

    // テストレポートに計測した描画時間を表示する
    test.info().annotations.push({
      type: 'performance result',
      description: `${assertSpeedIndex}`,
    })
  })
})
