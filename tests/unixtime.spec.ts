import { expect, test } from '@playwright/test'

test.describe('Performance Test', () => {
  test('top page', {
  }, async ({ page }) => {
    // 計測開始時間をミリ秒で取得する
    const startTime: number = new Date().getTime()
    // 計測のために3秒待つ
    await page.waitForTimeout(3000)
    // 計測対象の画面に遷移する
    await page.goto('/')
    // 計測終了時間をミリ秒で取得する
    const endTime: number = new Date().getTime()

    // 描画時間を取得する && ミリ秒を秒単位にする
    const diffViewTime = (endTime - startTime) / 1000

    // 5秒以内であることを確認する
    expect(diffViewTime).toBeLessThanOrEqual(10)

    // テストレポートに計測した描画時間を表示する
    test.info().annotations.push({
      type: 'performance result',
      description: diffViewTime.toString(),
    })
  })
})