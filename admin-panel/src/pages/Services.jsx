import CrudPageBuilder from '../components/CrudPageBuilder'
import { servicesApi } from '../api/content'

export default function Services() {
  return (
    <CrudPageBuilder
      title="Services"
      api={servicesApi}
      emptyItem={{ title: '', description: '', iconUrl: '', displayOrder: 0, status: 'PUBLISHED' }}
      fields={[
        { name: 'title', label: 'Title' },
        { name: 'description', label: 'Description', type: 'textarea' },
        { name: 'iconUrl', label: 'Icon URL' },
        { name: 'displayOrder', label: 'Display order', type: 'number' },
        { name: 'status', label: 'Status', type: 'select', options: ['DRAFT', 'PUBLISHED'] },
      ]}
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'description', label: 'Description', render: (r) => (r.description || '').slice(0, 60) },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
