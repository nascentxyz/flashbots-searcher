import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import { ColorModeScript, useColorMode } from '@chakra-ui/react'

export default class Document extends NextDocument {
  render() {
    return (
      <Html >
        <Head />
        <body>
          {/* Make Color mode to persists when you refresh the page. */}
          <ColorModeScript initialColorMode='dark' />
          <Main />
          <NextScript />
          <style jsx global>{`
            html, body {
              height: 100%;
            }

            #__next {
              height: 100%;
            }
          `}</style>
        </body>
      </Html>
    )
  }
}
