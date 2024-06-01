import puppeteer from 'puppeteer-core'
import chromium from '@sparticuz/chromium'

import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  let browser

  try {
    const body = await request.json()
    const { query } = body

    if (!query) {
      return NextResponse.json('A query is required', { status: 400 })
    }

    //make request to youtube to get videos data
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    })
    const page = await browser.newPage()
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`
    await page.goto(url)

    const video = await page.evaluate(() => {
      const firstVideoElement = document.querySelector(
        'a#video-title',
      ) as HTMLAnchorElement
      if (!firstVideoElement) {
        return null
      }
      const title = firstVideoElement.textContent?.trim() || ''
      const url = firstVideoElement.href
      const videoId = url.split('v=')[1].split('&')[0]
      return { title, url, videoId }
    })

    await browser.close()

    if (!video) {
      return NextResponse.json('Video not found', { status: 400 })
    }

    return NextResponse.json(video, { status: 200 })
  } catch (error) {
    if (browser) {
      await browser.close()
    }

    console.log(error)
    return NextResponse.json('Error retrieving videos', { status: 400 })
  }
}
