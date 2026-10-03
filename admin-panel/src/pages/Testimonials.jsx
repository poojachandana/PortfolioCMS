import CrudPageBuilder from '../components/CrudPageBuilder'
import { testimonialsApi } from '../api/content'

export default function Testimonials() {
  return (
    <CrudPageBuilder
      title="Testimonials"
      api={testimonialsApi}
      emptyItem={{ authorName: '', authorRole: '', authorCompany: '', authorImageUrl: '', message: '', rating: 5, displayOrder: 0, status: 'PUBLISHED' }}
      fields={[
        { name: 'authorName', label: 'Author name' },
        { name: 'authorRole', label: 'Author role' },
        { name: 'authorCompany', label: 'Author company' },
        { name: 'authorImageUrl', label: 'Author image URL' },
        { name: 'message', label: 'Message', type: 'textarea' },
        { name: 'rating', label: 'Rating (1-5)', type: 'number' },
        { name: 'displayOrder', label: 'Display order', type: 'number' },
        { name: 'status', label: 'Status', type: 'select', options: ['DRAFT', 'PUBLISHED'] },
      ]}
      columns={[
        { key: 'authorName', label: 'Author' },
        { key: 'authorCompany', label: 'Company' },
        { key: 'rating', label: 'Rating' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
