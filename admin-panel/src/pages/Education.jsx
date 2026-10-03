import CrudPageBuilder from '../components/CrudPageBuilder'
import { educationApi } from '../api/content'

export default function Education() {
  return (
    <CrudPageBuilder
      title="Education"
      api={educationApi}
      emptyItem={{ institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', description: '', displayOrder: 0, status: 'PUBLISHED' }}
      fields={[
        { name: 'institution', label: 'Institution' },
        { name: 'degree', label: 'Degree' },
        { name: 'fieldOfStudy', label: 'Field of study' },
        { name: 'startDate', label: 'Start date', type: 'date' },
        { name: 'endDate', label: 'End date', type: 'date' },
        { name: 'description', label: 'Description', type: 'textarea' },
        { name: 'displayOrder', label: 'Display order', type: 'number' },
        { name: 'status', label: 'Status', type: 'select', options: ['DRAFT', 'PUBLISHED'] },
      ]}
      columns={[
        { key: 'institution', label: 'Institution' },
        { key: 'degree', label: 'Degree' },
        { key: 'fieldOfStudy', label: 'Field' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
