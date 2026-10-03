import CrudPageBuilder from '../components/CrudPageBuilder'
import { projectsApi } from '../api/content'

export default function Projects() {
  return (
    <CrudPageBuilder
      title="Projects"
      api={projectsApi}
      emptyItem={{
        title: '', shortDescription: '', description: '', imageUrl: '',
        githubUrl: '', liveUrl: '', technologies: [], featured: false, displayOrder: 0, status: 'PUBLISHED',
      }}
      fields={[
        { name: 'title', label: 'Title' },
        { name: 'shortDescription', label: 'Short description', type: 'textarea' },
        { name: 'description', label: 'Full description', type: 'textarea' },
        { name: 'imageUrl', label: 'Image URL' },
        { name: 'githubUrl', label: 'GitHub URL' },
        { name: 'liveUrl', label: 'Live URL' },
        { name: 'technologies', label: 'Technologies', type: 'tags' },
        { name: 'featured', label: 'Featured', type: 'checkbox' },
        { name: 'displayOrder', label: 'Display order', type: 'number' },
        { name: 'status', label: 'Status', type: 'select', options: ['DRAFT', 'PUBLISHED'] },
      ]}
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'technologies', label: 'Tech', render: (r) => (r.technologies || []).join(', ') },
        { key: 'featured', label: 'Featured', render: (r) => r.featured ? 'Yes' : 'No' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
