import CrudPageBuilder from '../components/CrudPageBuilder'
import { experienceApi } from '../api/content'

export default function Experience() {
  return (
    <CrudPageBuilder
      title="Experience"
      api={experienceApi}
      emptyItem={{
        company: '', role: '', location: '', startDate: '', endDate: '',
        current: false, description: '', companyLogoUrl: '', displayOrder: 0, status: 'PUBLISHED',
      }}
      fields={[
        { name: 'company', label: 'Company' },
        { name: 'role', label: 'Role' },
        { name: 'location', label: 'Location' },
        { name: 'startDate', label: 'Start date', type: 'date' },
        { name: 'endDate', label: 'End date (leave blank if current)', type: 'date' },
        { name: 'current', label: 'Currently working here', type: 'checkbox' },
        { name: 'description', label: 'Description', type: 'textarea' },
        { name: 'companyLogoUrl', label: 'Company logo URL' },
        { name: 'displayOrder', label: 'Display order', type: 'number' },
        { name: 'status', label: 'Status', type: 'select', options: ['DRAFT', 'PUBLISHED'] },
      ]}
      columns={[
        { key: 'company', label: 'Company' },
        { key: 'role', label: 'Role' },
        { key: 'startDate', label: 'Start' },
        { key: 'endDate', label: 'End', render: (r) => r.current ? 'Present' : (r.endDate || '—') },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
