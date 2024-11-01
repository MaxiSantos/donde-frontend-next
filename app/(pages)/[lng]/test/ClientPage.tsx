'use client'
import { useTranslation } from "app/i18n/client";

export default function ClientPage({ props }) {
  console.log(props)
  const { params: { lng } } = props;
  const { t } = useTranslation(lng, 'common')
  return (
    <div>Test {t('category')}</div>
  )
}