import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Home } from './pages/Home'
import { ProjectDetail } from './pages/ProjectDetail'
import { BlogList } from './pages/BlogList'
import { BlogDetail } from './pages/BlogDetail'

/** 路由占位页（404） */
function NotFound() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 pt-16">
      <p className="text-lg text-muted">页面不存在（404）</p>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="projects/:id" element={<ProjectDetail />} />
          <Route path="blog" element={<BlogList />} />
          <Route path="blog/:slug" element={<BlogDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
