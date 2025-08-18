import { describe, expect, it } from 'vitest'

import { removeNextDefaultFont } from '@utils/removeFont'

describe('remove default next font', () => {
  it('should remove next font when file is given', () => {
    const content =
      'import { Geist, Geist_Mono } from "next/font/google" \
        import "./globals.css"\
        \
        const fontSans = Geist({\
        subsets: ["latin"],\
        variable: "--font-sans",\
        })\
\
        const fontMono = Geist_Mono({\
        subsets: ["latin"],\
        variable: "--font-mono",\
        })\
\
        export default function RootLayout({\
        children,\
        }: Readonly<{\
        children: React.ReactNode\
        }>) {\
        return (\
            <html lang="en" suppressHydrationWarning>\
            <body\
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}\
            >\
                <Providers>{children}</Providers>\
            </body>\
            </html>\
        )\
        }\
        '

    const removedFont = removeNextDefaultFont(content)

    expect(removedFont).toMatchSnapshot()
  })
})
