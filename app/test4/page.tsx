import ClientLayout from 'app/common/components/layouts/defaultLayout'
import ClientPage from './ClientPage'

export default async function Page() {
  return <ClientPage />
}

Page.getLayout = function getLayout(page) {
  return (
    <ClientLayout>
      {page}
    </ClientLayout>
  )
}