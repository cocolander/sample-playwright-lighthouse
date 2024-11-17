import { expect, test } from '@playwright/test'

test.describe('Performance Test', () => {
  test('top page', {
  }, async ({ page }) => {
    // Chromeのdev toolsを使用する
    const client = await page.context().newCDPSession(page)
    // プロトコルメソッドを使用して呼び出す
    await client.send('Performance.enable')
    // TOP画面に遷移する
    await page.goto('/')
    // プロトコルメソッドを使用してメトリクスを呼び出す
    const performanceMetrics = await client.send('Performance.getMetrics')
    // 必要な情報を抽出する
    const getNavigationStart = performanceMetrics.metrics.filter(
      metrics => metrics.name === 'NavigationStart'
    )
    const getDomContentLoaded = performanceMetrics.metrics.filter(
      metrics => metrics.name === 'DomContentLoaded'
    )

    // 小数点以下を切り捨てる
    const getNavigationStartTime = Math.floor(getDomContentLoaded[0].value)
    const getDomContentLoadedTime = Math.floor(getNavigationStart[0].value)

    // 描画時間を取得する && ミリ秒を秒単位にする
    const diffTime = (getNavigationStartTime - getDomContentLoadedTime) / 1000

    // 5秒以下であることを確認する
    expect(diffTime).toBeLessThanOrEqual(10)

    // テストレポートに計測した描画時間を表示する
    test.info().annotations.push({
      type: 'performance result',
      description: diffTime.toString(),
    })
  })
})
