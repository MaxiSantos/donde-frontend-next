import { Box } from "@mui/material"
import { useTranslation } from "react-i18next"
import { Clear } from "./common/components/elements/Clear"
import { Scroll } from "./common/components/elements/Scroll"
import { Title } from "./common/components/elements/Title"
import { WrapperContainer } from "./common/components/layouts/container"
import { Footer } from "./common/components/sections/Footer"
import Header from "./common/components/sections/Header"
import { useMedia } from "./common/hooks/useMedia"
import { TextHelper } from "./common/lib/text"
import { GlobalStyles } from "./common/styles/global"

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
  pageTitle,
  top
}: {
  children: React.ReactNode,
  pageTitle: string,
  top: React.ReactNode
}) {
  const { isMobile } = useMedia();
  const { t } = useTranslation('common');
  return (
    <html lang="es">
      <head />
      <body>
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
          <GlobalStyles />
          <Header />
          <Clear />
          {top && top}
          <WrapperContainer maxWidth="xl" $ismobile={isMobile}>
            {pageTitle && <Title>{TextHelper.capitalize(t(`navigation.${pageTitle}`))}</Title>}
            {children}
            <Scroll showBelow={500} />
          </WrapperContainer>
          <Clear />
          <Footer></Footer>
        </Box>
      </body>
    </html>
  )
}