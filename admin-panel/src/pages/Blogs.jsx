import CrudPageBuilder from '../components/CrudPageBuilder'
import { blogsApi } from '../api/content'

export default function Blogs() {
  return (
    <CrudPageBuilder
      title="Blog Posts"
      api={blogsApi}
      emptyItem={{ title: '', slug: '', excerpt: '', content: '', coverImageUrl: '', tags: '', author: '', status: 'DRAFT' }}
      fields={[
        { name: 'title', label: 'Title' },
        { name: 'slug', label: 'Slug (auto-generated if left blank)' },
        { name: 'excerpt', label: 'Excerpt', type: 'textarea' },
        { name: 'content', label: 'Content (Markdown/HTML)', type: 'textarea' },
        { name: 'coverImageUrl', label: 'Cover image URL' },
        { name: 'tags', label: 'Tags (comma separated)' },
        { name: 'author', label: 'Author' },
        { name: 'status', label: 'Status', type: 'select', options: ['DRAFT', 'PUBLISHED'] },
      ]}
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'slug', label: 'Slug' },
        { key: 'author', label: 'Author' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
