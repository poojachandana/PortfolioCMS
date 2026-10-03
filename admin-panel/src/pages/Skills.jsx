import CrudPageBuilder from '../components/CrudPageBuilder'
import { skillsApi } from '../api/content'

export default function Skills() {
  return (
    <CrudPageBuilder
      title="Skills"
      api={skillsApi}
      emptyItem={{ name: '', category: '', iconUrl: '', proficiency: 80, displayOrder: 0, status: 'PUBLISHED' }}
      fields={[
        { name: 'name', label: 'Name' },
        { name: 'category', label: 'Category (e.g. Frontend, Backend)' },
        { name: 'iconUrl', label: 'Icon URL' },
        { name: 'proficiency', label: 'Proficiency (0-100)', type: 'number' },
        { name: 'displayOrder', label: 'Display order', type: 'number' },
        { name: 'status', label: 'Status', type: 'select', options: ['DRAFT', 'PUBLISHED'] },
      ]}
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'category', label: 'Category' },
        { key: 'proficiency', label: 'Proficiency', render: (r) => r.proficiency != null ? `${r.proficiency}%` : '—' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
